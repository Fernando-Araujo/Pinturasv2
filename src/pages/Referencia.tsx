import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { Cabecalho, Conteudo } from '../App'
import {
  FACCOES,
  RECEITAS_BASE,
  SISTEMA_LABEL,
  UNIDADES_POR_FACCAO,
  type Faccao,
  type Sistema,
} from '../data/warhammer'
import { db, type Tinta } from '../db/db'
import { Amostra, Aviso, Folha, Segmentado, Selo, Vazio } from '../components/ui'
import { IconRoda } from '../components/icons'
import { doMeuEstoque } from '../lib/matching'

export default function Referencia() {
  const [aba, setAba] = useState<'faccoes' | 'bases'>('faccoes')
  const [sistema, setSistema] = useState<Sistema | 'todos'>('todos')
  const [busca, setBusca] = useState('')
  const [aberta, setAberta] = useState<Faccao | null>(null)

  const faccoes = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return FACCOES.filter((f) => {
      if (sistema !== 'todos' && f.sistema !== sistema) return false
      if (!q) return true
      const unidades = (UNIDADES_POR_FACCAO[f.id] ?? []).map((u) => u.nome).join(' ')
      return `${f.nome} ${f.grupo} ${f.resumo} ${unidades}`.toLowerCase().includes(q)
    })
  }, [sistema, busca])

  const porGrupo = useMemo(() => {
    const m = new Map<string, Faccao[]>()
    for (const f of faccoes) {
      const chave = `${SISTEMA_LABEL[f.sistema]} · ${f.grupo}`
      const lista = m.get(chave) ?? []
      lista.push(f)
      m.set(chave, lista)
    }
    return [...m.entries()]
  }, [faccoes])

  return (
    <>
      <Cabecalho
        titulo="Referência"
        subtitulo="Facções, unidades, esquemas de cor e receitas de base"
      />

      <Conteudo>
        <div className="mb-4 space-y-3">
          <Segmentado
            valor={aba}
            aoMudar={setAba}
            opcoes={[
              { id: 'faccoes' as const, label: 'Facções e unidades' },
              { id: 'bases' as const, label: 'Receitas de base' },
            ]}
          />

          {aba === 'faccoes' && (
            <>
              <input
                className="campo"
                type="search"
                placeholder="Buscar facção ou unidade…"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <div className="trilha">
                {(
                  [
                    ['todos', 'Tudo'],
                    ['40k', SISTEMA_LABEL['40k']],
                    ['aos', SISTEMA_LABEL.aos],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    className={`chip ${sistema === id ? 'chip-ativo' : ''}`}
                    onClick={() => setSistema(id as Sistema | 'todos')}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {aba === 'faccoes' ? (
          faccoes.length === 0 ? (
            <Vazio titulo="Nada encontrado" descricao="Tente outro termo de busca." />
          ) : (
            <div className="space-y-6">
              {porGrupo.map(([grupo, lista]) => (
                <section key={grupo}>
                  <h2 className="titulo-secao mb-2.5">{grupo}</h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {lista.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setAberta(f)}
                        className="card entrar overflow-hidden text-left transition active:scale-[0.98]"
                      >
                        <div className="h-1.5" style={{ background: f.cor }} />
                        <div className="p-3.5">
                          <div className="flex items-baseline justify-between gap-2">
                            <h3 className="truncate font-bold">{f.nome}</h3>
                            <span className="shrink-0 text-[11px] text-suave">
                              {(UNIDADES_POR_FACCAO[f.id] ?? []).length} unid.
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-suave">
                            {f.resumo}
                          </p>
                          <div className="mt-2.5 flex gap-1">
                            {f.esquema.slice(0, 6).map((e, i) => (
                              <span
                                key={i}
                                className="h-5 flex-1 rounded"
                                style={{ background: e.hex }}
                                title={`${e.parte}: ${e.cor}`}
                              />
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            {RECEITAS_BASE.map((r) => (
              <div key={r.id} className="card p-4">
                <h3 className="font-bold">{r.nome}</h3>
                <p className="mb-3 text-xs text-suave">{r.ambiente}</p>
                <ol className="space-y-1.5">
                  {r.passos.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-superficie3 text-[11px] font-bold text-suave">
                        {i + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-borda pt-3">
                  {r.combina.map((id) => {
                    const f = FACCOES.find((x) => x.id === id)
                    return f ? (
                      <Selo key={id} cor={f.cor} suave>
                        {f.nome}
                      </Selo>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Conteudo>

      <FolhaFaccao faccao={aberta} aoFechar={() => setAberta(null)} />
    </>
  )
}

/* ------------------------------------------------------------------ */

function FolhaFaccao({ faccao, aoFechar }: { faccao: Faccao | null; aoFechar: () => void }) {
  const tintas = useLiveQuery(() => db.tintas.toArray(), [], [] as Tinta[])
  if (!faccao) return null
  const unidades = UNIDADES_POR_FACCAO[faccao.id] ?? []

  return (
    <Folha aberta aoFechar={aoFechar} titulo={faccao.nome} largura="max-w-3xl">
      <div className="space-y-5">
        <p className="text-sm leading-relaxed">{faccao.resumo}</p>

        <section>
          <h3 className="titulo-secao mb-2.5">Esquema clássico</h3>
          <div className="space-y-2">
            {faccao.esquema.map((e, i) => {
              const perto = doMeuEstoque(e.hex, tintas, 1)[0]
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-borda bg-superficie2 px-3 py-2.5"
                >
                  <Amostra hex={e.hex} tamanho={38} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{e.parte}</div>
                    <div className="truncate text-[11px] text-suave">{e.tinta}</div>
                    {perto && perto.deltaE < 12 && (
                      <div className="truncate text-[11px] text-turquesa">
                        Você tem: {perto.tinta.nome} (ΔE {perto.deltaE.toFixed(1)})
                      </div>
                    )}
                  </div>
                  <Link
                    className="btn btn-fantasma shrink-0 px-2"
                    to={`/laboratorio?cor=${encodeURIComponent(e.hex)}`}
                    onClick={aoFechar}
                    aria-label="Abrir no laboratório"
                  >
                    <IconRoda size={18} />
                  </Link>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <h3 className="titulo-secao mb-2">Base recomendada</h3>
          <p className="rounded-xl border border-borda bg-superficie2 p-3 text-sm leading-relaxed">
            {faccao.base}
          </p>
        </section>

        {unidades.length > 0 && (
          <section>
            <h3 className="titulo-secao mb-2.5">Unidades ({unidades.length})</h3>
            <div className="space-y-3">
              {unidades.map((u) => (
                <details key={u.id} className="card p-3.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{u.nome}</div>
                      <div className="truncate text-[11px] text-suave">
                        {u.papel} · {u.modelos} · base {u.baseTamanho}
                      </div>
                    </div>
                    <Selo cor="var(--color-ouro)" suave>
                      {u.pontos} pts
                    </Selo>
                  </summary>

                  <div className="mt-3 space-y-3 border-t border-borda pt-3">
                    <div>
                      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-suave">
                        Em mesa ({u.pontos} pts para {u.pontosPara})
                      </div>
                      <ul className="space-y-1">
                        {u.habilidades.map((h, i) => (
                          <li key={i} className="flex gap-2 text-sm leading-relaxed">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ouro" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-suave">
                        Cores mais usadas
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {u.cores.map((c, i) => (
                          <span key={i} className="chip cursor-default">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-suave">
                        Dicas de pintura
                      </div>
                      <ul className="space-y-1">
                        {u.dicasPintura.map((d, i) => (
                          <li key={i} className="flex gap-2 text-sm leading-relaxed text-suave">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-turquesa" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-borda bg-superficie2 p-3">
                      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-suave">
                        Terreno da base
                      </div>
                      <p className="text-sm leading-relaxed">{u.baseTerreno}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        <Aviso>
          Pontos e regras mudam a cada dataslate de balanceamento. Os valores aqui são referência
          de partida (40k 10ª edição / AoS 4ª edição) para dar noção de custo relativo — confira o
          app oficial antes de montar lista para jogar.
        </Aviso>
      </div>
    </Folha>
  )
}
