import { motion } from 'motion/react'
import { atelie } from '../data/content'
import { Reveal, SplitText } from './Reveal'
import { Plate } from './Plate'

const EASE = [0.22, 0.61, 0.36, 1]

/* A pessoa por trás do método. Entra depois do Concierge: primeiro a promessa
   de cuidar no pior dia, depois quem faz essa promessa. Retrato à esquerda,
   história à direita, na voz do Matheus. */
export function Atelie() {
  return (
    <section className="band paper-2" id="atelie">
      <div className="wrap atelie">
        <Reveal className="atelie-media">
          <div className="atelie-portrait">
            <Plate kind="cockpit" slot="atelie" caption={atelie.photo} parallax={false} />
          </div>
          <p className="atelie-note">{atelie.note}</p>
        </Reveal>

        <div className="atelie-text">
          <Reveal as="p" className="eyebrow">{atelie.eyebrow}</Reveal>
          <SplitText text={atelie.title} em={atelie.titleEm} className="d-md" delay={0.05} />
          <Reveal as="p" className="lede" delay={0.14} style={{ marginTop: 22 }}>{atelie.lede}</Reveal>

          <div className="atelie-body">
            {atelie.body.map((p, i) => (
              <Reveal as="p" key={i} delay={0.1 + i * 0.06}>{p}</Reveal>
            ))}
          </div>

          <Reveal className="atelie-quote">
            <p className="display">{atelie.quote}</p>
          </Reveal>

          <motion.div
            className="atelie-stats"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            {atelie.stats.map((s) => (
              <motion.div
                className="atelie-stat"
                key={s.l}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="n">{s.n}</span>
                <span className="l">{s.l}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
