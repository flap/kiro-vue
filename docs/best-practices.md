# Melhores Práticas de Vue 3 — Segurança e Performance

Guia de referência que fundamenta as regras em `.kiro/steering/`. Cada seção explica
**o quê**, **por quê** e **como** com exemplos. As fontes consultadas estão no fim.

> Versões-alvo: Vue 3.5+, Vite 6, Pinia 2, Vue Router 4, TypeScript 5.8, Node ≥ 20.19.

---

## 1. Arquitetura de componentes

### Composition API + `<script setup lang="ts">`

É o padrão recomendado para apps novas em Vue 3: agrupa a lógica relacionada em vez de
espalhá-la por `data`, `methods`, `computed`. Resulta em código mais modular, reutilizável
e com melhor inferência de tipos.

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{ title: string; count?: number }>(), {
  count: 0,
})
const emit = defineEmits<{ change: [value: number] }>()

const doubled = computed(() => props.count * 2)
</script>
```

### Composables para lógica reutilizável

Extraia lógica com estado para `src/composables/useX.ts`. Um composable é uma função que
usa a reatividade do Vue e retorna refs/estado/funções.

```ts
// src/composables/useCounter.ts
import { ref, readonly } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  return { count: readonly(count), increment }
}
```

---

## 2. Reatividade sem desperdício

- `ref()` para primitivos e quando você substitui o valor inteiro.
- `reactive()` só para objetos que mantêm a mesma referência.
- `computed()` para qualquer valor derivado (memoizado automaticamente).
- **`shallowRef()`** para estruturas grandes trocadas por inteiro (respostas de API,
  listas paginadas) ou dados de libs externas. Evita o custo de tornar toda a árvore reativa.

> Regra prática: use `shallowRef` quando substitui o objeto inteiro; use `ref` profundo
> só quando muta propriedades aninhadas individualmente.

Reatividade excessiva é um gargalo silencioso: componentes re-renderizam demais, watchers
disparam em cascata e computeds recalculam sem necessidade. Mantenha watchers com escopo mínimo.

---

## 3. Estado com Pinia

Pinia é a biblioteca oficial (sucessora do Vuex): API simples, type-safe e integrada ao
DevTools. Prefira **stores pequenas por domínio** a uma store monolítica.

```ts
// Setup store — flexível e type-safe
import { ref, computed, readonly } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count: readonly(count), doubleCount, increment }
})
```

Ao consumir, preserve a reatividade ao desestruturar:

```ts
import { storeToRefs } from 'pinia'
const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store) // state/getters
const { increment } = store // actions
```

---

## 4. Performance

### Code splitting por rota (maior impacto)

Carregue o componente da rota sob demanda — reduz o bundle inicial e o tempo até interativo.

```ts
const routes = [{ path: '/about', component: () => import('@/views/AboutView.vue') }]
```

Não importe componentes de rota estaticamente no arquivo do router.

### Otimizações de template

- `:key` estável em `v-for`; nunca `v-if` + `v-for` no mesmo elemento.
- `v-show` para toggles frequentes; `v-if` para condições raras.
- `v-once` para conteúdo estático; `v-memo` para listas grandes com dependências claras.
- `<KeepAlive>`, `<Suspense>`, `defineAsyncComponent` para componentes caros/assíncronos.
- Virtual scrolling para listas muito longas.

### Build (Vite)

- Alvo moderno (ES2020+) gera bundles menores.
- `manualChunks` separa libs de framework num chunk de vendor estável (melhora cache).
- Analise com `npm run analyze` (gera `stats.html`) antes de assumir que algo é leve.

---

## 5. Segurança

### XSS — o ponto mais importante

O Vue escapa automaticamente `{{ }}` e `:attr`. O risco real aparece quando você sai dessa
proteção, principalmente via **`v-html`**.

- Nunca passe conteúdo do usuário/não confiável para `v-html`. A regra ESLint
  `vue/no-v-html` já bloqueia isso como erro.
- Se precisar de HTML rico, sanitize antes com uma lib dedicada (allow-list) e só então renderize.
- Valide URLs antes de bindar em `:href`/`:src` (bloqueie `javascript:`).
- Trate toda entrada externa como não confiável; valide na entrada e codifique na saída.

### Segredos

- Só variáveis `VITE_` chegam ao client — e viram JS público. Nunca coloque segredos nelas.
- Segredos ficam no backend; o front conversa com um backend/proxy.
- `.env` nunca vai para o Git; versione só `.env.example`.

### Defesa em profundidade

- CSP restritiva (ver `index.html`; em produção envie via header HTTP).
- Prefira cookies `HttpOnly`/`Secure`/`SameSite` a `localStorage` para tokens.
- `npm audit` periódico; dependências fixadas, sem ranges abertos.

---

## 6. Qualidade e fluxo

Antes de concluir qualquer tarefa:

```bash
npm run type-check     # tipos
npm run lint:check     # lint
npm run test:unit:run  # testes
npm run build          # build de produção
```

Escreva testes (Vitest + `@vue/test-utils`) para novos componentes e stores.

---

## Fontes consultadas

As recomendações acima foram sintetizadas e parafraseadas das seguintes fontes
(conteúdo reescrito para conformidade com licenciamento):

- Vue.js — Composition API FAQ: <https://vuejs.org/guide/extras/composition-api-faq>
- Vite — Building for Production: <https://v3.vitejs.dev/guide/build>
- GitHub awesome-copilot — Vue 3 standards: <https://github.com/github/awesome-copilot/blob/main/instructions/vue.instructions.md>
- "Vue & Nuxt Performance in 2026": <https://dev.to/parsajiravand/vue-nuxt-performance-in-2026-the-complete-guide-4agk>
- "Why Your Vue App Is Reactive Too Much": <https://dev.to/jacobandrewsky/why-your-vue-app-is-reactive-too-much-and-how-to-fix-it-4n7m>
- "Optimizing Vue.js Performance with shallowRef": <https://dev.to/mochafreddo/optimizing-vuejs-performance-with-shallowref-an-in-depth-guide-25lb>
- Sonar — Bypassing built-in sanitization: <https://www.sonarsource.com/blog/front-end-frameworks-when-bypassing-built-in-sanitization-might-backfire/>
- OpenReplay — Preventing XSS in User-Generated Content: <https://blog.openreplay.com/preventing-xss-user-generated-content/>
- Pinia state management (TypeScript): <https://krython.com/tutorial/typescript/pinia-modern-vue-state-management/>
