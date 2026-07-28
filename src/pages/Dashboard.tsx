import { lazy, Suspense, useMemo } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { Cabecalho, Conteudo } from '../App'
import { db, NIVEL_INFO, type Miniatura, type Sessao, type Tinta } from '../db/db'
import { calcularIndicadores, formatarData, formatarMinutos } from '../lib/stats'
import { FACCOES_POR_ID, progressoDoStatus, STATUS_INFO } from '../data/warhammer'
import { Amostra, Barra, Metrica, Selo, Vazio } from '../components/ui'
import {
  IconAlerta,
  IconMini,
  IconPincel,
  IconRelogio,
  IconTinta,
} from '../components/icons'

const GraficoRitmo = lazy(() =>
  import('../components/Graficos').then((m) => ({ default: m.GraficoRitmo })),
)
const GraficoStatus = lazy(() =>
  import('../components/Graficos').then((m) => ({ default: m.GraficoStatus })),
)

function CarregandoGrafico({ altura }: { altura: number }) {
  return (
    <div
      className="w-full animate-pulse rounded-xl bg-superficie2"
      style={{ height: altura }}
      aria-hidden
    />
  )
}

export default function Dashboard() {
  const minis = useLiveQuery(() => db.minis.toArray(), [], [] as Miniatura[])
  const sessoes = useLiveQuery(() => db.sessoes.toArray(), [], [] as Sessao[])
  const tintas = useLiveQuery(() => db.tintas.toArray(), [], [] as Tinta[])

  const ind = useMemo(
    () => calcularIndicadores(minis, sessoes, tintas),
    [minis, sessoes, tintas],
  )

  const vazio = minis.length === 0 && tintas.length === 0

  return (
    <>
      <Cabecalho
        titulo="Painel"
        subtitulo={
          ind.totais.pecas > 0
            ? `${ind.percentualPintado}% da coleção pintada · ${ind.totais.horasTotais}h de bancada`
            : 'Comece cadastrando suas tintas e miniaturas'
        }
      />

      <Conteudo>
        {vazio ? (
          <Vazio
            icone={<IconPincel size={44} />}
            titulo="Bem-vindo ao Ateliê"
            descricao="Este app roda inteiro no seu iPad — sem conta, sem nuvem, sem ninguém mais vendo. Comece cadastrando as tintas que você tem e as miniaturas da pilha."
            acao={
              <div className="flex flex-wrap justify-center gap-2">
                <Link className="btn btn-primario" to="/tintas">
                  <IconTinta size={18} /> Cadastrar tintas
                </Link>
                <Link className="btn" to="/minis">
                  <IconMini size={18} /> Cadastrar miniaturas
                </Link>
              </div>
            }
          />
        ) : (
          <div className="space-y-5">
            {/* ---------------- métricas ---------------- */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Metrica
                rotulo="Modelos pintados"
                valor={ind.totais.modelosFinalizados}
                sufixo={`/ ${ind.totais.modelos}`}
                cor="var(--color-ok)"
                icone={<IconMini size={18} />}
                detalhe={<Barra valor={ind.percentualPintado} cor="var(--color-ok)" />}
              />
              <Metrica
                rotulo="Tempo médio"
                valor={
                  ind.minutosMedioPorPeca ? formatarMinutos(ind.minutosMedioPorPeca) : '—'
                }
                icone={<IconRelogio size={18} />}
                detalhe={
                  ind.amostraTempo > 0
                    ? `Por modelo, com base em ${ind.amostraTempo} ${
                        ind.amostraTempo === 1 ? 'peça finalizada' : 'peças finalizadas'
                      } com tempo registrado.`
                    : 'Registre sessões de pintura para calcular.'
                }
              />
              <Metrica
                rotulo="Horas na bancada"
                valor={ind.totais.horasTotais}
                sufixo="h"
                icone={<IconPincel size={18} />}
                detalhe={`${ind.horas30}h nos últimos 30 dias · ${ind.diasPintados30} ${
                  ind.diasPintados30 === 1 ? 'dia' : 'dias'
                } com pincel na mão.`}
              />
              <Metrica
                rotulo="Pilha da vergonha"
                valor={ind.totais.pilhaDaVergonha}
                sufixo="modelos"
                cor={ind.totais.pilhaDaVergonha > 0 ? 'var(--color-perigo)' : 'var(--color-ok)'}
                detalhe={
                  ind.mesesParaZerar
                    ? `No ritmo atual, ~${ind.mesesParaZerar} ${
                        ind.mesesParaZerar === 1 ? 'mês' : 'meses'
                      } para zerar tudo.`
                    : 'Ainda sem ritmo suficiente para projetar.'
                }
              />
            </div>

            {ind.atrasadas.length > 0 && (
              <div className="card flex items-start gap-3 border-perigo/40 bg-perigo/8 p-4">
                <span className="mt-0.5 text-perigo">
                  <IconAlerta />
                </span>
                <div>
                  <div className="font-semibold text-perigo">
                    {ind.atrasadas.length}{' '}
                    {ind.atrasadas.length === 1 ? 'peça passou' : 'peças passaram'} do prazo
                  </div>
                  <div className="mt-1 text-sm text-suave">
                    {ind.atrasadas.slice(0, 4).map((m) => (
                      <Link key={m.id} to={`/minis/${m.id}`} className="mr-3 underline">
                        {m.nome} ({formatarData(m.prazo)})
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              {/* ---------------- próximas ---------------- */}
              <section className="card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-bold">Próximas pinturas</h2>
                  <Link to="/minis" className="text-xs font-semibold text-ouro">
                    ver todas
                  </Link>
                </div>
                {ind.proximas.length === 0 ? (
                  <p className="py-6 text-center text-sm text-suave">
                    Nada na fila. Cadastre uma miniatura ou tire algo da pilha.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {ind.proximas.map((m) => {
                      const st = STATUS_INFO[m.status]
                      const f = FACCOES_POR_ID.get(m.faccaoId)
                      return (
                        <Link
                          key={m.id}
                          to={`/minis/${m.id}`}
                          className="flex items-center gap-3 rounded-xl border border-borda bg-superficie2 px-3 py-2.5"
                        >
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                            style={{
                              background: `color-mix(in srgb, ${f?.cor ?? '#555'} 30%, #1b212c)`,
                            }}
                          >
                            {m.prioridade}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold">{m.nome}</div>
                            <div className="truncate text-[11px] text-suave">
                              {f?.nome}
                              {m.prazo ? ` · prazo ${formatarData(m.prazo)}` : ''}
                            </div>
                            <div className="mt-1.5">
                              <Barra
                                valor={progressoDoStatus(m.status)}
                                cor={st.cor}
                                altura={4}
                              />
                            </div>
                          </div>
                          <Selo cor={st.cor} suave>
                            {st.label}
                          </Selo>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </section>

              {/* ---------------- tintas mais usadas ---------------- */}
              <section className="card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-bold">Tintas mais usadas</h2>
                  <Link to="/tintas" className="text-xs font-semibold text-ouro">
                    estoque
                  </Link>
                </div>
                {ind.tintasMaisUsadas.length === 0 ? (
                  <p className="py-6 text-center text-sm leading-relaxed text-suave">
                    Marque as tintas usadas ao registrar uma sessão de pintura — o ranking aparece
                    aqui.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {ind.tintasMaisUsadas.map(({ tinta, usos }) => {
                      const max = ind.tintasMaisUsadas[0].usos
                      return (
                        <div key={tinta.id} className="flex items-center gap-3">
                          <Amostra hex={tinta.hex} tamanho={28} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="truncate text-sm font-medium">{tinta.nome}</span>
                              <span className="shrink-0 text-xs font-bold text-suave">
                                {usos}×
                              </span>
                            </div>
                            <div className="mt-1">
                              <Barra valor={(usos / max) * 100} cor={tinta.hex} altura={4} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>
            </div>

            {/* ---------------- ritmo ---------------- */}
            <section className="card p-4">
              <h2 className="mb-1 font-bold">Ritmo dos últimos 12 meses</h2>
              <p className="mb-3 text-xs text-suave">
                Barras = horas de bancada. Linha = modelos finalizados.
              </p>
              <Suspense fallback={<CarregandoGrafico altura={224} />}>
                <GraficoRitmo meses={ind.meses} />
              </Suspense>
            </section>

            <div className="grid gap-5 lg:grid-cols-2">
              {/* ---------------- por status ---------------- */}
              <section className="card p-4">
                <h2 className="mb-3 font-bold">Onde estão as miniaturas</h2>
                <Suspense fallback={<CarregandoGrafico altura={208} />}>
                  <GraficoStatus porStatus={ind.porStatus} />
                </Suspense>
              </section>

              {/* ---------------- por facção ---------------- */}
              <section className="card p-4">
                <h2 className="mb-3 font-bold">Por facção</h2>
                {ind.porFaccao.length === 0 ? (
                  <p className="py-6 text-center text-sm text-suave">Nenhuma miniatura ainda.</p>
                ) : (
                  <div className="space-y-2.5">
                    {ind.porFaccao.slice(0, 8).map((f) => (
                      <div key={f.id}>
                        <div className="mb-1 flex items-baseline justify-between gap-2">
                          <span className="truncate text-sm font-medium">{f.nome}</span>
                          <span className="shrink-0 text-xs text-suave">
                            {f.finalizados}/{f.modelos} pintados
                          </span>
                        </div>
                        <div className="relative">
                          <Barra valor={100} cor="#232b38" altura={8} />
                          <div className="absolute inset-0">
                            <Barra
                              valor={f.modelos ? (f.finalizados / f.modelos) * 100 : 0}
                              cor={f.cor}
                              altura={8}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* ---------------- lista de compras ---------------- */}
            <section className="card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-bold">Lista de compras</h2>
                <Link to="/tintas" className="text-xs font-semibold text-ouro">
                  estoque
                </Link>
              </div>
              {ind.listaDeCompras.length === 0 ? (
                <p className="py-6 text-center text-sm text-suave">
                  Nenhuma tinta acabando e nada marcado para comprar. Bancada em dia.
                </p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {ind.listaDeCompras.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-2.5 rounded-xl border border-borda bg-superficie2 px-3 py-2"
                    >
                      <Amostra hex={t.hex} tamanho={28} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{t.nome}</div>
                        <div className="truncate text-[11px] text-suave">
                          {t.marca}
                          {t.codigo ? ` · ${t.codigo}` : ''}
                        </div>
                      </div>
                      <Selo cor={t.desejo ? 'var(--color-turquesa)' : NIVEL_INFO[t.nivel].cor} suave>
                        {t.desejo ? 'quero' : NIVEL_INFO[t.nivel].label}
                      </Selo>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </Conteudo>
    </>
  )
}
