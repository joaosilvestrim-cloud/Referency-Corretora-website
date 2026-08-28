import { useEffect, useState } from 'react'
import { standaloneSlots } from '../data/mediaSlots'
import { fetchMedia } from '../lib/media'
import { MediaControl } from './MediaControl'

/* Só os slots sem editor de conteúdo: o vídeo do hero e o retrato do Matheus.
   A mídia de casos e bastidores agora fica dentro do editor de cada um. */
export function Media({ toast }) {
  const [map, setMap] = useState(null)

  useEffect(() => { fetchMedia().then(setMap) }, [])

  const change = (id, m) => setMap((prev) => {
    const next = { ...prev }
    if (m) next[id] = m
    else delete next[id]
    return next
  })

  if (map === null) return <p className="adm-muted">Carregando…</p>

  return (
    <>
      <div className="adm-h">
        <h2>Mídias</h2>
        <span className="sub">topo do site e retrato do ateliê</span>
      </div>

      <p className="adm-muted" style={{ marginBottom: 22, maxWidth: '64ch' }}>
        As fotos e vídeos dos casos e dos bastidores ficam dentro das abas Casos
        e Bastidores, junto do texto de cada um. Aqui ficam só os dois que não
        têm texto próprio. Sem envio, fica a superfície em CSS. Trocou, o site
        troca na hora.
      </p>

      <div className="md-grid">
        {standaloneSlots.map((slot) => (
          <div className="md-slot" key={slot.id}>
            <div className="md-info">
              <h3>{slot.label}</h3>
              <p className="md-where">{slot.where}</p>
              <p className="md-hint">{slot.hint}</p>
            </div>
            <MediaControl
              slotId={slot.id}
              accept={slot.accept}
              current={map[slot.id]}
              onChange={change}
              toast={toast}
            />
          </div>
        ))}
      </div>
    </>
  )
}
