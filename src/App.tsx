import { NavLink, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Dashboard from './pages/Dashboard'
import {
  IconEngrenagem,
  IconLivro,
  IconMini,
  IconPainel,
  IconRoda,
  IconTinta,
} from './components/icons'
import type { ReactNode } from 'react'
import { AvisoArmazenamento } from './components/AvisoArmazenamento'

// O painel é a rota inicial e entra no bundle principal. As demais são
// carregadas ao tocar na aba — no iPad isso é imperceptível e corta pela
// metade o que precisa baixar na primeira abertura.
const Tintas = lazy(() => import('./pages/Tintas'))
const Laboratorio = lazy(() => import('./pages/Laboratorio'))
const Minis = lazy(() => import('./pages/Minis'))
const MiniDetalhe = lazy(() => import('./pages/MiniDetalhe'))
const Referencia = lazy(() => import('./pages/Referencia'))
const Configuracoes = lazy(() => import('./pages/Configuracoes'))

const NAV: { para: string; label: string; curto: string; icone: ReactNode }[] = [
  { para: '/', label: 'Painel', curto: 'Painel', icone: <IconPainel /> },
  { para: '/tintas', label: 'Estoque de tintas', curto: 'Tintas', icone: <IconTinta /> },
  { para: '/laboratorio', label: 'Laboratório de cores', curto: 'Cores', icone: <IconRoda /> },
  { para: '/minis', label: 'Miniaturas', curto: 'Minis', icone: <IconMini /> },
  { para: '/referencia', label: 'Referência', curto: 'Referência', icone: <IconLivro /> },
  { para: '/config', label: 'Configurações', curto: 'Ajustes', icone: <IconEngrenagem /> },
]

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      {/* Barra lateral — iPad em paisagem e telas maiores */}
      <aside className="safe-top hidden w-60 shrink-0 flex-col border-r border-borda bg-superficie/60 px-3 py-5 lg:flex">
        <div className="mb-6 px-3">
          <div className="text-lg font-bold tracking-tight">Ateliê</div>
          <div className="text-xs text-suave">Tintas &amp; Miniaturas</div>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.para}
              to={n.para}
              end={n.para === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-ouro/15 text-ouro'
                    : 'text-suave hover:bg-superficie2 hover:text-texto'
                }`
              }
            >
              {n.icone}
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-3 pt-6 text-[11px] leading-relaxed text-suave/70">
          Tudo fica salvo neste dispositivo. Faça backup em Configurações.
        </div>
      </aside>

      <main className="min-w-0 flex-1 pb-24 lg:pb-0">
        <AvisoArmazenamento />
        <Suspense
          fallback={<div className="p-10 text-center text-sm text-suave">Carregando…</div>}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tintas" element={<Tintas />} />
            <Route path="/laboratorio" element={<Laboratorio />} />
            <Route path="/minis" element={<Minis />} />
            <Route path="/minis/:id" element={<MiniDetalhe />} />
            <Route path="/referencia" element={<Referencia />} />
            <Route path="/config" element={<Configuracoes />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>

      {/* Barra inferior — iPad em retrato e celular */}
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-borda bg-superficie/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-3xl">
          {NAV.map((n) => (
            <NavLink
              key={n.para}
              to={n.para}
              end={n.para === '/'}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition ${
                  isActive ? 'text-ouro' : 'text-suave'
                }`
              }
            >
              {n.icone}
              {n.curto}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

/** Cabeçalho padrão das páginas. */
export function Cabecalho({
  titulo,
  subtitulo,
  acoes,
}: {
  titulo: string
  subtitulo?: string
  acoes?: ReactNode
}) {
  return (
    <header className="safe-top sticky top-0 z-30 border-b border-borda bg-fundo/92 px-4 py-3.5 backdrop-blur lg:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight lg:text-2xl">{titulo}</h1>
          {subtitulo && <p className="truncate text-xs text-suave">{subtitulo}</p>}
        </div>
        {acoes && <div className="flex shrink-0 items-center gap-2">{acoes}</div>}
      </div>
    </header>
  )
}

export function Conteudo({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6 lg:py-6">{children}</div>
}
