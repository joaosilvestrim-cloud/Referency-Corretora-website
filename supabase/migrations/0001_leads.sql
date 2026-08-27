-- ============================================================
-- Referency — captura de leads do diagnóstico
--
-- Padrão seguro para formulário público:
--   · a anon key só INSERE, nunca LÊ
--   · ninguém pelo site enxerga o lead de outra pessoa
--   · a corretora lê pelo painel do Supabase (service_role)
-- ============================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  source      text not null default 'diagnostico',  -- de onde veio
  intent      text,                                  -- "Meu seguro vai renovar" etc
  name        text,
  car         text,
  contact     text,                                  -- whatsapp/telefone, opcional

  open_points text[]  not null default '{}',         -- pontos que a pessoa não sabe
  answers     jsonb   not null default '{}'::jsonb,  -- mapa completo pergunta->resposta
  score       int     not null default 0,            -- quantos pontos em aberto

  page        text,
  referrer    text,
  user_agent  text
);

comment on table public.leads is 'Leads do diagnóstico de apólice do site Referency';

-- consultas do painel: mais recentes primeiro
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ------------------------------------------------------------
-- RLS: insert-only para o público
-- ------------------------------------------------------------
alter table public.leads enable row level security;

-- o site (anon) e usuários logados podem INSERIR
drop policy if exists "leads_insert_public" on public.leads;
create policy "leads_insert_public"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- nenhuma policy de SELECT/UPDATE/DELETE:
-- com RLS ligado e sem policy, essas operações ficam negadas para anon.
-- A corretora lê via service_role (painel), que ignora RLS.

-- privilégios de tabela que o PostgREST exige
grant insert on public.leads to anon, authenticated;
