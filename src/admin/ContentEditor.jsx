import { useEffect, useState } from 'react'
import { adminFetch, saveList } from '../lib/siteContent'

const slug = (s) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40)

/* Editor genérico de uma lista de conteúdo (casos, bastidores). Recebe o nome
   da tabela e a descrição dos campos; cuida de carregar, editar, reordenar,
   adicionar, remover e salvar. Salvar publica no site na hora, porque o site
   lê da mesma tabela. */
export function ContentEditor({ table, title, sub, fields, newLabel, makeId, toast }) {
  const [rows, setRows] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setRows(await adminFetch(table))
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
    setRows(next)
    setDirty(true)
  }
  const add = () => {
    const base = makeId(rows)
    let id = base, n = 2
    while (rows.some((r) => r.id === id)) id = `${base}_${n++}`
    const blank = { id, active: true, _new: true }
    fields.forEach((f) => (blank[f.key] = f.default ?? ''))
    setRows([...rows, blank])
    setDirty(true)
  }
  const remove = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
    setDirty(true)
  }

  const save = async () => {
    for (const r of rows) {
      for (const f of fields) {
        if (f.required && !String(r[f.key] || '').trim()) return toast(`"${f.label}" é obrigatório em todo item.`)
      }
    }
    setBusy(true)
    try {
      await saveList(table, rows, fields.map((f) => f.key))
      toast('Salvo. O site já está usando.')
      load()
    } catch (e) {
      toast('Não salvou: ' + e.message)
    }
    setBusy(false)
  }

  if (rows === null) return <p className="adm-muted">Carregando…</p>

  return (
    <>
      <div className="adm-h">
        <h2>{title}</h2>
        <span className="sub">{sub}</span>
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

          {fields.map((f) => (
            <label key={f.key}>
              <span>{f.label}{f.hint ? ` · ${f.hint}` : ''}</span>
              {f.type === 'textarea' ? (
                <textarea rows={f.rows || 3} value={r[f.key] || ''} onChange={(e) => edit(r.id, f.key, e.target.value)} placeholder={f.placeholder || ''} />
              ) : f.type === 'select' ? (
                <select className="adm-select" value={r[f.key] || ''} onChange={(e) => edit(r.id, f.key, e.target.value || null)}>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input value={r[f.key] || ''} onChange={(e) => edit(r.id, f.key, e.target.value)} placeholder={f.placeholder || ''} />
              )}
            </label>
          ))}

          <div className="adm-q-actions">
            <label className="adm-toggle">
              <input type="checkbox" checked={r.active} onChange={(e) => edit(r.id, 'active', e.target.checked)} />
              {r.active ? 'Visível no site' : 'Oculto do site'}
            </label>
          </div>
        </div>
      ))}

      <button className="adm-btn ghost" onClick={add} style={{ marginTop: 8 }}>+ {newLabel}</button>

      <div className="adm-savebar">
        {dirty && <span className="dirty">Há mudanças não salvas</span>}
        <button className="adm-btn" onClick={save} disabled={busy || !dirty}>{busy ? 'Salvando…' : 'Salvar e publicar'}</button>
      </div>
    </>
  )
}

/* ---- configuração das duas telas ---- */

const PLATES = [
  { value: 'body', label: 'Lataria' },
  { value: 'garage', label: 'Garagem' },
  { value: 'carbon', label: 'Carbono' },
  { value: 'wheel', label: 'Roda' },
  { value: 'cockpit', label: 'Interior' },
  { value: 'paper', label: 'Documento' },
  { value: 'head', label: 'Farol' },
]

export function CasesEditor({ toast }) {
  return (
    <ContentEditor
      table="cases"
      title="Casos"
      sub="edições aparecem no site imediatamente"
      newLabel="Adicionar caso"
      makeId={() => slug('novo caso') || 'caso'}
      toast={toast}
      fields={[
        { key: 'kicker', label: 'Categoria', hint: 'ex: Perda total', placeholder: 'Categoria curta' },
        { key: 'title', label: 'Título', required: true, placeholder: 'Ex: Porsche 911 Turbo' },
        { key: 'subtitle', label: 'Subtítulo', placeholder: 'Uma linha de tensão' },
        { key: 'teaser', label: 'Chamada', hint: 'aparece no card', type: 'textarea', rows: 2 },
        { key: 'body', label: 'Texto do caso', hint: 'aparece ao abrir', type: 'textarea', rows: 4 },
        { key: 'verdict', label: 'O que decidiu o caso', type: 'textarea', rows: 2 },
        { key: 'video', label: 'Selo de vídeo', hint: 'ex: 1:12 — deixe vazio se for foto', placeholder: 'vazio = sem vídeo' },
        { key: 'plate', label: 'Superfície padrão', type: 'select', options: PLATES, default: 'body' },
        { key: 'size', label: 'Card largo?', type: 'select', default: '', options: [{ value: '', label: 'Normal' }, { value: 'wide', label: 'Largo' }] },
      ]}
    />
  )
}

export function BackstageEditor({ toast }) {
  return (
    <ContentEditor
      table="backstage"
      title="Bastidores"
      sub="a faixa de três itens perto do rodapé"
      newLabel="Adicionar item"
      makeId={() => slug('novo item') || 'item'}
      toast={toast}
      fields={[
        { key: 'kicker', label: 'Categoria', placeholder: 'ex: Risco invisível' },
        { key: 'title', label: 'Título', required: true, type: 'textarea', rows: 2 },
        { key: 'body', label: 'Linha de apoio', placeholder: 'Uma frase curta' },
        { key: 'plate', label: 'Superfície padrão', type: 'select', options: PLATES, default: 'garage' },
      ]}
    />
  )
}
