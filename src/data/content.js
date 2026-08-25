/* ============================================================
   Todo o texto do site vive aqui.
   Para trocar uma frase, mexa neste arquivo e em nenhum outro.
   ============================================================ */

export const brand = {
  city: 'Sorocaba, SP',
  whatsapp: 'https://wa.me/5515981888299',
  whatsappLabel: '(15) 98188-8299',
  instagram: 'https://www.instagram.com/referency_seguros',
  instagramHandle: '@referency_seguros',
  susep: 'Corretora registrada na SUSEP · nº a informar',
}

export const nav = [
  { href: '#perguntas', label: 'Perguntas' },
  { href: '#casos', label: 'Casos' },
  { href: '#metodo', label: 'Método' },
  { href: '#sinistro', label: 'Sinistro' },
  { href: '#atuacao', label: 'Atuação' },
]

export const hero = {
  eyebrow: 'Ateliê de seguro automotivo · Sorocaba, SP',
  title: 'O carro você escolheu.',
  titleEm: 'Agora escolha como protegê-lo.',
  lede: 'Seguro estruturado para quem não pode descobrir uma cobertura ruim depois do acidente.',
  cta: 'Começar um diagnóstico',
  ctaAlt: 'Ver casos reais',
  marks: ['Atendimento por indicação', 'Quando errar não é uma opção'],
  photo: 'Foto: lataria escura sob luz rasante. Sem placa, sem logo de seguradora, sem pessoa.',

  /* Filme de fundo do hero, em loop de 6,4 s. Volte para null para desligar:
     a superficie em CSS segura o lugar sozinha e nada quebra.
     Briefing e prompts em docs/prompts-video-ia.html */
  video: { webm: '/inventario.webm', mp4: '/inventario.mp4' },
}

export const entryway = {
  eyebrow: 'Antes de tudo',
  question: 'O que trouxe você até aqui?',
  options: [
    {
      label: 'Estou comprando um carro',
      echo: 'Compra é o melhor momento para acertar a estrutura. A apólice deveria ser decidida junto com o carro, e não depois da entrega.',
      cta: 'Quero estruturar antes de comprar',
    },
    {
      label: 'Meu seguro vai renovar',
      echo: 'Renovação automática é onde a maioria das coberturas envelhece sem ninguém perceber. Vale reler o contrato antes de repetir.',
      cta: 'Quero revisar antes de renovar',
    },
    {
      label: 'Quero revisar meu seguro atual',
      echo: 'Revisar não é trocar. Na maioria das vezes o problema não é a seguradora, é a estrutura contratada dentro dela.',
      cta: 'Quero revisar meu seguro',
    },
    {
      label: 'Estou com um problema ou sinistro',
      echo: 'Se há um sinistro em andamento, isso vira prioridade. Fale conosco agora, antes de assinar ou aceitar qualquer proposta.',
      cta: 'Falar agora sobre um sinistro',
    },
  ],
}

export const questions = {
  act: '02',
  eyebrow: 'O problema que ninguém vê',
  title: 'Duas apólices podem parecer iguais.',
  titleEm: 'Até o dia em que você precisa delas.',
  lede: 'A diferença entre uma proposta e outra quase nunca está no preço da capa. Está em seis ou sete respostas que ninguém costuma perguntar. Estas são algumas delas.',
  close: 'Nenhuma dessas perguntas aparece em um comparador de preço. Todas aparecem num sinistro.',
  items: [
    {
      idx: 'i.',
      q: 'Se o seu carro entrar na traseira de um importado, até quanto a sua apólice paga por ele?',
      a: 'Danos materiais a terceiros costumam ser contratados no piloto automático: R$ 100 mil porque foi o que veio na proposta. Um utilitário europeu de sete anos passa disso só em peças. A diferença entre 100 mil e 500 mil de terceiros raramente muda a parcela de forma relevante. Muda quem paga a conta quando ela chega.',
      tag: 'Danos materiais a terceiros',
    },
    {
      idx: 'ii.',
      q: 'A sua apólice paga peça original, ou paga a peça que a oficina conseguir?',
      a: 'Existem contratos que garantem peça genuína, contratos que aceitam similar e contratos que liberam similar depois de um determinado ano do veículo. Isso está nas condições gerais, não na cotação. É o mesmo carro, a mesma seguradora e dois resultados completamente diferentes no reparo.',
      tag: 'Condições gerais · Reparo',
    },
    {
      idx: 'iii.',
      q: 'Se o carro parar a 400 km de casa, o guincho leva ele para onde?',
      a: 'Assistência de 200 km parece suficiente até a primeira viagem. O que decide o fim de semana não é só a distância: é para onde o carro pode ser levado, se existe carro reserva compatível, quantas diárias, e se a assistência atende o modelo específico. Um esportivo rebaixado não sobe em qualquer plataforma.',
      tag: 'Assistência 24h',
    },
    {
      idx: 'iv.',
      q: 'O PPF, as rodas e o som que você pagou estão declarados na apólice?',
      a: 'Película de proteção, rodas de reposição, blindagem, som, envelopamento e acessórios só entram na indenização se estiverem declarados e com valor definido. Não declarar é comum. O efeito aparece uma única vez: na hora de repor.',
      tag: 'Acessórios e agregados',
    },
    {
      idx: 'v.',
      q: 'Em perda total, quem define quanto vale o seu carro?',
      a: 'Valor de mercado referenciado, percentual sobre a tabela, valor determinado. Cada regime chega a um número diferente para o mesmo veículo, e o percentual contratado (95%, 100%, 110%) muda a indenização de forma direta. Esse é um dos poucos campos da apólice que vale dinheiro em espécie.',
      tag: 'Critério de indenização',
    },
    {
      idx: 'vi.',
      q: 'No dia do acidente, quem liga para a seguradora: você ou o seu corretor?',
      a: 'Boa parte das apólices do mercado é vendida e nunca mais tocada. O sinistro vira um 0800, um protocolo e um aplicativo. A diferença entre um processo de três semanas e um processo de três meses costuma ser quem está do outro lado da mesa técnica.',
      tag: 'Regulação de sinistro',
    },
  ],
}

export const cases = {
  act: '03',
  eyebrow: 'Casos reais',
  title: 'Nós aprendemos seguro',
  titleEm: 'onde ele é testado.',
  items: [
    {
      id: 'ozzy',
      kicker: 'Perda total',
      title: 'OZzy',
      subtitle: 'O Mustang que precisava virar perda total',
      teaser: 'O orçamento de reparo não fechava. A conversa não era sobre consertar; era sobre provar.',
      body: 'O laudo inicial apontava reparo. Refeita a conta de peças e mão de obra dentro do critério da própria apólice, o veículo cruzava o limite de perda total. Foi preciso remontar o orçamento item a item e apresentar à regulação.',
      verdict: 'Ler o critério de perda total do contrato antes de aceitar o laudo.',
      plate: 'body',
      video: '1:12',
      photo: 'Vídeo (Reels): o Mustang no pátio. Corte curto, som ambiente, sem trilha.',
      size: 'wide',
    },
    {
      id: 'amarok',
      kicker: 'Sinistro',
      title: 'Amarok',
      subtitle: 'A decisão que quase custou a indenização',
      teaser: 'Uma escolha tomada nas primeiras horas depois do acidente, sem ninguém para consultar.',
      body: 'Havia uma providência aparentemente inofensiva no local do acidente que, do ponto de vista da regulação, comprometia a caracterização do evento. Foi corrigida a tempo porque a Referency entrou no caso antes da abertura formal.',
      verdict: 'Ligar para o corretor antes de decidir qualquer coisa.',
      plate: 'garage',
      video: '0:58',
      photo: 'Vídeo (Reels): a Amarok já na oficina, plano fixo. Narração em off do Matheus.',
      size: 'wide',
    },
    {
      id: 'porsche',
      kicker: 'Estrutura de apólice',
      title: 'Porsche 911 Turbo',
      subtitle: 'A seguradora certa não era o produto certo',
      teaser: 'Estar na seguradora certa não significava estar no produto certo.',
      body: 'A seguradora era adequada ao perfil. O produto contratado dentro dela, não. Rede referenciada, critério de peça e limites de terceiros não conversavam com o carro.',
      verdict: 'Trocar de produto, não de seguradora.',
      plate: 'cockpit',
      photo: 'Foto: detalhe do volante e console do 911. Luz baixa, quente.',
    },
    {
      id: 'macan',
      kicker: 'Acessórios e agregados',
      title: 'Macan GTS',
      subtitle: 'A apólice precisava saber do PPF',
      teaser: 'Havia milhares de reais em PPF no carro. A apólice precisava saber disso.',
      body: 'Proteção de pintura, rodas e itens de reposição não declarados simplesmente não existem para a seguradora. Foram levantados, avaliados e incluídos com valor antes da renovação.',
      verdict: 'Declarar o que já tinha sido pago.',
      plate: 'carbon',
      photo: 'Foto: macro do PPF sobre a pintura, luz rasante mostrando a película.',
    },
    {
      id: 'taos',
      kicker: 'Condições gerais',
      title: 'Taos',
      subtitle: 'A lanterna era nova. Só não era original.',
      teaser: 'Fomos às condições gerais descobrir o que o contrato realmente dizia.',
      body: 'A peça entregue era nova e funcional, mas não genuína. O contrato tinha uma cláusula específica sobre isso, e ela estava a favor do segurado. Bastou alguém ler.',
      verdict: 'O contrato inteiro, não o resumo da apólice.',
      plate: 'paper',
      photo: 'Foto: as condições gerais impressas sobre a mesa, marcadas à mão. Sem rosto.',
    },
  ],
}

export const method = {
  act: '04',
  eyebrow: 'A forma Referency',
  title: 'Antes de cotar,',
  titleEm: 'investigamos.',
  lede: 'Cotação é a última etapa, não a primeira. Sem estas quatro respostas, qualquer número é chute com aparência de proposta.',
  close: 'Só depois disso existe uma cotação.',
  steps: [
    {
      no: '01',
      title: 'O carro',
      body: 'Valor, versão exata, ano-modelo, equipamentos de fábrica, blindagem, modificações e acessórios agregados. Um GTS e um S não são o mesmo risco, nem o mesmo reparo.',
    },
    {
      no: '02',
      title: 'Quem dirige',
      body: 'Rotina, idade, quem mais usa o carro, se existe filho em casa, quantos veículos na garagem e qual é o carro do dia a dia. O perfil não é um formulário: é o que determina o preço e a aceitação.',
    },
    {
      no: '03',
      title: 'Onde ele vive',
      body: 'Garagem em casa, garagem no trabalho, região de circulação, trajeto diário, viagens de estrada e temporada. Onde o carro dorme muda mais a apólice do que a maioria das pessoas imagina.',
    },
    {
      no: '04',
      title: 'O que acontece se der errado',
      body: 'Rede de reparo, critério de peça, limite de terceiros, assistência compatível com o carro, e qual patrimônio fica exposto se o valor contratado não for suficiente.',
    },
  ],
}

export const concierge = {
  act: '05',
  eyebrow: 'Quando dá errado',
  title: 'Concierge de sinistro',
  titleEm: 'Referency',
  lede: 'Do aviso à seguradora até as decisões mais complexas do processo, a Referency acompanha o caso e assume a interlocução técnica quando é necessário.',
  quote: 'Você não precisa virar especialista em seguro justamente no pior dia para aprender.',
  flow: [
    { no: '01', title: 'Orientação imediata', body: 'O que fazer e o que não fazer nas primeiras horas.' },
    { no: '02', title: 'Abertura', body: 'Aviso formal com o enquadramento correto do evento.' },
    { no: '03', title: 'Documentação', body: 'Reunimos e conferimos antes de protocolar.' },
    { no: '04', title: 'Oficina', body: 'Escolha de rede e acompanhamento do orçamento.' },
    { no: '05', title: 'Regulação', body: 'Interlocução técnica com o regulador em nome do segurado.' },
    { no: '06', title: 'Reparo ou perda total', body: 'Conferência do critério e do valor apurado.' },
    { no: '07', title: 'Entrega', body: 'Vistoria final e checagem do que foi efetivamente feito.' },
    { no: '08', title: 'Depois', body: 'Revisão da apólice à luz do que o sinistro revelou.' },
  ],
}

export const practice = {
  act: '06',
  eyebrow: 'Atuação',
  title: 'O patrimônio muda.',
  titleEm: 'A lógica permanece.',
  items: [
    {
      name: 'Automóveis',
      line: 'Curadoria de apólice para veículos de uso diário. O mesmo rigor de leitura de contrato, independentemente do valor da tabela.',
      note: 'Auto, frota familiar, primeiro carro, veículo de trabalho.',
    },
    {
      name: 'Premium & especiais',
      line: 'Estruturas específicas para Porsche, BMW, Mercedes-Benz, Land Rover e carros modificados, blindados ou com investimento relevante em proteção e acabamento.',
      note: 'Rede de reparo, peça genuína, acessórios declarados, assistência compatível com o veículo.',
    },
    {
      name: 'Família',
      line: 'A proteção costuma começar pelo carro e terminar em uma conversa maior: casa, garagem, filho que acabou de tirar habilitação, patrimônio exposto.',
      note: 'Residencial e riscos patrimoniais associados.',
    },
    {
      name: 'Empresas',
      line: 'Gestão de risco ligada à realidade patrimonial do empresário, e não a um pacote genérico de PJ.',
      note: 'Frota, responsabilidade civil, patrimônio da operação.',
    },
    {
      name: 'Consórcio',
      flag: 'Planejamento de aquisição',
      feature: true,
      line: 'Quase todo mundo vende consórcio dizendo que é mais barato que financiamento. É exatamente por isso que tanta gente desiste no meio do caminho: entrou por preço, sem nenhuma estratégia de contemplação, e descobre que comprou prazo.',
      line2: 'Consórcio não se resolve na parcela. Se resolve no plano: o crédito certo, o grupo certo, o momento certo de lance e o uso correto do lance embutido e do FGTS quando cabe. Estruturamos a compra antes de vender a cota.',
      note: 'Trabalhamos com um objetivo declarado e uma data alvo. Se o plano não sustenta essa data, o certo é dizer isso antes da assinatura.',
    },
  ],
}

export const backstage = {
  act: '07',
  eyebrow: 'Bastidores',
  title: 'O que passa pela mesa',
  titleEm: 'durante a semana.',
  items: [
    {
      kicker: 'Caso real',
      title: 'O que aconteceu com o carro que ninguém queria segurar',
      body: 'Série sobre sinistros acompanhados de perto.',
      plate: 'garage',
      photo: 'Último Reels de caso publicado no perfil.',
    },
    {
      kicker: 'Risco invisível',
      title: 'Uma cláusula que aparece em quase toda apólice e quase ninguém lê',
      body: 'O que encontramos lendo contratos de mercado.',
      plate: 'paper',
      photo: 'Foto: trecho de condições gerais marcado. Detalhe fechado.',
    },
    {
      kicker: 'Garagem',
      title: 'Um automóvel interessante que passou por aqui',
      body: 'Porque também gostamos de carro.',
      plate: 'wheel',
      photo: 'Foto: roda e pinça de freio, luz de garagem.',
    },
  ],
}

export const closing = {
  eyebrow: 'Diagnóstico',
  title: 'Talvez você não precise trocar de seguradora.',
  titleEm: 'Talvez precise descobrir se o seu seguro está bem estruturado.',
  lede: 'Enviamos algumas perguntas, lemos a sua apólice atual e dizemos o que encontramos. Se estiver bem estruturada, dizemos isso também.',
  cta: 'Quero revisar meu seguro',
  ctaAlt: 'Ver os casos primeiro',
  note: 'Análise da apólice atual, sem compromisso de cotação.',
}

export const footer = {
  tagline: 'Ateliê de seguro automotivo. Proteção sob medida, quando errar não é uma opção.',
}
