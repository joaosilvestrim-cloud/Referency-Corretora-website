import { motion } from 'motion/react'
import { concierge } from '../data/content'
import { Reveal, SplitText } from './Reveal'

const EASE = [0.22, 0.61, 0.36, 1]

export function Concierge() {
  return (
    <section className="band ink-bg" id="sinistro">
      <div className="wrap">
        <div className="concierge-head">
          <div className="act-head" style={{ marginBottom: 0 }}>
            <Reveal as="span" className="act-no">{concierge.act}</Reveal>
            <div>
              <Reveal as="p" className="eyebrow">{concierge.eyebrow}</Reveal>
              <SplitText
                text={concierge.title}
                em={concierge.titleEm}
                className="d-lg"
                delay={0.06}
              />
            </div>
          </div>
          <Reveal as="p" className="lede" delay={0.16}>{concierge.lede}</Reveal>
        </div>

        {/* as oito etapas entram em sequência, como o próprio processo */}
        <motion.div
          className="flow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.055 } } }}
        >
          {concierge.flow.map((f) => (
            <motion.div
              className="flow-step"
              key={f.no}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <span className="flow-no">{f.no}</span>
              <span className="flow-t">{f.title}</span>
              <span className="flow-d">{f.body}</span>
            </motion.div>
          ))}
        </motion.div>

        <SplitText
          text={concierge.quote}
          className="concierge-quote"
          tag="p"
          delay={0.05}
        />
      </div>
    </section>
  )
}
