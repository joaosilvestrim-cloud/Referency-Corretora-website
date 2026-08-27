import { cases, backstage } from './content'

/* Onde cabe mídia no site. Gerado a partir do próprio conteúdo, então quando
   um caso ou bastidor muda de nome, o rótulo no painel acompanha sozinho.
   Os ids casam com o `slot` que cada Plate consulta. */
export const mediaSlots = [
  {
    id: 'hero',
    label: 'Vídeo de fundo do hero',
    where: 'Topo do site',
    accept: 'video/*',
    hint: 'Vídeo vertical, curto, escuro, em loop. O que já está no ar é o padrão.',
  },
  ...cases.items.map((c) => ({
    id: `case_${c.id}`,
    label: `Caso · ${c.title}`,
    where: 'Casos reais',
    accept: 'image/*,video/*',
    hint: 'Foto ou vídeo. Retrato ou paisagem, o corte é automático.',
  })),
  ...backstage.items.map((b, i) => ({
    id: `bt_${i}`,
    label: `Bastidores · ${b.kicker}`,
    where: 'Bastidores',
    accept: 'image/*,video/*',
    hint: 'Foto vertical funciona melhor aqui.',
  })),
]
