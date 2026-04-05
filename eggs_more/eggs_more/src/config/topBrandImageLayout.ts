export interface TopBrandImageLayout {
  top: number
  left: number
  width: number
  height?: number
  scale?: number
  borderRadius?: number
  fadeEdges?: boolean
}

export const topBrandImageLayouts: Record<'otl' | 'Mln' | 'bQv', TopBrandImageLayout> = {
  otl: {
    top: 199,
    left: 36,
    width: 303,
    height: 184,
    // scale: 1.06,
    borderRadius: 22,
    fadeEdges: true,
  },
  Mln: {
    top: 90,
    left: 38,
    width: 305,
  },
  bQv: {
    top: 90,
    left: 38,
    width: 305,
  },
}
