import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { readableOn } from '../lib/color'
import { IconX } from './icons'

/* ------------------------------------------------------------------ */
/* Folha modal (bottom sheet no iPad em retrato, painel lateral em      */
/* paisagem)                                                            */
/* ------------------------------------------------------------------ */

export function Folha({
  aberta,
  aoFechar,
  titulo,
  children,
  rodape,
  largura = 'max-w-2xl',
}: {
  aberta: boolean
  aoFechar: () => void
  titulo: ReactNode
  children: ReactNode
  rodape?: ReactNode
  largura?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberta) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [aberta, aoFechar])

  if (!aberta) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        onClick={aoFechar}
        aria-hidden
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`card relative w-full ${largura} flex max-h-[92dvh] flex-col overflow-hidden rounded-b-none sm:rounded-b-2xl`}
        style={{ animation: 'subir 220ms cubic-bezier(0.2,0.9,0.3,1)' }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-borda px-5 py-4">
          <div className="min-w-0 text-lg font-semibold">{titulo}</div>
          <button className="btn btn-fantasma px-2" onClick={aoFechar} aria-label="Fechar">
            <IconX />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {rodape && (
          <div className="safe-bottom flex items-center justify-end gap-2 border-t border-borda bg-superficie2 px-5 py-3">
            {rodape}
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function Amostra({
  hex,
  tamanho = 44,
  rotulo,
  translucida = false,
  aoClicar,
  selecionada = false,
}: {
  hex: string
  tamanho?: number
  rotulo?: string
  translucida?: boolean
  aoClicar?: () => void
  selecionada?: boolean
}) {
  const conteudo = (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl border ${
        selecionada ? 'border-ouro' : 'border-white/12'
      } ${translucida ? 'xadrez' : ''}`}
      style={{ width: tamanho, height: tamanho }}
      title={rotulo ?? hex}
    >
      <span
        className="h-full w-full rounded-[10px]"
        style={{ background: hex, opacity: translucida ? 0.82 : 1 }}
      />
    </span>
  )
  if (!aoClicar) return conteudo
  return (
    <button type="button" onClick={aoClicar} className="cursor-pointer leading-none">
      {conteudo}
    </button>
  )
}

/* ------------------------------------------------------------------ */

export function Selo({
  cor,
  children,
  suave = false,
}: {
  cor: string
  children: ReactNode
  suave?: boolean
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={
        suave
          ? { background: `color-mix(in srgb, ${cor} 18%, transparent)`, color: cor }
          : { background: cor, color: readableOn(cor) }
      }
    >
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */

export function Vazio({
  titulo,
  descricao,
  acao,
  icone,
}: {
  titulo: string
  descricao: string
  acao?: ReactNode
  icone?: ReactNode
}) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-12 text-center">
      {icone && <div className="text-suave/70">{icone}</div>}
      <h3 className="text-lg font-semibold">{titulo}</h3>
      <p className="max-w-md text-sm leading-relaxed text-suave">{descricao}</p>
      {acao}
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function Segmentado<T extends string>({
  valor,
  opcoes,
  aoMudar,
}: {
  valor: T
  opcoes: { id: T; label: string }[]
  aoMudar: (v: T) => void
}) {
  return (
    <div className="inline-flex rounded-xl border border-borda bg-superficie2 p-1">
      {opcoes.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => aoMudar(o.id)}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
            valor === o.id ? 'bg-ouro text-[#14100a]' : 'text-suave'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function Metrica({
  rotulo,
  valor,
  sufixo,
  detalhe,
  cor = 'var(--color-ouro)',
  icone,
}: {
  rotulo: string
  valor: ReactNode
  sufixo?: string
  detalhe?: ReactNode
  cor?: string
  icone?: ReactNode
}) {
  return (
    <div className="card px-4 py-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="titulo-secao">{rotulo}</span>
        {icone && <span style={{ color: cor }}>{icone}</span>}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight" style={{ color: cor }}>
          {valor}
        </span>
        {sufixo && <span className="text-sm font-medium text-suave">{sufixo}</span>}
      </div>
      {detalhe && <div className="mt-1 text-xs leading-relaxed text-suave">{detalhe}</div>}
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function Barra({
  valor,
  cor = 'var(--color-ouro)',
  altura = 6,
}: {
  valor: number
  cor?: string
  altura?: number
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-superficie3"
      style={{ height: altura }}
      role="progressbar"
      aria-valuenow={Math.round(valor)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-300"
        style={{ width: `${Math.max(0, Math.min(100, valor))}%`, background: cor }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function Aviso({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-ouro/25 bg-ouro/8 px-3.5 py-2.5 text-xs leading-relaxed text-ouro/90">
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */

/** Foto guardada como Blob no IndexedDB, exibida via object URL. */
export function ImagemBlob({
  blob,
  alt,
  className,
}: {
  blob?: Blob
  alt: string
  className?: string
}) {
  const url = useObjectUrl(blob)
  if (!url) return null
  return <img src={url} alt={alt} className={className} loading="lazy" decoding="async" />
}

export function useObjectUrl(blob?: Blob): string | undefined {
  const url = useMemo(() => (blob ? URL.createObjectURL(blob) : undefined), [blob])
  // Revoga o URL anterior quando o blob troca e ao desmontar — sem isso o
  // Safari segura as fotos na memória a cada rolagem da galeria.
  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url)
  }, [url])
  return url
}
