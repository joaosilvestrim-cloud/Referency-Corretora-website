import { brand, footer, nav } from '../data/content'
import { Reveal } from './Reveal'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-top">
          <Reveal>
            <img src="/referency-light.png" alt="Referency, corretora de seguros" />
            <p className="f-tag">{footer.tagline}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="f-h">Navegar</p>
            <ul className="f-list">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href}>{n.label}</a></li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="f-h">Contato</p>
            <ul className="f-list">
              <li>
                <a href={brand.whatsapp} target="_blank" rel="noopener">
                  WhatsApp · {brand.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={brand.instagram} target="_blank" rel="noopener">
                  {brand.instagramHandle}
                </a>
              </li>
              <li>{brand.city}</li>
              <li>Atendimento por indicação</li>
            </ul>
          </Reveal>
        </div>

        <div className="f-bot">
          <span>© {new Date().getFullYear()} Referency Corretora de Seguros</span>
          <span>{brand.susep}</span>
        </div>
      </div>
    </footer>
  )
}
