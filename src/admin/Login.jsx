import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function Login({ onIn }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pass })
    setBusy(false)
    if (error) return setErr('E-mail ou senha incorretos.')
    onIn()
  }

  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <img src="/referency-mark-dark.png" alt="Referency" />
        <h1>Painel</h1>
        <p>Acesso restrito à corretora.</p>

        <label className="adm-field">
          <span>E-mail</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        </label>
        <label className="adm-field">
          <span>Senha</span>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" required />
        </label>

        {err && <p className="adm-err">{err}</p>}

        <button className="adm-btn" disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
      </form>
    </div>
  )
}
