import { motion, AnimatePresence } from 'motion/react'
import { entryway } from '../data/content'
import { Reveal } from './Reveal'

const EASE = [0.22, 0.61, 0.36, 1]

/* A escolha aqui muda o texto do botão lá no fim da página.
   É a informação comercial mais barata que existe: a pessoa se qualifica sozinha. */
export function Entryway({ chosen, onChoose }) {
  return (
    <section className="entry band--tight" aria-labelledby="entry-title">
      <div className="wrap entry-in">
        <Reveal>
          <p className="eyebrow">{entryway.eyebrow}</p>
          <p className="entry-q" id="entry-title">{entryway.question}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="entry-opts" role="group" aria-labelledby="entry-title">
            {entryway.options.map((o, i) => (
              <button
                key={o.label}
                className={`opt${chosen === i ? ' on' : ''}`}
                onClick={() => onChoose(chosen === i ? null : i)}
                aria-pressed={chosen === i}
              >
                <span className="mark" />
                <span className="txt">{o.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {chosen !== null && (
              <motion.p
                className="entry-echo"
                key={chosen}
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 26 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {entryway.options[chosen].echo}
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
