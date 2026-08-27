import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMedia } from './MediaProvider'

/* Só carrega vídeo quando faz sentido: com movimento liberado, numa aba visível
   e fora do modo de economia de dados. Nos outros casos a superfície em CSS
   continua sozinha. */
function shouldLoadVideo() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const c = navigator.connection
  if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return false
  return true
}

/* Superfície que ocupa o lugar da foto real.
   Ordem de preferência do que preenche a superfície:
     1. mídia enviada pelo painel para este `slot` (imagem ou vídeo)
     2. `video` estático passado por prop (o filme do hero que vem no build)
     3. a superfície em CSS sozinha
   `caption` é o briefing da tomada, revelado pelo botão de briefing. */
export function Plate({ kind = 'head', slot, caption, video, parallax = true, className = '', children }) {
  const media = useMedia()
  const uploaded = slot ? media[slot] : null

  const ref = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [wantVideo, setWantVideo] = useState(false)

  const showUploadImage = uploaded?.kind === 'image'
  const uploadedVideoUrl = uploaded?.kind === 'video' ? uploaded.url : null
  const staticVideo = !uploaded && video ? video : null
  const hasVideo = Boolean(uploadedVideoUrl || staticVideo)

  useEffect(() => {
    if (hasVideo) setWantVideo(shouldLoadVideo())
  }, [hasVideo])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  /* com mídia real o parallax cai pela metade: foto/vídeo já têm presença
     própria e o excesso de deslocamento incomoda */
  const active = showUploadImage || videoReady
  const range = !parallax ? 0 : active ? 3 : 7
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])

  return (
    <div ref={ref} className={`plate pl-${kind} ${className}`} data-cursor="media">
      <motion.div className="plate-inner" style={{ y }}>
        {showUploadImage && (
          <motion.img
            className="plate-img"
            src={uploaded.url}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          />
        )}

        {hasVideo && wantVideo && (
          <motion.video
            key={uploadedVideoUrl || 'static'}
            className="plate-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {uploadedVideoUrl ? (
              <source src={uploadedVideoUrl} />
            ) : (
              <>
                {staticVideo.webm && <source src={staticVideo.webm} type="video/webm" />}
                {staticVideo.mp4 && <source src={staticVideo.mp4} type="video/mp4" />}
              </>
            )}
          </motion.video>
        )}
      </motion.div>

      {caption && <span className="cap">{caption}</span>}
      {children}
    </div>
  )
}
