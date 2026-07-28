import type { Miniatura, Sessao, Tinta } from '../db/db'
import { FACCOES_POR_ID, type StatusMini, STATUS_INFO, STATUS_ORDEM } from '../data/warhammer'

const DIA = 86_400_000

export type Indicadores = ReturnType<typeof calcularIndicadores>

export function calcularIndicadores(
  minis: Miniatura[],
  sessoes: Sessao[],
  tintas: Tinta[],
  agora = Date.now(),
) {
  const finalizadas = minis.filter((m) => m.status === 'finalizada')
  const emAndamento = minis.filter(
    (m) => m.status !== 'finalizada' && m.status !== 'desmontada' && m.status !== 'montada',
  )
  /** A famosa "pilha da vergonha": comprado e ainda não começado. */
  const pilhaDaVergonha = minis.filter(
    (m) => m.status === 'desmontada' || m.status === 'montada',
  )

  const totalModelos = minis.reduce((s, m) => s + m.quantidade, 0)
  const modelosFinalizados = finalizadas.reduce((s, m) => s + m.quantidade, 0)

  const minutosTotais = sessoes.reduce((s, x) => s + x.minutos, 0)

  /* ---- tempo médio por miniatura --------------------------------- */
  // Só conta peças finalizadas que têm sessões registradas, senão a média
  // vira ficção (peça pintada antes do app entrar em uso puxa tudo para baixo).
  const minutosPorMini = new Map<number, number>()
  for (const s of sessoes) {
    if (s.miniId === undefined) continue
    minutosPorMini.set(s.miniId, (minutosPorMini.get(s.miniId) ?? 0) + s.minutos)
  }
  const finalizadasComTempo = finalizadas.filter(
    (m) => m.id !== undefined && minutosPorMini.has(m.id),
  )
  const minutosMedioPorPeca = finalizadasComTempo.length
    ? finalizadasComTempo.reduce(
        (s, m) => s + minutosPorMini.get(m.id!)! / Math.max(m.quantidade, 1),
        0,
      ) / finalizadasComTempo.length
    : 0

  /* ---- tempo de calendário (do primeiro pincel ao verniz) --------- */
  const comCiclo = finalizadas.filter((m) => m.iniciadoEm && m.finalizadoEm)
  const diasMedioCiclo = comCiclo.length
    ? comCiclo.reduce((s, m) => s + (m.finalizadoEm! - m.iniciadoEm!) / DIA, 0) / comCiclo.length
    : 0

  /* ---- ranking de tintas ---------------------------------------- */
  const usoTinta = new Map<number, number>()
  for (const s of sessoes) {
    for (const id of s.tintaIds) usoTinta.set(id, (usoTinta.get(id) ?? 0) + 1)
  }
  // O esquema de cor salvo numa mini também é uso: conta como 1 por peça.
  for (const m of minis) {
    for (const p of m.esquema) {
      if (p.tintaId !== undefined) usoTinta.set(p.tintaId, (usoTinta.get(p.tintaId) ?? 0) + 1)
    }
  }
  const porId = new Map(tintas.filter((t) => t.id !== undefined).map((t) => [t.id!, t]))
  const tintasMaisUsadas = [...usoTinta.entries()]
    .map(([id, usos]) => ({ tinta: porId.get(id), usos }))
    .filter((x): x is { tinta: Tinta; usos: number } => !!x.tinta)
    .sort((a, b) => b.usos - a.usos)
    .slice(0, 10)

  /* ---- estoque --------------------------------------------------- */
  const noEstoque = tintas.filter((t) => !t.desejo)
  const acabando = noEstoque.filter((t) => t.nivel === 'acabando' || t.nivel === 'vazio')
  const listaDeCompras = [...acabando, ...tintas.filter((t) => t.desejo)]

  /* ---- distribuições --------------------------------------------- */
  const porStatus = STATUS_ORDEM.map((s) => ({
    status: s,
    label: STATUS_INFO[s].label,
    cor: STATUS_INFO[s].cor,
    valor: minis.filter((m) => m.status === s).reduce((acc, m) => acc + m.quantidade, 0),
  }))

  const faccaoMap = new Map<string, { modelos: number; finalizados: number }>()
  for (const m of minis) {
    const cur = faccaoMap.get(m.faccaoId) ?? { modelos: 0, finalizados: 0 }
    cur.modelos += m.quantidade
    if (m.status === 'finalizada') cur.finalizados += m.quantidade
    faccaoMap.set(m.faccaoId, cur)
  }
  const porFaccao = [...faccaoMap.entries()]
    .map(([id, v]) => ({
      id,
      nome: FACCOES_POR_ID.get(id)?.nome ?? id,
      cor: FACCOES_POR_ID.get(id)?.cor ?? '#6e757a',
      ...v,
    }))
    .sort((a, b) => b.modelos - a.modelos)

  /* ---- série temporal (12 meses) ---------------------------------- */
  const meses: { chave: string; label: string; horas: number; finalizadas: number }[] = []
  const base = new Date(agora)
  for (let i = 11; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1)
    meses.push({
      chave: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
      horas: 0,
      finalizadas: 0,
    })
  }
  const idxMes = new Map(meses.map((m, i) => [m.chave, i]))
  const chaveDe = (ts: number) => {
    const d = new Date(ts)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }
  for (const s of sessoes) {
    const i = idxMes.get(chaveDe(s.data))
    if (i !== undefined) meses[i].horas += s.minutos / 60
  }
  for (const m of finalizadas) {
    if (!m.finalizadoEm) continue
    const i = idxMes.get(chaveDe(m.finalizadoEm))
    if (i !== undefined) meses[i].finalizadas += m.quantidade
  }
  for (const m of meses) m.horas = Math.round(m.horas * 10) / 10

  /* ---- ritmo recente ---------------------------------------------- */
  const ultimos30 = sessoes.filter((s) => agora - s.data <= 30 * DIA)
  const horas30 = ultimos30.reduce((s, x) => s + x.minutos, 0) / 60
  const diasPintados30 = new Set(ultimos30.map((s) => new Date(s.data).toDateString())).size

  /* ---- fila das próximas ------------------------------------------ */
  const proximas = minis
    .filter((m) => m.status !== 'finalizada')
    .sort((a, b) => {
      if (a.prioridade !== b.prioridade) return a.prioridade - b.prioridade
      const pa = a.prazo ?? Infinity
      const pb = b.prazo ?? Infinity
      if (pa !== pb) return pa - pb
      // Quem está mais perto do fim vem antes: é a vitória mais barata.
      return STATUS_ORDEM.indexOf(b.status) - STATUS_ORDEM.indexOf(a.status)
    })
    .slice(0, 8)

  const atrasadas = minis.filter(
    (m) => m.status !== 'finalizada' && m.prazo !== undefined && m.prazo < agora,
  )

  /* ---- projeção ---------------------------------------------------- */
  // Quanto tempo para zerar a pilha, no ritmo dos últimos 30 dias.
  const modelosPendentes = totalModelos - modelosFinalizados
  const modelosPorMes30 = finalizadas
    .filter((m) => m.finalizadoEm && agora - m.finalizadoEm <= 30 * DIA)
    .reduce((s, m) => s + m.quantidade, 0)
  const mesesParaZerar =
    modelosPorMes30 > 0 ? Math.ceil(modelosPendentes / modelosPorMes30) : null

  return {
    totais: {
      pecas: minis.length,
      modelos: totalModelos,
      modelosFinalizados,
      modelosPendentes,
      finalizadas: finalizadas.length,
      emAndamento: emAndamento.length,
      pilhaDaVergonha: pilhaDaVergonha.reduce((s, m) => s + m.quantidade, 0),
      tintas: noEstoque.length,
      tintasAcabando: acabando.length,
      horasTotais: Math.round((minutosTotais / 60) * 10) / 10,
      sessoes: sessoes.length,
    },
    minutosMedioPorPeca: Math.round(minutosMedioPorPeca),
    diasMedioCiclo: Math.round(diasMedioCiclo * 10) / 10,
    amostraTempo: finalizadasComTempo.length,
    tintasMaisUsadas,
    listaDeCompras,
    porStatus,
    porFaccao,
    meses,
    horas30: Math.round(horas30 * 10) / 10,
    diasPintados30,
    proximas,
    atrasadas,
    mesesParaZerar,
    percentualPintado: totalModelos ? Math.round((modelosFinalizados / totalModelos) * 100) : 0,
  }
}

export function formatarMinutos(min: number): string {
  if (!min) return '—'
  const h = Math.floor(min / 60)
  const m = Math.round(min % 60)
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h${String(m).padStart(2, '0')}`
}

export function formatarData(ts?: number): string {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatarDataCurta(ts?: number): string {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export function statusDoStatus(s: StatusMini) {
  return STATUS_INFO[s]
}
