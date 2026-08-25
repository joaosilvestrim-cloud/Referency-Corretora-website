import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { method } from '../data/content'
import { Reveal, SplitText } from './Reveal'

/* O número acende em cobre quando a etapa chega ao centro da tela.
   O leitor sente a sequência avançando junto com ele. */
function Step({ step, i }) {
  const ref = useRef(null)
  const lit = useInView(ref, { once: false, margin: '-45% 0px -45% 0px' })

  return (
    <motion.div
      ref={ref}
      className={`step${lit ? ' lit' : ''}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.07 }}
    >
      <span className="step-no">{step.no}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
      </div>
    </motion.div>
  )
}

export function Method() {
  return (
    <section className="band paper-2" id="metodo">
      <div className="wrap method">
        <div className="method-sticky">
          <div className="act-head" style={{ marginBottom: 22 }}>
            <Reveal as="span" className="act-no">{method.act}</Reveal>
            <div>
              <Reveal as="p" className="eyebrow">{method.eyebrow}</Reveal>
              <SplitText
                text={method.title}
                em={method.titleEm}
                className="d-lg"
                delay={0.06}
              />
            </div>
          </div>
          <Reveal as="p" className="lede" delay={0.16}>{method.lede}</Reveal>
        </div>

        <div>
          <div className="steps">
            {method.steps.map((s, i) => (
              <Step key={s.no} step={s} i={i} />
            ))}
          </div>

          <Reveal className="method-close">
            <p className="display d-sm" style={{ maxWidth: '24ch' }}>{method.close}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
