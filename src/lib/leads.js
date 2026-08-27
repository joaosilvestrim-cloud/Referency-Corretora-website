import { supabase, supabaseEnabled } from './supabase'
import { diagnostic as D } from '../data/content'

export const leadsEnabled = supabaseEnabled

/* Perguntas do diagnóstico. Vêm do banco para a corretora poder editar sem
   deploy. Se o banco não responder, cai no que está no content.js: o site
   nunca fica sem diagnóstico. Os ids são estáveis e casam com o que o lead
   guarda em `answers`. */
export async function fetchQuestions() {
  if (!supabase) return D.questions
  try {
    const { data, error } = await supabase
      .from('diagnostic_questions')
      .select('id, short, question, hint')
      .eq('active', true)
      .order('position', { ascending: true })
    if (error) throw error
    if (!data || !data.length) return D.questions
    return data.map((r) => ({ id: r.id, short: r.short, q: r.question, hint: r.hint || '' }))
  } catch (e) {
    if (import.meta.env.DEV) console.warn('perguntas do banco falharam, usando fallback:', e.message)
    return D.questions
  }
}

/* Grava o lead. Nunca lança: se falhar, o fluxo do WhatsApp segue intacto,
   porque perder o lead no banco não pode impedir a pessoa de falar com a
   corretora. */
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
