import { Fragment } from 'react'
import { motion } from 'motion/react'
import { hero } from '../data/content'
import { Plate } from './Plate'

const EASE = [0.22, 0.61, 0.36, 1]

/* No hero a revelação é imediata, não por scroll. É a primeira coisa que a pessoa vê. */
const up = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.95, ease: EASE, delay },
})

export function Hero({ start = 0 }) {
  const words = hero.title.split(' ')
  const emWords = hero.titleEm.split(' ')

  const word = (w, i) => (
    <Fragment key={i}>
      <span className="line-word">
        <motion.span
          initial={{ y: '108%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: start + 0.12 + i * 0.038 }}
        >
          {w}
        </motion.span>
      </span>{' '}
    </Fragment>
  )

  return (
    <section className="hero" id="top">
      <div className="hero-text">
        <motion.p className="eyebrow" {...up(start)}>{hero.eyebrow}</motion.p>

        <h1 className="display d-xl lines">
          {words.map(word)}
          <em>{emWords.map((w, i) => word(w, words.length + i))}</em>
        </h1>

        <motion.p className="lede" {...up(start + 0.45)}>{hero.lede}</motion.p>

        <motion.div className="hero-actions" {...up(start + 0.55)}>
          <a href="#diagnostico" className="btn btn--solid">
            {hero.cta} <span className="arw">→</span>
          </a>
          <a href="#casos" className="link-u">{hero.ctaAlt}</a>
        </motion.div>

        <motion.div className="hero-foot" {...up(start + 0.65)}>
          {hero.marks.map((m, i) => (
            <Fragment key={m}>
              {i > 0 && <span className="dot" />}
              <span>{m}</span>
            </Fragment>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="hero-art"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.25, ease: EASE, delay: start }}
      >
        <Plate kind="head" caption={hero.photo} />
        <div className="scroll-hint">
          Role
          <motion.i
            animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 2.6, ease: EASE, repeat: Infinity, times: [0, 0.55, 1] }}
          />
        </div>
      </motion.div>
    </section>
  )
}
