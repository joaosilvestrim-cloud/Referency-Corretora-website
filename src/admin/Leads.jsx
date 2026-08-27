import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const STATUSES = [
  { id: 'novo', label: 'Novo' },
  { id: 'contatado', label: 'Contatado' },
  { id: 'fechado', label: 'Fechado' },
  { id: 'descartado', label: 'Descartado' },
]

const fmt = (iso) => {
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
}
const waLink = (n) => 'https://wa.me/' + String(n).replace(/\D/g, '')

export function Leads({ toast }) {
  const [rows, setRows] = useState(null)
  const [filter, setFilter] = useState('todos')

  const load = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setRows(data || [])
  }
  useEffect(() => { load() }, [])

  const counts = useMemo(() => {
    const c = { todos: rows?.length || 0 }
    STATUSES.forEach((s) => (c[s.id] = 0))
    ;(rows || []).forEach((r) => (c[r.status] = (c[r.status] || 0) + 1))
    return c
  }, [rows])

  const shown = useMemo(
    () => (rows || []).filter((r) => filter === 'todos' || r.status === filter),
    [rows, filter]
  )

  const patch = async (id, changes, optimistic) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...optimistic } : r)))
    const { error } = await supabase.from('leads').update(changes).eq('id', id)
    if (error) { toast('Não salvou. Tente de novo.'); load() }
  }

  const setStatus = (r, status) => {
    const changes = { status }
    if (status === 'contatado' && !r.contacted_at) changes.contacted_at = new Date().toISOString()
    patch(r.id, changes, changes)
  }

  if (rows === null) return <p className="adm-muted">Carregando…</p>

  return (
    <>
      <div className="adm-h">
        <h2>Leads</h2>
        <span className="sub">{counts.todos} no total · atualiza ao abrir</span>
      </div>

      <div className="adm-filters">
        <button className={`adm-chip${filter === 'todos' ? ' on' : ''}`} onClick={() => setFilter('todos')}>
          Todos <b>{counts.todos}</b>
        </button>
        {STATUSES.map((s) => (
          <button key={s.id} className={`adm-chip${filter === s.id ? ' on' : ''}`} onClick={() => setFilter(s.id)}>
            {s.label} <b>{counts[s.id] || 0}</b>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="adm-empty">Nenhum lead {filter === 'todos' ? 'ainda' : 'nesse status'}.</div>
      ) : (
        <div className="adm-tablewrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Quando</th>
                <th>Quem</th>
                <th>Carro</th>
                <th>Momento</th>
                <th>Não sabe responder</th>
                <th>Status</th>
                <th>Anotações</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id}>
                  <td className="adm-when">{fmt(r.created_at)}</td>
                  <td>
                    <div className="adm-name">{r.name || '—'}</div>
                    {r.contact && (
                      <a className="adm-wa" href={waLink(r.contact)} target="_blank" rel="noopener">{r.contact}</a>
                    )}
                  </td>
                  <td>{r.car || '—'}</td>
                  <td>{r.intent || '—'}</td>
                  <td>
                    {r.score > 0 ? (
                      <div className="adm-points">
                        {(r.open_points || []).map((p, i) => <span key={i} className="adm-point">{p}</span>)}
                      </div>
                    ) : (
                      <span className="adm-muted">respondeu tudo</span>
                    )}
                  </td>
                  <td>
                    <select
                      className={`adm-status st-${r.status}`}
                      value={r.status}
                      onChange={(e) => setStatus(r, e.target.value)}
                    >
                      {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </td>
                  <td>
                    <textarea
                      className="adm-notes"
                      rows={2}
                      defaultValue={r.notes || ''}
                      placeholder="Anotação interna"
                      onBlur={(e) => {
                        if (e.target.value !== (r.notes || '')) patch(r.id, { notes: e.target.value }, { notes: e.target.value })
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
