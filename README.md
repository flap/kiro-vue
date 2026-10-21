# Kiro Vue — Hello World

Projeto base **Hello World** em Vue 3 + TypeScript + Vite, estruturado com as melhores
práticas atuais de **segurança** e **performance**, e documentado para ser usado com o
[Kiro](https://kiro.dev): outro desenvolvedor pode clonar e continuar, ou aplicar os
padrões em um projeto existente.

## Stack

- **Vue 3.5** (Composition API + `<script setup>`)
- **TypeScript 5.8** (modo strict)
- **Vite 6** (build e dev server)
- **Pinia 2** (estado) e **Vue Router 4** (rotas com lazy loading)
- **Vitest** + **@vue/test-utils** (testes) · **ESLint** + **Prettier** (qualidade)

## Começando

```bash
npm install        # instala dependências (versões fixadas)
cp .env.example .env
npm run dev        # http://localhost:5173
```

### Scripts

| Script                  | O que faz                                            |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Dev server com HMR                                   |
| `npm run build`         | Type-check + build de produção                       |
| `npm run preview`       | Serve o build localmente                             |
| `npm run type-check`    | Checagem de tipos (vue-tsc)                          |
| `npm run lint`          | ESLint com `--fix`                                   |
| `npm run lint:check`    | ESLint sem corrigir (CI)                             |
| `npm run format`        | Prettier                                             |
| `npm run test:unit`     | Testes em watch                                      |
| `npm run test:unit:run` | Testes uma vez (CI)                                  |
| `npm run analyze`       | Build + análise visual do bundle (`stats.html`)      |

## Estrutura

```
.
├─ .kiro/
│  └─ steering/              # Regras que o Kiro aplica automaticamente
│     ├─ vue-best-practices.md
│     └─ vue-security.md
├─ docs/
│  ├─ best-practices.md      # Guia detalhado (fundamenta os steerings)
│  ├─ MCP.md                 # Como configurar e usar MCPs com o Kiro
│  └─ mcp.example.json       # Template de .kiro/settings/mcp.json
├─ src/
│  ├─ assets/                # CSS global
│  ├─ components/            # Componentes reutilizáveis (+ __tests__)
│  ├─ stores/                # Stores Pinia por domínio (+ __tests__)
│  ├─ router/                # Rotas com code splitting
│  ├─ views/                 # Telas (lazy-loaded)
│  ├─ App.vue
│  └─ main.ts
├─ index.html                # Inclui uma Content Security Policy de exemplo
├─ vite.config.ts            # Alias @, manualChunks, visualizer
└─ eslint.config.ts          # Inclui regras de segurança (no-v-html, etc.)
```

## Usando com o Kiro

Este repositório é "Kiro-ready":

1. **Steering** (`.kiro/steering/*.md`) — regras de boas práticas e segurança que o Kiro
   aplica automaticamente a toda tarefa neste workspace. Edite-as para adaptar aos seus padrões.
2. **MCP** (`docs/MCP.md`) — servidores sugeridos (context7, fetch, playwright) para dar ao
   Kiro acesso a documentação atualizada, fetch de páginas e verificação visual no navegador.
   Copie `docs/mcp.example.json` para `.kiro/settings/mcp.json`.
3. **Documentação** (`docs/best-practices.md`) — o "porquê" por trás de cada regra, com exemplos.

### Aplicar os padrões em um projeto existente

Copie a pasta `.kiro/steering/` (e, se quiser, `docs/`) para o seu projeto. As regras passam
a valer para o Kiro naquele workspace. Ajuste `eslint.config.ts` e `tsconfig.app.json` conforme
os trechos deste repositório para reproduzir as mesmas garantias de lint/tipos.

## Destaques de segurança e performance

- **Segurança**: `vue/no-v-html` como erro no ESLint, CSP no `index.html`, aviso explícito
  sobre segredos em variáveis `VITE_`, teste que comprova o escape de XSS.
- **Performance**: rotas com `() => import(...)`, `manualChunks` para vendor, alvo de build
  moderno, `readonly`/`storeToRefs` no Pinia, analisador de bundle pronto (`npm run analyze`).

Leia `docs/best-practices.md` para o detalhamento.
