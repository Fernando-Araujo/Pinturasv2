import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Link, useNavigate } from 'react-router-dom'
import { Cabecalho, Conteudo } from '../App'
import { db, type Foto, type Miniatura } from '../db/db'
import {
  FACCOES,
  FACCOES_POR_ID,
  progressoDoStatus,
  SISTEMA_LABEL,
  separarNomeados,
  STATUS_INFO,
  STATUS_ORDEM,
  UNIDADES,
  unidadesDaFaccao,
  type Sistema,
  type StatusMini,
  type Unidade,
} from '../data/warhammer'
import { Barra, Folha, ImagemBlob, Segmentado, Selo, Vazio } from '../components/ui'
import { IconMais, IconMini } from '../components/icons'

type Agrupamento = 'faccao' | 'status' | 'prioridade'

export default function Minis() {
  const minis = useLiveQuery(() => db.minis.toArray(), [], [] as Miniatura[])
  const fotos = useLiveQuery(() => db.fotos.toArray(), [], [] as Foto[])

  const [busca, setBusca] = useState('')
  const [faccaoFiltro, setFaccaoFiltro] = useState<string>('todas')
  const [statusFiltro, setStatusFiltro] = useState<StatusMini | 'todos' | 'pendentes'>('todos')
  const [agrupar, setAgrupar] = useState<Agrupamento>('faccao')
  const [adicionando, setAdicionando] = useState(false)

  const capas = useMemo(() => new Map(fotos.map((f) => [f.id!, f])), [fotos])

  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return minis.filter((m) => {
      if (faccaoFiltro !== 'todas' && m.faccaoId !== faccaoFiltro) return false
      if (statusFiltro === 'pendentes' && m.status === 'finalizada') return false
      if (statusFiltro !== 'todos' && statusFiltro !== 'pendentes' && m.status !== statusFiltro)
        return false
      if (q) {
        const alvo =
          `${m.nome} ${m.subfaccao} ${m.tags.join(' ')} ${FACCOES_POR_ID.get(m.faccaoId)?.nome ?? ''}`.toLowerCase()
        if (!alvo.includes(q)) return false
      }
      return true
    })
  }, [minis, busca, faccaoFiltro, statusFiltro])

  const grupos = useMemo(() => {
    const mapa = new Map<string, { titulo: string; cor: string; itens: Miniatura[] }>()
    for (const m of filtradas) {
      let chave: string
      let titulo: string
      let cor: string
      if (agrupar === 'faccao') {
        const f = FACCOES_POR_ID.get(m.faccaoId)
        chave = m.faccaoId
        titulo = f?.nome ?? 'Sem facção'
        cor = f?.cor ?? '#6e757a'
      } else if (agrupar === 'status') {
        chave = m.status
        titulo = STATUS_INFO[m.status].label
        cor = STATUS_INFO[m.status].cor
      } else {
        chave = String(m.prioridade)
        titulo = ROTULO_PRIORIDADE[m.prioridade] ?? `Prioridade ${m.prioridade}`
        cor = '#d4a537'
      }
      const g = mapa.get(chave) ?? { titulo, cor, itens: [] }
      g.itens.push(m)
      mapa.set(chave, g)
    }
    const lista = [...mapa.entries()]
    if (agrupar === 'status') {
      lista.sort(
        ([a], [b]) =>
          STATUS_ORDEM.indexOf(a as StatusMini) - STATUS_ORDEM.indexOf(b as StatusMini),
      )
    } else if (agrupar === 'prioridade') {
      lista.sort(([a], [b]) => Number(a) - Number(b))
    } else {
      lista.sort(([, a], [, b]) => b.itens.length - a.itens.length)
    }
    return lista
  }, [filtradas, agrupar])

  const totalModelos = minis.reduce((s, m) => s + m.quantidade, 0)
  const prontos = minis
    .filter((m) => m.status === 'finalizada')
    .reduce((s, m) => s + m.quantidade, 0)

  return (
    <>
      <Cabecalho
        titulo="Miniaturas"
        subtitulo={`${prontos} de ${totalModelos} modelos finalizados`}
        acoes={
          <button className="btn btn-primario" onClick={() => setAdicionando(true)}>
            <IconMais size={18} />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        }
      />

      <Conteudo>
        <div className="mb-4 space-y-3">
          <input
            className="campo"
            type="search"
            placeholder="Buscar miniatura, capítulo, etiqueta…"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <div className="trilha">
            <button
              className={`chip ${statusFiltro === 'todos' ? 'chip-ativo' : ''}`}
              onClick={() => setStatusFiltro('todos')}
            >
              Todas
            </button>
            <button
              className={`chip ${statusFiltro === 'pendentes' ? 'chip-ativo' : ''}`}
              onClick={() => setStatusFiltro('pendentes')}
            >
              Não terminadas
            </button>
            {STATUS_ORDEM.filter((s) => minis.some((m) => m.status === s)).map((s) => (
              <button
                key={s}
                className={`chip ${statusFiltro === s ? 'chip-ativo' : ''}`}
                onClick={() => setStatusFiltro(s)}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: STATUS_INFO[s].cor }}
                />
                {STATUS_INFO[s].label}
              </button>
            ))}
          </div>

          <div className="trilha">
            <button
              className={`chip ${faccaoFiltro === 'todas' ? 'chip-ativo' : ''}`}
              onClick={() => setFaccaoFiltro('todas')}
            >
              Todas as facções
            </button>
            {FACCOES.filter((f) => minis.some((m) => m.faccaoId === f.id)).map((f) => (
              <button
                key={f.id}
                className={`chip ${faccaoFiltro === f.id ? 'chip-ativo' : ''}`}
                onClick={() => setFaccaoFiltro(f.id)}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.cor }} />
                {f.nome}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="titulo-secao">Agrupar por</span>
            <Segmentado
              valor={agrupar}
              aoMudar={setAgrupar}
              opcoes={[
                { id: 'faccao', label: 'Facção' },
                { id: 'status', label: 'Status' },
                { id: 'prioridade', label: 'Fila' },
              ]}
            />
          </div>
        </div>

        {minis.length === 0 ? (
          <Vazio
            icone={<IconMini size={44} />}
            titulo="Nenhuma miniatura cadastrada"
            descricao="Cadastre o que está na caixa, o que está montado e o que já está pintado. Depois é só ir mudando o status conforme a peça anda."
            acao={
              <button className="btn btn-primario" onClick={() => setAdicionando(true)}>
                <IconMais size={18} /> Adicionar miniatura
              </button>
            }
          />
        ) : filtradas.length === 0 ? (
          <Vazio titulo="Nada com esses filtros" descricao="Ajuste a busca ou os filtros acima." />
        ) : (
          <div className="space-y-6">
            {grupos.map(([chave, g]) => (
              <section key={chave}>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm" style={{ background: g.cor }} />
                  <h2 className="font-bold">{g.titulo}</h2>
                  <span className="text-xs text-suave">
                    {g.itens.reduce((s, m) => s + m.quantidade, 0)} modelos
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {g.itens.map((m) => (
                    <CartaoMini key={m.id} mini={m} capa={m.fotoCapaId ? capas.get(m.fotoCapaId) : undefined} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Conteudo>

      <FolhaAdicionarMini aberta={adicionando} aoFechar={() => setAdicionando(false)} />
    </>
  )
}

function BotaoUnidade({
  unidade,
  selecionada,
  aoTocar,
}: {
  unidade: Unidade
  selecionada: boolean
  aoTocar: () => void
}) {
  return (
    <button
      type="button"
      onClick={aoTocar}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
        selecionada ? 'border-ouro bg-ouro/10' : 'border-borda bg-superficie2'
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{unidade.nome}</div>
        <div className="truncate text-[11px] text-suave">
          {unidade.papel} · {unidade.modelos} · base {unidade.baseTamanho}
        </div>
      </div>
      <Selo cor={selecionada ? 'var(--color-ouro)' : 'var(--color-suave)'} suave>
        {unidade.pontos} pts
      </Selo>
    </button>
  )
}

const ROTULO_PRIORIDADE: Record<number, string> = {
  1: '1 — Próxima da fila',
  2: '2 — Logo depois',
  3: '3 — Este mês',
  4: '4 — Quando der',
  5: '5 — Algum dia',
}

function CartaoMini({ mini, capa }: { mini: Miniatura; capa?: Foto }) {
  const st = STATUS_INFO[mini.status]
  const faccao = FACCOES_POR_ID.get(mini.faccaoId)
  return (
    <Link
      to={`/minis/${mini.id}`}
      className="card entrar overflow-hidden transition active:scale-[0.98]"
    >
      <div className="relative aspect-4/3 bg-superficie2">
        {capa ? (
          <ImagemBlob blob={capa.thumb} alt={mini.nome} className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `color-mix(in srgb, ${faccao?.cor ?? '#333'} 22%, #141922)` }}
          >
            <IconMini size={34} className="text-suave/50" />
          </div>
        )}
        {mini.quantidade > 1 && (
          <span className="absolute right-2 top-2 rounded-md bg-black/65 px-1.5 py-0.5 text-[11px] font-bold">
            ×{mini.quantidade}
          </span>
        )}
      </div>
      <div className="p-2.5">
        <div className="truncate text-sm font-semibold leading-tight">{mini.nome}</div>
        <div className="mt-0.5 truncate text-[11px] text-suave">
          {faccao?.nome ?? '—'}
          {mini.subfaccao ? ` · ${mini.subfaccao}` : ''}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Barra valor={progressoDoStatus(mini.status)} cor={st.cor} altura={5} />
        </div>
        <div className="mt-1.5">
          <Selo cor={st.cor} suave>
            {st.label}
          </Selo>
        </div>
      </div>
    </Link>
  )
}

/* ------------------------------------------------------------------ */

function FolhaAdicionarMini({ aberta, aoFechar }: { aberta: boolean; aoFechar: () => void }) {
  const navegar = useNavigate()
  const [sistema, setSistema] = useState<Sistema>('40k')
  const [faccaoId, setFaccaoId] = useState('ultramarines')
  const [unidadeId, setUnidadeId] = useState('')
  const [nome, setNome] = useState('')
  const [subfaccao, setSubfaccao] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [status, setStatus] = useState<StatusMini>('desmontada')
  const [prioridade, setPrioridade] = useState(3)
  const [notas, setNotas] = useState('')
  const [buscaUnidade, setBuscaUnidade] = useState('')

  // Facções com catálogo aprofundado vêm primeiro: são as que o cadastro
  // realmente consegue preencher sozinho.
  const faccoesDoSistema = useMemo(
    () =>
      FACCOES.filter((f) => f.sistema === sistema).sort(
        (a, b) => Number(!!b.destaque) - Number(!!a.destaque) || a.nome.localeCompare(b.nome, 'pt-BR'),
      ),
    [sistema],
  )
  const faccao = FACCOES_POR_ID.get(faccaoId)

  const unidades = useMemo(() => {
    const todas = unidadesDaFaccao(faccaoId).todas
    const q = buscaUnidade.trim().toLowerCase()
    if (!q) return todas
    return todas.filter((u) => `${u.nome} ${u.papel}`.toLowerCase().includes(q))
  }, [faccaoId, buscaUnidade])

  const { unidades: unidadesComuns, nomeados } = useMemo(
    () => separarNomeados(unidades),
    [unidades],
  )

  const escolherUnidade = (id: string) => {
    setUnidadeId(id)
    const u = UNIDADES.find((x) => x.id === id)
    // Só sobrescreve o nome se ele estiver vazio ou se ainda for o nome
    // preenchido por outra unidade — um nome escrito à mão nunca se perde.
    const veioDeUnidade = UNIDADES.some((x) => x.nome === nome.trim())
    if (u && (!nome.trim() || veioDeUnidade)) setNome(u.nome)
  }

  const salvar = async () => {
    const u = unidades.find((x) => x.id === unidadeId)
    const nomeFinal = nome.trim() || u?.nome || faccao?.nome || 'Miniatura'
    const agora = Date.now()
    const emAndamento: StatusMini[] = ['primer', 'pintando', 'detalhes', 'base']
    const id = await db.minis.add({
      nome: nomeFinal,
      faccaoId,
      unidadeId: unidadeId || undefined,
      subfaccao: subfaccao.trim(),
      quantidade: Math.max(1, quantidade),
      status,
      prioridade,
      pontos: u?.pontos,
      // Pré-carrega o esquema clássico da facção: já dá o que pintar em cada parte.
      esquema: (faccao?.esquema ?? []).map((p) => ({
        parte: p.parte,
        hex: p.hex,
        nota: p.tinta,
      })),
      notas: notas.trim(),
      tags: [],
      criadoEm: agora,
      iniciadoEm: emAndamento.includes(status) ? agora : undefined,
      finalizadoEm: status === 'finalizada' ? agora : undefined,
    } as Miniatura)

    // Limpa para o próximo cadastro (é comum cadastrar vários seguidos).
    setNome('')
    setSubfaccao('')
    setQuantidade(1)
    setUnidadeId('')
    setNotas('')
    aoFechar()
    navegar(`/minis/${id}`)
  }

  return (
    <Folha
      aberta={aberta}
      aoFechar={aoFechar}
      titulo="Nova miniatura"
      rodape={
        <>
          <button className="btn" onClick={aoFechar}>
            Cancelar
          </button>
          <button className="btn btn-primario" onClick={salvar}>
            Cadastrar
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="rotulo">Sistema</label>
          <Segmentado
            valor={sistema}
            aoMudar={(s) => {
              setSistema(s)
              const primeira = FACCOES.find((f) => f.sistema === s)
              if (primeira) setFaccaoId(primeira.id)
              setUnidadeId('')
            }}
            opcoes={[
              { id: '40k' as Sistema, label: SISTEMA_LABEL['40k'] },
              { id: 'aos' as Sistema, label: SISTEMA_LABEL.aos },
            ]}
          />
        </div>

        <div>
          <label className="rotulo">Facção</label>
          <select
            className="campo"
            value={faccaoId}
            onChange={(e) => {
              setFaccaoId(e.target.value)
              setUnidadeId('')
            }}
          >
            {faccoesDoSistema.map((f) => {
              const n = unidadesDaFaccao(f.id).todas.length
              return (
                <option key={f.id} value={f.id}>
                  {f.destaque ? '★ ' : ''}
                  {f.nome} {n ? `— ${n} unidades` : ''}
                </option>
              )
            })}
          </select>
          {faccao && <p className="mt-1.5 text-xs leading-relaxed text-suave">{faccao.resumo}</p>}
        </div>

        {unidades.length > 0 && (
          <div>
            <label className="rotulo">
              O que tem em {faccao?.nome} ({unidades.length})
            </label>
            <p className="mb-2 text-xs leading-relaxed text-suave">
              Toque para já trazer nome, pontos, habilidades, cores e dica de base para a ficha. Se
              a sua peça não estiver na lista, ignore e escreva o nome abaixo.
            </p>
            <input
              className="campo mb-2"
              type="search"
              placeholder="Filtrar unidade ou personagem…"
              value={buscaUnidade}
              onChange={(e) => setBuscaUnidade(e.target.value)}
            />

            {nomeados.length > 0 && (
              <>
                <div className="titulo-secao mb-1.5 mt-1">Personagens nomeados</div>
                <div className="mb-3 space-y-1.5">
                  {nomeados.map((u) => (
                    <BotaoUnidade
                      key={u.id}
                      unidade={u}
                      selecionada={unidadeId === u.id}
                      aoTocar={() => escolherUnidade(unidadeId === u.id ? '' : u.id)}
                    />
                  ))}
                </div>
              </>
            )}

            {unidadesComuns.length > 0 && (
              <>
                {nomeados.length > 0 && <div className="titulo-secao mb-1.5">Unidades</div>}
                <div className="space-y-1.5">
                  {unidadesComuns.map((u) => (
                    <BotaoUnidade
                      key={u.id}
                      unidade={u}
                      selecionada={unidadeId === u.id}
                      aoTocar={() => escolherUnidade(unidadeId === u.id ? '' : u.id)}
                    />
                  ))}
                </div>
              </>
            )}

            {unidadeId && (
              <button
                type="button"
                className="btn btn-fantasma mt-2 w-full text-sm"
                onClick={() => setUnidadeId('')}
              >
                Desvincular — é uma peça avulsa
              </button>
            )}
          </div>
        )}

        <div>
          <label className="rotulo">Nome</label>
          <input
            className="campo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Esquadrão Intercessor Alfa"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="rotulo">Capítulo / clã</label>
            <input
              className="campo"
              value={subfaccao}
              onChange={(e) => setSubfaccao(e.target.value)}
              placeholder="Opcional"
            />
          </div>
          <div>
            <label className="rotulo">Quantos modelos</label>
            <input
              className="campo"
              type="number"
              min={1}
              inputMode="numeric"
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="rotulo">Status atual</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STATUS_ORDEM.map((s) => (
              <button
                key={s}
                className={`btn text-xs ${status === s ? 'btn-primario' : ''}`}
                onClick={() => setStatus(s)}
              >
                {STATUS_INFO[s].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="rotulo">Posição na fila</label>
          <select
            className="campo"
            value={prioridade}
            onChange={(e) => setPrioridade(Number(e.target.value))}
          >
            {Object.entries(ROTULO_PRIORIDADE).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="rotulo">Notas</label>
          <textarea
            className="campo min-h-20 resize-y"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Conversão, peças que faltam, ideia de esquema…"
          />
        </div>
      </div>
    </Folha>
  )
}
