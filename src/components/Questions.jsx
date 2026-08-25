import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { questions } from '../data/content'
import { Reveal, SplitText } from './Reveal'

const EASE = [0.22, 0.61, 0.36, 1]

export function Questions() {
  const [open, setOpen] = useState(null)

  return (
    <section className="band paper-2" id="perguntas">
      <div className="wrap">
        <div className="q-intro">
          <div className="act-head" style={{ marginBottom: 0 }}>
            <Reveal as="span" className="act-no">{questions.act}</Reveal>
            <div>
              <Reveal as="p" className="eyebrow">{questions.eyebrow}</Reveal>
              <SplitText
                text={questions.title}
                em={questions.titleEm}
                className="d-lg"
                delay={0.06}
              />
            </div>
          </div>
          <Reveal as="p" className="lede" delay={0.16}>{questions.lede}</Reveal>
        </div>

        <Reveal className="q-list" delay={0.1}>
          {questions.items.map((item, i) => {
            const isOpen = open === i
            return (
              <article className={`q${isOpen ? ' open' : ''}`} key={item.idx}>
                <button
                  className="q-btn"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="q-idx">{item.idx}</span>
                  <span className="q-txt">{item.q}</span>
                  <span className="q-sign" aria-hidden="true">
                    <i />
                    <motion.i
                      animate={{ scaleY: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="q-body"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <motion.div
                        className="q-body-in"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
                      >
                        <span />
                        <div className="q-answer">
                          <p>{item.a}</p>
                          <span className="q-tag">{item.tag}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            )
          })}
        </Reveal>

        <Reveal className="q-close">
          <span />
          <p className="lede">{questions.close}</p>
        </Reveal>
      </div>
    </section>
  )
}
