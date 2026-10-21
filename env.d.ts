/// <reference types="vite/client" />

// Tipagem das variáveis de ambiente expostas ao client.
// Apenas variáveis com prefixo VITE_ são embarcadas no bundle —
// NUNCA coloque segredos aqui (vão para o JS público).
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
