import { useEffect, useState } from 'react'
import { supabase, supabaseEnabled } from '../lib/supabase'
import { Login } from './Login'
import { Leads } from './Leads'
import { Questions } from './Questions'
import { Responses } from './Responses'
import { Media } from './Media'
import { CasesEditor, BackstageEditor } from './ContentEditor'
import './admin.css'

const TABS = [
  { id: 'leads', label: 'Leads', C: Leads },
  { id: 'respostas', label: 'Respostas', C: Responses },
  { id: 'casos', label: 'Casos', C: CasesEditor },
  { id: 'bastidores', label: 'Bastidores', C: BackstageEditor },
  { id: 'perguntas', label: 'Perguntas', C: Questions },
  { id: 'midias', label: 'Mídias', C: Media },
]

export default function Admin() {
  const [session, setSession] = useState(undefined) // undefined = carregando
  const [isAdmin, setIsAdmin] = useState(null)
  const [tab, setTab] = useState('leads')
  const [toastMsg, setToastMsg] = useState('')

  const toast = (m) => { setToastMsg(m); setTimeout(() => setToastMsg(''), 2600) }

  useEffect(() => {
    if (!supabaseEnabled) { setSession(null); return }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  /* confirma que o usuário logado é de fato admin (está na tabela admins).
     Sem isso, RLS já bloquearia os dados, mas assim mostramos a tela certa. */
  useEffect(() => {
    if (!session) { setIsAdmin(session === null ? false : null); return }
    supabase.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      .then(({ data }) => setIsAdmin(Boolean(data)))
  }, [session])

  if (!supabaseEnabled) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <h1>Painel indisponível</h1>
          <p>As chaves do Supabase não estão configuradas neste ambiente.</p>
        </div>
      </div>
    )
  }

  if (session === undefined) return <div className="adm" />
  if (!session) return <div className="adm"><Login onIn={() => {}} /></div>

  if (isAdmin === null) return <div className="adm"><div className="adm-main"><p className="adm-muted">Verificando acesso…</p></div></div>

  if (!isAdmin) {
    return (
      <div className="adm">
        <div className="adm-login">
          <div className="adm-login-card">
            <h1>Sem acesso</h1>
            <p>Esta conta não tem permissão de administrador.</p>
            <button className="adm-btn" onClick={() => supabase.auth.signOut()}>Sair</button>
          </div>
        </div>
      </div>
    )
  }

  const Active = TABS.find((t) => t.id === tab).C

  return (
    <div className="adm">
      <header className="adm-top">
        <img src="/referency-mark-dark.png" alt="Referency" />
        <nav className="adm-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`adm-tab${tab === t.id ? ' on' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="adm-who">
          <span>{session.user.email}</span>
          <button className="adm-signout" onClick={() => supabase.auth.signOut()}>Sair</button>
        </div>
      </header>

      <main className="adm-main">
        <Active toast={toast} />
      </main>

      {toastMsg && <div className="adm-toast">{toastMsg}</div>}
    </div>
  )
}
