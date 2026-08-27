import { useEffect, useRef, useState } from 'react'
import { buildMediaSlots } from '../data/mediaSlots'
import { fetchMedia, uploadMedia, removeMedia } from '../lib/media'
import { fetchCases, fetchBackstage } from '../lib/siteContent'

const MAX = 60 * 1024 * 1024 // 60 MB, igual ao limite do bucket

function SlotRow({ slot, current, onChange, toast }) {
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
      const m = await uploadMedia(slot.id, file)
      onChange(slot.id, m)
      toast('Enviado. O site já está usando.')
    } catch (err) {
      toast('Não subiu: ' + (err.message || 'erro'))
    }
    setBusy(false)
  }

  const reset = async () => {
    setBusy(true)
    try {
      await removeMedia(slot.id)
      onChange(slot.id, null)
      toast('Voltou para o padrão.')
    } catch (err) {
      toast('Não removeu: ' + (err.message || 'erro'))
    }
    setBusy(false)
  }

  return (
    <div className="md-slot">
      <div className="md-preview">
        {current?.kind === 'image' && <img src={current.url} alt="" />}
        {current?.kind === 'video' && <video src={current.url} muted loop autoPlay playsInline />}
        {!current && <span className="md-placeholder">padrão</span>}
      </div>

      <div className="md-info">
        <h3>{slot.label}</h3>
        <p className="md-where">{slot.where}</p>
        <p className="md-hint">{slot.hint}</p>
        <div className="md-actions">
          <button className="adm-btn ghost" onClick={pick} disabled={busy}>
            {busy ? 'Enviando…' : current ? 'Trocar' : 'Enviar arquivo'}
          </button>
          {current && !busy && (
            <button className="adm-danger" onClick={reset}>Voltar ao padrão</button>
          )}
          <span className={`md-badge ${current ? 'on' : ''}`}>
            {current ? (current.kind === 'video' ? 'Vídeo enviado' : 'Foto enviada') : 'Superfície em CSS'}
          </span>
        </div>
        <input ref={input} type="file" accept={slot.accept} hidden onChange={upload} />
      </div>
    </div>
  )
}

export function Media({ toast }) {
  const [map, setMap] = useState(null)
  const [slots, setSlots] = useState(buildMediaSlots())

  useEffect(() => { fetchMedia().then(setMap) }, [])
  /* os slots de caso/bastidor vêm do banco, então mídia nova acompanha
     conteúdo novo */
  useEffect(() => {
    Promise.all([fetchCases(), fetchBackstage()]).then(([cs, bs]) => setSlots(buildMediaSlots(cs, bs)))
  }, [])

  const change = (id, m) => setMap((prev) => {
    const next = { ...prev }
    if (m) next[id] = m
    else delete next[id]
    return next
  })

  if (map === null) return <p className="adm-muted">Carregando…</p>

  const usados = Object.keys(map).length

  return (
    <>
      <div className="adm-h">
        <h2>Mídias</h2>
        <span className="sub">{usados} de {slots.length} com arquivo próprio</span>
      </div>

      <p className="adm-muted" style={{ marginBottom: 22, maxWidth: '64ch' }}>
        Cada lugar do site aceita uma foto ou vídeo. Sem envio, fica a superfície
        em CSS que já está no ar. O corte é automático, então não precisa ajustar
        proporção. Trocou aqui, o site troca na hora.
      </p>

      <div className="md-grid">
        {slots.map((slot) => (
          <SlotRow key={slot.id} slot={slot} current={map[slot.id]} onChange={change} toast={toast} />
        ))}
      </div>
    </>
  )
}
