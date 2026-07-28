import { useCallback, useEffect, useRef } from 'react'
import { hslToRgb, hexToHsl, type HSL } from '../lib/color'

/**
 * Roda cromática HSL: ângulo = matiz, raio = saturação.
 *
 * Desenhada em canvas porque são ~90k pixels calculados — em SVG isso viraria
 * um gradiente cônico aproximado, e a leitura da cor no toque ficaria errada.
 */
export function RodaCromatica({
  hex,
  luminosidade,
  aoEscolher,
  tamanho = 300,
  marcadores = [],
}: {
  hex: string
  luminosidade: number
  aoEscolher: (hsl: HSL) => void
  tamanho?: number
  /** Outras cores para mostrar na roda (harmonias). */
  marcadores?: string[]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const atual = hexToHsl(hex)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const px = Math.round(tamanho * dpr)
    canvas.width = px
    canvas.height = px
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = ctx.createImageData(px, px)
    const raio = px / 2
    for (let y = 0; y < px; y++) {
      for (let x = 0; x < px; x++) {
        const dx = x - raio
        const dy = y - raio
        const dist = Math.sqrt(dx * dx + dy * dy)
        const i = (y * px + x) * 4
        if (dist > raio) {
          img.data[i + 3] = 0
          continue
        }
        let ang = (Math.atan2(dy, dx) * 180) / Math.PI + 90
        if (ang < 0) ang += 360
        const s = Math.min(100, (dist / raio) * 100)
        const { r, g, b } = hslToRgb({ h: ang, s, l: luminosidade })
        img.data[i] = r
        img.data[i + 1] = g
        img.data[i + 2] = b
        // Antisserrilhado só na borda externa.
        img.data[i + 3] = dist > raio - dpr ? Math.round(255 * (raio - dist)) : 255
      }
    }
    ctx.putImageData(img, 0, 0)
  }, [luminosidade, tamanho])

  const pegarCor = useCallback(
    (clientX: number, clientY: number) => {
      const box = boxRef.current
      if (!box) return
      const r = box.getBoundingClientRect()
      const raio = r.width / 2
      const dx = clientX - r.left - raio
      const dy = clientY - r.top - raio
      const dist = Math.sqrt(dx * dx + dy * dy)
      let ang = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      if (ang < 0) ang += 360
      aoEscolher({ h: ang, s: Math.min(100, (dist / raio) * 100), l: luminosidade })
    },
    [aoEscolher, luminosidade],
  )

  const pos = (h: number, s: number) => {
    const rad = ((h - 90) * Math.PI) / 180
    const r = (s / 100) * 50
    return { left: `${50 + Math.cos(rad) * r}%`, top: `${50 + Math.sin(rad) * r}%` }
  }

  return (
    <div
      ref={boxRef}
      className="relative touch-none select-none"
      style={{ width: tamanho, height: tamanho, maxWidth: '100%' }}
      onPointerDown={(e) => {
        ;(e.target as Element).setPointerCapture?.(e.pointerId)
        pegarCor(e.clientX, e.clientY)
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0 || e.pointerType === 'touch') pegarCor(e.clientX, e.clientY)
      }}
      role="application"
      aria-label="Roda cromática"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded-full"
        style={{ width: '100%', height: '100%' }}
      />
      {marcadores.map((m, i) => {
        const h = hexToHsl(m)
        return (
          <span
            key={`${m}-${i}`}
            className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 shadow"
            style={{ ...pos(h.h, h.s), background: m }}
          />
        )
      })}
      <span
        className="pointer-events-none absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-lg"
        style={{ ...pos(atual.h, atual.s), background: hex }}
      />
    </div>
  )
}
