import { useRef, useState } from 'react'
import { uploadMedia, removeMedia } from '../lib/media'

const MAX = 60 * 1024 * 1024 // 60 MB, igual ao limite do bucket

/* Controle de mídia de um slot. Reutilizado na aba Mídias (hero e retrato) e
   embutido dentro de cada caso e bastidor. `compact` deixa horizontal e menor,
   para caber junto do texto no editor. */
export function MediaControl({ slotId, accept = 'image/*,video/*', current, onChange, toast, compact = false }) {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)

  const pick = () => input.current?.click()

  const upload = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > MAX) return toast('Arquivo grande demais (máx. 60 MB).')
    setBusy(true)
    try {
      const m = await uploadMedia(slotId, file)
      onChange(slotId, m)
      toast('Enviado. O site já está usando.')
    } catch (err) {
      toast('Não subiu: ' + (err.message || 'erro'))
    }
    setBusy(false)
  }

  const reset = async () => {
    setBusy(true)
    try {
      await removeMedia(slotId)
      onChange(slotId, null)
      toast('Voltou para o padrão.')
    } catch (err) {
      toast('Não removeu: ' + (err.message || 'erro'))
    }
    setBusy(false)
  }

  return (
    <div className={`mc${compact ? ' mc-compact' : ''}`}>
      <div className="mc-preview">
        {current?.kind === 'image' && <img src={current.url} alt="" />}
        {current?.kind === 'video' && <video src={current.url} muted loop autoPlay playsInline />}
        {!current && <span className="mc-placeholder">padrão</span>}
      </div>

      <div className="mc-actions">
        <span className={`mc-badge ${current ? 'on' : ''}`}>
          {current ? (current.kind === 'video' ? 'Vídeo enviado' : 'Foto enviada') : 'Superfície em CSS'}
        </span>
        <div className="mc-buttons">
          <button className="adm-btn ghost" onClick={pick} disabled={busy}>
            {busy ? 'Enviando…' : current ? 'Trocar' : 'Enviar arquivo'}
          </button>
          {current && !busy && (
            <button className="adm-danger" onClick={reset}>Remover</button>
          )}
        </div>
      </div>

      <input ref={input} type="file" accept={accept} hidden onChange={upload} />
    </div>
  )
}
