/**
 * Ilustrações das receitas de base, vistas de cima.
 *
 * São desenhos esquemáticos, não fotos: mostram a textura, as cores e os
 * elementos que a receita descreve, para você bater o olho e saber o que está
 * sendo proposto. Feitas em SVG porque assim escalam sem borrar, pesam alguns
 * kB no total e continuam funcionando offline — o app não busca imagem nenhuma
 * na internet.
 */

/** Ruído determinístico: o mesmo id sempre gera o mesmo desenho. */
function rng(semente: number) {
  let s = semente
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/** Pedras/entulho espalhados dentro do círculo, sem cair fora da borda. */
function cacos(
  semente: number,
  quantidade: number,
  cores: string[],
  tamanho: [number, number],
) {
  const r = rng(semente)
  return Array.from({ length: quantidade }, (_, i) => {
    const ang = r() * Math.PI * 2
    const dist = Math.sqrt(r()) * 44
    const cx = 60 + Math.cos(ang) * dist
    const cy = 60 + Math.sin(ang) * dist
    const t = tamanho[0] + r() * (tamanho[1] - tamanho[0])
    const giro = r() * 360
    const cor = cores[Math.floor(r() * cores.length)]
    // Polígono irregular de 5 lados: pedra parece pedra, círculo parece bolha.
    const pontos = Array.from({ length: 5 }, (_, k) => {
      const a = (k / 5) * Math.PI * 2
      const rr = t * (0.62 + r() * 0.38)
      return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`
    }).join(' ')
    return (
      <polygon
        key={i}
        points={pontos}
        fill={cor}
        transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${giro.toFixed(0)})`}
      />
    )
  })
}

function tufos(semente: number, quantidade: number, cores: string[]) {
  const r = rng(semente)
  return Array.from({ length: quantidade }, (_, i) => {
    const ang = r() * Math.PI * 2
    const dist = Math.sqrt(r()) * 40
    const cx = 60 + Math.cos(ang) * dist
    const cy = 60 + Math.sin(ang) * dist
    const cor = cores[Math.floor(r() * cores.length)]
    const lâminas = Array.from({ length: 5 }, (_, k) => {
      const dx = (k - 2) * 1.7 + (r() - 0.5)
      const alt = 5 + r() * 4
      return <path key={k} d={`M0 0 L${dx} ${-alt}`} stroke={cor} strokeWidth={1.1} />
    })
    return (
      <g key={i} transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)})`} strokeLinecap="round">
        {lâminas}
      </g>
    )
  })
}

const CONTEUDO: Record<string, { fundo: string; fundo2: string; elementos: React.ReactNode }> = {
  urbano: {
    fundo: '#6d7178',
    fundo2: '#4a4e55',
    elementos: (
      <>
        {/* lajes quebradas */}
        <polygon points="18,72 52,60 66,82 30,96" fill="#7d828a" />
        <polygon points="62,26 96,34 88,58 58,50" fill="#83888f" />
        <polygon points="18,72 52,60 50,64 20,76" fill="#9aa0a8" />
        <polygon points="62,26 96,34 94,38 61,30" fill="#9aa0a8" />
        {cacos(7, 22, ['#585d64', '#8b9098', '#6f747c'], [2, 5])}
      </>
    ),
  },
  deserto: {
    fundo: '#c9ac78',
    fundo2: '#a98d5c',
    elementos: (
      <>
        {/* rachaduras */}
        <g stroke="#8a7047" strokeWidth={1.2} fill="none" strokeLinecap="round">
          <path d="M20 44 L46 52 L58 40 L84 48" />
          <path d="M46 52 L44 78 L62 92" />
          <path d="M58 40 L54 20" />
          <path d="M44 78 L22 86" />
          <path d="M84 48 L92 70 L70 80" />
        </g>
        {cacos(21, 14, ['#b59a68', '#d9c496', '#9c8154'], [1.5, 3.5])}
      </>
    ),
  },
  lama: {
    fundo: '#5a4530',
    fundo2: '#3a2c1e',
    elementos: (
      <>
        {/* poças com brilho */}
        <ellipse cx="45" cy="70" rx="22" ry="14" fill="#2e2416" />
        <ellipse cx="45" cy="70" rx="18" ry="11" fill="#3d3a1f" />
        <ellipse cx="40" cy="66" rx="7" ry="3" fill="#8a9a5c" opacity="0.5" />
        <ellipse cx="80" cy="40" rx="13" ry="9" fill="#2e2416" />
        <ellipse cx="78" cy="37" rx="4.5" ry="2" fill="#8a9a5c" opacity="0.45" />
        {cacos(33, 16, ['#6b5238', '#463525', '#7a6144'], [2, 5])}
      </>
    ),
  },
  neve: {
    fundo: '#6a7078',
    fundo2: '#474d55',
    elementos: (
      <>
        {/* rocha aparecendo sob a neve */}
        <polygon points="24,60 44,40 62,58 40,78" fill="#7c828a" />
        <polygon points="24,60 44,40 46,44 28,62" fill="#9aa1a9" />
        <polygon points="66,72 88,62 92,84 70,90" fill="#767c84" />
        {/* neve acumulada do lado do vento */}
        <path d="M18 70 Q34 58 52 66 Q70 74 96 64 L96 100 L18 100 Z" fill="#e9eef3" />
        <path d="M18 70 Q34 58 52 66 Q70 74 96 64 L96 70 Q70 80 52 72 Q34 64 18 76 Z" fill="#c3d2de" />
        <ellipse cx="72" cy="34" rx="14" ry="8" fill="#e9eef3" />
        <ellipse cx="72" cy="36" rx="14" ry="5" fill="#cbd8e3" />
      </>
    ),
  },
  industrial: {
    fundo: '#4e545c',
    fundo2: '#33383f',
    elementos: (
      <>
        {/* chapas e grelha */}
        <g stroke="#2b3037" strokeWidth={2} fill="none">
          <path d="M8 44 L112 44 M8 76 L112 76 M46 8 L46 112" />
        </g>
        <g stroke="#6b727b" strokeWidth={0.9} fill="none">
          <path d="M8 46 L112 46 M8 78 L112 78 M48 8 L48 112" />
        </g>
        {/* rebites */}
        {[
          [24, 30],
          [80, 30],
          [24, 92],
          [80, 92],
          [66, 60],
          [96, 60],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3.4" fill="#3c424a" />
            <circle cx={x} cy={y - 0.7} r="2.2" fill="#7d848d" />
          </g>
        ))}
        {/* ferrugem nas juntas */}
        <ellipse cx="46" cy="60" rx="9" ry="14" fill="#8a4f22" opacity="0.5" />
        <ellipse cx="90" cy="46" rx="12" ry="5" fill="#a05e28" opacity="0.4" />
      </>
    ),
  },
  grama: {
    fundo: '#6b5334',
    fundo2: '#4a3a24',
    elementos: (
      <>
        {cacos(51, 18, ['#7d6543', '#5c4830', '#8f7a55'], [2, 4.5])}
        {/* pedra maior quebrando a silhueta */}
        <polygon points="74,66 92,60 96,76 78,82" fill="#868b90" />
        <polygon points="74,66 92,60 93,64 76,70" fill="#a3a8ad" />
        {tufos(63, 9, ['#5f8a3c', '#7aa34c', '#48702f'])}
      </>
    ),
  },
  preta: {
    fundo: '#22262c',
    fundo2: '#131519',
    elementos: (
      <>
        <ellipse cx="60" cy="60" rx="40" ry="40" fill="#1b1f24" />
        {/* leve névoa clara na borda, para peças etéreas */}
        <ellipse cx="60" cy="86" rx="34" ry="10" fill="#7f96a8" opacity="0.16" />
        <ellipse cx="60" cy="34" rx="26" ry="7" fill="#7f96a8" opacity="0.1" />
      </>
    ),
  },
}

export function IlustracaoBase({
  id,
  tamanho = 120,
  className,
}: {
  id: string
  tamanho?: number
  className?: string
}) {
  const c = CONTEUDO[id]
  if (!c) return null
  const clip = `clip-base-${id}`
  const grad = `grad-base-${id}`

  return (
    <svg
      viewBox="0 0 120 120"
      width={tamanho}
      height={tamanho}
      className={className}
      role="img"
      aria-label={`Ilustração da base: ${id}`}
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="60" cy="60" r="54" />
        </clipPath>
        <radialGradient id={grad} cx="38%" cy="32%" r="78%">
          <stop offset="0" stopColor={c.fundo} />
          <stop offset="1" stopColor={c.fundo2} />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect width="120" height="120" fill={`url(#${grad})`} />
        {c.elementos}
      </g>

      {/* borda da base, pintada de preto como manda o acabamento de vitrine */}
      <circle cx="60" cy="60" r="54" fill="none" stroke="#0b0d12" strokeWidth="6" />
      <circle cx="60" cy="60" r="57.5" fill="none" stroke="#39424f" strokeWidth="1.5" />
    </svg>
  )
}
