import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { diagnostic as D } from '../data/content'

/* Monitoramento das respostas: agrega os leads no próprio navegador do admin.
   Para o volume de uma corretora isso é instantâneo e não precisa de view. */
export function Responses() {
  const [rows, setRows] = useState(null)
  const [questions, setQuestions] = useState(D.questions)

  useEffect(() => {
    supabase.from('leads').select('intent, score, open_points, answers, created_at, contact')
      .then(({ data }) => setRows(data || []))
    supabase.from('diagnostic_questions').select('id, short, position').order('position')
      .then(({ data }) => { if (data && data.length) setQuestions(data.map((r) => ({ id: r.id, short: r.short }))) })
  }, [])

  const stats = useMemo(() => {
    if (!rows) return null
    const total = rows.length
    const withContact = rows.filter((r) => r.contact).length
    const scores = rows.map((r) => r.score || 0)
    const avg = total ? (scores.reduce((a, b) => a + b, 0) / total) : 0
    const allAnswered = rows.filter((r) => (r.score || 0) === 0).length

    // por pergunta: quantas vezes "não sei/não tenho" (peso > 0)
    const weightOf = (aid) => (D.answers.find((a) => a.id === aid)?.weight || 0)
    const perQ = questions.map((q) => {
      const open = rows.filter((r) => weightOf(r.answers?.[q.id]) > 0).length
      const answered = rows.filter((r) => r.answers && r.answers[q.id] != null).length
      return { short: q.short, open, answered, pct: answered ? Math.round((open / answered) * 100) : 0 }
    }).sort((a, b) => b.pct - a.pct)

    // por momento (intent)
    const byIntent = {}
    rows.forEach((r) => { const k = r.intent || '—'; byIntent[k] = (byIntent[k] || 0) + 1 })
    const intents = Object.entries(byIntent).map(([k, v]) => ({ k, v })).sort((a, b) => b.v - a.v)

    return { total, withContact, avg, allAnswered, perQ, intents }
  }, [rows, questions])

  if (!stats) return <p className="adm-muted">Carregando…</p>

  const maxIntent = Math.max(1, ...stats.intents.map((i) => i.v))

  return (
    <>
      <div className="adm-h"><h2>Respostas</h2><span className="sub">o que o diagnóstico está revelando</span></div>

      {stats.total === 0 ? (
        <div className="adm-empty">Ainda não há diagnósticos respondidos.</div>
      ) : (
        <>
          <div className="adm-cards">
            <div className="adm-card"><div className="n">{stats.total}</div><div className="l">Diagnósticos</div></div>
            <div className="adm-card"><div className="n">{stats.avg.toFixed(1)}</div><div className="l">Pontos em aberto (média)</div></div>
            <div className="adm-card"><div className="n">{stats.withContact}</div><div className="l">Deixaram WhatsApp</div></div>
            <div className="adm-card"><div className="n">{stats.allAnswered}</div><div className="l">Sabiam responder tudo</div></div>
          </div>

          <div className="adm-panel">
            <h3>Onde as pessoas mais têm dúvida</h3>
            <p className="cap">Percentual de quem não soube responder cada pergunta. O topo é onde a conversa começa.</p>
            <div className="adm-bars">
              {stats.perQ.map((q) => (
                <div className="adm-bar-row" key={q.short}>
                  <div className="adm-bar-top"><span>{q.short}</span><b>{q.pct}%</b></div>
                  <div className="adm-bar-track"><div className="adm-bar-fill" style={{ width: q.pct + '%' }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="adm-panel">
            <h3>Momento de quem procura</h3>
            <p className="cap">O que a pessoa respondeu em "o que trouxe você até aqui".</p>
            <div className="adm-bars">
              {stats.intents.map((i) => (
                <div className="adm-bar-row" key={i.k}>
                  <div className="adm-bar-top"><span>{i.k}</span><b>{i.v}</b></div>
                  <div className="adm-bar-track"><div className="adm-bar-fill" style={{ width: (i.v / maxIntent * 100) + '%' }} /></div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
