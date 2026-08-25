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

Estático puro. Na Vercel, preset **Vite**, sem variável de ambiente:

| Campo | Valor |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

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
public/                logos extraídos do manual de marca
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
