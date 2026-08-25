import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

/* Cursor que só aparece sobre as mídias, com o rótulo da ação.
   Fora delas ele some e o cursor do sistema volta. */
export function Cursor() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 620, damping: 42, mass: 0.45 })
  const sy = useSpring(y, { stiffness: 620, damping: 42, mass: 0.45 })
  const [label, setLabel] = useState(null)
  const [onPaper, setOnPaper] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const media = e.target.closest('[data-cursor]')
      if (!media) return setLabel(null)
      const kind = media.getAttribute('data-cursor')
      const host = media.closest('[data-cursor-label]')
      setOnPaper(media.classList.contains('pl-paper'))
      setLabel(host ? host.getAttribute('data-cursor-label') : kind === 'media' ? '' : null)
    }
    const leave = () => setLabel(null)

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  return (
    <AnimatePresence>
      {label !== null && (
        <motion.div
          className={`cursor${onPaper ? ' on-paper' : ''}`}
          style={{ x: sx, y: sy }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
