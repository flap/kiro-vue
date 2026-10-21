<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HelloWorld from '@/components/HelloWorld.vue'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
// `storeToRefs` mantém a reatividade ao desestruturar state/getters.
// Actions podem ser desestruturadas direto da store.
const { count, doubleCount } = storeToRefs(counter)
const { increment, reset } = counter
</script>

<template>
  <HelloWorld msg="Hello World 👋" user-name="Dev" />

  <section class="counter" aria-live="polite">
    <p>
      Contador: <strong>{{ count }}</strong> (dobro: {{ doubleCount }})
    </p>
    <div class="counter-actions">
      <button type="button" @click="increment">Incrementar</button>
      <button type="button" @click="reset">Zerar</button>
    </div>
  </section>
</template>

<style scoped>
.counter {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.counter-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.counter-actions button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.counter-actions button:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
