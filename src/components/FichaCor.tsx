import { useMemo } from 'react'
import type { Tinta } from '../db/db'
import { referenciaDeCor } from '../lib/matching'
import { MATCH_LABEL, readableOn, type MatchQuality } from '../lib/color'
import { Amostra } from './ui'

/**
 * As três informações que acompanham toda cor mostrada no app:
 *
 *   1. o hex — para reproduzir a cor exata em qualquer lugar;
 *   2. a Vallejo mais próxima — a marca que o Fernando usa, então essa é a
 *      resposta a "que tinta eu compro para chegar nisso?";
 *   3. a mais próxima que ele já tem — a resposta a "preciso comprar ou já
 *      resolvo com o que está na bancada?".
 *
 * Sem as duas últimas, uma rampa de luz e sombra é só um degradê bonito: não
 * diz o que pôr no pincel.
 */

export function corDaQualidade(q: MatchQuality | string): string {
  switch (q) {
    case 'identica':
      return '#4aa96c'
    case 'excelente':
      return '#6bbf59'
    case 'boa':
      return '#d4a537'
    case 'aproximada':
      return '#d2792f'
    default:
      return '#a05a5a'
  }
}

export function FichaCor({
  hex,
  tintas,
  preferirLinha,
  compacta = false,
}: {
  hex: string
  tintas: Tinta[]
  /** Restringe a sugestão Vallejo a uma linha (ex.: 'Xpress Color'). */
  preferirLinha?: string
  /** Versão de uma linha só, para caber embaixo de amostras pequenas. */
  compacta?: boolean
}) {
  const ref = useMemo(
    () => referenciaDeCor(hex, tintas, { preferirLinha }),
    [hex, tintas, preferirLinha],
  )

  if (compacta) {
    return (
      <div className="space-y-0.5 text-[10px] leading-tight">
        <div className="font-mono text-suave">{hex.toUpperCase()}</div>
        <div className="truncate text-ouro" title={ref.vallejo?.tinta.nome}>
          {ref.vallejo ? `V: ${ref.vallejo.tinta.nome}` : 'V: —'}
        </div>
        <div
          className="truncate"
          style={{ color: ref.minha ? corDaQualidade(ref.minha.qualidade) : undefined }}
          title={
            ref.minha
              ? `${ref.minha.tinta.nome} — ${MATCH_LABEL[ref.minha.qualidade]}, ΔE ${ref.minha.deltaE.toFixed(1)}`
              : undefined
          }
        >
          {ref.minha ? `Tenho: ${ref.minha.tinta.nome}` : 'Tenho: nenhuma parecida'}
        </div>
      </div>
    )
  }

  return (
    <dl className="space-y-1 text-[11px] leading-tight">
      <div className="flex items-baseline gap-1.5">
        <dt className="w-14 shrink-0 font-semibold uppercase tracking-wide text-suave/70">Hex</dt>
        <dd className="font-mono font-semibold">{hex.toUpperCase()}</dd>
      </div>

      <div className="flex items-baseline gap-1.5">
        <dt className="w-14 shrink-0 font-semibold uppercase tracking-wide text-suave/70">
          Vallejo
        </dt>
        <dd className="min-w-0 flex-1">
          {ref.vallejo ? (
            <>
              <span className="font-semibold text-ouro">{ref.vallejo.tinta.nome}</span>
              <span className="text-suave">
                {' '}
                · {ref.vallejo.tinta.linha}
                {ref.vallejo.tinta.codigo ? ` ${ref.vallejo.tinta.codigo}` : ''} · ΔE{' '}
                {ref.vallejo.deltaE.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-suave">—</span>
          )}
        </dd>
      </div>

      <div className="flex items-baseline gap-1.5">
        <dt className="w-14 shrink-0 font-semibold uppercase tracking-wide text-suave/70">Tenho</dt>
        <dd className="min-w-0 flex-1">
          {ref.minha ? (
            <>
              {/* A cor do nome já diz se dá para usar: verde serve, laranja
                  quebra um galho, vermelho é outra cor. */}
              <span
                className="font-semibold"
                style={{ color: corDaQualidade(ref.minha.qualidade) }}
              >
                {ref.minha.tinta.nome}
              </span>
              <span className="text-suave">
                {' '}
                · {ref.minha.tinta.marca}
                {ref.minha.tinta.codigo ? ` ${ref.minha.tinta.codigo}` : ''} ·{' '}
                {MATCH_LABEL[ref.minha.qualidade]} ΔE {ref.minha.deltaE.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-suave">
              {tintas.length === 0
                ? 'estoque vazio — cadastre suas tintas'
                : 'não tenho nada parecido'}
            </span>
          )}
        </dd>
      </div>
    </dl>
  )
}

/**
 * Amostra + as três informações, no formato usado nas listas (rampas,
 * esquemas, undercoats).
 */
export function LinhaCor({
  hex,
  tintas,
  titulo,
  descricao,
  tamanho = 48,
  preferirLinha,
  acao,
}: {
  hex: string
  tintas: Tinta[]
  titulo: string
  descricao?: string
  tamanho?: number
  preferirLinha?: string
  acao?: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <Amostra hex={hex} tamanho={tamanho} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-semibold">{titulo}</span>
          {acao}
        </div>
        {descricao && <p className="mb-1.5 mt-0.5 text-xs leading-relaxed text-suave">{descricao}</p>}
        <div className="mt-1">
          <FichaCor hex={hex} tintas={tintas} preferirLinha={preferirLinha} />
        </div>
      </div>
    </div>
  )
}

/** Retângulo de cor com as três informações por baixo — usado nas harmonias. */
export function BlocoCor({
  hex,
  tintas,
  rotulo,
  aoClicar,
}: {
  hex: string
  tintas: Tinta[]
  rotulo?: string
  aoClicar?: () => void
}) {
  const conteudo = (
    <>
      <span
        className="flex h-16 items-end justify-center rounded-lg pb-1 font-mono text-[10px] font-bold"
        style={{ background: hex, color: readableOn(hex) }}
      >
        {rotulo ?? hex.toUpperCase()}
      </span>
      <span className="mt-1.5 block px-0.5">
        <FichaCor hex={hex} tintas={tintas} compacta />
      </span>
    </>
  )
  if (!aoClicar) return <div className="min-w-0 flex-1">{conteudo}</div>
  return (
    <button
      type="button"
      onClick={aoClicar}
      className="min-w-0 flex-1 text-left transition active:scale-95"
      title={`Usar ${hex}`}
    >
      {conteudo}
    </button>
  )
}
