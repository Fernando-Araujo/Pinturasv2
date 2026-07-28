import { useEffect, useState } from 'react'
import { db } from '../db/db'
import { IconAlerta } from './icons'

/**
 * O app inteiro depende do IndexedDB. Em algumas formas de abrir a página —
 * principalmente um arquivo .html solto (file://) e a navegação privada do
 * Safari — o WebKit trata a origem como descartável e recusa ou perde o
 * armazenamento.
 *
 * Falhar em silêncio aqui seria o pior comportamento possível: a pessoa
 * cadastra cinquenta tintas, fecha a aba e perde tudo. Então testamos a
 * abertura do banco logo na entrada e, se não der, dizemos isso de forma
 * impossível de ignorar.
 */
export function AvisoArmazenamento() {
  const [falhou, setFalhou] = useState(false)
  const [dispensado, setDispensado] = useState(false)

  useEffect(() => {
    let vivo = true
    const testar = async () => {
      try {
        if (typeof indexedDB === 'undefined') throw new Error('IndexedDB indisponível')
        await db.open()
        // Escrever e ler de volta: abrir pode funcionar e a gravação não.
        await db.config.put({ chave: '__teste_armazenamento', valor: Date.now() })
        const lido = await db.config.get('__teste_armazenamento')
        if (!lido) throw new Error('Gravação não persistiu')
      } catch {
        if (vivo) setFalhou(true)
      }
    }
    testar()
    return () => {
      vivo = false
    }
  }, [])

  if (!falhou || dispensado) return null

  const viaArquivo = location.protocol === 'file:'

  return (
    <div className="safe-top sticky top-0 z-50 border-b border-perigo/50 bg-[#2a1416] px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-start gap-3">
        <span className="mt-0.5 shrink-0 text-perigo">
          <IconAlerta />
        </span>
        <div className="min-w-0 flex-1 text-sm leading-relaxed">
          <strong className="text-perigo">Nada será salvo neste modo.</strong>{' '}
          {viaArquivo ? (
            <>
              O Safari bloqueia o armazenamento de páginas abertas como arquivo
              (<code>file://</code>). Dá para navegar e usar o laboratório de cores, mas o que
              você cadastrar some ao fechar. Para salvar de verdade, abra o app por um endereço{' '}
              <code>http://</code> — pela sua rede local ou por um host estático.
            </>
          ) : (
            <>
              O navegador recusou o banco de dados local. Isso costuma ser navegação privada,
              armazenamento cheio ou bloqueio de cookies/dados de site. Saia da navegação privada
              ou libere o armazenamento para este endereço.
            </>
          )}
        </div>
        <button
          className="shrink-0 text-xs font-semibold text-suave underline"
          onClick={() => setDispensado(true)}
        >
          entendi
        </button>
      </div>
    </div>
  )
}
