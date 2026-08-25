import { motion, AnimatePresence } from 'motion/react'
import { closing, entryway } from '../data/content'
import { Reveal, SplitText } from './Reveal'

const EASE = [0.22, 0.61, 0.36, 1]

/* O rótulo do botão vem da escolha feita lá em cima, na porta de entrada. */
export function Closing({ chosen, onDiagnostic }) {
  const label = chosen === null ? closing.cta : entryway.options[chosen].cta

  return (
    <section className="close-band" id="diagnostico">
      <div className="wrap">
        <Reveal as="p" className="eyebrow" style={{ marginBottom: 26 }}>
          {closing.eyebrow}
        </Reveal>

        <SplitText
          text={closing.title}
          em={closing.titleEm}
          className="d-lg"
          delay={0.05}
        />

        <Reveal as="p" className="lede" delay={0.2}>{closing.lede}</Reveal>

        <Reveal className="close-actions" delay={0.28}>
          <button className="btn btn--solid" onClick={onDiagnostic}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                {label}
              </motion.span>
            </AnimatePresence>
            <span className="arw">→</span>
          </button>
          <a href="#casos" className="link-u">{closing.ctaAlt}</a>
        </Reveal>

        <Reveal as="p" className="close-note" delay={0.34}>{closing.note}</Reveal>
      </div>
    </section>
  )
}
