/* Slots que não pertencem a um editor de conteúdo (hero não tem texto editável,
   o ateliê é fixo). Esses vivem na aba Mídias. A mídia de casos e bastidores
   fica dentro do editor de cada um, no slot case_<id> / bt_<id>. */
export const standaloneSlots = [
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
]
