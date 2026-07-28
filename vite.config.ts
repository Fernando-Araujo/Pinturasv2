import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// App 100% local: nada sai do iPad. O service worker existe apenas para deixar
// o app utilizável offline (na bancada, sem wifi) e instalável na tela de início.
//
// `--mode single` gera uma variante sem service worker e sem divisão de código,
// para o script scripts/gerar-html-unico.mjs conseguir empacotar tudo em um
// único arquivo .html.
export default defineConfig(({ mode }) => {
  const unico = mode === 'single'

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      ...(unico
        ? []
        : [
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: ['icon.svg'],
              workbox: {
                globPatterns: ['**/*.{js,css,html,svg,woff2}'],
                maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
              },
              manifest: {
                name: 'Ateliê — Tintas & Miniaturas',
                short_name: 'Ateliê',
                description:
                  'Estoque de tintas, laboratório de cores e acompanhamento de miniaturas Warhammer',
                lang: 'pt-BR',
                theme_color: '#0b0d12',
                background_color: '#0b0d12',
                display: 'standalone',
                orientation: 'any',
                start_url: './',
                scope: './',
                icons: [
                  { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
                  { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
                  { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                  { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                ],
              },
            }),
          ]),
    ],
    build: unico
      ? {
          outDir: 'dist-single',
          cssCodeSplit: false,
          // Tudo em um bundle só: sem isso o arquivo único ficaria com
          // imports dinâmicos apontando para chunks que não existem mais.
          rollupOptions: { output: { inlineDynamicImports: true } },
        }
      : {},
    server: { port: 5173 },
  }
})
