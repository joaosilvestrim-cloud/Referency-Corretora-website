import { motion } from 'motion/react'
import { consorcio } from '../data/content'
import { Reveal, SplitText } from './Reveal'

const EASE = [0.22, 0.61, 0.36, 1]

/* Seção própria, e não só um card dentro de Atuação. É o argumento que
   nenhum concorrente faz, então ganha o peso de um ato inteiro. */
export function Consorcio({ onDiagnostic }) {
  return (
    <section className="band paper-2" id="consorcio">
      <div className="wrap">
        <div className="cs-head">
          <div className="act-head" style={{ marginBottom: 0 }}>
            <Reveal as="span" className="act-no">{consorcio.act}</Reveal>
            <div>
              <Reveal as="p" className="eyebrow">{consorcio.eyebrow}</Reveal>
              <SplitText
                text={consorcio.title}
                em={consorcio.titleEm}
                className="d-lg"
                delay={0.06}
              />
            </div>
          </div>
          <Reveal as="p" className="lede" delay={0.16}>{consorcio.lede}</Reveal>
        </div>

        <motion.div
          className="cs-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {consorcio.points.map((p) => (
            <motion.div
              className="cs-item"
              key={p.no}
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="cs-no">{p.no}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="cs-close">
          <p className="display d-sm">{consorcio.close}</p>
          <button className="btn" onClick={onDiagnostic}>
            {consorcio.cta} <span className="arw">→</span>
          </button>
        </Reveal>
      </div>
    </section>
  )
}
