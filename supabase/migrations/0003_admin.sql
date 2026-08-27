-- ============================================================
-- Camada de administração
--   · quem é admin fica em public.admins (só a service_role insere)
--   · leads ganham status/notas para virar um mini-funil
--   · as perguntas do diagnóstico saem do código e vão para o banco,
--     para a corretora editar sem depender de deploy
-- Segurança: leitura de lead exige is_admin(). Signup público, mesmo se
-- ligado, não vira admin sozinho — só quem está em admins enxerga.
-- ============================================================

-- quem pode administrar
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

-- função de checagem, security definer para não recorrer na própria RLS
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- admin enxerga a lista de admins; ninguém se auto-insere (sem policy de insert)
drop policy if exists admins_read on public.admins;
create policy admins_read on public.admins
  for select to authenticated using (public.is_admin());

-- ------------------------------------------------------------
-- leads: funil
-- ------------------------------------------------------------
alter table public.leads add column if not exists status       text not null default 'novo';
alter table public.leads add column if not exists notes        text;
alter table public.leads add column if not exists contacted_at timestamptz;

-- admin lê e atualiza; o insert público (anon) continua como estava
drop policy if exists leads_select_admin on public.leads;
create policy leads_select_admin on public.leads
  for select to authenticated using (public.is_admin());

drop policy if exists leads_update_admin on public.leads;
create policy leads_update_admin on public.leads
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

grant select, update on public.leads to authenticated;

-- ------------------------------------------------------------
-- perguntas do diagnóstico, editáveis pelo admin
-- ------------------------------------------------------------
create table if not exists public.diagnostic_questions (
  id         text primary key,       -- id estável, casa com o que os leads guardam
  position   int  not null,
  short      text not null,          -- rótulo curto (vai no lead e no resultado)
  question   text not null,          -- a pergunta em si
  hint       text,                   -- linha de apoio
  active     boolean not null default true,
  updated_at timestamptz not null default now()
);
alter table public.diagnostic_questions enable row level security;

-- público lê as ativas; admin lê todas e escreve
drop policy if exists dq_read on public.diagnostic_questions;
create policy dq_read on public.diagnostic_questions
  for select to anon, authenticated using (active or public.is_admin());

drop policy if exists dq_write on public.diagnostic_questions;
create policy dq_write on public.diagnostic_questions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant select on public.diagnostic_questions to anon, authenticated;
grant insert, update, delete on public.diagnostic_questions to authenticated;

-- semeia com as perguntas atuais do content.js
insert into public.diagnostic_questions (id, position, short, question, hint) values
 ('terceiros', 1, 'Limite de danos a terceiros',
  'Você sabe até quanto a sua apólice paga se você causar dano ao carro de outra pessoa?',
  'Muita apólice fica em R$ 100 mil só porque foi o que veio na proposta.'),
 ('peca', 2, 'Peça genuína ou similar',
  'Você sabe se o seu contrato garante peça genuína ou aceita similar?',
  'Isso está nas condições gerais, não na cotação.'),
 ('acessorios', 3, 'Acessórios declarados',
  'O PPF, as rodas e os acessórios que você pagou estão declarados na apólice, com valor?',
  'O que não está declarado não existe para a seguradora.'),
 ('perdatotal', 4, 'Critério de perda total',
  'Você sabe qual percentual da tabela a sua apólice paga em caso de perda total?',
  '95%, 100% e 110% chegam a números bem diferentes para o mesmo carro.')
on conflict (id) do nothing;
