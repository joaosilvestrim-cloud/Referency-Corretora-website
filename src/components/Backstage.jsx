import { backstage, brand } from '../data/content'
import { Reveal, SplitText } from './Reveal'
import { Plate } from './Plate'

export function Backstage() {
  return (
    <section className="band paper-2" id="bastidores">
      <div className="wrap">
        <div className="act-head">
          <Reveal as="span" className="act-no">{backstage.act}</Reveal>
          <div>
            <Reveal as="p" className="eyebrow">{backstage.eyebrow}</Reveal>
            <SplitText
              text={backstage.title}
              em={backstage.titleEm}
              className="d-lg"
              delay={0.06}
            />
          </div>
        </div>

        <div className="bts">
          {backstage.items.map((b, i) => (
            <Reveal
              as="a"
              key={b.kicker}
              className="bt"
              delay={i * 0.09}
              href={brand.instagram}
              target="_blank"
              rel="noopener"
              data-cursor-label="Ver"
            >
              <div className="bt-media">
                <Plate kind={b.plate} caption={b.photo} />
              </div>
              <p className="bt-kicker">{b.kicker}</p>
              <h3 className="bt-t">{b.title}</h3>
              <p className="bt-d">{b.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: 'clamp(38px,4.5vw,60px)' }}>
          <a href={brand.instagram} target="_blank" rel="noopener" className="link-u">
            Acompanhar no Instagram <span className="arw">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
