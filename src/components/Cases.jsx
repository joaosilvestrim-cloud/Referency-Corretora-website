import { cases } from '../data/content'
import { Reveal, SplitText } from './Reveal'
import { Plate } from './Plate'

export function Cases({ onOpen }) {
  return (
    <section className="band" id="casos">
      <div className="wrap">
        <div className="act-head">
          <Reveal as="span" className="act-no">{cases.act}</Reveal>
          <div>
            <Reveal as="p" className="eyebrow">{cases.eyebrow}</Reveal>
            <SplitText
              text={cases.title}
              em={cases.titleEm}
              className="d-lg"
              delay={0.06}
            />
          </div>
        </div>

        <div className="cases">
          {cases.items.map((c, i) => (
            <Reveal
              key={c.id}
              as="button"
              className="case"
              delay={(i % 2) * 0.09}
              data-size={c.size}
              data-cursor-label={c.video ? 'Assistir' : 'Ler'}
              onClick={() => onOpen(i)}
              aria-label={`Abrir o caso ${c.title}`}
            >
              <div className="case-media">
                <Plate kind={c.plate} slot={`case_${c.id}`} caption={c.photo} />
                {c.video && (
                  <span className="case-play">
                    <span className="tri" /> Vídeo · {c.video}
                  </span>
                )}
              </div>
              <p className="case-kicker">
                <span className="case-no">{String(i + 1).padStart(2, '0')}</span>
                {c.kicker}
              </p>
              <h3 className="case-title">
                {c.title} <span>— {c.subtitle.toLowerCase()}</span>
              </h3>
              <p className="case-sub">{c.teaser}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
