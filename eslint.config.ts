import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// https://eslint.vuejs.org / https://typescript-eslint.io
export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    name: 'app/security-rules',
    rules: {
      // Segurança: bloqueia v-html por padrão. Quando for realmente
      // necessário renderizar HTML, sanitize ANTES e desative a regra
      // pontualmente com um comentário justificando.
      'vue/no-v-html': 'error',
      // Boas práticas: exige keys em v-for e evita v-if + v-for juntos.
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
    },
  },

  skipFormatting,
)
