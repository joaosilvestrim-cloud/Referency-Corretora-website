import { supabase } from './supabase'
import { cases as casesFallback, backstage as backstageFallback } from '../data/content'

/* Casos e bastidores vêm do banco para a corretora editar sem deploy.
   Se o banco não responder, cai no content.js: o site nunca fica sem conteúdo.
   Os ids são estáveis e casam com os slots de mídia (case_<id>, bt_<id>). */

export async function fetchCases() {
  if (!supabase) return casesFallback.items
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('id, kicker, title, subtitle, teaser, body, verdict, plate, video, size')
      .eq('active', true)
      .order('position', { ascending: true })
    if (error) throw error
    return data && data.length ? data : casesFallback.items
  } catch {
    return casesFallback.items
  }
}

export async function fetchBackstage() {
  if (!supabase) return backstageFallback.items
  try {
    const { data, error } = await supabase
      .from('backstage')
      .select('id, kicker, title, body, plate')
      .eq('active', true)
      .order('position', { ascending: true })
    if (error) throw error
    return data && data.length ? data : backstageFallback.items
  } catch {
    return backstageFallback.items
  }
}

/* --- admin: leitura completa (inclui inativos) e gravação --- */

export async function adminFetch(table) {
  const { data, error } = await supabase.from(table).select('*').order('position', { ascending: true })
  if (error) throw error
  return data || []
}

/* Salva a lista inteira: apaga o que sumiu, faz upsert do resto com a posição
   atual. Mesma estratégia do editor de perguntas. */
export async function saveList(table, rows, fields) {
  const { data: current } = await supabase.from(table).select('id')
  const keep = new Set(rows.map((r) => r.id))
  const toDelete = (current || []).map((r) => r.id).filter((id) => !keep.has(id))
  if (toDelete.length) await supabase.from(table).delete().in('id', toDelete)

  const payload = rows.map((r, i) => {
    const o = { id: r.id, position: i + 1, active: r.active, updated_at: new Date().toISOString() }
    for (const f of fields) o[f] = (r[f] ?? '') === '' ? null : r[f]
    return o
  })
  const { error } = await supabase.from(table).upsert(payload)
  if (error) throw error
}
