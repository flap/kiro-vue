<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <nav class="app-nav" aria-label="Navegação principal">
      <RouterLink to="/">Início</RouterLink>
      <RouterLink to="/about">Sobre</RouterLink>
    </nav>
  </header>

  <main class="app-main">
    <!-- RouterView renderiza a rota atual; cada rota é carregada sob demanda. -->
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--color-border);
}

.app-nav {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 2rem;
  max-width: 960px;
  margin: 0 auto;
}

.app-nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 600;
}

.app-nav a.router-link-exact-active {
  color: var(--color-accent);
}

.app-main {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
