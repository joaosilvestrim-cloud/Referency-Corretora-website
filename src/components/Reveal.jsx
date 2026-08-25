import { Fragment } from 'react'
import { motion } from 'motion/react'

const EASE = [0.22, 0.61, 0.36, 1]

/* Bloco que sobe ao entrar em cena. */
export function Reveal({ children, delay = 0, y = 26, className, as = 'div', ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.95, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  )
}

/* Título revelado palavra por palavra, cada uma subindo de dentro de uma máscara.
   É o que dá o registro editorial: o texto se monta em vez de aparecer. */
export function SplitText({ text, em, className = '', delay = 0, tag = 'h2' }) {
  const Tag = motion[tag] || motion.h2
  const words = String(text).split(' ')
  const emWords = em ? String(em).split(' ') : []
  const total = words.length + emWords.length

  /* O espaço fica FORA da máscara. Dentro dela ele colapsa,
     e sem ele o navegador não tem onde quebrar a linha. */
  const word = (w, i, italic) => (
    <Fragment key={`${italic ? 'e' : 'w'}${i}`}>
      <span className="line-word">
        <motion.span
          variants={{ hidden: { y: '108%' }, show: { y: 0 } }}
          transition={{
            duration: 0.85,
            ease: EASE,
            delay: delay + i * (total > 12 ? 0.028 : 0.045),
          }}
        >
          {w}
        </motion.span>
      </span>{' '}
    </Fragment>
  )

  return (
    <Tag
      className={`display lines ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {words.map((w, i) => word(w, i, false))}
      {em && <em>{emWords.map((w, i) => word(w, words.length + i, true))}</em>}
    </Tag>
  )
}
