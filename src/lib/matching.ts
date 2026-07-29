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

export type ReferenciaCor = {
  /** A Vallejo mais próxima do catálogo, em qualquer linha. */
  vallejo?: { tinta: CatalogoTinta; deltaE: number; qualidade: MatchQuality }
  /** A tinta mais próxima que a pessoa realmente tem na bancada. */
  minha?: { tinta: Tinta; deltaE: number; qualidade: MatchQuality }
}

/**
 * A tinta Vallejo mais próxima de uma cor, considerando todas as linhas
 * (Model Color, Game Color, Xpress, Model Air).
 *
 * `preferirLinha` existe porque a linha certa depende do que a cor representa:
 * para uma cor de contraste faz sentido sugerir uma Xpress, para uma cor de
 * cobertura faz sentido sugerir Model Color. Sem isso, a sugestão de um azul
 * de armadura poderia cair numa tinta translúcida que se comporta muito
 * diferente na hora de pintar.
 */
export function maisProximaVallejo(
  hex: string,
  preferirLinha?: string,
): { tinta: CatalogoTinta; deltaE: number; qualidade: MatchQuality } | undefined {
  const alvo = lab(hex)
  let melhor: { tinta: CatalogoTinta; deltaE: number; qualidade: MatchQuality } | undefined
  for (const t of CATALOGO) {
    if (t.marca !== 'Vallejo') continue
    if (t.tipo === 'medium' || t.tipo === 'verniz' || t.tipo === 'primer') continue
    if (preferirLinha && t.linha !== preferirLinha) continue
    const dE = deltaE2000(alvo, lab(t.hex))
    if (!melhor || dE < melhor.deltaE) melhor = { tinta: t, deltaE: dE, qualidade: matchQuality(dE) }
  }
  return melhor
}

/**
 * As três informações que acompanham qualquer amostra de cor no app:
 * o hex (que quem chama já tem), a Vallejo mais próxima e a mais próxima do
 * estoque. Uma cor sem referência de tinta é bonita e inútil na bancada.
 */
/**
 * Até onde uma tinta ainda pode ser chamada de substituta.
 *
 * Na escala ΔE2000: até ~3 a diferença só aparece lado a lado, até ~6 muda o
 * tom mas resolve, até ~11 é uma aproximação que exige ajuste. Acima disso já
 * é outra cor — sugerir um vermelho no lugar de um azul escuro não ajuda
 * ninguém, só polui a leitura. Quando nada passa desse corte, o app diz que
 * você não tem nada parecido, que é uma informação útil por si só.
 */
export const LIMITE_SUBSTITUTO = 11

export function referenciaDeCor(
  hex: string,
  tintas: Tinta[],
  opcoes: { preferirLinha?: string; maxDeltaEstoque?: number } = {},
): ReferenciaCor {
  const { preferirLinha, maxDeltaEstoque = LIMITE_SUBSTITUTO } = opcoes
  return {
    vallejo: maisProximaVallejo(hex, preferirLinha),
    minha: doMeuEstoque(hex, tintas, 1, { maxDeltaE: maxDeltaEstoque })[0],
  }
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
