import { computed, readonly, ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Setup store (sintaxe Composition API).
 *
 * Boas práticas aplicadas:
 * - Stores pequenas e focadas em um domínio (aqui: um contador de exemplo).
 * - O state (`count`) é exposto como `readonly` para fora, forçando mutações
 *   a passarem pelas actions (`increment`/`reset`) — fluxo previsível.
 */
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function reset() {
    count.value = 0
  }

  return {
    count: readonly(count),
    doubleCount,
    increment,
    reset,
  }
})
