-- ============================================================
-- CMS de mídias
--   · cada "slot" do site (hero, casos, bastidores) pode receber
--     uma foto ou vídeo enviado pela corretora
--   · arquivos ficam no Storage (bucket público 'media')
--   · o mapa slot -> arquivo fica em public.media
-- Sem envio, o site usa a superfície em CSS de sempre. Nada quebra.
-- ============================================================

-- mapa slot -> arquivo
create table if not exists public.media (
  slot       text primary key,             -- 'hero', 'case_ozzy', 'bt_0'...
  kind       text not null,                -- 'image' | 'video'
  url        text not null,                -- URL pública do arquivo
  path       text not null,                -- caminho no bucket (para apagar depois)
  updated_at timestamptz not null default now()
);
alter table public.media enable row level security;

-- público lê (o site precisa saber o que exibir); admin escreve
drop policy if exists media_read on public.media;
create policy media_read on public.media
  for select to anon, authenticated using (true);

drop policy if exists media_write on public.media;
create policy media_write on public.media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant select on public.media to anon, authenticated;
grant insert, update, delete on public.media to authenticated;

-- ------------------------------------------------------------
-- bucket de Storage: público para leitura, até 60 MB
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 62914560)
on conflict (id) do update set public = true, file_size_limit = 62914560;

-- leitura pública dos arquivos; escrita só de admin
drop policy if exists media_obj_read on storage.objects;
create policy media_obj_read on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists media_obj_insert on storage.objects;
create policy media_obj_insert on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists media_obj_update on storage.objects;
create policy media_obj_update on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists media_obj_delete on storage.objects;
create policy media_obj_delete on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
