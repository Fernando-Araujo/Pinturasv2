import { useRef, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Cabecalho, Conteudo } from '../App'
import {
  db,
  exportarBackup,
  importarBackup,
  limparTudo,
  type Backup,
} from '../db/db'
import { CATALOGO } from '../data/paints'
import { FACCOES, UNIDADES } from '../data/warhammer'
import { Aviso, Folha } from '../components/ui'
import { IconAlerta, IconCheck } from '../components/icons'

export default function Configuracoes() {
  const contagens = useLiveQuery(
    async () => ({
      tintas: await db.tintas.count(),
      minis: await db.minis.count(),
      fotos: await db.fotos.count(),
      sessoes: await db.sessoes.count(),
    }),
    [],
    { tintas: 0, minis: 0, fotos: 0, sessoes: 0 },
  )

  const [ocupado, setOcupado] = useState<string | null>(null)
  const [recado, setRecado] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [confirmandoLimpeza, setConfirmandoLimpeza] = useState(false)
  const [importando, setImportando] = useState<Backup | null>(null)
  const inputArquivo = useRef<HTMLInputElement>(null)

  const [uso, setUso] = useState<{ usado: number; total: number } | null>(null)
  const medirEspaco = async () => {
    if (!navigator.storage?.estimate) {
      setErro('Este navegador não informa o espaço usado.')
      return
    }
    const e = await navigator.storage.estimate()
    setUso({ usado: e.usage ?? 0, total: e.quota ?? 0 })
  }

  const baixar = async (comFotos: boolean) => {
    setOcupado(comFotos ? 'completo' : 'leve')
    setErro(null)
    try {
      const backup = await exportarBackup(comFotos)
      const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const data = new Date().toISOString().slice(0, 10)
      a.href = url
      a.download = `atelie-${data}${comFotos ? '' : '-sem-fotos'}.json`
      a.click()
      // Sem o atraso o Safari cancela o download ao revogar o URL.
      setTimeout(() => URL.revokeObjectURL(url), 4000)
      setRecado('Backup gerado. Guarde o arquivo nos Arquivos ou no iCloud Drive.')
    } catch (e) {
      setErro(`Não deu para gerar o backup: ${(e as Error).message}`)
    } finally {
      setOcupado(null)
    }
  }

  const lerArquivo = async (file: File | undefined) => {
    if (!file) return
    setErro(null)
    try {
      const texto = await file.text()
      const backup = JSON.parse(texto) as Backup
      if (backup?.formato !== 'atelie-backup') {
        throw new Error('Arquivo não parece um backup do Ateliê.')
      }
      setImportando(backup)
    } catch (e) {
      setErro(`Arquivo inválido: ${(e as Error).message}`)
    } finally {
      if (inputArquivo.current) inputArquivo.current.value = ''
    }
  }

  const confirmarImportacao = async (modo: 'substituir' | 'mesclar') => {
    if (!importando) return
    setOcupado('importar')
    setErro(null)
    try {
      await importarBackup(importando, modo)
      setRecado(
        modo === 'substituir'
          ? 'Backup restaurado — os dados anteriores foram substituídos.'
          : 'Backup mesclado com o que já estava aqui.',
      )
      setImportando(null)
    } catch (e) {
      setErro(`Falhou ao importar: ${(e as Error).message}`)
    } finally {
      setOcupado(null)
    }
  }

  return (
    <>
      <Cabecalho titulo="Configurações" subtitulo="Backup, espaço e informações do app" />

      <Conteudo>
        <div className="space-y-4">
          {recado && (
            <div className="card flex items-start gap-3 border-ok/40 bg-ok/8 p-4 text-sm">
              <span className="mt-0.5 text-ok">
                <IconCheck />
              </span>
              <div className="flex-1">{recado}</div>
              <button className="text-suave" onClick={() => setRecado(null)}>
                ×
              </button>
            </div>
          )}
          {erro && (
            <div className="card flex items-start gap-3 border-perigo/40 bg-perigo/8 p-4 text-sm">
              <span className="mt-0.5 text-perigo">
                <IconAlerta />
              </span>
              <div className="flex-1">{erro}</div>
              <button className="text-suave" onClick={() => setErro(null)}>
                ×
              </button>
            </div>
          )}

          <section className="card p-4">
            <h2 className="mb-3 font-bold">O que está guardado</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Tintas', contagens.tintas],
                ['Miniaturas', contagens.minis],
                ['Fotos', contagens.fotos],
                ['Sessões', contagens.sessoes],
              ].map(([label, valor]) => (
                <div key={String(label)} className="rounded-xl bg-superficie2 px-3 py-2.5">
                  <div className="text-2xl font-bold text-ouro">{valor}</div>
                  <div className="text-xs text-suave">{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button className="btn text-sm" onClick={medirEspaco}>
                Medir espaço usado
              </button>
              {uso && (
                <span className="text-sm text-suave">
                  {(uso.usado / 1024 / 1024).toFixed(1)} MB usados
                  {uso.total ? ` de ~${(uso.total / 1024 / 1024 / 1024).toFixed(1)} GB` : ''}
                </span>
              )}
            </div>
          </section>

          <section className="card p-4">
            <h2 className="mb-1 font-bold">Backup</h2>
            <p className="mb-3 text-sm leading-relaxed text-suave">
              Não existe nuvem: se você limpar os dados do Safari ou trocar de iPad, tudo some. O
              backup é um arquivo <code className="text-ouro">.json</code> que você guarda onde
              quiser. Faça um de vez em quando.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn btn-primario"
                onClick={() => baixar(true)}
                disabled={ocupado !== null}
              >
                {ocupado === 'completo' ? 'Gerando…' : 'Exportar tudo (com fotos)'}
              </button>
              <button className="btn" onClick={() => baixar(false)} disabled={ocupado !== null}>
                {ocupado === 'leve' ? 'Gerando…' : 'Exportar sem fotos'}
              </button>
              <button
                className="btn"
                onClick={() => inputArquivo.current?.click()}
                disabled={ocupado !== null}
              >
                Importar backup
              </button>
              <input
                ref={inputArquivo}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => lerArquivo(e.target.files?.[0])}
              />
            </div>
            <p className="mt-2 text-xs text-suave">
              O arquivo com fotos fica grande (as imagens vão embutidas em base64). Para um backup
              rápido só dos dados, use a versão sem fotos.
            </p>
          </section>

          <section className="card p-4">
            <h2 className="mb-1 font-bold">Usar no iPad</h2>
            <ol className="space-y-1.5 text-sm leading-relaxed text-suave">
              <li>
                <strong className="text-texto">1.</strong> Rode{' '}
                <code className="text-ouro">npm run dev</code> no computador (ou{' '}
                <code className="text-ouro">npm run build</code> e sirva a pasta{' '}
                <code className="text-ouro">dist/</code>).
              </li>
              <li>
                <strong className="text-texto">2.</strong> No iPad, abra o endereço da rede local
                que o Vite mostra (algo como{' '}
                <code className="text-ouro">http://192.168.0.10:5173</code>).
              </li>
              <li>
                <strong className="text-texto">3.</strong> No Safari, toque em Compartilhar →
                Adicionar à Tela de Início. O app abre em tela cheia, sem barra do navegador.
              </li>
              <li>
                <strong className="text-texto">4.</strong> Depois da primeira visita ele funciona
                offline: dá para pintar sem wifi na bancada.
              </li>
            </ol>
            <div className="mt-3">
              <Aviso>
                Os dados ficam no navegador que você usou para abrir. Abrir pelo ícone da tela de
                início e abrir pelo Safari é o mesmo armazenamento, mas outro navegador (Chrome no
                iPad, por exemplo) é outro banco, vazio.
              </Aviso>
            </div>
          </section>

          <section className="card p-4">
            <h2 className="mb-1 font-bold">Sobre os dados de referência</h2>
            <p className="text-sm leading-relaxed text-suave">
              O app vem com {CATALOGO.length} tintas de catálogo, {FACCOES.length} facções e{' '}
              {UNIDADES.length} unidades de referência. As cores em hex são aproximações da tinta
              seca — servem para comparar e para achar equivalente entre marcas, mas nenhuma tela
              reproduz pigmento. Pontos e regras mudam a cada dataslate. Corrija o que estiver
              errado direto no app: suas edições ficam salvas aqui.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-suave/70">
              Warhammer, Warhammer 40.000, Age of Sigmar e os nomes de facções e unidades são
              marcas da Games Workshop. Vallejo, Citadel, Army Painter, Scale75, AK e P3 são marcas
              de seus respectivos fabricantes. Este é um app pessoal, sem vínculo com nenhuma
              delas.
            </p>
          </section>

          <section className="card border-perigo/30 p-4">
            <h2 className="mb-1 font-bold text-perigo">Zona de risco</h2>
            <p className="mb-3 text-sm leading-relaxed text-suave">
              Apaga tintas, miniaturas, fotos e sessões deste dispositivo. Não dá para desfazer —
              exporte um backup antes.
            </p>
            <button className="btn btn-perigo" onClick={() => setConfirmandoLimpeza(true)}>
              Apagar todos os dados
            </button>
          </section>
        </div>
      </Conteudo>

      <Folha
        aberta={confirmandoLimpeza}
        aoFechar={() => setConfirmandoLimpeza(false)}
        titulo="Apagar tudo?"
        largura="max-w-md"
        rodape={
          <>
            <button className="btn" onClick={() => setConfirmandoLimpeza(false)}>
              Cancelar
            </button>
            <button
              className="btn btn-perigo"
              onClick={async () => {
                await limparTudo()
                setConfirmandoLimpeza(false)
                setRecado('Tudo apagado. O app está como novo.')
              }}
            >
              Apagar tudo
            </button>
          </>
        }
      >
        <p className="text-sm leading-relaxed">
          Serão apagadas <strong>{contagens.tintas} tintas</strong>,{' '}
          <strong>{contagens.minis} miniaturas</strong>, <strong>{contagens.fotos} fotos</strong> e{' '}
          <strong>{contagens.sessoes} sessões</strong>. O catálogo de referência continua, porque
          faz parte do app.
        </p>
      </Folha>

      <Folha
        aberta={importando !== null}
        aoFechar={() => setImportando(null)}
        titulo="Importar backup"
        largura="max-w-md"
        rodape={
          <>
            <button className="btn" onClick={() => setImportando(null)}>
              Cancelar
            </button>
            <button
              className="btn"
              disabled={ocupado !== null}
              onClick={() => confirmarImportacao('mesclar')}
            >
              Mesclar
            </button>
            <button
              className="btn btn-perigo"
              disabled={ocupado !== null}
              onClick={() => confirmarImportacao('substituir')}
            >
              Substituir tudo
            </button>
          </>
        }
      >
        {importando && (
          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Backup de{' '}
              <strong>{new Date(importando.exportadoEm).toLocaleString('pt-BR')}</strong> com{' '}
              {importando.tintas.length} tintas, {importando.minis.length} miniaturas,{' '}
              {importando.fotos?.length ?? 0} fotos e {importando.sessoes.length} sessões.
            </p>
            <p className="text-suave">
              <strong className="text-texto">Mesclar</strong> soma o backup ao que já está aqui
              (pode duplicar itens que você já tem).{' '}
              <strong className="text-texto">Substituir</strong> apaga o conteúdo atual e deixa
              apenas o do arquivo.
            </p>
          </div>
        )}
      </Folha>
    </>
  )
}
