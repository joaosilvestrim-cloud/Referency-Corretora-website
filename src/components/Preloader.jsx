import { motion } from 'motion/react'

const EASE = [0.76, 0, 0.24, 1]

/* Cortina de abertura. Sobe revelando o hero.
   Roda uma vez por sessão para não irritar quem volta. */
export function Preloader({ onDone }) {
  return (
    <motion.div
      className="preload"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={onDone}
    >
      <motion.img
        src="/referency-mark-light.png"
        alt=""
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      />
      <div className="preload-bar">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.05, ease: [0.3, 0, 0.2, 1], delay: 0.15 }}
        />
      </div>
    </motion.div>
  )
}
