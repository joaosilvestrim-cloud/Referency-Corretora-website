import { cases, backstage } from './content'

/* Monta a lista de slots de mídia a partir de casos e bastidores. O painel de
   Mídias passa o que veio do banco; sem argumento, cai no content.js. Assim,
   quando a corretora cria um caso novo, ele ganha um slot de mídia sozinho. */
export function buildMediaSlots(caseItems = cases.items, backstageItems = backstage.items) {
  return [
    {
      id: 'hero',
      label: 'Vídeo de fundo do hero',
      where: 'Topo do site',
      accept: 'video/*',
      hint: 'Vídeo vertical, curto, escuro, em loop. O que já está no ar é o padrão.',
    },
    {
      id: 'atelie',
      label: 'Retrato do Matheus',
      where: 'O ateliê',
      accept: 'image/*,video/*',
      hint: 'Retrato vertical, luz natural, fundo neutro. Um vídeo curto também cabe.',
    },
    ...caseItems.map((c) => ({
      id: `case_${c.id}`,
      label: `Caso · ${c.title}`,
      where: 'Casos reais',
      accept: 'image/*,video/*',
      hint: 'Foto ou vídeo. Retrato ou paisagem, o corte é automático.',
    })),
    ...backstageItems.map((b) => ({
      id: `bt_${b.id}`,
      label: `Bastidores · ${b.kicker}`,
      where: 'Bastidores',
      accept: 'image/*,video/*',
      hint: 'Foto vertical funciona melhor aqui.',
    })),
  ]
}

/* lista padrão, para quem importa direto sem os dados do banco */
export const mediaSlots = buildMediaSlots()
