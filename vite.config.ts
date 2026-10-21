import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueDevTools(),
    // Gera stats.html para análise de bundle quando rodar `npm run analyze`.
    mode === 'analyze' &&
      visualizer({
        filename: 'stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Alvo moderno: browsers com suporte nativo a ESM geram bundles menores.
    target: 'es2020',
    // Alerta cedo quando um chunk cresce demais (ajuda a detectar regressões).
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Separa as libs de framework em um chunk de vendor estável,
        // melhorando o cache de longo prazo entre deploys.
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
}))
