import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/* Só carrega vídeo quando faz sentido: com movimento liberado, numa aba visível
   e fora do modo de economia de dados. Nos outros casos a superfície em CSS
   continua sozinha, que é exatamente o que já está no ar hoje. */
function shouldLoadVideo() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const c = navigator.connection
  if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return false
  return true
}

/* Superfície que ocupa o lugar da foto real.
   `caption` é o briefing da tomada, revelado pelo botão de briefing.
   `video` é opcional: quando existe, entra por cima sem nunca segurar o render.
   `parallax` desloca a superfície durante o scroll, como uma foto de verdade faria. */
export function Plate({ kind = 'head', caption, video, parallax = true, className = '', children }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const [wanted, setWanted] = useState(false)

  useEffect(() => {
    if (video) setWanted(shouldLoadVideo())
  }, [video])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  /* com vídeo o parallax cai pela metade: o filme já tem movimento próprio
     e somar os dois embrulha a imagem */
  const range = !parallax ? 0 : ready ? 3 : 7
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])

  return (
    <div ref={ref} className={`plate pl-${kind} ${className}`} data-cursor="media">
      <motion.div className="plate-inner" style={{ y }}>
        {video && wanted && (
          <motion.video
            className="plate-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {video.webm && <source src={video.webm} type="video/webm" />}
            {video.mp4 && <source src={video.mp4} type="video/mp4" />}
          </motion.video>
        )}
      </motion.div>
      {caption && <span className="cap">{caption}</span>}
      {children}
    </div>
  )
}
