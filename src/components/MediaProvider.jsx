import { createContext, useContext, useEffect, useState } from 'react'
import { fetchMedia } from '../lib/media'

/* Carrega o mapa de mídias uma vez e entrega para os Plates sem prop drilling.
   Começa vazio, então o site renderiza na hora com as superfícies em CSS e
   troca para a foto/vídeo enviado assim que o mapa chega. */
const MediaCtx = createContext({})

export function MediaProvider({ children }) {
  const [media, setMedia] = useState({})
  useEffect(() => {
    let alive = true
    fetchMedia().then((m) => { if (alive) setMedia(m) })
    return () => { alive = false }
  }, [])
  return <MediaCtx.Provider value={media}>{children}</MediaCtx.Provider>
}

export const useMedia = () => useContext(MediaCtx)
