import { practice } from '../data/content'
import { Reveal, SplitText } from './Reveal'

export function Practice() {
  return (
    <section className="band" id="atuacao">
      <div className="wrap">
        <div className="act-head">
          <Reveal as="span" className="act-no">{practice.act}</Reveal>
          <div>
            <Reveal as="p" className="eyebrow">{practice.eyebrow}</Reveal>
            <SplitText
              text={practice.title}
              em={practice.titleEm}
              className="d-lg"
              delay={0.06}
            />
          </div>
        </div>

        <div className="practice">
          {practice.items.map((p, i) => (
            <Reveal
              key={p.name}
              className={`pr${p.feature ? ' pr--feature' : ''}`}
              delay={(i % 2) * 0.08}
            >
              <div>
                {p.flag && <span className="pr-flag">{p.flag}</span>}
                <h3 className="pr-name">{p.name}</h3>
              </div>

              {p.line2 ? (
                <div>
                  <p className="pr-line" style={{ marginBottom: 14 }}>{p.line}</p>
                  <p className="pr-line">{p.line2}</p>
                </div>
              ) : (
                <p className="pr-line">{p.line}</p>
              )}

              <p className="pr-note">{p.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
