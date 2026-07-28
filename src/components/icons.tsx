type Props = { size?: number; className?: string }

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
  'aria-hidden': true,
})

export const IconPainel = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
)

export const IconTinta = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M8 3h8v4H8z" />
    <path d="M7 7h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
    <path d="M7 14h10" />
  </svg>
)

export const IconRoda = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
  </svg>
)

export const IconMini = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M12 3l3 3-1.5 3 2 4v5H8.5v-5l2-4L9 6z" />
    <path d="M5 21h14" />
  </svg>
)

export const IconLivro = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M4 5a2 2 0 0 1 2-2h11a1 1 0 0 1 1 1v13H6a2 2 0 0 0-2 2z" />
    <path d="M4 19a2 2 0 0 0 2 2h12" />
    <path d="M8 7h6" />
  </svg>
)

export const IconEngrenagem = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 14a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 18.3a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.7 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9 4.7 1.6 1.6 0 0 0 10 3.2V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
  </svg>
)

export const IconMais = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const IconBusca = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const IconX = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export const IconVoltar = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

export const IconCamera = ({ size = 22, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <circle cx="12" cy="12.5" r="3.5" />
  </svg>
)

export const IconRelogio = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconEstrela = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />
  </svg>
)

export const IconLixeira = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
  </svg>
)

export const IconLapis = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M4 20h4l10-10a2.8 2.8 0 1 0-4-4L4 16z" />
  </svg>
)

export const IconCheck = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const IconAlerta = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M12 4.5 2.8 20h18.4z" />
    <path d="M12 10v4.5M12 17.5v.01" />
  </svg>
)

export const IconDown = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const IconGota = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3z" />
  </svg>
)

export const IconPincel = ({ size = 20, className }: Props) => (
  <svg {...base(size, className)}>
    <path d="M14.5 3.5 20.5 9.5 12 18H6v-6z" />
    <path d="M5 19c-1 1-1 3-1 3s2 0 3-1" />
  </svg>
)
