/**
 * Empacota o build em um único arquivo .html, sem nenhum recurso externo.
 *
 * Roda depois de `vite build --mode single`, que já produz um bundle só (sem
 * divisão de código) e sem service worker. Aqui o JS, o CSS e os ícones entram
 * embutidos no próprio HTML.
 *
 * Uso: npm run build:html
 */
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist-single')
const saida = join(raiz, 'entrega', 'Atelie.html')

/** Impede que o conteúdo do bundle feche a tag <script> antes da hora. */
const protegerScript = (js) =>
  js.replaceAll('</script', '<\\/script').replaceAll('<!--', '<\\!--')

const dataUri = (buf, mime) => `data:${mime};base64,${buf.toString('base64')}`

const arquivos = await readdir(join(dist, 'assets'))
const nomeJs = arquivos.find((f) => f.endsWith('.js'))
const nomeCss = arquivos.find((f) => f.endsWith('.css'))
if (!nomeJs) throw new Error('Bundle JS não encontrado em dist-single/assets')

const [js, css, svg, png192] = await Promise.all([
  readFile(join(dist, 'assets', nomeJs), 'utf8'),
  nomeCss ? readFile(join(dist, 'assets', nomeCss), 'utf8') : Promise.resolve(''),
  readFile(join(dist, 'icon.svg')),
  readFile(join(dist, 'icon-192.png')),
])

let html = await readFile(join(dist, 'index.html'), 'utf8')

// As substituições usam função, nunca string: um `$'` ou `$&` dentro do JS
// minificado seria interpretado como padrão especial de replace e embaralharia
// o arquivo inteiro de um jeito difícil de perceber.
html = html
  // <script type="module" src="./assets/xxx.js"> -> conteúdo embutido
  .replace(
    /<script[^>]*src="[^"]*\.js"[^>]*><\/script>/,
    () => `<script type="module">\n${protegerScript(js)}\n</script>`,
  )
  // <link rel="stylesheet" href="./assets/xxx.css"> -> <style>
  .replace(/<link[^>]*rel="stylesheet"[^>]*>/, () => `<style>\n${css}\n</style>`)
  // ícones viram data URI
  .replace(/href="\.\/icon\.svg"/g, () => `href="${dataUri(svg, 'image/svg+xml')}"`)
  .replace(/href="\.\/icon-192\.png"/g, () => `href="${dataUri(png192, 'image/png')}"`)
  // sobras de qualquer preload/modulepreload apontando para arquivo externo
  .replace(/<link[^>]*rel="(?:module)?preload"[^>]*>/g, '')

if (html.includes('assets/')) {
  throw new Error(
    'O HTML ainda referencia arquivos em assets/ — o empacotamento não ficou completo.',
  )
}

await mkdir(dirname(saida), { recursive: true })
await writeFile(saida, html, 'utf8')

const mb = (Buffer.byteLength(html, 'utf8') / 1024 / 1024).toFixed(2)
console.log(`\n  Arquivo único gerado: entrega/Atelie.html (${mb} MB)\n`)
