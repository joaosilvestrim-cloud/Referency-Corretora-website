-- ============================================================
-- Conteúdo editável: casos e bastidores
--   · saem do content.js e vão para o banco, como as perguntas
--   · o site lê daqui com fallback para o content.js
--   · ids estáveis, para os slots de mídia (case_<id>, bt_<id>) seguirem juntos
-- ============================================================

create table if not exists public.cases (
  id         text primary key,
  position   int  not null,
  kicker     text,
  title      text not null,
  subtitle   text,
  teaser     text,
  body       text,
  verdict    text,
  plate      text not null default 'body',   -- estilo da superfície em CSS
  video      text,                           -- selo "1:12" quando é vídeo
  size       text,                           -- 'wide' para o card largo
  active     boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.cases enable row level security;

drop policy if exists cases_read on public.cases;
create policy cases_read on public.cases
  for select to anon, authenticated using (active or public.is_admin());
drop policy if exists cases_write on public.cases;
create policy cases_write on public.cases
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
grant select on public.cases to anon, authenticated;
grant insert, update, delete on public.cases to authenticated;

create table if not exists public.backstage (
  id         text primary key,
  position   int  not null,
  kicker     text,
  title      text not null,
  body       text,
  plate      text not null default 'garage',
  active     boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.backstage enable row level security;

drop policy if exists backstage_read on public.backstage;
create policy backstage_read on public.backstage
  for select to anon, authenticated using (active or public.is_admin());
drop policy if exists backstage_write on public.backstage;
create policy backstage_write on public.backstage
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
grant select on public.backstage to anon, authenticated;
grant insert, update, delete on public.backstage to authenticated;

-- seed dos casos atuais
insert into public.cases (id, position, kicker, title, subtitle, teaser, body, verdict, plate, video, size) values
 ('ozzy', 1, 'Perda total', 'OZzy', 'O Mustang que precisava virar perda total',
  'O orçamento de reparo não fechava. A conversa não era sobre consertar; era sobre provar.',
  'O laudo inicial apontava reparo. Refeita a conta de peças e mão de obra dentro do critério da própria apólice, o veículo cruzava o limite de perda total. Foi preciso remontar o orçamento item a item e apresentar à regulação.',
  'Ler o critério de perda total do contrato antes de aceitar o laudo.', 'body', '1:12', 'wide'),
 ('amarok', 2, 'Sinistro', 'Amarok', 'A decisão que quase custou a indenização',
  'Uma escolha tomada nas primeiras horas depois do acidente, sem ninguém para consultar.',
  'Havia uma providência aparentemente inofensiva no local do acidente que, do ponto de vista da regulação, comprometia a caracterização do evento. Foi corrigida a tempo porque a Referency entrou no caso antes da abertura formal.',
  'Ligar para o corretor antes de decidir qualquer coisa.', 'garage', '0:58', 'wide'),
 ('porsche', 3, 'Estrutura de apólice', 'Porsche 911 Turbo', 'A seguradora certa não era o produto certo',
  'Estar na seguradora certa não significava estar no produto certo.',
  'A seguradora era adequada ao perfil. O produto contratado dentro dela, não. Rede referenciada, critério de peça e limites de terceiros não conversavam com o carro.',
  'Trocar de produto, não de seguradora.', 'cockpit', null, null),
 ('macan', 4, 'Acessórios e agregados', 'Macan GTS', 'A apólice precisava saber do PPF',
  'Havia milhares de reais em PPF no carro. A apólice precisava saber disso.',
  'Proteção de pintura, rodas e itens de reposição não declarados simplesmente não existem para a seguradora. Foram levantados, avaliados e incluídos com valor antes da renovação.',
  'Declarar o que já tinha sido pago.', 'carbon', null, null),
 ('taos', 5, 'Condições gerais', 'Taos', 'A lanterna era nova. Só não era original.',
  'Fomos às condições gerais descobrir o que o contrato realmente dizia.',
  'A peça entregue era nova e funcional, mas não genuína. O contrato tinha uma cláusula específica sobre isso, e ela estava a favor do segurado. Bastou alguém ler.',
  'O contrato inteiro, não o resumo da apólice.', 'paper', null, null)
on conflict (id) do nothing;

-- seed dos bastidores atuais
insert into public.backstage (id, position, kicker, title, body, plate) values
 ('caso_real', 1, 'Caso real', 'O que aconteceu com o carro que ninguém queria segurar', 'Série sobre sinistros acompanhados de perto.', 'garage'),
 ('risco_invisivel', 2, 'Risco invisível', 'Uma cláusula que aparece em quase toda apólice e quase ninguém lê', 'O que encontramos lendo contratos de mercado.', 'paper'),
 ('garagem', 3, 'Garagem', 'Um automóvel interessante que passou por aqui', 'Porque também gostamos de carro.', 'wheel')
on conflict (id) do nothing;
