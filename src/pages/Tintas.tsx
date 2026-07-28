import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Link } from 'react-router-dom'
import { Cabecalho, Conteudo } from '../App'
import {
  adicionarDoCatalogo,
  db,
  NIVEL_INFO,
  type NivelPote,
  type Tinta,
} from '../db/db'
import { MARCAS, TIPO_LABEL, type Marca, type TipoTinta } from '../data/paints'
import { buscarNoCatalogo, equivalentesPara } from '../lib/matching'
import { FAMILIAS, familiaDe, isValidHex, MATCH_LABEL, readableOn } from '../lib/color'
import { Amostra, Aviso, Folha, Segmentado, Selo, Vazio } from '../components/ui'
import {
  IconBusca,
  IconEstrela,
  IconGota,
  IconLixeira,
  IconMais,
  IconRoda,
  IconTinta,
} from '../components/icons'

type Ordem = 'cor' | 'nome' | 'marca' | 'recente'

export default function Tintas() {
  const tintas = useLiveQuery(() => db.tintas.toArray(), [], [] as Tinta[])

  const [busca, setBusca] = useState('')
  const [marca, setMarca] = useState<Marca | 'todas'>('todas')
  const [familia, setFamilia] = useState<string>('todas')
  const [tipo, setTipo] = useState<TipoTinta | 'todos'>('todos')
  const [aba, setAba] = useState<'estoque' | 'acabando' | 'desejo' | 'favoritas'>('estoque')
  const [ordem, setOrdem] = useState<Ordem>('cor')
  const [adicionando, setAdicionando] = useState(false)
  const [selecionada, setSelecionada] = useState<Tinta | null>(null)

  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase()
    let lista = tintas.filter((t) => {
      if (aba === 'estoque' && t.desejo) return false
      if (aba === 'desejo' && !t.desejo) return false
      if (aba === 'favoritas' && !t.favorita) return false
      if (aba === 'acabando' && !(t.nivel === 'acabando' || t.nivel === 'vazio')) return false
      if (marca !== 'todas' && t.marca !== marca) return false
      if (tipo !== 'todos' && t.tipo !== tipo) return false
      if (familia !== 'todas' && familiaDe(t.hex) !== familia) return false
      if (q && !`${t.marca} ${t.linha} ${t.codigo} ${t.nome} ${t.tags.join(' ')}`.toLowerCase().includes(q))
        return false
      return true
    })

    lista = [...lista].sort((a, b) => {
      switch (ordem) {
        case 'nome':
          return a.nome.localeCompare(b.nome, 'pt-BR')
        case 'marca':
          return (
            a.marca.localeCompare(b.marca) ||
            a.linha.localeCompare(b.linha) ||
            a.codigo.localeCompare(b.codigo, 'pt-BR', { numeric: true })
          )
        case 'recente':
          return b.atualizadoEm - a.atualizadoEm
        case 'cor':
        default: {
          // Agrupa por família e, dentro dela, do escuro para o claro —
          // é como a prateleira fica organizada de verdade.
          const fa = FAMILIAS.findIndex((f) => f.id === familiaDe(a.hex))
          const fb = FAMILIAS.findIndex((f) => f.id === familiaDe(b.hex))
          if (fa !== fb) return fa - fb
          return luminancia(a.hex) - luminancia(b.hex)
        }
      }
    })
    return lista
  }, [tintas, busca, marca, tipo, familia, aba, ordem])

  const contagem = useMemo(
    () => ({
      estoque: tintas.filter((t) => !t.desejo).length,
      acabando: tintas.filter((t) => !t.desejo && (t.nivel === 'acabando' || t.nivel === 'vazio'))
        .length,
      desejo: tintas.filter((t) => t.desejo).length,
      favoritas: tintas.filter((t) => t.favorita).length,
    }),
    [tintas],
  )

  return (
    <>
      <Cabecalho
        titulo="Estoque de tintas"
        subtitulo={`${contagem.estoque} tintas na bancada · ${contagem.acabando} para repor`}
        acoes={
          <button className="btn btn-primario" onClick={() => setAdicionando(true)}>
            <IconMais size={18} />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        }
      />

      <Conteudo>
        <div className="mb-4 flex flex-col gap-3">
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-suave">
              <IconBusca />
            </span>
            <input
              className="campo pl-11"
              placeholder="Buscar por nome, código ou etiqueta…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              type="search"
            />
          </div>

          <div className="trilha">
            {(
              [
                ['estoque', `Na bancada (${contagem.estoque})`],
                ['acabando', `Repor (${contagem.acabando})`],
                ['favoritas', `Favoritas (${contagem.favoritas})`],
                ['desejo', `Quero comprar (${contagem.desejo})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                className={`chip ${aba === id ? 'chip-ativo' : ''}`}
                onClick={() => setAba(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="trilha">
            <button
              className={`chip ${marca === 'todas' ? 'chip-ativo' : ''}`}
              onClick={() => setMarca('todas')}
            >
              Todas as marcas
            </button>
            {MARCAS.filter((m) => tintas.some((t) => t.marca === m)).map((m) => (
              <button
                key={m}
                className={`chip ${marca === m ? 'chip-ativo' : ''}`}
                onClick={() => setMarca(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="trilha">
            <button
              className={`chip ${familia === 'todas' ? 'chip-ativo' : ''}`}
              onClick={() => setFamilia('todas')}
            >
              Todas as cores
            </button>
            {FAMILIAS.map((f) => (
              <button
                key={f.id}
                className={`chip ${familia === f.id ? 'chip-ativo' : ''}`}
                onClick={() => setFamilia(f.id)}
              >
                <span
                  className="h-3 w-3 rounded-full border border-white/20"
                  style={{ background: f.hex }}
                />
                {f.nome}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="trilha">
              <button
                className={`chip ${tipo === 'todos' ? 'chip-ativo' : ''}`}
                onClick={() => setTipo('todos')}
              >
                Todos os tipos
              </button>
              {(Object.keys(TIPO_LABEL) as TipoTinta[])
                .filter((t) => tintas.some((x) => x.tipo === t))
                .map((t) => (
                  <button
                    key={t}
                    className={`chip ${tipo === t ? 'chip-ativo' : ''}`}
                    onClick={() => setTipo(t)}
                  >
                    {TIPO_LABEL[t]}
                  </button>
                ))}
            </div>
            <Segmentado
              valor={ordem}
              aoMudar={setOrdem}
              opcoes={[
                { id: 'cor', label: 'Cor' },
                { id: 'nome', label: 'Nome' },
                { id: 'marca', label: 'Marca' },
                { id: 'recente', label: 'Recentes' },
              ]}
            />
          </div>
        </div>

        {tintas.length === 0 ? (
          <Vazio
            icone={<IconTinta size={44} />}
            titulo="Sua bancada está vazia"
            descricao="Cadastre as tintas que você já tem. Comece pelo catálogo — a Vallejo inteira está lá, é só marcar o que está na sua prateleira."
            acao={
              <button className="btn btn-primario" onClick={() => setAdicionando(true)}>
                <IconMais size={18} /> Adicionar do catálogo
              </button>
            }
          />
        ) : filtradas.length === 0 ? (
          <Vazio
            titulo="Nada com esses filtros"
            descricao="Ajuste a busca ou limpe os filtros para ver o resto do estoque."
          />
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtradas.map((t) => (
              <CartaoTinta key={t.id} tinta={t} aoAbrir={() => setSelecionada(t)} />
            ))}
          </div>
        )}
      </Conteudo>

      <FolhaAdicionar aberta={adicionando} aoFechar={() => setAdicionando(false)} />
      <FolhaDetalhe
        tinta={selecionada}
        aoFechar={() => setSelecionada(null)}
        todasAsTintas={tintas}
      />
    </>
  )
}

function luminancia(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16)
  return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)
}

/* ------------------------------------------------------------------ */

function CartaoTinta({ tinta, aoAbrir }: { tinta: Tinta; aoAbrir: () => void }) {
  const nivel = NIVEL_INFO[tinta.nivel]
  const translucida = tinta.tipo === 'wash' || tinta.tipo === 'contrast' || tinta.tipo === 'tinta-ink'
  return (
    <button
      onClick={aoAbrir}
      className="card entrar overflow-hidden text-left transition active:scale-[0.98]"
    >
      <div
        className={`relative flex h-20 items-end justify-between p-2 ${translucida ? 'xadrez' : ''}`}
      >
        <div
          className="absolute inset-0"
          style={{ background: tinta.hex, opacity: translucida ? 0.85 : 1 }}
        />
        {tinta.favorita && (
          <span
            className="relative z-10 drop-shadow"
            style={{ color: readableOn(tinta.hex) }}
            aria-label="Favorita"
          >
            <IconEstrela size={16} />
          </span>
        )}
        <span
          className="relative z-10 ml-auto rounded-md px-1.5 py-0.5 text-[10px] font-bold"
          style={{ background: nivel.cor, color: readableOn(nivel.cor) }}
        >
          {tinta.nivel === 'vazio' ? 'VAZIO' : nivel.label.toUpperCase()}
        </span>
      </div>
      <div className="px-2.5 py-2">
        <div className="truncate text-sm font-semibold leading-tight">{tinta.nome}</div>
        <div className="mt-0.5 truncate text-[11px] text-suave">
          {tinta.marca}
          {tinta.codigo ? ` · ${tinta.codigo}` : ''}
        </div>
      </div>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Detalhe / edição                                                    */
/* ------------------------------------------------------------------ */

function FolhaDetalhe({
  tinta,
  aoFechar,
  todasAsTintas,
}: {
  tinta: Tinta | null
  aoFechar: () => void
  todasAsTintas: Tinta[]
}) {
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)

  // O objeto de `tinta` vem do useLiveQuery, então já reflete o banco.
  const atual = tinta ? (todasAsTintas.find((t) => t.id === tinta.id) ?? tinta) : null

  const equivalentes = useMemo(() => {
    if (!atual) return {}
    return equivalentesPara({
      hex: atual.hex,
      marcaOrigem: atual.marca,
      catalogoId: atual.catalogoId,
      tipoCompativel: atual.tipo,
      porMarca: 3,
    })
  }, [atual])

  if (!atual) return null

  const salvar = (patch: Partial<Tinta>) =>
    db.tintas.update(atual.id!, { ...patch, atualizadoEm: Date.now() })

  return (
    <Folha
      aberta
      aoFechar={aoFechar}
      titulo={
        <div className="flex items-center gap-3">
          <Amostra hex={atual.hex} tamanho={32} />
          <span className="truncate">{atual.nome}</span>
        </div>
      }
      rodape={
        confirmandoExclusao ? (
          <>
            <span className="mr-auto text-sm text-suave">Apagar esta tinta do estoque?</span>
            <button className="btn" onClick={() => setConfirmandoExclusao(false)}>
              Cancelar
            </button>
            <button
              className="btn btn-perigo"
              onClick={async () => {
                await db.tintas.delete(atual.id!)
                aoFechar()
              }}
            >
              Apagar
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-perigo mr-auto"
              onClick={() => setConfirmandoExclusao(true)}
            >
              <IconLixeira size={18} />
            </button>
            <Link className="btn" to={`/laboratorio?cor=${encodeURIComponent(atual.hex)}`}>
              <IconRoda size={18} /> Abrir no laboratório
            </Link>
            <button className="btn btn-primario" onClick={aoFechar}>
              Pronto
            </button>
          </>
        )
      }
    >
      <div className="space-y-5">
        <div
          className="flex h-28 items-end rounded-2xl p-3"
          style={{ background: atual.hex, color: readableOn(atual.hex) }}
        >
          <div>
            <div className="text-sm font-semibold opacity-80">
              {atual.marca} · {atual.linha}
            </div>
            <div className="font-mono text-lg font-bold">{atual.hex.toUpperCase()}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="rotulo">Nome</label>
            <input
              className="campo"
              value={atual.nome}
              onChange={(e) => salvar({ nome: e.target.value })}
            />
          </div>
          <div>
            <label className="rotulo">Código</label>
            <input
              className="campo"
              value={atual.codigo}
              placeholder="70.951"
              onChange={(e) => salvar({ codigo: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="rotulo">Quanto sobrou no pote</label>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(NIVEL_INFO) as NivelPote[]).map((n) => (
              <button
                key={n}
                className={`btn ${atual.nivel === n ? 'btn-primario' : ''}`}
                onClick={() => salvar({ nivel: n })}
              >
                {NIVEL_INFO[n].label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="rotulo">Potes iguais</label>
            <div className="flex items-center gap-2">
              <button
                className="btn px-4"
                onClick={() => salvar({ potes: Math.max(0, atual.potes - 1) })}
              >
                −
              </button>
              <span className="min-w-10 text-center text-lg font-bold">{atual.potes}</span>
              <button className="btn px-4" onClick={() => salvar({ potes: atual.potes + 1 })}>
                +
              </button>
            </div>
          </div>
          <div>
            <label className="rotulo">Marcadores</label>
            <div className="flex gap-2">
              <button
                className={`btn flex-1 ${atual.favorita ? 'btn-primario' : ''}`}
                onClick={() => salvar({ favorita: !atual.favorita })}
              >
                <IconEstrela size={18} /> Favorita
              </button>
              <button
                className={`btn flex-1 ${atual.desejo ? 'btn-primario' : ''}`}
                onClick={() => salvar({ desejo: !atual.desejo })}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="rotulo">Cor (hex)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              className="h-11 w-16 cursor-pointer rounded-lg border border-borda bg-superficie2"
              value={atual.hex}
              onChange={(e) => salvar({ hex: e.target.value })}
            />
            <input
              className="campo font-mono"
              value={atual.hex}
              onChange={(e) => {
                const v = e.target.value
                if (isValidHex(v)) salvar({ hex: v.startsWith('#') ? v : `#${v}` })
              }}
            />
          </div>
          <p className="mt-1.5 text-xs text-suave">
            Ajuste o hex se a cor na tela não bater com o pote — todo o cruzamento entre marcas usa
            este valor.
          </p>
        </div>

        <div>
          <label className="rotulo">Notas</label>
          <textarea
            className="campo min-h-20 resize-y"
            placeholder="Cobre mal em duas camadas, ótima diluída como glaze…"
            value={atual.notas}
            onChange={(e) => salvar({ notas: e.target.value })}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="titulo-secao">Equivalentes em outras marcas</span>
            <span className="text-[11px] text-suave">ΔE = diferença de cor</span>
          </div>
          <div className="space-y-3">
            {Object.entries(equivalentes)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([marca, lista]) => (
                <div key={marca} className="card p-3">
                  <div className="mb-2 text-sm font-bold">{marca}</div>
                  <div className="space-y-1.5">
                    {lista.map((e) => (
                      <div key={e.tinta.id} className="flex items-center gap-2.5">
                        <Amostra hex={e.tinta.hex} tamanho={30} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{e.tinta.nome}</div>
                          <div className="truncate text-[11px] text-suave">
                            {e.tinta.linha}
                            {e.tinta.codigo ? ` · ${e.tinta.codigo}` : ''}
                          </div>
                        </div>
                        {e.curada && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-turquesa">
                            clássico
                          </span>
                        )}
                        <Selo cor={corDaQualidade(e.qualidade)} suave>
                          {MATCH_LABEL[e.qualidade]} · {e.deltaE.toFixed(1)}
                        </Selo>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-3">
            <Aviso>
              A equivalência é calculada por ΔE2000 sobre os valores de cor do catálogo, mais uma
              tabela de pares clássicos da comunidade. Serve para escolher substituto, não para
              garantir cor idêntica: acabamento, opacidade e granulação continuam diferentes entre
              marcas.
            </Aviso>
          </div>
        </div>
      </div>
    </Folha>
  )
}

function corDaQualidade(q: string) {
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

/* ------------------------------------------------------------------ */
/* Adicionar                                                           */
/* ------------------------------------------------------------------ */

function FolhaAdicionar({ aberta, aoFechar }: { aberta: boolean; aoFechar: () => void }) {
  const [modo, setModo] = useState<'catalogo' | 'manual'>('catalogo')
  const [busca, setBusca] = useState('')
  const [marcaFiltro, setMarcaFiltro] = useState<Marca | 'todas'>('Vallejo')
  const [escolhidas, setEscolhidas] = useState<Set<string>>(new Set())
  const [comoDesejo, setComoDesejo] = useState(false)
  const jaCadastradas = useLiveQuery(
    async () => new Set((await db.tintas.toArray()).map((t) => t.catalogoId).filter(Boolean)),
    [],
    new Set<string | undefined>(),
  )

  const resultados = useMemo(() => {
    const base = buscarNoCatalogo(busca, 400)
    return marcaFiltro === 'todas' ? base : base.filter((t) => t.marca === marcaFiltro)
  }, [busca, marcaFiltro])

  const alternar = (id: string) =>
    setEscolhidas((s) => {
      const n = new Set(s)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })

  const confirmar = async () => {
    await adicionarDoCatalogo([...escolhidas], comoDesejo)
    setEscolhidas(new Set())
    setBusca('')
    aoFechar()
  }

  return (
    <Folha
      aberta={aberta}
      aoFechar={aoFechar}
      titulo="Adicionar tintas"
      largura="max-w-3xl"
      rodape={
        modo === 'catalogo' ? (
          <>
            <label className="mr-auto flex items-center gap-2 text-sm text-suave">
              <input
                type="checkbox"
                className="h-5 w-5 accent-[var(--color-ouro)]"
                checked={comoDesejo}
                onChange={(e) => setComoDesejo(e.target.checked)}
              />
              Lista de compras
            </label>
            <button className="btn" onClick={aoFechar}>
              Cancelar
            </button>
            <button
              className="btn btn-primario"
              disabled={escolhidas.size === 0}
              onClick={confirmar}
            >
              Adicionar {escolhidas.size || ''}
            </button>
          </>
        ) : undefined
      }
    >
      <div className="mb-4">
        <Segmentado
          valor={modo}
          aoMudar={setModo}
          opcoes={[
            { id: 'catalogo', label: 'Do catálogo' },
            { id: 'manual', label: 'Cadastrar à mão' },
          ]}
        />
      </div>

      {modo === 'catalogo' ? (
        <div className="space-y-3">
          <input
            className="campo"
            placeholder="Buscar tinta (ex.: 70.951, Macragge, gold)…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            type="search"
          />
          <div className="trilha">
            <button
              className={`chip ${marcaFiltro === 'todas' ? 'chip-ativo' : ''}`}
              onClick={() => setMarcaFiltro('todas')}
            >
              Todas
            </button>
            {MARCAS.map((m) => (
              <button
                key={m}
                className={`chip ${marcaFiltro === m ? 'chip-ativo' : ''}`}
                onClick={() => setMarcaFiltro(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            {resultados.map((c) => {
              const ja = jaCadastradas.has(c.id)
              const sel = escolhidas.has(c.id)
              return (
                <button
                  key={c.id}
                  disabled={ja}
                  onClick={() => alternar(c.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                    sel
                      ? 'border-ouro bg-ouro/10'
                      : ja
                        ? 'border-borda/50 opacity-45'
                        : 'border-borda bg-superficie'
                  }`}
                >
                  <Amostra hex={c.hex} tamanho={34} selecionada={sel} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{c.nome}</div>
                    <div className="truncate text-[11px] text-suave">
                      {c.marca} · {c.linha}
                      {c.codigo ? ` · ${c.codigo}` : ''} · {TIPO_LABEL[c.tipo]}
                    </div>
                  </div>
                  {ja && <span className="text-[11px] font-semibold text-suave">já tenho</span>}
                  {sel && <span className="text-ouro">✓</span>}
                </button>
              )
            })}
            {resultados.length === 0 && (
              <p className="py-8 text-center text-sm text-suave">
                Nada encontrado. Cadastre à mão na outra aba.
              </p>
            )}
          </div>
        </div>
      ) : (
        <FormularioManual aoSalvar={aoFechar} />
      )}
    </Folha>
  )
}

function FormularioManual({ aoSalvar }: { aoSalvar: () => void }) {
  const [nome, setNome] = useState('')
  const [marca, setMarca] = useState<Marca>('Vallejo')
  const [linha, setLinha] = useState('Model Color')
  const [codigo, setCodigo] = useState('')
  const [hex, setHex] = useState('#7a5231')
  const [tipo, setTipo] = useState<TipoTinta>('acrilica')

  const salvar = async () => {
    if (!nome.trim()) return
    const agora = Date.now()
    await db.tintas.add({
      marca,
      linha,
      codigo,
      nome: nome.trim(),
      hex,
      tipo,
      nivel: 'cheio',
      potes: 1,
      favorita: false,
      desejo: false,
      notas: '',
      tags: [],
      criadoEm: agora,
      atualizadoEm: agora,
    } as Tinta)
    aoSalvar()
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="rotulo">Nome da tinta</label>
        <input
          className="campo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex.: Leather Brown"
          autoFocus
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="rotulo">Marca</label>
          <select
            className="campo"
            value={marca}
            onChange={(e) => setMarca(e.target.value as Marca)}
          >
            {MARCAS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="rotulo">Linha</label>
          <input className="campo" value={linha} onChange={(e) => setLinha(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="rotulo">Código</label>
          <input
            className="campo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="70.871"
          />
        </div>
        <div>
          <label className="rotulo">Tipo</label>
          <select
            className="campo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoTinta)}
          >
            {(Object.keys(TIPO_LABEL) as TipoTinta[]).map((t) => (
              <option key={t} value={t}>
                {TIPO_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="rotulo">Cor</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-11 w-20 cursor-pointer rounded-lg border border-borda bg-superficie2"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
          />
          <input
            className="campo font-mono"
            value={hex}
            onChange={(e) => isValidHex(e.target.value) && setHex(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primario w-full" onClick={salvar} disabled={!nome.trim()}>
        <IconGota size={18} /> Salvar tinta
      </button>
    </div>
  )
}
