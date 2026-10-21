# MCP (Model Context Protocol) neste projeto

MCP permite que o Kiro use ferramentas externas (buscar docs atualizadas,
fazer fetch de páginas, automatizar o navegador para verificação visual, etc.).
Este projeto sugere três servidores MCP úteis para desenvolvimento Vue.

> O arquivo de configuração real fica em `.kiro/settings/mcp.json` (workspace) ou
> `~/.kiro/settings/mcp.json` (usuário). Como esse caminho costuma ser protegido,
> o template versionado está em [`docs/mcp.example.json`](./mcp.example.json).

## Servidores sugeridos

| Servidor     | Para que serve                                                                 | Runtime |
| ------------ | ------------------------------------------------------------------------------ | ------- |
| `context7`   | Puxa documentação atualizada de libs (Vue, Pinia, Vite…) direto para o contexto | npx     |
| `fetch`      | Baixa e converte páginas web (artigos, docs, exemplos) em texto                 | uvx     |
| `playwright` | Automatiza o navegador — útil para verificação visual e testes E2E              | npx     |

## Como instalar

1. **Pré-requisitos**
   - `npx` (vem com Node.js ≥ 20.19) para `context7` e `playwright`.
   - `uv`/`uvx` para o `fetch`. Instale com `pip install uv` ou `brew install uv`
     (guia: <https://docs.astral.sh/uv/getting-started/installation/>).

2. **Aplicar a configuração**
   Copie o conteúdo de [`docs/mcp.example.json`](./mcp.example.json) para um destes locais:
   - Workspace (vale só para este projeto): `.kiro/settings/mcp.json`
   - Usuário (vale para todos os projetos): `~/.kiro/settings/mcp.json`

   Se o arquivo já existir, **faça merge** das chaves dentro de `mcpServers` em vez
   de sobrescrever o arquivo inteiro.

3. **Reconectar**
   O Kiro reconecta os servidores automaticamente ao detectar mudança na config.

## Como usar com o Kiro

- "Busque na documentação oficial do Pinia como persistir estado" → usa `context7`.
- "Abra esta URL e resuma as recomendações" → usa `fetch`.
- "Rode a app e tire um screenshot da home para validar o layout" → usa `playwright`.

## Observações de segurança

- `autoApprove` libera ferramentas sem pedir confirmação a cada uso. Deixe vazio
  (`[]`) para ferramentas que acessam a rede ou o sistema, aprovando sob demanda.
- MCP servers rodam comandos locais; use apenas pacotes confiáveis e fixados.
