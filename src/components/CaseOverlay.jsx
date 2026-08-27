import { useEffect } from 'react'
import { motion } from 'motion/react'
import { cases, brand } from '../data/content'
import { Plate } from './Plate'

const EASE = [0.76, 0, 0.24, 1]
const SOFT = [0.22, 0.61, 0.36, 1]

const stagger = (i) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: SOFT, delay: 0.3 + i * 0.07 },
})

export function CaseOverlay({ index, onClose, onNavigate }) {
  const c = cases.items[index]
  const next = (index + 1) % cases.items.length

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(next)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNavigate, next])

  return (
    <motion.div
      className="ov"
      role="dialog"
      aria-modal="true"
      aria-label={`Caso ${c.title}`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.72, ease: EASE }}
    >
      <div className="ov-head">
        <span className="eyebrow">
          <b className="ov-count">{String(index + 1).padStart(2, '0')} / {String(cases.items.length).padStart(2, '0')}</b>
          {c.kicker}
        </span>
        <button className="ov-close" onClick={onClose}>
          Fechar
          <span className="x" aria-hidden="true"><i /><i /></span>
        </button>
      </div>

      <div className="ov-body">
        <div className="ov-in">
          <motion.div className="ov-media" {...stagger(0)}>
            <Plate kind={c.plate} slot={`case_${c.id}`} caption={c.photo} parallax={false} />
            {c.video && (
              <span className="case-play">
                <span className="tri" /> Vídeo · {c.video}
              </span>
            )}
          </motion.div>

          <div>
            <motion.h2 className="ov-title" {...stagger(1)}>{c.title}</motion.h2>
            <motion.p className="ov-sub" {...stagger(2)}>{c.subtitle}</motion.p>
            <motion.div className="ov-text" {...stagger(3)}>
              <p>{c.teaser}</p>
              <p>{c.body}</p>
            </motion.div>

            <motion.div className="ov-verdict" {...stagger(4)}>
              <span className="lbl">O que decidiu o caso</span>
              <p>{c.verdict}</p>
            </motion.div>

            <motion.div className="ov-nav" {...stagger(5)}>
              <a href={brand.whatsapp} target="_blank" rel="noopener" className="btn btn--solid">
                Falar sobre um caso assim <span className="arw">→</span>
              </a>
              <button className="link-u" onClick={() => onNavigate(next)}>
                Próximo caso <span className="arw">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
