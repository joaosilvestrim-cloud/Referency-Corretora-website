import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/* Superfície que ocupa o lugar da foto real.
   `caption` é o briefing da tomada, revelado pelo botão de briefing.
   `parallax` desloca a superfície durante o scroll, como uma foto de verdade faria. */
export function Plate({ kind = 'head', caption, parallax = true, className = '', children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ['-7%', '7%'] : ['0%', '0%'])

  return (
    <div ref={ref} className={`plate pl-${kind} ${className}`} data-cursor="media">
      <motion.div className="plate-inner" style={{ y }} />
      {caption && <span className="cap">{caption}</span>}
      {children}
    </div>
  )
}
