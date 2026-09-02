-- ============================================================
-- Notificação de lead novo por e-mail (Resend, via pg_net)
--   · a cada lead inserido, dispara um e-mail com o resumo
--   · a chave do Resend e o destino ficam no Vault (nunca no código)
--   · assíncrono (pg_net): se o envio falhar, o lead entra do mesmo jeito
-- Para ligar, além desta migration é preciso ter no Vault os segredos
-- 'resend_key' e 'lead_notify_to' (e-mail destino, vírgula separa vários).
-- ============================================================

create extension if not exists pg_net;

create or replace function public.notify_new_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  api_key   text;
  to_addr   text;
  from_addr text := 'Referency <avisos@referencyseguros.com.br>';
  recips    jsonb;
  pts_html  text := '';
  wa_html   text := '';
  html      text;
begin
  select decrypted_secret into api_key from vault.decrypted_secrets where name = 'resend_key';
  select decrypted_secret into to_addr from vault.decrypted_secrets where name = 'lead_notify_to';

  -- sem chave ou sem destino configurado, não faz nada (e não quebra o insert)
  if api_key is null or to_addr is null or length(btrim(to_addr)) = 0 then
    return new;
  end if;

  recips := to_jsonb(regexp_split_to_array(btrim(to_addr), '\s*,\s*'));

  if coalesce(new.score, 0) > 0 and array_length(new.open_points, 1) is not null then
    pts_html :=
      '<p style="margin:18px 0 6px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6F8A87">Não sabe responder</p>'
      || '<ul style="margin:0;padding-left:18px;color:#2C4E4A;line-height:1.7">'
      || '<li>' || array_to_string(new.open_points, '</li><li>') || '</li></ul>';
  end if;

  if new.contact is not null and length(btrim(new.contact)) > 0 then
    wa_html :=
      '<a href="https://wa.me/' || regexp_replace(new.contact, '\D', '', 'g')
      || '" style="display:inline-block;margin-top:22px;background:#003734;color:#FBF9F5;'
      || 'text-decoration:none;padding:13px 24px;font-size:12px;letter-spacing:.12em">ABRIR WHATSAPP</a>';
  end if;

  html :=
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;border:1px solid #E9E1D6;background:#FBF9F5">'
    || '<div style="background:#003734;color:#FBF9F5;padding:18px 24px;font-size:13px;letter-spacing:.06em">NOVO DIAGNÓSTICO NO SITE</div>'
    || '<div style="padding:26px 24px;color:#003734">'
    || '<p style="font-size:23px;margin:0 0 2px">' || coalesce(new.name, 'Sem nome informado') || '</p>'
    || case when new.car     is not null then '<p style="margin:2px 0 0;color:#6F8A87">' || new.car || '</p>' else '' end
    || case when new.intent  is not null then '<p style="margin:16px 0 0;color:#2C4E4A"><b>Momento:</b> ' || new.intent || '</p>' else '' end
    || case when new.contact is not null then '<p style="margin:6px 0 0;color:#2C4E4A"><b>WhatsApp:</b> ' || new.contact || '</p>' else '' end
    || pts_html
    || wa_html
    || '<p style="margin:26px 0 0;font-size:12px;color:#9DB0AD">Veja no painel: referency-corretora-website.vercel.app/admin</p>'
    || '</div></div>';

  -- O envio é embrulhado: qualquer erro aqui é engolido e o lead entra do mesmo
  -- jeito. Perder a notificação nunca pode impedir a captura do lead.
  begin
    perform net.http_post(
      url     := 'https://api.resend.com/emails',
      headers := jsonb_build_object('Authorization', 'Bearer ' || api_key, 'Content-Type', 'application/json'),
      body    := jsonb_build_object(
        'from',    from_addr,
        'to',      recips,
        'subject', 'Novo diagnóstico — ' || coalesce(new.name, 'sem nome'),
        'html',    html
      )
    );
  exception when others then
    null;  -- não propaga: o insert do lead segue normalmente
  end;

  return new;
end;
$$;

drop trigger if exists trg_notify_new_lead on public.leads;
create trigger trg_notify_new_lead
  after insert on public.leads
  for each row execute function public.notify_new_lead();
