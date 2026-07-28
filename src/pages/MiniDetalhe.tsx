import { useMemo, useRef, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  apagarFoto,
  apagarMini,
  db,
  mudarStatus,
  salvarFoto,
  type Foto,
  type Miniatura,
  type ParteEsquema,
  type Sessao,
  type Tinta,
} from '../db/db'
import {
  FACCOES_POR_ID,
  progressoDoStatus,
  RECEITAS_BASE,
  STATUS_INFO,
  STATUS_ORDEM,
  UNIDADES,
  type StatusMini,
} from '../data/warhammer'
import { Amostra, Barra, Folha, ImagemBlob, Selo, useObjectUrl } from '../components/ui'
import {
  IconCamera,
  IconCheck,
  IconLixeira,
  IconMais,
  IconRelogio,
  IconRoda,
  IconVoltar,
  IconX,
} from '../components/icons'
import { formatarData, formatarMinutos } from '../lib/stats'
import { readableOn } from '../lib/color'
import { doMeuEstoque } from '../lib/matching'

export default function MiniDetalhe() {
  const { id } = useParams()
  const miniId = Number(id)
  const navegar = useNavigate()

  const mini = useLiveQuery(() => db.minis.get(miniId), [miniId])
  const fotos = useLiveQuery(
    () => db.fotos.where('miniId').equals(miniId).toArray(),
    [miniId],
    [] as Foto[],
  )
  const sessoes = useLiveQuery(
    () => db.sessoes.where('miniId').equals(miniId).reverse().sortBy('data'),
    [miniId],
    [] as Sessao[],
  )
  const tintas = useLiveQuery(() => db.tintas.toArray(), [], [] as Tinta[])

  const [fotoAberta, setFotoAberta] = useState<Foto | null>(null)
  const [registrandoSessao, setRegistrandoSessao] = useState(false)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)
  const [editandoParte, setEditandoParte] = useState<number | null>(null)
  const inputFoto = useRef<HTMLInputElement>(null)
  const [enviandoFoto, setEnviandoFoto] = useState(false)

  const unidade = useMemo(
    () => (mini?.unidadeId ? UNIDADES.find((u) => u.id === mini.unidadeId) : undefined),
    [mini?.unidadeId],
  )
  const faccao = mini ? FACCOES_POR_ID.get(mini.faccaoId) : undefined
  const receita = mini?.baseReceitaId
    ? RECEITAS_BASE.find((r) => r.id === mini.baseReceitaId)
    : RECEITAS_BASE.find((r) => mini && r.combina.includes(mini.faccaoId))

  const minutosTotais = sessoes.reduce((s, x) => s + x.minutos, 0)

  if (mini === undefined) {
    return <div className="p-8 text-center text-sm text-suave">Carregando…</div>
  }
  if (mini === null) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-suave">Esta miniatura não existe mais.</p>
        <Link className="btn mt-4" to="/minis">
          Voltar
        </Link>
      </div>
    )
  }

  const salvar = (patch: Partial<Miniatura>) => db.minis.update(miniId, patch)

  const enviarFotos = async (files: FileList | null) => {
    if (!files?.length) return
    setEnviandoFoto(true)
    try {
      for (const f of Array.from(files)) await salvarFoto(miniId, f)
    } finally {
      setEnviandoFoto(false)
      if (inputFoto.current) inputFoto.current.value = ''
    }
  }

  const st = STATUS_INFO[mini.status]

  return (
    <>
      <header className="safe-top sticky top-0 z-30 border-b border-borda bg-fundo/92 px-4 py-3 backdrop-blur lg:px-6">
        <div className="mx-auto flex max-w-5xl items-center gap-2">
          <button className="btn btn-fantasma px-2" onClick={() => navegar('/minis')}>
            <IconVoltar />
          </button>
          <div className="min-w-0 flex-1">
            <input
              className="w-full truncate border-none bg-transparent p-0 text-xl font-bold tracking-tight outline-none"
              value={mini.nome}
              onChange={(e) => salvar({ nome: e.target.value })}
              aria-label="Nome da miniatura"
            />
            <div className="truncate text-xs text-suave">
              {faccao?.nome}
              {mini.subfaccao ? ` · ${mini.subfaccao}` : ''} · {mini.quantidade}{' '}
              {mini.quantidade > 1 ? 'modelos' : 'modelo'}
            </div>
          </div>
          <button className="btn btn-perigo px-3" onClick={() => setConfirmandoExclusao(true)}>
            <IconLixeira size={18} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-4 px-4 py-5 lg:px-6">
        {/* ---------------- fotos ---------------- */}
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-3.5">
            <span className="titulo-secao">Fotos</span>
            <button
              className="btn btn-fantasma text-sm"
              onClick={() => inputFoto.current?.click()}
              disabled={enviandoFoto}
            >
              <IconCamera size={18} /> {enviandoFoto ? 'Salvando…' : 'Adicionar'}
            </button>
            <input
              ref={inputFoto}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => enviarFotos(e.target.files)}
            />
          </div>
          {fotos.length === 0 ? (
            <button
              className="m-4 flex w-[calc(100%-2rem)] flex-col items-center gap-2 rounded-xl border border-dashed border-borda py-10 text-suave"
              onClick={() => inputFoto.current?.click()}
            >
              <IconCamera size={30} />
              <span className="text-sm">Fotografe a peça — antes, durante e depois</span>
            </button>
          ) : (
            <div className="trilha gap-2 p-4">
              {fotos.map((f) => (
                <button
                  key={f.id}
                  className={`relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border ${
                    mini.fotoCapaId === f.id ? 'border-ouro' : 'border-borda'
                  }`}
                  onClick={() => setFotoAberta(f)}
                >
                  <ImagemBlob blob={f.thumb} alt="" className="h-full w-full object-cover" />
                  {mini.fotoCapaId === f.id && (
                    <span className="absolute left-1 top-1 rounded bg-ouro px-1 text-[9px] font-bold text-[#14100a]">
                      CAPA
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ---------------- status ---------------- */}
        <section className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="titulo-secao">Status</span>
            <Selo cor={st.cor}>{st.label}</Selo>
          </div>
          <Barra valor={progressoDoStatus(mini.status)} cor={st.cor} altura={8} />
          <p className="mt-2 text-xs text-suave">{st.descricao}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STATUS_ORDEM.map((s) => (
              <button
                key={s}
                className={`btn text-xs ${mini.status === s ? 'btn-primario' : ''}`}
                onClick={() => mudarStatus(miniId, s as StatusMini)}
              >
                {STATUS_INFO[s].label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 border-t border-borda pt-3 text-center">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-suave">Cadastrada</div>
              <div className="text-sm font-semibold">{formatarData(mini.criadoEm)}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-suave">Começou</div>
              <div className="text-sm font-semibold">{formatarData(mini.iniciadoEm)}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-suave">Terminou</div>
              <div className="text-sm font-semibold">{formatarData(mini.finalizadoEm)}</div>
            </div>
          </div>
        </section>

        {/* ---------------- tempo ---------------- */}
        <section className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="titulo-secao">Tempo de bancada</span>
            <button className="btn btn-fantasma text-sm" onClick={() => setRegistrandoSessao(true)}>
              <IconMais size={18} /> Registrar sessão
            </button>
          </div>
          <div className="flex items-baseline gap-4">
            <div>
              <div className="text-3xl font-bold text-ouro">{formatarMinutos(minutosTotais)}</div>
              <div className="text-xs text-suave">
                {sessoes.length} {sessoes.length === 1 ? 'sessão' : 'sessões'}
                {mini.quantidade > 1 &&
                  minutosTotais > 0 &&
                  ` · ${formatarMinutos(Math.round(minutosTotais / mini.quantidade))} por modelo`}
              </div>
            </div>
          </div>
          {sessoes.length > 0 && (
            <div className="mt-3 space-y-1.5 border-t border-borda pt-3">
              {sessoes.slice(0, 6).map((s) => (
                <div key={s.id} className="flex items-center gap-2 text-sm">
                  <IconRelogio size={16} className="shrink-0 text-suave" />
                  <span className="w-20 shrink-0 text-suave">{formatarData(s.data)}</span>
                  <span className="font-semibold">{formatarMinutos(s.minutos)}</span>
                  <span className="min-w-0 flex-1 truncate text-xs text-suave">{s.notas}</span>
                  <div className="flex shrink-0 -space-x-1">
                    {s.tintaIds.slice(0, 5).map((tid) => {
                      const t = tintas.find((x) => x.id === tid)
                      return t ? (
                        <span
                          key={tid}
                          className="h-4 w-4 rounded-full border border-fundo"
                          style={{ background: t.hex }}
                          title={t.nome}
                        />
                      ) : null
                    })}
                  </div>
                  <button
                    className="shrink-0 text-suave/60 hover:text-perigo"
                    onClick={() => db.sessoes.delete(s.id!)}
                    aria-label="Apagar sessão"
                  >
                    <IconX size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------------- esquema de cores ---------------- */}
        <section className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="titulo-secao">Esquema de cores</span>
            <button
              className="btn btn-fantasma text-sm"
              onClick={() => {
                salvar({
                  esquema: [...mini.esquema, { parte: 'Nova parte', hex: '#7a5231', nota: '' }],
                })
                setEditandoParte(mini.esquema.length)
              }}
            >
              <IconMais size={18} /> Parte
            </button>
          </div>
          {mini.esquema.length === 0 ? (
            <p className="py-4 text-center text-sm text-suave">
              Nenhuma parte definida ainda. Adicione as partes da peça (armadura, panos, metais…) e
              vincule a tinta de cada uma.
            </p>
          ) : (
            <div className="space-y-2">
              {mini.esquema.map((p, i) => {
                const tinta = p.tintaId ? tintas.find((t) => t.id === p.tintaId) : undefined
                return (
                  <button
                    key={i}
                    className="flex w-full items-center gap-3 rounded-xl border border-borda bg-superficie2 px-3 py-2.5 text-left"
                    onClick={() => setEditandoParte(i)}
                  >
                    <Amostra hex={tinta?.hex ?? p.hex} tamanho={36} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{p.parte}</div>
                      <div className="truncate text-[11px] text-suave">
                        {tinta ? `${tinta.marca} ${tinta.nome}` : p.nota || 'Sem tinta vinculada'}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        {/* ---------------- ficha da unidade ---------------- */}
        {unidade && (
          <section className="card p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="titulo-secao">Ficha de jogo</span>
              <div className="flex items-center gap-2">
                <Selo cor="var(--color-turquesa)" suave>
                  {unidade.papel}
                </Selo>
                <Selo cor="var(--color-ouro)" suave>
                  {unidade.pontos} pts / {unidade.pontosPara}
                </Selo>
              </div>
            </div>
            <p className="mb-3 text-xs text-suave">
              {unidade.modelos} · base {unidade.baseTamanho}
            </p>

            <div className="space-y-3">
              <div>
                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-suave">
                  Em mesa
                </div>
                <ul className="space-y-1">
                  {unidade.habilidades.map((h, i) => (
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
                  {unidade.cores.map((c, i) => (
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
                  {unidade.dicasPintura.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-suave">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-turquesa" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-borda bg-superficie2 p-3">
                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-suave">
                  Base desta unidade
                </div>
                <p className="text-sm leading-relaxed">{unidade.baseTerreno}</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-suave/70">
              Pontos e regras mudam a cada dataslate — confira o app oficial antes de montar lista.
            </p>
          </section>
        )}

        {/* ---------------- receita de base ---------------- */}
        <section className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="titulo-secao">Receita da base</span>
            <select
              className="campo w-auto py-1.5 text-sm"
              value={mini.baseReceitaId ?? receita?.id ?? ''}
              onChange={(e) => salvar({ baseReceitaId: e.target.value || undefined })}
            >
              <option value="">Escolher…</option>
              {RECEITAS_BASE.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nome}
                </option>
              ))}
            </select>
          </div>
          {receita ? (
            <>
              <p className="mb-2 text-xs text-suave">{receita.ambiente}</p>
              <ol className="space-y-1.5">
                {receita.passos.map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-superficie3 text-[11px] font-bold text-suave">
                      {i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="text-sm text-suave">Escolha uma receita acima.</p>
          )}
        </section>

        {/* ---------------- ajustes ---------------- */}
        <section className="card space-y-3 p-4">
          <span className="titulo-secao">Detalhes</span>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="rotulo">Capítulo / clã</label>
              <input
                className="campo"
                value={mini.subfaccao}
                onChange={(e) => salvar({ subfaccao: e.target.value })}
              />
            </div>
            <div>
              <label className="rotulo">Modelos</label>
              <input
                className="campo"
                type="number"
                min={1}
                inputMode="numeric"
                value={mini.quantidade}
                onChange={(e) => salvar({ quantidade: Math.max(1, Number(e.target.value)) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="rotulo">Fila</label>
              <select
                className="campo"
                value={mini.prioridade}
                onChange={(e) => salvar({ prioridade: Number(e.target.value) })}
              >
                <option value={1}>1 — Próxima</option>
                <option value={2}>2 — Logo depois</option>
                <option value={3}>3 — Este mês</option>
                <option value={4}>4 — Quando der</option>
                <option value={5}>5 — Algum dia</option>
              </select>
            </div>
            <div>
              <label className="rotulo">Prazo</label>
              <input
                className="campo"
                type="date"
                value={mini.prazo ? new Date(mini.prazo).toISOString().slice(0, 10) : ''}
                onChange={(e) =>
                  salvar({
                    prazo: e.target.value ? new Date(`${e.target.value}T12:00:00`).getTime() : undefined,
                  })
                }
              />
            </div>
          </div>
          <div>
            <label className="rotulo">Notas</label>
            <textarea
              className="campo min-h-24 resize-y"
              value={mini.notas}
              onChange={(e) => salvar({ notas: e.target.value })}
              placeholder="O que falta, o que deu errado, ideia para a próxima…"
            />
          </div>
        </section>
      </div>

      {/* ---------------- modais ---------------- */}

      <VisualizadorFoto
        foto={fotoAberta}
        ehCapa={fotoAberta?.id === mini.fotoCapaId}
        aoFechar={() => setFotoAberta(null)}
        aoDefinirCapa={() => {
          salvar({ fotoCapaId: fotoAberta?.id })
          setFotoAberta(null)
        }}
        aoApagar={async () => {
          if (fotoAberta?.id) await apagarFoto(fotoAberta.id)
          setFotoAberta(null)
        }}
      />

      <FolhaSessao
        aberta={registrandoSessao}
        aoFechar={() => setRegistrandoSessao(false)}
        miniId={miniId}
        tintas={tintas}
        tintasDoEsquema={mini.esquema
          .map((p) => p.tintaId)
          .filter((x): x is number => x !== undefined)}
      />

      {editandoParte !== null && mini.esquema[editandoParte] && (
        <FolhaParte
          parte={mini.esquema[editandoParte]}
          tintas={tintas}
          aoFechar={() => setEditandoParte(null)}
          aoSalvar={(nova) => {
            const esquema = [...mini.esquema]
            esquema[editandoParte] = nova
            salvar({ esquema })
            setEditandoParte(null)
          }}
          aoRemover={() => {
            salvar({ esquema: mini.esquema.filter((_, i) => i !== editandoParte) })
            setEditandoParte(null)
          }}
        />
      )}

      <Folha
        aberta={confirmandoExclusao}
        aoFechar={() => setConfirmandoExclusao(false)}
        titulo="Apagar miniatura"
        largura="max-w-md"
        rodape={
          <>
            <button className="btn" onClick={() => setConfirmandoExclusao(false)}>
              Cancelar
            </button>
            <button
              className="btn btn-perigo"
              onClick={async () => {
                await apagarMini(miniId)
                navegar('/minis')
              }}
            >
              Apagar tudo
            </button>
          </>
        }
      >
        <p className="text-sm leading-relaxed">
          Isso apaga <strong>{mini.nome}</strong> e as {fotos.length} fotos dela. As sessões de
          pintura registradas continuam contando no tempo total do painel, mas perdem o vínculo com
          esta peça. Não dá para desfazer.
        </p>
      </Folha>
    </>
  )
}

/* ------------------------------------------------------------------ */

function VisualizadorFoto({
  foto,
  ehCapa,
  aoFechar,
  aoDefinirCapa,
  aoApagar,
}: {
  foto: Foto | null
  ehCapa: boolean
  aoFechar: () => void
  aoDefinirCapa: () => void
  aoApagar: () => void
}) {
  const url = useObjectUrl(foto?.blob)
  if (!foto) return null
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
      <div className="safe-top flex items-center justify-between px-4 py-3">
        <button className="btn btn-fantasma px-2" onClick={aoFechar}>
          <IconX />
        </button>
        <div className="flex gap-2">
          {!ehCapa && (
            <button className="btn text-sm" onClick={aoDefinirCapa}>
              <IconCheck size={18} /> Usar como capa
            </button>
          )}
          <button className="btn btn-perigo text-sm" onClick={aoApagar}>
            <IconLixeira size={18} />
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center p-4">
        {url && <img src={url} alt="" className="max-h-full max-w-full object-contain" />}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function FolhaSessao({
  aberta,
  aoFechar,
  miniId,
  tintas,
  tintasDoEsquema,
}: {
  aberta: boolean
  aoFechar: () => void
  miniId: number
  tintas: Tinta[]
  tintasDoEsquema: number[]
}) {
  const [minutos, setMinutos] = useState(60)
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10))
  const [notas, setNotas] = useState('')
  const [usadas, setUsadas] = useState<Set<number>>(new Set())
  const [busca, setBusca] = useState('')

  // As tintas do esquema desta peça vêm primeiro: são as que você usou.
  const ordenadas = useMemo(() => {
    const q = busca.trim().toLowerCase()
    const base = q
      ? tintas.filter((t) => `${t.marca} ${t.nome} ${t.codigo}`.toLowerCase().includes(q))
      : tintas
    return [...base].sort((a, b) => {
      const pa = tintasDoEsquema.includes(a.id!) ? 0 : 1
      const pb = tintasDoEsquema.includes(b.id!) ? 0 : 1
      return pa - pb || a.nome.localeCompare(b.nome, 'pt-BR')
    })
  }, [tintas, tintasDoEsquema, busca])

  const salvar = async () => {
    await db.sessoes.add({
      miniId,
      data: new Date(`${data}T12:00:00`).getTime(),
      minutos: Math.max(1, minutos),
      tintaIds: [...usadas],
      notas: notas.trim(),
    } as Sessao)
    setMinutos(60)
    setNotas('')
    setUsadas(new Set())
    setBusca('')
    aoFechar()
  }

  return (
    <Folha
      aberta={aberta}
      aoFechar={aoFechar}
      titulo="Registrar sessão de pintura"
      rodape={
        <>
          <button className="btn" onClick={aoFechar}>
            Cancelar
          </button>
          <button className="btn btn-primario" onClick={salvar}>
            Salvar sessão
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="rotulo">Data</label>
            <input
              className="campo"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <label className="rotulo">Minutos</label>
            <input
              className="campo"
              type="number"
              min={1}
              inputMode="numeric"
              value={minutos}
              onChange={(e) => setMinutos(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="trilha">
          {[15, 30, 45, 60, 90, 120, 180].map((m) => (
            <button
              key={m}
              className={`chip ${minutos === m ? 'chip-ativo' : ''}`}
              onClick={() => setMinutos(m)}
            >
              {formatarMinutos(m)}
            </button>
          ))}
        </div>

        <div>
          <label className="rotulo">Notas da sessão</label>
          <input
            className="campo"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Terminei as ombreiras e as lentes"
          />
        </div>

        <div>
          <label className="rotulo">Tintas usadas ({usadas.size})</label>
          {tintas.length === 0 ? (
            <p className="text-sm text-suave">Cadastre tintas no estoque para marcar aqui.</p>
          ) : (
            <>
              <input
                className="campo mb-2"
                type="search"
                placeholder="Filtrar tintas…"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <div className="grid max-h-72 grid-cols-2 gap-1.5 overflow-y-auto sm:grid-cols-3">
                {ordenadas.map((t) => {
                  const sel = usadas.has(t.id!)
                  return (
                    <button
                      key={t.id}
                      onClick={() =>
                        setUsadas((s) => {
                          const n = new Set(s)
                          n.has(t.id!) ? n.delete(t.id!) : n.add(t.id!)
                          return n
                        })
                      }
                      className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left ${
                        sel ? 'border-ouro bg-ouro/10' : 'border-borda bg-superficie2'
                      }`}
                    >
                      <Amostra hex={t.hex} tamanho={22} />
                      <span className="min-w-0 flex-1 truncate text-xs">{t.nome}</span>
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </Folha>
  )
}

/* ------------------------------------------------------------------ */

function FolhaParte({
  parte,
  tintas,
  aoFechar,
  aoSalvar,
  aoRemover,
}: {
  parte: ParteEsquema
  tintas: Tinta[]
  aoFechar: () => void
  aoSalvar: (p: ParteEsquema) => void
  aoRemover: () => void
}) {
  const [rascunho, setRascunho] = useState<ParteEsquema>(parte)
  const [busca, setBusca] = useState('')
  const tintaAtual = rascunho.tintaId ? tintas.find((t) => t.id === rascunho.tintaId) : undefined

  // Aqui a lista não é filtrada por distância: você precisa poder escolher
  // qualquer tinta da bancada. As mais próximas da cor só vêm primeiro.
  const sugestoes = useMemo(() => {
    const q = busca.trim().toLowerCase()
    const base = q
      ? tintas.filter((t) => `${t.marca} ${t.nome} ${t.codigo}`.toLowerCase().includes(q))
      : tintas
    return doMeuEstoque(rascunho.hex, base, q ? 30 : 8, {
      maxDeltaE: Infinity,
      apenasDisponiveis: false,
    })
  }, [rascunho.hex, tintas, busca])

  return (
    <Folha
      aberta
      aoFechar={aoFechar}
      titulo="Parte do esquema"
      rodape={
        <>
          <button className="btn btn-perigo mr-auto" onClick={aoRemover}>
            <IconLixeira size={18} />
          </button>
          <button className="btn" onClick={aoFechar}>
            Cancelar
          </button>
          <button className="btn btn-primario" onClick={() => aoSalvar(rascunho)}>
            Salvar
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="rotulo">Parte da miniatura</label>
          <input
            className="campo"
            value={rascunho.parte}
            onChange={(e) => setRascunho({ ...rascunho, parte: e.target.value })}
            placeholder="Armadura, panos, metais, lentes…"
            autoFocus
          />
        </div>

        <div>
          <label className="rotulo">Cor</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              className="h-11 w-20 cursor-pointer rounded-lg border border-borda bg-superficie2"
              value={rascunho.hex}
              onChange={(e) => setRascunho({ ...rascunho, hex: e.target.value, tintaId: undefined })}
            />
            <div
              className="flex h-11 flex-1 items-center rounded-lg px-3 font-mono text-sm font-bold"
              style={{ background: rascunho.hex, color: readableOn(rascunho.hex) }}
            >
              {rascunho.hex.toUpperCase()}
            </div>
            <Link className="btn px-3" to={`/laboratorio?cor=${encodeURIComponent(rascunho.hex)}`}>
              <IconRoda size={18} />
            </Link>
          </div>
        </div>

        <div>
          <label className="rotulo">
            Tinta vinculada {tintaAtual ? `· ${tintaAtual.marca} ${tintaAtual.nome}` : ''}
          </label>
          {tintas.length === 0 ? (
            <p className="text-sm text-suave">Nenhuma tinta no estoque ainda.</p>
          ) : (
            <div className="space-y-1.5">
              <input
                className="campo mb-1"
                type="search"
                placeholder="Filtrar tintas do estoque…"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              {sugestoes.map(({ tinta, deltaE }) => (
                <button
                  key={tinta.id}
                  className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-left ${
                    rascunho.tintaId === tinta.id
                      ? 'border-ouro bg-ouro/10'
                      : 'border-borda bg-superficie2'
                  }`}
                  onClick={() =>
                    setRascunho({ ...rascunho, tintaId: tinta.id, hex: tinta.hex })
                  }
                >
                  <Amostra hex={tinta.hex} tamanho={30} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{tinta.nome}</div>
                    <div className="truncate text-[11px] text-suave">
                      {tinta.marca}
                      {tinta.codigo ? ` · ${tinta.codigo}` : ''}
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] text-suave">ΔE {deltaE.toFixed(1)}</span>
                </button>
              ))}
              {rascunho.tintaId && (
                <button
                  className="btn btn-fantasma w-full text-sm"
                  onClick={() => setRascunho({ ...rascunho, tintaId: undefined })}
                >
                  Desvincular tinta
                </button>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="rotulo">Anotação</label>
          <input
            className="campo"
            value={rascunho.nota}
            onChange={(e) => setRascunho({ ...rascunho, nota: e.target.value })}
            placeholder="Duas camadas finas, wash Nuln Oil, luz nas quinas"
          />
        </div>
      </div>
    </Folha>
  )
}
