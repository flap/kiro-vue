# Steering: Boas Práticas Vue 3

Regras que o Kiro deve seguir ao escrever, revisar ou refatorar código Vue neste
projeto. Elas consolidam as melhores práticas atuais de Vue 3 (Composition API,
`<script setup>`, Pinia, Vue Router, Vite e TypeScript).

## Estrutura e API dos componentes

- Usar sempre **Composition API** com `<script setup lang="ts">` em novos componentes.
  Options API só em código legado que ainda não foi migrado.
- Tipar props e emits com as macros de tipo: `defineProps<T>()`, `defineEmits<T>()`,
  `withDefaults` para valores padrão. Evitar a forma em runtime (objeto) quando TS está disponível.
- Preferir `defineModel()` para two-way binding em vez de `modelValue` + `update:modelValue` manual.
- Um componente = uma responsabilidade. Quebrar componentes acima de ~250 linhas.
- Nomes de componente em PascalCase, multi-palavra (`UserCard`, não `Card`).
- Extrair lógica reutilizável para **composables** (`src/composables/useX.ts`) que retornam refs/estado.
- Nomear arquivos de view com sufixo `View` (`HomeView.vue`) e componentes reutilizáveis sem ele.

## Reatividade

- `ref()` para primitivos e quando substituir o valor inteiro; `reactive()` apenas para
  objetos que permanecem com a mesma referência.
- Usar `computed()` para valores derivados — nunca recalcular manualmente em métodos.
- Usar `storeToRefs()` ao desestruturar state/getters de uma store Pinia (preserva reatividade).
- Preferir `shallowRef()` para estruturas grandes substituídas por inteiro (respostas de API,
  listas paginadas) ou dados vindos de libs externas não reativas. Reatividade profunda só
  quando realmente mutar propriedades aninhadas.
- Evitar reatividade excessiva: watchers que disparam em cascata e computeds que recalculam
  demais são gargalos silenciosos. Use `watch`/`watchEffect` com escopo mínimo.

## Estado (Pinia)

- Pinia é a biblioteca oficial de estado. Nada de Vuex em projeto novo.
- Stores pequenas e por domínio (`useUserStore`, `useCartStore`), não uma store monolítica.
- Preferir **setup stores** (função) pela flexibilidade com composables e tipagem.
- Expor state como `readonly()` quando fizer sentido, forçando mutações via actions.
- Desestruturar actions direto da store; state/getters via `storeToRefs()`.

## Template e renderização

- Sempre fornecer `:key` estável e única em `v-for` (não usar índice quando a lista muda de ordem).
- Nunca combinar `v-if` e `v-for` no mesmo elemento.
- Usar `v-show` para alternância frequente de visibilidade; `v-if` para condição que raramente muda.
- `v-once` para conteúdo estático que nunca muda; `v-memo` para listas grandes com
  dependências bem definidas.
- Usar `<KeepAlive>` para preservar componentes caros entre trocas; `<Suspense>` para
  componentes assíncronos; `<Teleport>` para modais/overlays.

## Performance

- **Code splitting por rota**: componentes de rota sempre via `() => import(...)` no router.
- Não importar componentes de rota estaticamente no arquivo de router.
- Lazy load de componentes pesados com `defineAsyncComponent`.
- Virtual scrolling para listas longas (centenas/milhares de itens).
- Analisar o bundle (`npm run analyze`) antes de assumir que algo é pequeno.
- Manter o chunk inicial enxuto; libs de framework em chunk de vendor separado (ver `vite.config.ts`).

## TypeScript

- `strict: true`. Evitar `any`; preferir `unknown` + narrowing quando o tipo é incerto.
- Tipar o retorno de composables e actions.
- Usar os tipos utilitários do Vue (`Ref`, `ComputedRef`, `PropType`) quando necessário.

## Qualidade

- Rodar `npm run type-check`, `npm run lint:check` e `npm run test:unit:run` antes de concluir uma tarefa.
- Escrever testes com Vitest + `@vue/test-utils` para novos componentes e stores.
- Seguir Prettier/ESLint já configurados; não desabilitar regras sem justificativa em comentário.
