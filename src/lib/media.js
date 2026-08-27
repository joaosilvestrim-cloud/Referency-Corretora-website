import { supabase } from './supabase'

const BUCKET = 'media'

/* Mapa slot -> { kind, url } lido pelo site. Nunca lança: se o banco não
   responder, devolve vazio e cada Plate cai na superfície em CSS. */
export async function fetchMedia() {
  if (!supabase) return {}
  try {
    const { data, error } = await supabase.from('media').select('slot, kind, url')
    if (error) throw error
    const map = {}
    for (const r of data || []) map[r.slot] = { kind: r.kind, url: r.url }
    return map
  } catch {
    return {}
  }
}

/* Sobe um arquivo para o slot, atualiza o mapa e remove o arquivo antigo.
   Usado só no admin (a escrita exige is_admin() na RLS do Storage). */
export async function uploadMedia(slot, file) {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
  const path = `${slot}/${Date.now()}.${ext}`
  const kind = file.type.startsWith('video') ? 'video' : 'image'

  const { data: prev } = await supabase.from('media').select('path').eq('slot', slot).maybeSingle()

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (upErr) throw upErr

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)

  const { error } = await supabase.from('media').upsert({
    slot, kind, url: pub.publicUrl, path, updated_at: new Date().toISOString(),
  })
  if (error) throw error

  if (prev?.path && prev.path !== path) {
    await supabase.storage.from(BUCKET).remove([prev.path])
  }
  return { kind, url: pub.publicUrl }
}

/* Volta o slot para o padrão (superfície em CSS): apaga o registro e o arquivo. */
export async function removeMedia(slot) {
  const { data: prev } = await supabase.from('media').select('path').eq('slot', slot).maybeSingle()
  const { error } = await supabase.from('media').delete().eq('slot', slot)
  if (error) throw error
  if (prev?.path) await supabase.storage.from(BUCKET).remove([prev.path])
}
