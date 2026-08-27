# Referency Corretora — website

Site da **Referency**, ateliê de seguro automotivo em Sorocaba/SP.

Vite + React + Motion. Sem framework de CSS: o sistema visual vive em tokens
CSS, derivados do manual de marca da corretora.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
npm run preview  # serve o build
```

## Deploy

Na Vercel, preset **Vite**:

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

**Variáveis de ambiente** (Settings → Environment Variables), as duas em todos
os ambientes:

| Nome | Valor |
|---|---|
| `VITE_SUPABASE_URL` | `https://tvnrwcxkimdkjgwxgfxz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | a anon key do projeto |

São chaves **públicas** por design (a `anon` vive no frontend, protegida por
RLS). Sem elas o site funciona igual, só não grava o lead no banco. Estão em
`.env.local` para desenvolvimento, que **não** vai para o Git.

## Captura de leads (Supabase)

O diagnóstico grava cada resposta na tabela `public.leads`. O padrão é o seguro
para formulário público:

- a `anon` key só **insere**, nunca **lê** (RLS insert-only)
- ninguém pelo site enxerga lead de outra pessoa
- a corretora lê pelo painel do Supabase, na view `leads_painel`

O schema está em `supabase/migrations/`. Para recriar em outro projeto, rode os
dois arquivos `.sql` na ordem, no SQL Editor do Supabase.

A `service_role` key e a senha do banco **nunca** entram no código nem no Git.

## Painel de administração (`/admin`)

Rota `/admin` no mesmo site, carregada em chunk separado (o site público não
baixa o código do admin). Protegida por login do Supabase Auth **e** por
pertencer à tabela `admins` — um signup qualquer não vira admin.

Três seções:

- **Leads** — lista, filtro por status (novo / contatado / fechado / descartado),
  link de WhatsApp, anotação interna. Status e notas gravam na hora.
- **Respostas** — agrega os diagnósticos: em qual pergunta as pessoas mais
  têm dúvida, o momento de quem procura, quantos deixaram WhatsApp.
- **Perguntas** — edita as perguntas do diagnóstico (texto, apoio, ordem,
  ativa/oculta, adicionar/remover). O site passa a usar na hora, sem deploy.

As perguntas vivem em `public.diagnostic_questions`; o site lê de lá com
fallback para `content.js` se o banco não responder.

**Criar um admin:** criar o usuário no Supabase (Auth → Users) e inserir o
`user_id` dele em `public.admins`. Ver `supabase/migrations/0003_admin.sql`.

### Mídias (aba do admin)

Cada superfície do site (hero, casos, bastidores) é um "slot". A aba **Mídias**
sobe uma foto ou vídeo para o slot; o site troca a superfície em CSS pela mídia
na hora. Sem envio, fica o padrão em CSS. "Voltar ao padrão" apaga o arquivo.

- arquivos no bucket público `media` do Storage (upload só de admin, via RLS)
- mapa slot→arquivo em `public.media`
- o site lê via `fetchMedia()` (contexto `MediaProvider`), com fallback para a
  superfície em CSS se o banco não responder
- os slots são gerados de `src/data/mediaSlots.js` a partir do conteúdo, então
  acompanham quando um caso muda de nome

Cada `Plate` recebe um `slot`; se houver mídia, ela entra por cima do CSS.

## Estrutura

```
src/
  data/content.js      todo o texto do site vive aqui
  styles/app.css       tokens e sistema visual
  hooks/useLenis.js    scroll suave e trava durante o overlay
  components/
    Reveal.jsx         reveal por bloco e split de título por palavra
    Plate.jsx          superfície que ocupa o lugar da foto real
    Cursor.jsx         cursor sobre as mídias
    Preloader.jsx      cortina de abertura
    Nav / Hero / Entryway / Questions / Cases / CaseOverlay /
    Method / Concierge / Practice / Backstage / Closing / Footer
  lib/leads.js         grava o lead no Supabase (anon key, insert-only)
public/                logos extraídos do manual de marca
supabase/migrations/   schema da tabela de leads
docs/                  protótipo estático que originou o projeto
scripts/               gera a versão de arquivo único
```

**Para trocar qualquer texto, mexa só em `src/data/content.js`.** Nenhum
componente carrega texto próprio.

## Sistema visual

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#003734` | tinta de todo o texto, e o único bloco de fundo cheio |
| `--copper` | `#D6A075` | acento raro: numeração de ato, fio de citação, hover |
| `--paper` | `#FBF9F5` | base |
| `--paper-2` | `#F3EDE5` | base alternada |

Não existe texto preto na página. Verde e cobre vêm do manual de marca.
As fontes originais (Nasalization e Gotham) não têm equivalente web livre:
o site usa **Newsreader** para títulos e **Jost** para o resto.

## As imagens

O hero roda o filme `public/inventario.*` em loop de 6,4 s, mudo, com fade no
primeiro e no último quadro para a emenda do loop ficar invisível. Ele entra por
cima da superfície em CSS, que continua embaixo como base e como poster. Para
desligar, basta voltar `hero.video` para `null` em `src/data/content.js`.

As demais mídias ainda não têm foto real: cada uma é uma superfície em CSS que
ocupa o lugar da foto e carrega o briefing da tomada que deve substituí-la.

**O botão "Briefing de fotografia", no canto da tela, revela todos os briefings.**
Remover esse botão (`src/App.jsx`) é o último passo antes de publicar.

## Arquivo único

Para mandar o site por WhatsApp ou e-mail sem servidor:

```bash
npm run build
python scripts/build-onefile.py   # gera dist/onefile.html
```

## Antes de publicar

- [ ] Revisar os cinco casos em `src/data/content.js` com os fatos reais. Os textos atuais são estruturais e genéricos.
- [ ] Autorização por escrito dos clientes citados nos casos.
- [ ] Número de registro SUSEP em `brand.susep`.
- [ ] Sessão de fotos para os casos e bastidores, ou frames dos Reels como solução provisória.
- [ ] Decidir se o CTA vai direto ao WhatsApp ou passa por formulário curto.
- [ ] Remover o botão de briefing.

Direção completa do projeto em [`DIRECAO.md`](./DIRECAO.md).
