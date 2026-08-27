import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/* Editor das perguntas do diagnóstico. O que muda aqui aparece no site na hora,
   porque o diagnóstico lê da mesma tabela. Os ids são preservados para não
   quebrar o histórico dos leads já gravados. */
const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40) || 'pergunta'

export function Questions({ toast }) {
  const [rows, setRows] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    const { data } = await supabase
      .from('diagnostic_questions')
      .select('*')
      .order('position', { ascending: true })
    setRows(data || [])
    setDirty(false)
  }
  useEffect(() => { load() }, [])

  const edit = (id, field, value) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
    setDirty(true)
  }

  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= rows.length) return
    const next = [...rows]
    ;[next[i], next[j]] = [next[j], next[i]]
    setRows(next.map((r, k) => ({ ...r, position: k + 1 })))
    setDirty(true)
  }

  const add = () => {
    const base = slug('nova pergunta')
    let id = base, n = 2
    while (rows.some((r) => r.id === id)) id = `${base}_${n++}`
    setRows([...rows, { id, position: rows.length + 1, short: '', question: '', hint: '', active: true, _new: true }])
    setDirty(true)
  }

  const remove = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id).map((r, k) => ({ ...r, position: k + 1 })))
    setDirty(true)
  }

  const save = async () => {
    for (const r of rows) {
      if (!r.short.trim() || !r.question.trim()) return toast('Toda pergunta precisa de rótulo e texto.')
    }
    setBusy(true)

    // remove do banco o que foi apagado na tela
    const { data: current } = await supabase.from('diagnostic_questions').select('id')
    const keep = new Set(rows.map((r) => r.id))
    const toDelete = (current || []).map((r) => r.id).filter((id) => !keep.has(id))
    if (toDelete.length) await supabase.from('diagnostic_questions').delete().in('id', toDelete)

    const payload = rows.map((r) => ({
      id: r.id, position: r.position, short: r.short.trim(),
      question: r.question.trim(), hint: (r.hint || '').trim() || null,
      active: r.active, updated_at: new Date().toISOString(),
    }))
    const { error } = await supabase.from('diagnostic_questions').upsert(payload)
    setBusy(false)
    if (error) return toast('Não salvou: ' + error.message)
    toast('Perguntas salvas. O site já está usando.')
    load()
  }

  if (rows === null) return <p className="adm-muted">Carregando…</p>

  return (
    <>
      <div className="adm-h">
        <h2>Perguntas do diagnóstico</h2>
        <span className="sub">edições aparecem no site imediatamente</span>
      </div>

      {rows.map((r, i) => (
        <div className={`adm-q${r.active ? '' : ' off'}`} key={r.id}>
          <div className="adm-q-top">
            <div className="adm-q-pos">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <button className="adm-move" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Subir">↑</button>
              <button className="adm-move" onClick={() => move(i, +1)} disabled={i === rows.length - 1} aria-label="Descer">↓</button>
            </div>
            <button className="adm-danger" onClick={() => remove(r.id)}>Remover</button>
          </div>

          <label>
            <span>Rótulo curto (aparece no lead e no resultado)</span>
            <input value={r.short} onChange={(e) => edit(r.id, 'short', e.target.value)} placeholder="Ex: Critério de perda total" />
          </label>
          <label>
            <span>Pergunta</span>
            <textarea rows={2} value={r.question} onChange={(e) => edit(r.id, 'question', e.target.value)} placeholder="O texto que a pessoa lê" />
          </label>
          <label>
            <span>Linha de apoio (opcional)</span>
            <input value={r.hint || ''} onChange={(e) => edit(r.id, 'hint', e.target.value)} placeholder="Um esclarecimento curto" />
          </label>

          <div className="adm-q-actions">
            <label className="adm-toggle">
              <input type="checkbox" checked={r.active} onChange={(e) => edit(r.id, 'active', e.target.checked)} />
              {r.active ? 'Ativa no site' : 'Oculta do site'}
            </label>
          </div>
        </div>
      ))}

      <button className="adm-btn ghost" onClick={add} style={{ marginTop: 8 }}>+ Adicionar pergunta</button>

      <div className="adm-savebar">
        {dirty && <span className="dirty">Há mudanças não salvas</span>}
        <button className="adm-btn" onClick={save} disabled={busy || !dirty}>{busy ? 'Salvando…' : 'Salvar e publicar'}</button>
      </div>
    </>
  )
}
