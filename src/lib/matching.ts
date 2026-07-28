import {
  CATALOGO,
  CATALOGO_POR_ID,
  EQUIVALENCIAS_CURADAS,
  type CatalogoTinta,
  type Marca,
} from '../data/paints'
import type { Tinta } from '../db/db'
import { deltaE2000, hexToLab, matchQuality, type MatchQuality } from './color'

export type Equivalente = {
  tinta: CatalogoTinta
  deltaE: number
  qualidade: MatchQuality
  /** Verdadeiro quando o par veio da tabela curada, não só do cálculo. */
  curada: boolean
}

const LAB_CACHE = new Map<string, ReturnType<typeof hexToLab>>()
function lab(hex: string) {
  let v = LAB_CACHE.get(hex)
  if (!v) {
    v = hexToLab(hex)
    LAB_CACHE.set(hex, v)
  }
  return v
}

/**
 * Equivalentes de uma cor em outras marcas.
 *
 * Estratégia: pares curados primeiro (é conhecimento de bancada que o ΔE
 * sozinho não captura), depois os mais próximos por CIEDE2000. Compara sempre
 * dentro do mesmo "tipo" quando possível — não adianta oferecer um wash como
 * substituto de uma tinta de cobertura.
 */
export function equivalentesPara(opts: {
  hex: string
  /** Marca de origem, que fica de fora do resultado. */
  marcaOrigem?: Marca
  /** Id no catálogo, se houver — habilita a tabela curada. */
  catalogoId?: string
  /** Quantos por marca. */
  porMarca?: number
  /** Restringe a tipos compatíveis (metálico com metálico, wash com wash). */
  tipoCompativel?: string
}): Record<string, Equivalente[]> {
  const { hex, marcaOrigem, catalogoId, porMarca = 3, tipoCompativel } = opts
  const alvo = lab(hex)
  const curadas = new Set(catalogoId ? (EQUIVALENCIAS_CURADAS[catalogoId] ?? []) : [])

  const porMarcaMap: Record<string, Equivalente[]> = {}

  for (const t of CATALOGO) {
    if (t.marca === marcaOrigem) continue
    if (t.id === catalogoId) continue
    if (tipoCompativel && !tiposCompativeis(tipoCompativel, t.tipo)) continue
    const dE = deltaE2000(alvo, lab(t.hex))
    ;(porMarcaMap[t.marca] ??= []).push({
      tinta: t,
      deltaE: dE,
      qualidade: matchQuality(dE),
      curada: curadas.has(t.id),
    })
  }

  for (const marca of Object.keys(porMarcaMap)) {
    porMarcaMap[marca] = porMarcaMap[marca]
      .sort((a, b) => {
        if (a.curada !== b.curada) return a.curada ? -1 : 1
        return a.deltaE - b.deltaE
      })
      .slice(0, porMarca)
  }

  return porMarcaMap
}

function tiposCompativeis(a: string, b: string): boolean {
  const grupo = (t: string) => {
    if (t === 'metalica') return 'metal'
    if (t === 'wash' || t === 'contrast' || t === 'tinta-ink') return 'translucida'
    if (t === 'primer' || t === 'verniz' || t === 'medium' || t === 'tecnica') return 'auxiliar'
    return 'cobertura'
  }
  const ga = grupo(a)
  const gb = grupo(b)
  // Cobertura e drybrush se substituem entre si sem problema.
  if (ga === 'cobertura' && gb === 'cobertura') return true
  return ga === gb
}

/**
 * As tintas do SEU estoque mais próximas de uma cor alvo.
 *
 * `maxDeltaE` existe para não sugerir bobagem: com um estoque pequeno, a tinta
 * "mais próxima" de um azul pode ser um cáqui a ΔE 45. Acima de ~18 não é
 * substituto de nada, e é mais honesto devolver lista vazia.
 */
export function doMeuEstoque(
  hex: string,
  tintas: Tinta[],
  limite = 5,
  opcoes: { apenasDisponiveis?: boolean; maxDeltaE?: number } = {},
): { tinta: Tinta; deltaE: number; qualidade: MatchQuality }[] {
  const { apenasDisponiveis = true, maxDeltaE = 18 } = opcoes
  const alvo = lab(hex)
  return tintas
    .filter((t) => (apenasDisponiveis ? t.nivel !== 'vazio' && !t.desejo : true))
    .map((t) => {
      const dE = deltaE2000(alvo, lab(t.hex))
      return { tinta: t, deltaE: dE, qualidade: matchQuality(dE) }
    })
    .filter((x) => x.deltaE <= maxDeltaE)
    .sort((a, b) => a.deltaE - b.deltaE)
    .slice(0, limite)
}

/** Busca textual no catálogo (nome, código, marca, linha). */
export function buscarNoCatalogo(termo: string, limite = 60): CatalogoTinta[] {
  const q = termo.trim().toLowerCase()
  if (!q) return CATALOGO.slice(0, limite)
  const palavras = q.split(/\s+/)
  return CATALOGO.filter((t) => {
    const alvo = `${t.marca} ${t.linha} ${t.codigo} ${t.nome}`.toLowerCase()
    return palavras.every((p) => alvo.includes(p))
  }).slice(0, limite)
}

export function catalogoPorId(id: string): CatalogoTinta | undefined {
  return CATALOGO_POR_ID.get(id)
}
