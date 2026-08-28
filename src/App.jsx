import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'

import { useLenis, lockScroll } from './hooks/useLenis'
import { MediaProvider } from './components/MediaProvider'
import { fetchCases, fetchBackstage } from './lib/siteContent'
import { cases as casesData, backstage as backstageData } from './data/content'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Entryway } from './components/Entryway'
import { Questions } from './components/Questions'
import { Cases } from './components/Cases'
import { Consorcio } from './components/Consorcio'
import { Diagnostic } from './components/Diagnostic'
import { CaseOverlay } from './components/CaseOverlay'
import { Method } from './components/Method'
import { Concierge } from './components/Concierge'
import { Atelie } from './components/Atelie'
import { Practice } from './components/Practice'
import { Backstage } from './components/Backstage'
import { Closing } from './components/Closing'
import { Footer } from './components/Footer'

/* A cortina roda uma vez por sessão, e só quando a aba está à vista.
   Numa aba de fundo o navegador congela o requestAnimationFrame, e a cortina
   ficaria parada na frente do site até a pessoa voltar. */
const shouldPreload = () =>
  !sessionStorage.getItem('ref:seen') &&
  !document.hidden &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  useLenis()

  const [loading, setLoading] = useState(shouldPreload)
  const [chosen, setChosen] = useState(null)
  const [caseIndex, setCaseIndex] = useState(null)
  const [diagOpen, setDiagOpen] = useState(false)
  const [briefing, setBriefing] = useState(false)

  /* casos e bastidores começam com o fallback do content.js e trocam pelo que
     está no banco assim que carrega, sem flash vazio */
  const [caseItems, setCaseItems] = useState(casesData.items)
  const [backstageItems, setBackstageItems] = useState(backstageData.items)
  useEffect(() => {
    let alive = true
    fetchCases().then((d) => { if (alive && d.length) setCaseItems(d) })
    fetchBackstage().then((d) => { if (alive && d.length) setBackstageItems(d) })
    return () => { alive = false }
  }, [])

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.3 })

  useEffect(() => {
    sessionStorage.setItem('ref:seen', '1')
    if (!loading) return
    lockScroll(true)
    const done = () => { setLoading(false); lockScroll(false) }
    const t = setTimeout(done, 1350)
    /* se a aba for para segundo plano no meio, encerra na hora */
    const onHide = () => { if (document.hidden) { clearTimeout(t); done() } }
    document.addEventListener('visibilitychange', onHide)
    return () => { clearTimeout(t); document.removeEventListener('visibilitychange', onHide) }
  }, [loading])

  useEffect(() => {
    document.body.classList.toggle('briefing', briefing)
  }, [briefing])

  const openCase = (i) => { setCaseIndex(i); lockScroll(true) }
  const closeCase = () => { setCaseIndex(null); lockScroll(false) }

  /* O CTA do site abre o diagnóstico em vez de jogar direto no WhatsApp.
     Assim a conversa começa com o corretor já sabendo o que perguntar. */
  const openDiag = () => { setCaseIndex(null); setDiagOpen(true); lockScroll(true) }
  const closeDiag = () => { setDiagOpen(false); lockScroll(false) }

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href="#diagnostico"]')
      if (!a) return
      e.preventDefault()
      openDiag()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <MediaProvider>
      <AnimatePresence>
        {loading && <Preloader key="preload" />}
      </AnimatePresence>

      <motion.div className="progress" style={{ scaleX: progress }} />
      <div className="grain" aria-hidden="true" />
      <Cursor />

      <Nav />

      <main>
        <Hero start={loading ? 1.1 : 0.1} />
        <Entryway chosen={chosen} onChoose={setChosen} />
        <Questions />
        <Cases items={caseItems} onOpen={openCase} />
        <Method />
        <Concierge />
        <Atelie />
        <Practice />
        <Consorcio onDiagnostic={openDiag} />
        <Backstage items={backstageItems} />
        <Closing chosen={chosen} onDiagnostic={openDiag} />
      </main>

      <Footer />

      <AnimatePresence>
        {diagOpen && (
          <Diagnostic
            key="diag"
            intent={chosen}
            onIntent={setChosen}
            onClose={closeDiag}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {caseIndex !== null && (
          <CaseOverlay
            key="case"
            items={caseItems}
            index={caseIndex}
            onClose={closeCase}
            onNavigate={setCaseIndex}
          />
        )}
      </AnimatePresence>

      <button
        className="brief-toggle"
        onClick={() => setBriefing((b) => !b)}
        title="Mostra o briefing de cada foto que ainda precisa ser produzida"
      >
        Briefing de fotografia
      </button>
    </MediaProvider>
  )
}
