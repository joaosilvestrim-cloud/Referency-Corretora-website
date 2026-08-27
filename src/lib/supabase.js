import { createClient } from '@supabase/supabase-js'

/* Cliente único, compartilhado entre o site público e o admin.
   A anon key é pública por design: o que ela pode fazer é limitado pela RLS
   (inserir lead sim, ler lead não; ler perguntas ativas sim). O admin ganha
   poderes extras só depois de logar, e mesmo assim apenas se estiver na
   tabela `admins`. */
const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(url && anon)

export const supabase = supabaseEnabled
  ? createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null
