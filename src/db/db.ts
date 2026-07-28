import Dexie, { type Table } from 'dexie'
import type { Marca, TipoTinta } from '../data/paints'
import { CATALOGO } from '../data/paints'
import type { StatusMini } from '../data/warhammer'

/**
 * Banco local (IndexedDB). Nada aqui sai do dispositivo: não existe servidor,
 * não existe conta, não existe sincronização. O backup é manual, em
 * Configurações → Exportar.
 */

export type NivelPote = 'cheio' | 'meio' | 'acabando' | 'vazio'

export const NIVEL_INFO: Record<NivelPote, { label: string; cor: string; pct: number }> = {
  cheio: { label: 'Cheio', cor: '#3f9a5a', pct: 100 },
  meio: { label: 'Metade', cor: '#c9a227', pct: 55 },
  acabando: { label: 'Acabando', cor: '#d2691e', pct: 20 },
  vazio: { label: 'Vazio', cor: '#b03a3a', pct: 0 },
}

export type Tinta = {
  id?: number
  /** Vínculo com o catálogo semente, quando a tinta veio de lá. */
  catalogoId?: string
  marca: Marca
  linha: string
  codigo: string
  nome: string
  hex: string
  tipo: TipoTinta
  nivel: NivelPote
  /** Quantos potes iguais você tem. */
  potes: number
  favorita: boolean
  /** Tinta que você quer comprar mas ainda não tem. */
  desejo: boolean
  notas: string
  tags: string[]
  criadoEm: number
  atualizadoEm: number
}

export type ParteEsquema = {
  parte: string
  tintaId?: number
  hex: string
  nota: string
}

export type Miniatura = {
  id?: number
  nome: string
  faccaoId: string
  /** Unidade do catálogo de referência, quando aplicável. */
  unidadeId?: string
  /** Subfacção / capítulo / clã escrito à mão. */
  subfaccao: string
  quantidade: number
  status: StatusMini
  /** 1 = próxima da fila, 5 = algum dia. */
  prioridade: number
  pontos?: number
  esquema: ParteEsquema[]
  baseReceitaId?: string
  notas: string
  tags: string[]
  fotoCapaId?: number
  criadoEm: number
  iniciadoEm?: number
  finalizadoEm?: number
  /** Meta de data para terminar. */
  prazo?: number
}

export type Foto = {
  id?: number
  miniId: number
  blob: Blob
  thumb: Blob
  legenda: string
  criadoEm: number
}

export type Sessao = {
  id?: number
  miniId?: number
  data: number
  minutos: number
  /** Tintas usadas nessa sessão — alimenta o ranking do dashboard. */
  tintaIds: number[]
  notas: string
}

export type Config = {
  chave: string
  valor: unknown
}

export class AtelieDB extends Dexie {
  tintas!: Table<Tinta, number>
  minis!: Table<Miniatura, number>
  fotos!: Table<Foto, number>
  sessoes!: Table<Sessao, number>
  config!: Table<Config, string>

  constructor() {
    super('atelie-pinturas')
    this.version(1).stores({
      tintas: '++id, marca, linha, nome, tipo, nivel, favorita, desejo, catalogoId, atualizadoEm',
      minis: '++id, nome, faccaoId, status, prioridade, criadoEm, finalizadoEm',
      fotos: '++id, miniId, criadoEm',
      sessoes: '++id, miniId, data',
      config: 'chave',
    })
  }
}

export const db = new AtelieDB()

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

export async function getConfig<T>(chave: string, padrao: T): Promise<T> {
  const row = await db.config.get(chave)
  return row === undefined ? padrao : (row.valor as T)
}

export async function setConfig(chave: string, valor: unknown): Promise<void> {
  await db.config.put({ chave, valor })
}

/* ------------------------------------------------------------------ */
/* Criação de tintas                                                   */
/* ------------------------------------------------------------------ */

export function tintaDoCatalogo(catalogoId: string): Omit<Tinta, 'id'> | null {
  const c = CATALOGO.find((t) => t.id === catalogoId)
  if (!c) return null
  const agora = Date.now()
  return {
    catalogoId: c.id,
    marca: c.marca,
    linha: c.linha,
    codigo: c.codigo,
    nome: c.nome,
    hex: c.hex,
    tipo: c.tipo,
    nivel: 'cheio',
    potes: 1,
    favorita: false,
    desejo: false,
    notas: '',
    tags: [],
    criadoEm: agora,
    atualizadoEm: agora,
  }
}

export async function adicionarDoCatalogo(catalogoIds: string[], comoDesejo = false) {
  const novas: Omit<Tinta, 'id'>[] = []
  const jaTenho = new Set(
    (await db.tintas.toArray()).map((t) => t.catalogoId).filter(Boolean) as string[],
  )
  for (const id of catalogoIds) {
    if (jaTenho.has(id)) continue
    const t = tintaDoCatalogo(id)
    if (t) novas.push({ ...t, desejo: comoDesejo, nivel: comoDesejo ? 'vazio' : 'cheio' })
  }
  if (novas.length) await db.tintas.bulkAdd(novas as Tinta[])
  return novas.length
}

/* ------------------------------------------------------------------ */
/* Fotos                                                               */
/* ------------------------------------------------------------------ */

/**
 * Reduz a foto antes de guardar. Uma foto do iPad tem ~4MB; guardar dezenas
 * disso no IndexedDB estoura a cota e deixa a listagem lenta. 1600px de lado
 * maior é mais que suficiente para ver uma miniatura de 32mm.
 */
async function redimensionar(file: Blob, maxLado: number, qualidade: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const escala = Math.min(1, maxLado / Math.max(bitmap.width, bitmap.height))
  const w = Math.round(bitmap.width * escala)
  const h = Math.round(bitmap.height * escala)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    return file
  }
  ctx.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', qualidade),
  )
  return blob ?? file
}

export async function salvarFoto(miniId: number, file: Blob, legenda = ''): Promise<number> {
  const [grande, thumb] = await Promise.all([
    redimensionar(file, 1600, 0.85),
    redimensionar(file, 400, 0.7),
  ])
  const id = await db.fotos.add({
    miniId,
    blob: grande,
    thumb,
    legenda,
    criadoEm: Date.now(),
  } as Foto)
  const mini = await db.minis.get(miniId)
  if (mini && !mini.fotoCapaId) await db.minis.update(miniId, { fotoCapaId: id })
  return id
}

export async function apagarFoto(fotoId: number) {
  const foto = await db.fotos.get(fotoId)
  if (!foto) return
  await db.fotos.delete(fotoId)
  const mini = await db.minis.get(foto.miniId)
  if (mini?.fotoCapaId === fotoId) {
    const outra = await db.fotos.where('miniId').equals(foto.miniId).first()
    await db.minis.update(foto.miniId, { fotoCapaId: outra?.id })
  }
}

export async function apagarMini(miniId: number) {
  await db.transaction('rw', db.minis, db.fotos, db.sessoes, async () => {
    await db.fotos.where('miniId').equals(miniId).delete()
    // As sessões ficam: o tempo investido continua valendo para as estatísticas,
    // só perde o vínculo com a peça.
    const sessoes = await db.sessoes.where('miniId').equals(miniId).toArray()
    await Promise.all(
      sessoes.map((s) => db.sessoes.update(s.id!, { miniId: undefined })),
    )
    await db.minis.delete(miniId)
  })
}

/* ------------------------------------------------------------------ */
/* Mudança de status com carimbo de data                               */
/* ------------------------------------------------------------------ */

export async function mudarStatus(miniId: number, status: StatusMini) {
  const mini = await db.minis.get(miniId)
  if (!mini) return
  const patch: Partial<Miniatura> = { status }
  const emAndamento: StatusMini[] = ['primer', 'pintando', 'detalhes', 'base']
  if (!mini.iniciadoEm && emAndamento.includes(status)) patch.iniciadoEm = Date.now()
  if (status === 'finalizada') {
    patch.finalizadoEm = Date.now()
    if (!mini.iniciadoEm) patch.iniciadoEm = mini.criadoEm
  } else if (mini.finalizadoEm) {
    // Voltou atrás: a peça não está mais pronta.
    patch.finalizadoEm = undefined
  }
  await db.minis.update(miniId, patch)
}

/* ------------------------------------------------------------------ */
/* Backup                                                              */
/* ------------------------------------------------------------------ */

type BackupFoto = Omit<Foto, 'blob' | 'thumb'> & { blob: string; thumb: string }

export type Backup = {
  formato: 'atelie-backup'
  versao: 1
  exportadoEm: number
  tintas: Tinta[]
  minis: Miniatura[]
  sessoes: Sessao[]
  fotos: BackupFoto[]
  config: Config[]
}

function blobParaBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

async function base64ParaBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl)
  return res.blob()
}

export async function exportarBackup(incluirFotos = true): Promise<Backup> {
  const [tintas, minis, sessoes, config, fotos] = await Promise.all([
    db.tintas.toArray(),
    db.minis.toArray(),
    db.sessoes.toArray(),
    db.config.toArray(),
    incluirFotos ? db.fotos.toArray() : Promise.resolve([]),
  ])
  const fotosSerializadas: BackupFoto[] = await Promise.all(
    fotos.map(async (f) => ({
      ...f,
      blob: await blobParaBase64(f.blob),
      thumb: await blobParaBase64(f.thumb),
    })),
  )
  return {
    formato: 'atelie-backup',
    versao: 1,
    exportadoEm: Date.now(),
    tintas,
    minis,
    sessoes,
    config,
    fotos: fotosSerializadas,
  }
}

export async function importarBackup(backup: Backup, modo: 'substituir' | 'mesclar') {
  if (backup?.formato !== 'atelie-backup') {
    throw new Error('Arquivo não parece um backup do Ateliê.')
  }
  const fotos: Foto[] = await Promise.all(
    (backup.fotos ?? []).map(async (f) => ({
      ...f,
      blob: await base64ParaBlob(f.blob),
      thumb: await base64ParaBlob(f.thumb),
    })),
  )

  await db.transaction('rw', db.tintas, db.minis, db.fotos, db.sessoes, db.config, async () => {
    if (modo === 'substituir') {
      await Promise.all([
        db.tintas.clear(),
        db.minis.clear(),
        db.fotos.clear(),
        db.sessoes.clear(),
        db.config.clear(),
      ])
      await db.tintas.bulkAdd(backup.tintas)
      await db.minis.bulkAdd(backup.minis)
      await db.fotos.bulkAdd(fotos)
      await db.sessoes.bulkAdd(backup.sessoes)
      await db.config.bulkPut(backup.config ?? [])
      return
    }

    // Mesclar: reatribui ids para não colidir com o que já existe.
    const mapaTinta = new Map<number, number>()
    for (const t of backup.tintas) {
      const { id, ...resto } = t
      const novo = await db.tintas.add(resto as Tinta)
      if (id !== undefined) mapaTinta.set(id, novo)
    }
    const mapaMini = new Map<number, number>()
    for (const m of backup.minis) {
      const { id, fotoCapaId: _capa, ...resto } = m
      const esquema = resto.esquema.map((p) => ({
        ...p,
        tintaId: p.tintaId !== undefined ? mapaTinta.get(p.tintaId) : undefined,
      }))
      const novo = await db.minis.add({ ...resto, esquema, fotoCapaId: undefined } as Miniatura)
      if (id !== undefined) mapaMini.set(id, novo)
    }
    for (const f of fotos) {
      const { id: _id, ...resto } = f
      const miniId = mapaMini.get(f.miniId)
      if (miniId === undefined) continue
      const novoId = await db.fotos.add({ ...resto, miniId } as Foto)
      const mini = await db.minis.get(miniId)
      if (mini && !mini.fotoCapaId) await db.minis.update(miniId, { fotoCapaId: novoId })
    }
    for (const s of backup.sessoes) {
      const { id: _id, ...resto } = s
      await db.sessoes.add({
        ...resto,
        miniId: s.miniId !== undefined ? mapaMini.get(s.miniId) : undefined,
        tintaIds: s.tintaIds.map((t) => mapaTinta.get(t)).filter((t): t is number => t !== undefined),
      } as Sessao)
    }
  })
}

export async function limparTudo() {
  await Promise.all([
    db.tintas.clear(),
    db.minis.clear(),
    db.fotos.clear(),
    db.sessoes.clear(),
    db.config.clear(),
  ])
}
