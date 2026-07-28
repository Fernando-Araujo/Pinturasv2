/**
 * Matemática de cor do Laboratório.
 *
 * Tudo aqui é puro (sem estado, sem DOM) para poder ser usado tanto no
 * laboratório quanto no casamento de tintas entre marcas.
 *
 * Duas famílias de espaço de cor são usadas de propósito:
 *  - CIELAB / CIEDE2000 -> para medir *distância* entre duas tintas reais.
 *    É o padrão da indústria e é o que responde "essa Citadel é a mesma cor
 *    daquela Vallejo?".
 *  - OkLCh -> para *gerar* cores novas (luzes, sombras, harmonias). Clarear em
 *    OkLCh mantém a cor reconhecível; clarear em HSL lava a cor e vira pastel.
 */

export type RGB = { r: number; g: number; b: number } // 0-255
export type HSL = { h: number; s: number; l: number } // h 0-360, s/l 0-100
export type Lab = { L: number; a: number; b: number }
export type LCh = { L: number; C: number; h: number }

/* ------------------------------------------------------------------ */
/* Hex / RGB                                                           */
/* ------------------------------------------------------------------ */

export function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '').trim()
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h.padEnd(6, '0').slice(0, 6)
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function rgbToHex({ r, g, b }: RGB): string {
  const c = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

export function isValidHex(hex: string): boolean {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex.trim())
}

/* ------------------------------------------------------------------ */
/* HSL                                                                 */
/* ------------------------------------------------------------------ */

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return { h: 0, s: 0, l: l * 100 }
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
  else if (max === gn) h = ((bn - rn) / d + 2) / 6
  else h = ((rn - gn) / d + 4) / 6
  return { h: h * 360, s: s * 100, l: l * 100 }
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hn = ((h % 360) + 360) % 360 / 360
  const sn = s / 100
  const ln = l / 100
  if (sn === 0) {
    const v = Math.round(ln * 255)
    return { r: v, g: v, b: v }
  }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn
  const p = 2 * ln - q
  const hue = (t: number) => {
    let tt = t
    if (tt < 0) tt += 1
    if (tt > 1) tt -= 1
    if (tt < 1 / 6) return p + (q - p) * 6 * tt
    if (tt < 1 / 2) return q
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
    return p
  }
  return {
    r: Math.round(hue(hn + 1 / 3) * 255),
    g: Math.round(hue(hn) * 255),
    b: Math.round(hue(hn - 1 / 3) * 255),
  }
}

export const hexToHsl = (hex: string) => rgbToHsl(hexToRgb(hex))
export const hslToHex = (hsl: HSL) => rgbToHex(hslToRgb(hsl))

/* ------------------------------------------------------------------ */
/* sRGB <-> CIELAB (D65)                                               */
/* ------------------------------------------------------------------ */

const srgbToLinear = (v: number) => {
  const c = v / 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
const linearToSrgb = (v: number) => {
  const c = v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
  return Math.max(0, Math.min(255, Math.round(c * 255)))
}

export function rgbToLab({ r, g, b }: RGB): Lab {
  const R = srgbToLinear(r),
    G = srgbToLinear(g),
    B = srgbToLinear(b)
  // matriz sRGB -> XYZ (D65)
  const x = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047
  const y = R * 0.2126729 + G * 0.7151522 + B * 0.072175
  const z = (R * 0.0193339 + G * 0.119192 + B * 0.9503041) / 1.08883
  const f = (t: number) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29)
  const fx = f(x),
    fy = f(y),
    fz = f(z)
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) }
}

export function labToRgb({ L, a, b }: Lab): RGB {
  const fy = (L + 16) / 116
  const fx = fy + a / 500
  const fz = fy - b / 200
  const fi = (t: number) => (t > 6 / 29 ? t * t * t : (108 / 841) * (t - 4 / 29))
  const x = fi(fx) * 0.95047,
    y = fi(fy),
    z = fi(fz) * 1.08883
  const R = x * 3.2404542 + y * -1.5371385 + z * -0.4985314
  const G = x * -0.969266 + y * 1.8760108 + z * 0.041556
  const B = x * 0.0556434 + y * -0.2040259 + z * 1.0572252
  return { r: linearToSrgb(R), g: linearToSrgb(G), b: linearToSrgb(B) }
}

export const hexToLab = (hex: string) => rgbToLab(hexToRgb(hex))

export function labToLch({ L, a, b }: Lab): LCh {
  const C = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0) h += 360
  return { L, C, h }
}

/* ------------------------------------------------------------------ */
/* OkLab / OkLCh — para gerar rampas de luz e sombra                   */
/* ------------------------------------------------------------------ */

export function rgbToOklab({ r, g, b }: RGB): Lab {
  const R = srgbToLinear(r),
    G = srgbToLinear(g),
    B = srgbToLinear(b)
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  }
}

export function oklabToRgb({ L, a, b }: Lab): RGB {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return {
    r: linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  }
}

export function rgbToOklch(rgb: RGB): LCh {
  const { L, a, b } = rgbToOklab(rgb)
  const C = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0) h += 360
  return { L, C, h }
}

export function oklchToRgb({ L, C, h }: LCh): RGB {
  const rad = (h * Math.PI) / 180
  return oklabToRgb({ L: L, a: Math.cos(rad) * C, b: Math.sin(rad) * C })
}

export const hexToOklch = (hex: string) => rgbToOklch(hexToRgb(hex))
export const oklchToHex = (lch: LCh) => rgbToHex(oklchToRgb(lch))

/* ------------------------------------------------------------------ */
/* Distância perceptual — CIEDE2000                                    */
/* ------------------------------------------------------------------ */

/**
 * ΔE2000 entre duas cores. Referência prática para tintas de miniatura:
 *   < 1  imperceptível     |  1-2  só lado a lado
 *   2-4  substituto seguro |  4-8  parecida, muda o tom
 *   > 8  outra cor
 */
export function deltaE2000(c1: Lab, c2: Lab): number {
  const { L: L1, a: a1, b: b1 } = c1
  const { L: L2, a: a2, b: b2 } = c2
  const kL = 1,
    kC = 1,
    kH = 1
  const C1 = Math.sqrt(a1 * a1 + b1 * b1)
  const C2 = Math.sqrt(a2 * a2 + b2 * b2)
  const Cbar = (C1 + C2) / 2
  const C7 = Math.pow(Cbar, 7)
  const G = 0.5 * (1 - Math.sqrt(C7 / (C7 + Math.pow(25, 7))))
  const a1p = (1 + G) * a1
  const a2p = (1 + G) * a2
  const C1p = Math.sqrt(a1p * a1p + b1 * b1)
  const C2p = Math.sqrt(a2p * a2p + b2 * b2)
  const deg = (rad: number) => {
    let d = (rad * 180) / Math.PI
    if (d < 0) d += 360
    return d
  }
  const h1p = C1p === 0 ? 0 : deg(Math.atan2(b1, a1p))
  const h2p = C2p === 0 ? 0 : deg(Math.atan2(b2, a2p))

  const dLp = L2 - L1
  const dCp = C2p - C1p
  let dhp = 0
  if (C1p * C2p !== 0) {
    const diff = h2p - h1p
    if (Math.abs(diff) <= 180) dhp = diff
    else if (diff > 180) dhp = diff - 360
    else dhp = diff + 360
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI) / 360)

  const Lbarp = (L1 + L2) / 2
  const Cbarp = (C1p + C2p) / 2
  let hbarp = h1p + h2p
  if (C1p * C2p !== 0) {
    if (Math.abs(h1p - h2p) > 180) hbarp = h1p + h2p < 360 ? hbarp + 360 : hbarp - 360
    hbarp /= 2
  } else {
    hbarp = h1p + h2p
  }

  const rad = (d: number) => (d * Math.PI) / 180
  const T =
    1 -
    0.17 * Math.cos(rad(hbarp - 30)) +
    0.24 * Math.cos(rad(2 * hbarp)) +
    0.32 * Math.cos(rad(3 * hbarp + 6)) -
    0.2 * Math.cos(rad(4 * hbarp - 63))

  const dTheta = 30 * Math.exp(-Math.pow((hbarp - 275) / 25, 2))
  const Cbarp7 = Math.pow(Cbarp, 7)
  const Rc = 2 * Math.sqrt(Cbarp7 / (Cbarp7 + Math.pow(25, 7)))
  const Lbarp50 = Math.pow(Lbarp - 50, 2)
  const Sl = 1 + (0.015 * Lbarp50) / Math.sqrt(20 + Lbarp50)
  const Sc = 1 + 0.045 * Cbarp
  const Sh = 1 + 0.015 * Cbarp * T
  const Rt = -Math.sin(rad(2 * dTheta)) * Rc

  return Math.sqrt(
    Math.pow(dLp / (kL * Sl), 2) +
      Math.pow(dCp / (kC * Sc), 2) +
      Math.pow(dHp / (kH * Sh), 2) +
      Rt * (dCp / (kC * Sc)) * (dHp / (kH * Sh)),
  )
}

export function deltaEHex(hexA: string, hexB: string): number {
  return deltaE2000(hexToLab(hexA), hexToLab(hexB))
}

export type MatchQuality = 'identica' | 'excelente' | 'boa' | 'aproximada' | 'distante'

export function matchQuality(dE: number): MatchQuality {
  if (dE < 1.5) return 'identica'
  if (dE < 3) return 'excelente'
  if (dE < 6) return 'boa'
  if (dE < 11) return 'aproximada'
  return 'distante'
}

export const MATCH_LABEL: Record<MatchQuality, string> = {
  identica: 'Idêntica',
  excelente: 'Excelente',
  boa: 'Boa',
  aproximada: 'Aproximada',
  distante: 'Distante',
}

/* ------------------------------------------------------------------ */
/* Legibilidade                                                        */
/* ------------------------------------------------------------------ */

export function relativeLuminance({ r, g, b }: RGB): number {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
}

/** Preto ou branco — o que ficar legível por cima da cor dada. */
export function readableOn(hex: string): string {
  return relativeLuminance(hexToRgb(hex)) > 0.35 ? '#0b0d12' : '#f5f7fa'
}

/* ------------------------------------------------------------------ */
/* Harmonias                                                           */
/* ------------------------------------------------------------------ */

export type Harmony = {
  id: string
  nome: string
  descricao: string
  /** Uso prático na bancada. */
  aplicacao: string
  cores: string[]
}

/** Roda ajustada: gira o matiz em OkLCh, preservando L e C. */
function rotate(hex: string, deg: number): string {
  const { L, C, h } = hexToOklch(hex)
  return oklchToHex({ L, C, h: (((h + deg) % 360) + 360) % 360 })
}

export function harmonias(hex: string): Harmony[] {
  return [
    {
      id: 'complementar',
      nome: 'Complementar',
      descricao: 'A cor oposta na roda — contraste máximo.',
      aplicacao:
        'Use na menor área da miniatura (lentes, gemas, cabo de arma, penacho) para criar o ponto de foco. Nunca 50/50: mantenha ~90% da cor base e ~10% da complementar.',
      cores: [hex, rotate(hex, 180)],
    },
    {
      id: 'analogas',
      nome: 'Análogas',
      descricao: 'Vizinhas na roda (±30°) — transição suave.',
      aplicacao:
        'Ideal para variar os panos e couros do mesmo exército sem quebrar a identidade. Também serve para pintar sombras "coloridas" em vez de só escurecer.',
      cores: [rotate(hex, -30), hex, rotate(hex, 30)],
    },
    {
      id: 'split',
      nome: 'Complementar dividida',
      descricao: 'A oposta, aberta em duas (±150°).',
      aplicacao:
        'Mais fácil de acertar que a complementar pura. Dá contraste sem virar bandeira de time. Boa para esquema de facção com 3 cores.',
      cores: [hex, rotate(hex, 150), rotate(hex, 210)],
    },
    {
      id: 'triade',
      nome: 'Tríade',
      descricao: 'Três cores igualmente espaçadas (120°).',
      aplicacao:
        'Esquema clássico de exército: uma domina a armadura, a segunda o pano, a terceira só nos detalhes.',
      cores: [hex, rotate(hex, 120), rotate(hex, 240)],
    },
    {
      id: 'tetrade',
      nome: 'Tétrade',
      descricao: 'Dois pares complementares (retângulo).',
      aplicacao:
        'Para peças grandes (veículos, monstros, dioramas) onde há área suficiente para 4 cores sem poluir.',
      cores: [hex, rotate(hex, 60), rotate(hex, 180), rotate(hex, 240)],
    },
    {
      id: 'monocromatica',
      nome: 'Monocromática',
      descricao: 'Mesmo matiz, variando luz e saturação.',
      aplicacao:
        'Estilo "grimdark" e NMM. Força você a resolver a miniatura por valor (claro/escuro) em vez de por cor.',
      cores: rampaMono(hex),
    },
  ]
}

function rampaMono(hex: string): string[] {
  const { L, C, h } = hexToOklch(hex)
  return [0.35, 0.5, 0.65, 0.8].map((t) =>
    oklchToHex({ L: t, C: C * (1 - Math.abs(t - L) * 0.35), h }),
  )
}

/* ------------------------------------------------------------------ */
/* Rampas de luz e sombra                                              */
/* ------------------------------------------------------------------ */

export type Degrau = {
  hex: string
  rotulo: string
  /** Como chegar nesse degrau misturando tinta de verdade. */
  receita: string
}

/**
 * Sombras de pintor, não de Photoshop.
 *
 * Escurecer só baixando o brilho dá cinza morto. O que funciona na bancada:
 *  - a sombra desloca o matiz na direção fria/complementar e perde saturação;
 *  - a luz desloca o matiz na direção quente (amarelo) e perde saturação
 *    no topo, porque a luz forte "lava" o pigmento.
 */
export function rampaSombra(hex: string, passos = 3): Degrau[] {
  const base = hexToOklch(hex)
  const frio = 264 // azul — para onde a sombra puxa
  const rotulos = ['Sombra 1', 'Sombra 2', 'Sombra profunda', 'Recesso']
  const receitas = [
    'Base + 1 parte de um tom mais escuro da mesma família.',
    'Base + tom escuro + toque de azul/roxo escuro (não use preto puro).',
    'Mistura anterior + mais azul escuro. Só nos recessos fundos.',
    'Praticamente a cor de linha — só onde a peça encosta em si mesma.',
  ]
  return Array.from({ length: passos }, (_, i) => {
    const t = (i + 1) / (passos + 0.6)
    const L = base.L * (1 - 0.62 * t)
    const C = base.C * (1 - 0.28 * t)
    const h = misturarMatiz(base.h, frio, 0.16 * t)
    return {
      hex: oklchToHex({ L, C, h }),
      rotulo: rotulos[i] ?? `Sombra ${i + 1}`,
      receita: receitas[i] ?? receitas[receitas.length - 1],
    }
  })
}

export function rampaLuz(hex: string, passos = 3): Degrau[] {
  const base = hexToOklch(hex)
  const quente = 90 // amarelo — para onde a luz puxa
  const rotulos = ['Luz 1', 'Luz 2', 'Luz extrema', 'Brilho']
  const receitas = [
    'Base + 1 parte de um tom mais claro da mesma família.',
    'Mistura anterior + toque de osso/areia. Camadas mais finas que a anterior.',
    'Mistura anterior + branco osso. Só nas quinas mais altas, quase seco.',
    'Ponto de branco puro. Um toque, no ponto mais alto — e olhe a peça de longe antes.',
  ]
  return Array.from({ length: passos }, (_, i) => {
    const t = (i + 1) / (passos + 0.4)
    const L = base.L + (1 - base.L) * 0.72 * t
    const C = base.C * (1 - 0.42 * t)
    const h = misturarMatiz(base.h, quente, 0.14 * t)
    return {
      hex: oklchToHex({ L, C, h }),
      rotulo: rotulos[i] ?? `Luz ${i + 1}`,
      receita: receitas[i] ?? receitas[receitas.length - 1],
    }
  })
}

/** Interpola matiz pelo caminho curto da roda. */
function misturarMatiz(a: number, b: number, t: number): number {
  let d = ((b - a + 540) % 360) - 180
  return (((a + d * t) % 360) + 360) % 360
}

/** Cor de lavagem (wash) sugerida: complementar dessaturada e escura. */
export function washSugerido(hex: string): string {
  const { C, h } = hexToOklch(hex)
  return oklchToHex({ L: 0.28, C: Math.min(C * 0.6, 0.09), h: misturarMatiz(h, 264, 0.25) })
}

/** Cor de glaze de unificação: o tom base, muito translúcido e saturado. */
export function glazeSugerido(hex: string): string {
  const { L, C, h } = hexToOklch(hex)
  return oklchToHex({ L: Math.min(L + 0.05, 0.75), C: Math.min(C * 1.35, 0.2), h })
}

/* ------------------------------------------------------------------ */
/* Undercoat / primer                                                  */
/* ------------------------------------------------------------------ */

export type Undercoat = {
  id: string
  nome: string
  hex: string
  /** Peso 0-100 de quanto essa base combina com a cor alvo. */
  nota: number
  porque: string
}

/**
 * Escolha de base (primer) a partir da cor final desejada.
 *
 * A regra que vale na bancada: a base define quantas camadas você vai gastar.
 * Cor clara e saturada em cima de preto = 6 camadas e a cor fica suja.
 * Cor escura em cima de branco = a peça fica "leitosa" e sem profundidade.
 */
export function undercoatsPara(hex: string): Undercoat[] {
  const { L, C, h } = hexToOklch(hex)
  const claro = L // 0..1
  const sat = C // ~0..0.37

  const quenteAmarelo = h > 40 && h < 130
  const vermelho = h <= 40 || h >= 350
  const frio = h >= 200 && h <= 320

  const cand: Undercoat[] = [
    {
      id: 'preto',
      nome: 'Primer preto',
      hex: '#151515',
      nota: 100 * clamp(0.9 - claro * 1.15 + (frio ? 0.12 : 0)),
      porque:
        'Sombreia sozinho e perdoa cobertura irregular. Melhor para tons escuros, metálicos e esquemas grimdark. Custa saturação em cores claras.',
    },
    {
      id: 'branco',
      nome: 'Primer branco',
      hex: '#f2f2ef',
      nota: 100 * clamp(claro * 1.25 + sat * 1.1 - 0.25),
      porque:
        'Máximo brilho e saturação. Obrigatório para amarelo, laranja, vermelho vivo e branco. Exige pintura limpa: qualquer falha aparece.',
    },
    {
      id: 'cinza',
      nome: 'Primer cinza médio',
      hex: '#8a8d90',
      nota: 100 * clamp(1 - Math.abs(claro - 0.55) * 2.1),
      porque:
        'O meio-termo seguro. Mantém o valor neutro, não lava nem suja a cor. Boa escolha padrão quando você ainda não decidiu o esquema.',
    },
    {
      id: 'zenital',
      nome: 'Zenital (preto + branco por cima)',
      hex: '#5b6068',
      nota: 100 * clamp(0.45 + sat * 0.8 + (claro > 0.35 && claro < 0.8 ? 0.2 : 0)),
      porque:
        'Preto, depois branco só de cima. Já entrega o mapa de luz e sombra antes da primeira cor. Ideal com tintas translúcidas (Contrast/Speedpaint).',
    },
    {
      id: 'marrom',
      nome: 'Primer marrom / couro',
      hex: '#6b4a34',
      nota: 100 * clamp((vermelho || quenteAmarelo ? 0.55 : 0.1) + (claro < 0.6 ? 0.2 : 0)),
      porque:
        'Base quente para vermelhos, couros, madeira, pele e ferrugem. Aquece a cor final e economiza camadas em tons terrosos.',
    },
    {
      id: 'cormatch',
      nome: `Primer colorido no tom (${oklchToHex({ L: Math.max(L - 0.1, 0.16), C: Math.min(sat, 0.12), h })})`,
      hex: oklchToHex({ L: Math.max(L - 0.1, 0.16), C: Math.min(sat, 0.12), h }),
      nota: 100 * clamp(0.35 + sat * 1.4),
      porque:
        'Base já no matiz final (spray colorido ou aerógrafo). É o caminho mais rápido para exército grande: a cor pega em uma camada.',
    },
  ]

  return cand.sort((a, b) => b.nota - a.nota).map((c) => ({ ...c, nota: Math.round(c.nota) }))
}

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v))
}

/* ------------------------------------------------------------------ */
/* Nome aproximado da família de cor (para filtros e agrupamento)       */
/* ------------------------------------------------------------------ */

export type Familia =
  | 'vermelho'
  | 'laranja'
  | 'amarelo'
  | 'verde'
  | 'ciano'
  | 'azul'
  | 'roxo'
  | 'rosa'
  | 'marrom'
  | 'neutro'

export const FAMILIAS: { id: Familia; nome: string; hex: string }[] = [
  { id: 'vermelho', nome: 'Vermelho', hex: '#c0392b' },
  { id: 'laranja', nome: 'Laranja', hex: '#d97b2b' },
  { id: 'amarelo', nome: 'Amarelo', hex: '#e3c02c' },
  { id: 'verde', nome: 'Verde', hex: '#3f8f4f' },
  { id: 'ciano', nome: 'Ciano', hex: '#2e9e9e' },
  { id: 'azul', nome: 'Azul', hex: '#3565a8' },
  { id: 'roxo', nome: 'Roxo', hex: '#77519e' },
  { id: 'rosa', nome: 'Rosa', hex: '#c25a86' },
  { id: 'marrom', nome: 'Marrom', hex: '#7a5233' },
  { id: 'neutro', nome: 'Neutro / metálico', hex: '#8b8f94' },
]

export function familiaDe(hex: string): Familia {
  const { L, C, h } = hexToOklch(hex)
  if (C < 0.035) return 'neutro'
  // marrom = laranja escuro e pouco saturado
  if (h >= 25 && h < 95 && L < 0.62 && C < 0.13) return 'marrom'
  if (h < 25 || h >= 350) return 'vermelho'
  if (h < 65) return 'laranja'
  if (h < 110) return 'amarelo'
  if (h < 175) return 'verde'
  if (h < 205) return 'ciano'
  if (h < 285) return 'azul'
  if (h < 330) return 'roxo'
  return 'rosa'
}
