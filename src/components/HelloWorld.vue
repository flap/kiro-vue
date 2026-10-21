<script setup lang="ts">
/**
 * Componente de apresentação.
 *
 * Boas práticas aplicadas:
 * - `<script setup lang="ts">` com props tipadas via `defineProps<T>()`.
 * - Valores padrão com `withDefaults`.
 * - Nenhum uso de `v-html`: todo texto vai por interpolação `{{ }}`,
 *   que é escapado automaticamente pelo Vue (proteção contra XSS).
 */
withDefaults(
  defineProps<{
    msg: string
    /** Texto fornecido pelo usuário — renderizado com segurança via interpolação. */
    userName?: string
  }>(),
  {
    userName: 'visitante',
  },
)
</script>

<template>
  <section class="hello">
    <h1>{{ msg }}</h1>
    <p>Olá, {{ userName }}! Bem-vindo ao projeto base de Vue 3 com Kiro.</p>
  </section>
</template>

<style scoped>
.hello h1 {
  color: var(--color-accent);
  margin-bottom: 0.25rem;
}
</style>
