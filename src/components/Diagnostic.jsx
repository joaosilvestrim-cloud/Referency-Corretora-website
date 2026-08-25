import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { diagnostic as D, entryway, brand } from '../data/content'

const EASE = [0.76, 0, 0.24, 1]
const SOFT = [0.22, 0.61, 0.36, 1]

/* Monta a mensagem que vai para o WhatsApp. O corretor recebe o lead já
   qualificado, sabendo o que perguntar antes mesmo de responder. */
function buildMessage({ intent, open, name, car }) {
  const linhas = [D.wa.intro, '']
  if (intent !== null) linhas.push(`${D.wa.momento} ${entryway.options[intent].label}`)
  if (car.trim()) linhas.push(`${D.wa.carro} ${car.trim()}`)
  if (intent !== null || car.trim()) linhas.push('')

  if (open.length) {
    linhas.push(D.wa.pontos)
    open.forEach((q) => linhas.push(`• ${q.short}`))
  } else {
    linhas.push(D.wa.tudoCerto)
  }

  if (name.trim()) linhas.push('', name.trim())
  return linhas.join('\n')
}

export function Diagnostic({ intent, onIntent, onClose }) {
  /* passo 0 = intenção, 1..4 = perguntas, 5 = identificação, 6 = resultado */
  const [step, setStep] = useState(intent === null ? 0 : 1)
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState('')
  const [car, setCar] = useState('')

  const last = D.questions.length + 2
  const progress = Math.min(step / last, 1)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const open = useMemo(
    () =>
      D.questions.filter((q) => {
        const a = D.answers.find((x) => x.id === answers[q.id])
        return a && a.weight > 0
      }),
    [answers]
  )

  const waHref = `${brand.whatsapp}?text=${encodeURIComponent(
    buildMessage({ intent, open, name, car })
  )}`

  const answer = (qid, aid) => {
    setAnswers((prev) => ({ ...prev, [qid]: aid }))
    setStep((s) => s + 1)
  }

  const restart = () => {
    setAnswers({})
    setName('')
    setCar('')
    setStep(0)
  }

  const headline =
    open.length === 0
      ? D.result.none
      : open.length === 1
        ? D.result.one
        : D.result.many.replace('{n}', String(open.length))

  /* Um painel por vez, remontado pela key. Sem esperar animação de saída:
     se o motion travar, o passo seguinte aparece do mesmo jeito. Num
     formulário que é o ponto de conversão do site, isso não é opcional. */
  const question = step >= 1 && step <= D.questions.length ? D.questions[step - 1] : null

  return (
    <motion.div
      className="dg"
      role="dialog"
      aria-modal="true"
      aria-label={D.title}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.66, ease: EASE }}
    >
      <div className="dg-head">
        <span className="eyebrow">{D.open}</span>
        <button className="ov-close" onClick={onClose}>
          Fechar
          <span className="x" aria-hidden="true"><i /><i /></span>
        </button>
      </div>

      <div className="dg-track" aria-hidden="true">
        <motion.i
          initial={false}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.5, ease: SOFT }}
        />
      </div>

      <div className="dg-body">
        <div className="dg-in">
          <motion.div
            key={step}
            className="dg-pane"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: SOFT }}
          >

            {step === 0 && (
              <>
                <p className="eyebrow">{D.title}</p>
                <h2 className="dg-q">{entryway.question}</h2>
                <p className="dg-hint">{D.intro}</p>
                <div className="dg-opts">
                  {entryway.options.map((o, i) => (
                    <button
                      key={o.label}
                      className={`dg-opt${intent === i ? ' on' : ''}`}
                      onClick={() => { onIntent(i); setStep(1) }}
                    >
                      <span className="mark" />
                      <span>{o.label}</span>
                    </button>
                  ))}
                </div>
                <p className="dg-privacy">{D.privacy}</p>
              </>
            )}

            {question && (
              <>
                <p className="eyebrow">Pergunta {step} de {D.questions.length}</p>
                <h2 className="dg-q">{question.q}</h2>
                <p className="dg-hint">{question.hint}</p>
                <div className="dg-opts">
                  {D.answers.map((a) => (
                    <button
                      key={a.id}
                      className={`dg-opt${answers[question.id] === a.id ? ' on' : ''}`}
                      onClick={() => answer(question.id, a.id)}
                    >
                      <span className="mark" />
                      <span>{a.label}</span>
                    </button>
                  ))}
                </div>
                <button className="dg-back" onClick={() => setStep(step - 1)}>Voltar</button>
              </>
            )}

            {step === D.questions.length + 1 && (
              <>
                <p className="eyebrow">{D.ident.title}</p>
                <h2 className="dg-q">Quase lá.</h2>
                <div className="dg-fields">
                  <label className="dg-field">
                    <span>{D.ident.name}</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={D.ident.namePlaceholder}
                      autoComplete="name"
                    />
                  </label>
                  <label className="dg-field">
                    <span>{D.ident.car}</span>
                    <input
                      value={car}
                      onChange={(e) => setCar(e.target.value)}
                      placeholder={D.ident.carPlaceholder}
                    />
                  </label>
                </div>
                <div className="dg-actions">
                  <button className="btn btn--solid" onClick={() => setStep(step + 1)}>
                    Ver o resultado <span className="arw">→</span>
                  </button>
                  <button className="dg-back" onClick={() => setStep(step - 1)}>Voltar</button>
                </div>
                <p className="dg-privacy">{D.privacy}</p>
              </>
            )}

            {step > D.questions.length + 1 && (
              <>
                <p className="eyebrow">{D.result.eyebrow}</p>
                <h2 className="dg-result">{headline}</h2>
                <p className="dg-sub">{open.length === 0 ? D.result.noneSub : D.result.sub}</p>

                {open.length > 0 && (
                  <div className="dg-list">
                    <span className="dg-list-lbl">{D.result.listLabel}</span>
                    <ul>
                      {open.map((q, i) => (
                        <motion.li
                          key={q.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.45, ease: SOFT, delay: 0.15 + i * 0.08 }}
                        >
                          {q.short}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="dg-actions">
                  <a href={waHref} target="_blank" rel="noopener" className="btn btn--solid">
                    {D.result.cta} <span className="arw">→</span>
                  </a>
                  <button className="dg-back" onClick={restart}>{D.result.restart}</button>
                </div>
              </>
            )}

          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
