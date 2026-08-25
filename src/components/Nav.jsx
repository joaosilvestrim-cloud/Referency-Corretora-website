import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { nav } from '../data/content'
import { lockScroll } from '../hooks/useLenis'

const EASE = [0.22, 0.61, 0.36, 1]

/* A barra atravessa as duas colunas do hero: papel à esquerda, painel escuro à
   direita. Nenhuma cor de texto funciona nos dois. Então a barra é desenhada
   duas vezes: a de baixo em tinta, e por cima uma cópia clara recortada
   exatamente na divisão das colunas. A cópia é decorativa, fora do foco e fora
   do leitor de tela. Assim que a barra ganha fundo ao rolar, ela some. */
function NavRow({ light, onBurger, open }) {
  return (
    <div className="nav-in">
      <a
        href="#top"
        className="brand"
        aria-label={light ? undefined : 'Referency, início'}
        aria-hidden={light || undefined}
        tabIndex={light ? -1 : undefined}
      >
        <img
          src={light ? '/referency-mark-light.png' : '/referency-mark-dark.png'}
          alt={light ? '' : 'Referency, corretora de seguros'}
        />
      </a>

      <nav className="nav-links" aria-label={light ? undefined : 'Principal'} aria-hidden={light || undefined}>
        {nav.map((n) => (
          <a key={n.href} href={n.href} tabIndex={light ? -1 : undefined}>{n.label}</a>
        ))}
      </nav>

      <a href="#diagnostico" className="nav-cta" aria-hidden={light || undefined} tabIndex={light ? -1 : undefined}>
        Diagnóstico
      </a>

      <button
        className={`burger${open ? ' open' : ''}`}
        onClick={onBurger}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-hidden={light || undefined}
        tabIndex={light ? -1 : undefined}
      >
        <span /><span />
      </button>
    </div>
  )
}

/* A divisao entre papel e painel escuro fica em 55%, mas 55% de uma largura
   qualquer pode cair no meio de uma palavra do menu, e ai metade da palavra sai
   clara e metade escura, o que le como defeito de renderizacao. Entao a divisao
   se desloca alguns pixels para cair sempre num vao entre itens. O hero e o
   recorte da barra leem a mesma variavel, entao continuam sempre casados. */
function useSplitOnGap() {
  useEffect(() => {
    const root = document.documentElement

    const apply = () => {
      if (window.innerWidth <= 900) return root.style.removeProperty('--hero-split')

      const row = document.querySelector('.nav-layer:not(.nav-over) .nav-links')
      if (!row) return
      const w = root.clientWidth
      const target = w * 0.55
      const items = [...row.querySelectorAll('a')].map((a) => a.getBoundingClientRect())
      const hit = items.find((r) => r.left < target && r.right > target)

      let split = target
      if (hit) {
        const antes = hit.left - 12
        const depois = hit.right + 12
        split = target - hit.left < hit.right - target ? antes : depois
      }
      root.style.setProperty('--hero-split', ((split / w) * 100).toFixed(3) + '%')
    }

    /* so mede depois das fontes assentarem, senao as larguras mudam embaixo */
    document.fonts.ready.then(apply)
    apply()

    /* ResizeObserver em vez do evento resize: pega tambem o que muda o layout
       sem mexer na janela, como a barra de rolagem aparecendo e o zoom */
    let t
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(apply, 120) })
    ro.observe(root)
    return () => { clearTimeout(t); ro.disconnect() }
  }, [])
}

export function Nav() {
  useSplitOnGap()
  const [stuck, setStuck] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  /* Some ao descer, volta ao subir. Devolve a tela inteira para a leitura. */
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setStuck(v > 40)
    setHidden(v > 260 && v > prev && !open)
  })

  const toggle = () => {
    const next = !open
    setOpen(next)
    lockScroll(next)
  }

  const close = () => {
    setOpen(false)
    lockScroll(false)
  }

  return (
    <>
      <motion.header
        className={`nav${stuck ? ' stuck' : ''}${open ? ' over-menu' : ''}`}
        animate={{ y: hidden ? '-102%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="nav-layer">
          <NavRow onBurger={toggle} open={open} />
        </div>
        <div className="nav-layer nav-over" aria-hidden="true">
          <NavRow light onBurger={toggle} open={open} />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            {[...nav, { href: '#diagnostico', label: 'Diagnóstico' }].map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={close}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
              >
                {n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
