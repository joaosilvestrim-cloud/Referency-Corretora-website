-- ============================================================
-- View de leitura para a corretora ver os leads já formatados.
-- Só a service_role (painel do Supabase) enxerga, porque a base
-- tem RLS e o public não tem policy de SELECT.
-- ============================================================
create or replace view public.leads_painel as
select
  to_char(created_at at time zone 'America/Sao_Paulo', 'DD/MM/YYYY HH24:MI') as quando,
  coalesce(name, '—')    as nome,
  coalesce(contact, '—') as whatsapp,
  coalesce(car, '—')     as carro,
  coalesce(intent, '—')  as momento,
  score                  as pontos_em_aberto,
  array_to_string(open_points, ' · ') as o_que_verificar,
  id
from public.leads
order by created_at desc;

comment on view public.leads_painel is 'Leads do diagnóstico, formatados para leitura no painel';
