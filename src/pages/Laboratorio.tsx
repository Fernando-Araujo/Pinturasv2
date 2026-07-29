import { useEffect, useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useSearchParams } from 'react-router-dom'
import { Cabecalho, Conteudo } from '../App'
import { db, type Tinta } from '../db/db'
import { RodaCromatica } from '../components/RodaCromatica'
import { Amostra, Aviso, Barra, Folha, Segmentado, Selo } from '../components/ui'
import { BlocoCor, corDaQualidade, FichaCor, LinhaCor } from '../components/FichaCor'
import { IconBusca, IconGota, IconPincel } from '../components/icons'
import {
  glazeSugerido,
  harmonias,
  hexToHsl,
  hslToHex,
  isValidHex,
  MATCH_LABEL,
  rampaLuz,
  rampaSombra,
  readableOn,
  undercoatsPara,
  washSugerido,
  type Degrau,
} from '../lib/color'
import { doMeuEstoque, LIMITE_SUBSTITUTO } from '../lib/matching'

export default function Laboratorio() {
  const [params, setParams] = useSearchParams()
  const [hex, setHex] = useState(() => {
    const p = params.get('cor')
    return p && isValidHex(p) ? (p.startsWith('#') ? p : `#${p}`) : '#16548c'
  })
  const [lum, setLum] = useState(() => Math.round(hexToHsl(hex).l))
  const [aba, setAba] = useState<'rampas' | 'harmonias' | 'base'>('rampas')
  const [escolhendoTinta, setEscolhendoTinta] = useState(false)

  const tintas = useLiveQuery(() => db.tintas.toArray(), [], [] as Tinta[])

  // Mantém a URL sincronizada: dá para salvar nos favoritos do Safari uma cor.
  useEffect(() => {
    const atual = params.get('cor')
    if (atual !== hex) {
      const p = new URLSearchParams(params)
      p.set('cor', hex)
      setParams(p, { replace: true })
    }
    // `params`/`setParams` mudam de identidade a cada render do router.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hex])

  const sombras = useMemo(() => rampaSombra(hex, 3), [hex])
  const luzes = useMemo(() => rampaLuz(hex, 3), [hex])
  const harms = useMemo(() => harmonias(hex), [hex])
  const bases = useMemo(() => undercoatsPara(hex), [hex])
  const wash = useMemo(() => washSugerido(hex), [hex])
  const glaze = useMemo(() => glazeSugerido(hex), [hex])

  // Mesmo corte usado nas fichas de cor, para os dois painéis não se
  // contradizerem: ou a tinta serve de substituta, ou não aparece.
  const proximas = useMemo(
    () => doMeuEstoque(hex, tintas, 4, { maxDeltaE: LIMITE_SUBSTITUTO }),
    [hex, tintas],
  )

  const marcadoresRoda = useMemo(() => {
    const h = harms.find((x) => x.id === (aba === 'harmonias' ? 'complementar' : 'analogas'))
    return h ? h.cores.filter((c) => c !== hex) : []
  }, [harms, hex, aba])

  return (
    <>
      <Cabecalho
        titulo="Laboratório de cores"
        subtitulo="Escolha uma cor e veja luz, sombra, harmonias e a base ideal"
        acoes={
          <button className="btn" onClick={() => setEscolhendoTinta(true)}>
            <IconBusca size={18} />
            <span className="hidden sm:inline">Usar tinta do estoque</span>
          </button>
        }
      />

      <Conteudo>
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          {/* ---------------- seletor ---------------- */}
          <div className="space-y-4">
            <div className="card flex flex-col items-center gap-4 p-4">
              <RodaCromatica
                hex={hex}
                luminosidade={lum}
                tamanho={280}
                marcadores={marcadoresRoda}
                aoEscolher={(hsl) => setHex(hslToHex(hsl))}
              />
              <div className="w-full">
                <label className="rotulo">Luminosidade da roda · {lum}%</label>
                <input
                  type="range"
                  min={8}
                  max={92}
                  value={lum}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setLum(v)
                    const h = hexToHsl(hex)
                    setHex(hslToHex({ ...h, l: v }))
                  }}
                  className="w-full accent-[var(--color-ouro)]"
                />
              </div>
            </div>

            <div
              className="card flex items-center justify-between gap-3 p-4"
              style={{ background: hex, color: readableOn(hex), borderColor: 'transparent' }}
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-75">
                  Cor selecionada
                </div>
                <div className="font-mono text-2xl font-bold">{hex.toUpperCase()}</div>
              </div>
              <input
                type="color"
                value={hex}
                onChange={(e) => {
                  setHex(e.target.value)
                  setLum(Math.round(hexToHsl(e.target.value).l))
                }}
                className="h-12 w-12 cursor-pointer rounded-xl border-2 border-white/40 bg-transparent"
                aria-label="Escolher cor"
              />
            </div>

            <div className="card p-4">
              <div className="titulo-secao mb-2.5">Equivalências desta cor</div>
              <FichaCor hex={hex} tintas={tintas} />
            </div>

            <div className="card p-4">
              <div className="titulo-secao mb-2.5">O mais próximo no meu estoque</div>
              {proximas.length === 0 ? (
                <p className="text-sm leading-relaxed text-suave">
                  {tintas.length === 0
                    ? 'Cadastre tintas no estoque para ver aqui o que da sua bancada chega mais perto desta cor.'
                    : 'Você não tem nenhuma tinta parecida com esta cor. Candidata à lista de compras — ou misture.'}
                </p>
              ) : (
                <div className="space-y-2">
                  {proximas.map(({ tinta, deltaE, qualidade }) => (
                    <div key={tinta.id} className="flex items-center gap-2.5">
                      <Amostra hex={tinta.hex} tamanho={30} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{tinta.nome}</div>
                        <div className="truncate text-[11px] text-suave">
                          {tinta.marca}
                          {tinta.codigo ? ` · ${tinta.codigo}` : ''}
                        </div>
                      </div>
                      <Selo cor={corDaQualidade(qualidade)} suave>
                        {MATCH_LABEL[qualidade]} · {deltaE.toFixed(1)}
                      </Selo>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------------- resultados ---------------- */}
          <div className="space-y-4">
            <Segmentado
              valor={aba}
              aoMudar={setAba}
              opcoes={[
                { id: 'rampas', label: 'Luz e sombra' },
                { id: 'harmonias', label: 'Harmonias' },
                { id: 'base', label: 'Undercoat' },
              ]}
            />

            {aba === 'rampas' && (
              <div className="space-y-4">
                <div className="card overflow-hidden">
                  <div className="flex h-24">
                    {[...[...sombras].reverse(), { hex, rotulo: 'Base', receita: '' }, ...luzes].map(
                      (d, i) => (
                        <div
                          key={i}
                          className="flex flex-1 items-end justify-center pb-1.5 text-[10px] font-bold"
                          style={{ background: d.hex, color: readableOn(d.hex) }}
                        >
                          {d.rotulo}
                        </div>
                      ),
                    )}
                  </div>
                  <p className="px-4 py-3 text-xs leading-relaxed text-suave">
                    A rampa completa, do recesso mais fundo à luz mais alta. Sombra puxa para o
                    frio e perde saturação; luz puxa para o quente e também perde saturação — é
                    assim que a peça parece iluminada, e não apenas mais clara ou mais escura.
                  </p>
                </div>

                <SecaoDegraus titulo="Sombras" degraus={sombras} tintas={tintas} />
                <SecaoDegraus titulo="Luzes" degraus={luzes} tintas={tintas} />

                <div className="card p-4">
                  <div className="titulo-secao mb-3">Acabamento</div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Wash e glaze são translúcidos: a sugestão Vallejo fica
                        restrita à Xpress Color, que é a linha equivalente. */}
                    <LinhaCor
                      hex={wash}
                      tintas={tintas}
                      titulo="Wash de sombreamento"
                      descricao="Aplicado nos recessos. Escuro, dessaturado e puxado para o frio — nunca preto puro, que mata a cor."
                      preferirLinha="Xpress Color"
                      tamanho={44}
                    />
                    <LinhaCor
                      hex={glaze}
                      tintas={tintas}
                      titulo="Glaze de unificação"
                      descricao="Muito diluído, passado por cima de tudo no fim para juntar as camadas e devolver saturação."
                      preferirLinha="Xpress Color"
                      tamanho={44}
                    />
                  </div>
                </div>
              </div>
            )}

            {aba === 'harmonias' && (
              <div className="space-y-3">
                {harms.map((h) => (
                  <div key={h.id} className="card p-4">
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <h3 className="font-bold">{h.nome}</h3>
                      <span className="text-xs text-suave">{h.descricao}</span>
                    </div>
                    <div className="mb-3 flex gap-2">
                      {h.cores.map((c, i) => (
                        <BlocoCor
                          key={`${c}-${i}`}
                          hex={c}
                          tintas={tintas}
                          aoClicar={() => {
                            setHex(c)
                            setLum(Math.round(hexToHsl(c).l))
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-suave">{h.aplicacao}</p>
                  </div>
                ))}
              </div>
            )}

            {aba === 'base' && (
              <div className="space-y-3">
                <Aviso>
                  A base certa economiza camadas. Amarelo sobre preto pede 6 demãos e ainda fica
                  sujo; azul escuro sobre branco fica leitoso. A ordem abaixo é a recomendação para
                  a cor selecionada.
                </Aviso>
                {bases.map((u, i) => (
                  <div key={u.id} className="card p-4">
                    <div className="flex items-start gap-3">
                      <Amostra hex={u.hex} tamanho={48} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{u.nome}</h3>
                          {i === 0 && (
                            <Selo cor="var(--color-ok)" suave>
                              recomendada
                            </Selo>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Barra valor={u.nota} cor={i === 0 ? 'var(--color-ok)' : undefined} />
                          <span className="w-10 shrink-0 text-right text-xs font-bold text-suave">
                            {u.nota}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-suave">{u.porque}</p>
                        <div className="mt-2 border-t border-borda pt-2">
                          <FichaCor hex={u.hex} tintas={tintas} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Conteudo>

      <Folha
        aberta={escolhendoTinta}
        aoFechar={() => setEscolhendoTinta(false)}
        titulo="Escolher tinta do estoque"
      >
        {tintas.length === 0 ? (
          <p className="py-8 text-center text-sm text-suave">
            Você ainda não cadastrou tintas. Vá em Estoque de tintas para começar.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {tintas.map((t) => (
              <button
                key={t.id}
                className="card flex items-center gap-2.5 p-2 text-left active:scale-95"
                onClick={() => {
                  setHex(t.hex)
                  setLum(Math.round(hexToHsl(t.hex).l))
                  setEscolhendoTinta(false)
                }}
              >
                <Amostra hex={t.hex} tamanho={34} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{t.nome}</div>
                  <div className="truncate text-[11px] text-suave">{t.marca}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </Folha>
    </>
  )
}

function SecaoDegraus({
  titulo,
  degraus,
  tintas,
}: {
  titulo: string
  degraus: Degrau[]
  tintas: Tinta[]
}) {
  return (
    <div className="card p-4">
      <div className="titulo-secao mb-3 flex items-center gap-2">
        {titulo === 'Luzes' ? <IconPincel size={16} /> : <IconGota size={16} />}
        {titulo}
      </div>
      <div className="space-y-4">
        {degraus.map((d) => (
          <LinhaCor
            key={d.rotulo}
            hex={d.hex}
            tintas={tintas}
            titulo={d.rotulo}
            descricao={d.receita}
          />
        ))}
      </div>
    </div>
  )
}

