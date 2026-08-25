import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { nav } from '../data/content'
import { lockScroll } from '../hooks/useLenis'

const EASE = [0.22, 0.61, 0.36, 1]

export function Nav() {
  const [stuck, setStuck] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  /* Some ao descer, volta ao subir. Devolve a tela inteira para a leitura. */
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setStuck(v > 40)
    setHidden(v > 260 && v > prev && !open)
  })

  const toggle = () => {
    const next = !open
    setOpen(next)
    lockScroll(next)
  }

  const close = () => {
    setOpen(false)
    lockScroll(false)
  }

  return (
    <>
      <motion.header
        className={`nav${stuck ? ' stuck' : ''}`}
        animate={{ y: hidden ? '-102%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="nav-in">
          <a href="#top" className="brand" aria-label="Referency, início">
            <img src="/referency-mark-dark.png" alt="Referency, corretora de seguros" />
          </a>

          <nav className="nav-links" aria-label="Principal">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>

          <a href="#diagnostico" className="nav-cta">Diagnóstico</a>

          <button
            className={`burger${open ? ' open' : ''}`}
            onClick={toggle}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            {[...nav, { href: '#diagnostico', label: 'Diagnóstico' }].map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={close}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
              >
                {n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
