# Referency — direção do site

Documento de trabalho. Acompanha o protótipo em `index.html`.

---

## 1. O que a apresentação e o Instagram entregaram

**Do manual de marca (agência FindOut):**

| Item | Valor |
|---|---|
| Verde petróleo | `#003734` |
| Cobre | `#D6A075` |
| Off-white do logo | `#EADBD3` |
| Fonte principal | Nasalization |
| Fonte de apoio | Gotham Light |
| Símbolo | duas mãos que se encontram e formam o R |
| Assinatura | "Conectando pessoas à proteção que importa." |

O manual é bom mas é genérico de corretora. O manifesto fala em confiança, cuidado, amparo. Aplicado literalmente, o site vira aquilo que você quer evitar.

**Do Instagram, que vale mais que o manual inteiro:**

> "Ateliê de Seguro Automotivo. Atendimento por indicação. Proteção sob medida, quando errar não é uma opção. Sorocaba | SP"

Essas quatro frases já são o posicionamento pronto. Foram para o site quase sem edição.

**"Atendimento por indicação" muda a função do site.**

O site não é máquina de captação. É a prova que sustenta a indicação. Quando alguém indica a Referency, a pessoa indicada vai procurar. O que ela encontra decide se a conversa acontece em pé de igualdade ou se vira comparação de preço. É esse o trabalho da página.

Métrica certa: quantas pessoas chegam ao WhatsApp já sabendo por que não deveriam comparar por preço. Não volume de cliques.

---

## 2. Ajuste na direção visual

Você achou o Lovable escuro demais. Concordo. As referências que você mandou (JHSF, Loro Piana, Aimé Leon Dore) têm três coisas em comum e nenhuma delas é escuridão:

1. Base clara, papel quente, nunca branco puro.
2. Fotografia grande e silenciosa.
3. Tipografia editorial com muito espaço vazio.

O que fiz:

- **Papel `#FBF9F5` como base.** Creme `#F3EDE5` para alternar seções.
- **Tinta é o verde `#003734`.** Nenhum texto preto na página inteira. Isso sozinho já dá elegância e usa a marca sem precisar de logo repetido.
- **Cobre é raro.** Só numeração de ato, fio de citação e um estado de hover.
- **Um único bloco escuro.** O verde cheio aparece uma vez, no Concierge de sinistro. Funciona como página virada de revista. Se o verde aparecesse cinco vezes, não significaria nada.
- **Newsreader 200** para os títulos, **Jost** para o resto. Nasalization e Gotham não existem em web font livre. Jost é a mais próxima de Gotham. Newsreader dá o registro editorial das referências e tem acentuação bem desenhada, o que importa muito em português. (Testei Cormorant Garamond primeiro. O circunflexo de "você" e "protegê-lo" renderiza deslocado. Descartada.)

Fora, como combinado: escudo, cadeado, família sorrindo, gradiente azul, ícone colorido, selo de "100% seguro".

---

## 3. Fotografia: o que já existe e o que precisa ser feito

Este é o ponto que mais decide se o site vai parecer ateliê ou corretora. No protótipo, todas as imagens são superfícies desenhadas em CSS que ocupam o lugar da foto real. **Clique em "Briefing de fotografia" no canto da tela** e cada uma revela a legenda do que deve entrar ali.

### Já existe, custo zero

| Ativo | Onde entra |
|---|---|
| Reels dos casos no Instagram | Ato 03. São o ativo mais valioso que a Referency tem. |
| Frames desses vídeos | Capas dos cards, se a foto não sair a tempo. |
| Carros de clientes já atendidos | Ato 03 e Ato 06. Precisa de autorização por escrito. |
| Condições gerais impressas e marcadas à mão | Caso Taos e bloco "Risco invisível". Custo zero, valor de marca altíssimo. |

### Sessão a produzir, meia diária

Um carro escuro, de preferência premium, em garagem coberta ou estacionamento vazio no fim da tarde. Luz lateral única. Fotógrafo que fotografa carro, não fotógrafo de evento.

Lista de tomadas:

- **Hero.** Lataria escura sob luz rasante. Sem placa, sem logo de seguradora, sem pessoa. Enquadramento que não deixa claro qual é o carro.
- **Macros.** Farol, roda e pinça de freio, emblema, costura do banco, PPF em luz rasante mostrando a película.
- **Interior.** Volante e console em luz baixa e quente.
- **Mesa de trabalho.** Apólice impressa, marcador, caneta, óculos. Mão entrando no quadro, sem rosto.
- **Retrato do Matheus.** Três quartos, fundo neutro, sem terno de banco, sem braços cruzados, sem sorriso de crachá.

Tratamento: contraste alto, saturação baixa, sem filtro quente exagerado. Grão leve é bem-vindo. Fotografia automotiva de revista, não de concessionária.

### O que não usar

Banco de imagens. Nenhuma foto de banco. Se faltar imagem, é melhor deixar tipografia sozinha em campo vazio do que colocar um genérico. As referências que você mandou fazem exatamente isso.

---

## 4. "O problema que ninguém vê" virou perguntas

Você estava certo. A comparação Proposta A contra Proposta B é boa em apresentação de slide e fraca em site. Vira tabela. E tabela a pessoa pula.

Pergunta é diferente. Pergunta é direcional, é humana e provoca. E, principalmente, **a pessoa responde na cabeça dela antes de ler a resposta.** Quando ela não sabe responder, o site já ganhou.

As seis que entraram, com o campo da apólice que cada uma abre:

1. Se o seu carro entrar na traseira de um importado, até quanto a sua apólice paga por ele? → **danos materiais a terceiros**
2. A sua apólice paga peça original, ou paga a peça que a oficina conseguir? → **condições gerais, reparo**
3. Se o carro parar a 400 km de casa, o guincho leva ele para onde? → **assistência 24h**
4. O PPF, as rodas e o som que você pagou estão declarados na apólice? → **acessórios e agregados**
5. Em perda total, quem define quanto vale o seu carro? → **critério de indenização**
6. No dia do acidente, quem liga para a seguradora: você ou o seu corretor? → **regulação de sinistro**

A sexta é a que faz a ponte para o Concierge. Não é acidente que ela seja a última.

Fecho da seção: *"Nenhuma dessas perguntas aparece em um comparador de preço. Todas aparecem num sinistro."*

Banco de perguntas para rodar depois, se quiser variar ou criar conteúdo de Instagram a partir delas:

- Se o carro for roubado com a chave dentro, o que muda?
- Quem é o condutor principal na sua apólice, e é verdade?
- A sua franquia é reduzida, normal ou majorada, e por quê?
- Se o filho pegar o carro no fim de semana, está coberto?
- Vidro, farol e retrovisor entram sem franquia ou com?
- Carro reserva por quantos dias, e de que categoria?

---

## 5. Casos com vídeo

Os cinco casos entraram como cards editoriais que abrem no clique, sem sair da página. Dois deles (OZzy e Amarok) já estão marcados como vídeo, com selo de duração, porque são os que você tem em Reels.

Regra de escrita que usei em todos: **título é o fato, subtítulo é a tensão, e o caso fecha com uma linha só, chamada "o que decidiu o caso".**

| Caso | O que decidiu |
|---|---|
| OZzy, Mustang | Ler o critério de perda total do contrato antes de aceitar o laudo. |
| Amarok | Ligar para o corretor antes de decidir qualquer coisa. |
| Porsche 911 Turbo | Trocar de produto, não de seguradora. |
| Macan GTS | Declarar o que já tinha sido pago. |
| Taos | O contrato inteiro, não o resumo da apólice. |

Essa linha final é o que transforma depoimento em método. Ela repete cinco vezes, de cinco jeitos, que a Referency lê contrato.

**Nota técnica:** os textos dos casos estão escritos de forma genérica de propósito, porque eu não conheço os detalhes reais. Precisam de uma passada do Matheus com os fatos corretos. Não publique como está.

Formato do vídeo: vertical, corte curto, som ambiente, sem trilha. Se possível, narração dele em off. O que dá autoridade aqui é a naturalidade, não a produção.

---

## 6. Consórcio: o ponto mais forte do que você escreveu

Vida saiu. Consórcio entrou, e entrou como o único bloco destacado da seção. Ele fica em fundo creme enquanto os outros quatro ficam em papel, porque é ali que a Referency diz algo que ninguém no mercado diz.

O texto que está no site:

> Quase todo mundo vende consórcio dizendo que é mais barato que financiamento. É exatamente por isso que tanta gente desiste no meio do caminho: entrou por preço, sem nenhuma estratégia de contemplação, e descobre que comprou prazo.
>
> Consórcio não se resolve na parcela. Se resolve no plano: o crédito certo, o grupo certo, o momento certo de lance e o uso correto do lance embutido e do FGTS quando cabe. Estruturamos a compra *antes* de vender a cota.
>
> Trabalhamos com um objetivo declarado e uma data alvo. Se o plano não sustenta essa data, o certo é dizer isso antes da assinatura.

Por que isso funciona: é a mesma lógica dos outros quatro blocos. Ler antes de vender. O consórcio não é um produto novo colado na página, é o mesmo método aplicado a outro patrimônio.

### Para desenvolver depois, em página própria

O raciocínio comercial que sustenta esse parágrafo, caso vocês queiram uma página de consórcio no futuro:

**Os erros de quem compra por preço**

- Compara parcela com prestação de financiamento e ignora que o bem não vem no ato.
- Escolhe o crédito pelo que cabe no bolso, não pelo bem que quer.
- Entra sem reserva de caixa para lance, ou seja, entra sem estratégia nenhuma.
- Não entende a diferença entre lance livre, lance fixo e lance embutido.
- Não considera FGTS quando é imóvel.
- Dimensiona o crédito pelo preço de hoje, não pelo preço na data em que pretende usar.
- Não tem plano B se a contemplação vier antes do previsto.

**O que a Referency faria diferente**

1. Começa pela data alvo e pelo bem. A parcela é consequência.
2. Dimensiona o crédito pelo valor do bem na data pretendida.
3. Define a estratégia de lance antes da assinatura: quanto de caixa, quando entrar, qual modalidade.
4. Escolhe o grupo pela regra de contemplação, não pela taxa de administração isolada.
5. Escreve o plano e revisa nas assembleias que importam.
6. Diz não quando o plano não sustenta a data.

O item 6 é o mais vendável de todos, por mais contraintuitivo que pareça.

**O que não fazer no site:** simulador de parcela. Vira bazar financeiro, sua palavra, e derruba o conceito inteiro.

---

## 7. Estrutura final da home

| Ato | Seção | Fundo |
|---|---|---|
| 01 | Hero | papel + placa escura |
| — | Porta de entrada: "O que trouxe você até aqui?" | papel |
| 02 | As perguntas | creme |
| 03 | Casos reais | papel |
| 04 | O método: antes de cotar, investigamos | creme |
| 05 | Concierge de sinistro | **verde cheio** |
| 06 | Atuação, incluindo consórcio | papel |
| 07 | Bastidores | creme |
| 08 | Diagnóstico | papel |
| — | Rodapé | verde |

**Sobre a porta de entrada.** Ficou logo abaixo do hero, em faixa fina. Quatro opções. A escolha faz duas coisas: mostra uma frase curta que responde àquela intenção, e muda o texto do botão lá embaixo no fim da página. Quem clica em "meu seguro vai renovar" chega no fim com "Quero revisar antes de renovar".

Isso é barato de fazer e faz o site parecer inteligente. Quando houver formulário de verdade, essa escolha vira o primeiro campo do lead, já qualificado.

**Sobre o Concierge.** Fiz como você pediu. Não vende telefone do Matheus 24 horas. Vende processo, em oito etapas, da orientação inicial até a revisão da apólice depois que o sinistro terminou. A oitava etapa ("Depois: revisão da apólice à luz do que o sinistro revelou") é uma que eu acrescentei. Ela fecha o ciclo e mostra que o método continua depois do dinheiro entrar.

Frase do bloco: *"Você não precisa virar especialista em seguro justamente no pior dia para aprender."*

---

## 8. Levando para o Lovable

Você tem razão em não pedir o site inteiro de uma vez. Mas agora existe um caminho melhor que prompt em branco.

### Caminho recomendado

O `index.html` é HTML e CSS puros, sem framework e sem dependência. Cole o arquivo inteiro no Lovable com este pedido:

> Converta este HTML em um projeto React com Vite e Tailwind. Preserve exatamente o design: todos os valores de cor, tamanhos de fonte, espaçamentos e as animações de scroll. Não reinterprete o layout. Quebre em componentes por seção: Nav, Hero, Entryway, Questions, Cases, Method, Concierge, Practice, Backstage, Closing, Footer. Mantenha os tokens CSS em `:root` como estão, sem converter para o tema do Tailwind.

O risco do prompt em branco é conhecido: o Lovable regride para o arquétipo de site de corretora. Partindo do HTML pronto, ele não tem para onde regredir.

### Se preferir construir do zero, em três etapas

**Etapa 1, fundação. Sem conteúdo nenhum.**

> Crie a fundação visual de um site, sem nenhuma seção de conteúdo ainda. Apenas tokens e componentes base.
> Paleta: tinta `#003734` para todo texto, cobre `#D6A075` como acento raro, papel `#FBF9F5` como base, creme `#F3EDE5` como base alternada.
> Nenhum texto preto na página. Nenhum cinza puro.
> Tipografia: Newsreader peso 200 e 300 para títulos, Jost peso 300 e 400 para corpo, labels e navegação. Labels em caixa alta com letter-spacing de 0.2em e tamanho 11px.
> Espaçamento generoso: seções com padding vertical entre 84px e 160px.
> Um único acento por tela. Zero sombras. Zero cantos arredondados. Zero gradientes coloridos.
> Entregue: tokens em `:root`, tipografia, botão primário e secundário, e um grão de papel sutil sobre a página.

**Etapa 2, hero e porta de entrada.** Uma seção por prompt, sempre lembrando de não inventar elementos.

**Etapa 3 em diante,** seção por seção, na ordem dos atos.

### O que dizer em todo prompt

> Não adicione ícones, escudos, cadeados, selos de confiança, logos de seguradora, fotos de família, gradientes azuis ou cards com sombra. Se faltar imagem, deixe espaço vazio.

---

## 9. Pendências antes de publicar

- [ ] Matheus revisar os cinco casos com os fatos reais. Os textos atuais são estruturais e genéricos.
- [ ] Autorização por escrito dos clientes citados nos casos.
- [ ] Número de registro SUSEP no rodapé.
- [ ] Sessão de fotos, ou seleção de frames dos Reels como solução provisória.
- [ ] Decidir se o botão do diagnóstico vai direto para WhatsApp ou passa por formulário curto. Com "atendimento por indicação", formulário curto qualifica melhor.
- [ ] Política de privacidade e aviso de cookies, se houver formulário.
- [ ] Remover o botão "Briefing de fotografia" na versão final. É ferramenta de trabalho.

---

## Arquivos

| Arquivo | Para quê |
|---|---|
| `index.html` | Projeto, usa `assets/`. É o que vai para o Lovable ou para o dev. |
| `referency-onefile.html` | Arquivo único com os logos embutidos. Abre em qualquer lugar, serve para mandar por WhatsApp ou e-mail. |
| `assets/referency-mark-*.png` | Wordmark sem tagline, para navegação. Verde e off-white. |
| `assets/referency-*.png` | Lockup completo com tagline, para rodapé. |
| `build.py` | Gera o arquivo único a partir do projeto. |

Os logos foram extraídos do PDF da apresentação, recortados, com fundo transparente e a tinta recolorida do preto original para o verde `#003734` da marca. Quando a agência entregar o SVG, é só substituir.
