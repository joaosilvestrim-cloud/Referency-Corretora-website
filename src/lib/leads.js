import { createClient } from '@supabase/supabase-js'

/* Cliente Supabase com a anon key. Ela é pública por design: a tabela `leads`
   tem RLS ligado e só aceita INSERT, nunca SELECT. Ou seja, o que sai daqui
   entra no banco, mas ninguém pelo site consegue ler lead de ninguém. */
const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

/* Se as chaves não estiverem configuradas, o site continua funcionando:
   o diagnóstico ainda monta a mensagem do WhatsApp. Só não grava o lead. */
export const leadsEnabled = Boolean(url && anon)

const supabase = leadsEnabled
  ? createClient(url, anon, { auth: { persistSession: false } })
  : null

/* Grava o lead. Nunca lança: se falhar, o fluxo do WhatsApp segue intacto,
   porque perder o lead no banco não pode impedir a pessoa de falar com a
   corretora. Devolve { ok } só para quem quiser registrar o resultado. */
export async function saveLead(lead) {
  if (!supabase) return { ok: false, skipped: true }
  try {
    const { error } = await supabase.from('leads').insert({
      source: 'diagnostico',
      intent: lead.intent ?? null,
      name: lead.name || null,
      car: lead.car || null,
      contact: lead.contact || null,
      open_points: lead.openPoints ?? [],
      answers: lead.answers ?? {},
      score: lead.score ?? 0,
      page: typeof location !== 'undefined' ? location.pathname : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    })
    if (error) throw error
    return { ok: true }
  } catch (e) {
    if (import.meta.env.DEV) console.warn('lead não gravado:', e.message)
    return { ok: false, error: e }
  }
}
