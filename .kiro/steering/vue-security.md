# Steering: Segurança em Vue

Regras de segurança obrigatórias ao escrever ou revisar código neste projeto.
O objetivo é desenvolvimento seguro por padrão, com defesa em profundidade.

## XSS — a regra de ouro

- O Vue escapa automaticamente interpolações `{{ }}` e bindings `:attr`. **Confie nisso.**
- **NUNCA** usar `v-html` com conteúdo vindo do usuário ou de fontes não confiáveis.
  A regra de ESLint `vue/no-v-html` está ligada como `error`.
- Se renderizar HTML rico for inevitável:
  1. Sanitizar ANTES com uma lib dedicada (ex.: DOMPurify) usando allow-list.
  2. Só então passar para `v-html`, desativando a regra pontualmente com um
     comentário explicando por quê.
- Tratar TODA entrada externa (query params, formulários, respostas de API,
  `postMessage`, storage) como não confiável.
- Validar/normalizar na entrada E codificar na saída conforme o contexto — as duas
  camadas são necessárias, nenhuma sozinha basta.

## Bindings perigosos

- Nunca fazer bind de URL controlada pelo usuário em `:href`/`:src` sem validar o
  esquema (bloquear `javascript:`, `data:` não confiável). Permitir apenas `http(s):` e caminhos relativos.
- Não injetar dados do usuário em `:style`/`style` de forma crua.
- Evitar renderização dinâmica de componente (`<component :is="...">`) com nome vindo do usuário.

## Segredos e variáveis de ambiente

- Apenas variáveis com prefixo `VITE_` chegam ao client — e viram **JavaScript público**.
  NUNCA colocar chaves de API, tokens ou segredos em variáveis `VITE_`.
- Segredos ficam no backend. O front só fala com um backend/proxy que guarda as chaves.
- Nunca commitar `.env`; versionar apenas `.env.example` (já no `.gitignore`).

## Autenticação, sessão e requests

- Preferir cookies `HttpOnly` + `Secure` + `SameSite` para tokens de sessão em vez de
  `localStorage` (que é acessível a qualquer script e, portanto, exposto a XSS).
- Proteger contra CSRF em requests mutantes (token anti-CSRF ou `SameSite`).
- Sempre HTTPS. Validar respostas de API antes de usar.

## Defesa em profundidade

- Manter uma **Content Security Policy** restritiva (ver `<meta>` no `index.html`;
  em produção enviar via header HTTP). `object-src 'none'`, `base-uri 'self'`,
  `frame-ancestors 'none'` por padrão.
- Manter dependências atualizadas; rodar `npm audit` periodicamente e tratar
  vulnerabilidades altas/críticas.
- Fixar versões de dependências (sem ranges abertos) e desconfiar de pacotes com
  nome parecido com libs conhecidas (typosquatting).

## Checklist de revisão de segurança

- [ ] Nenhum `v-html` com dado não sanitizado
- [ ] URLs dinâmicas têm o esquema validado
- [ ] Nenhum segredo em variável `VITE_` ou commitado
- [ ] Entradas externas validadas; saídas codificadas conforme contexto
- [ ] Tokens de sessão fora de `localStorage` quando possível
- [ ] CSP presente e restritiva
