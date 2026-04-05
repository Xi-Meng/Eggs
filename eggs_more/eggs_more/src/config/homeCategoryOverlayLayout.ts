export interface HomeCategoryOverlayItem {
  key: string
  label: string
  targetPath: string
  top: number
  left: number
  width: number
  height: number
}

export const homeCategoryOverlayItems: HomeCategoryOverlayItem[] = [
  {
    key: 'meat',
    label: '肉类',
    targetPath: '/design/Zap',
    top: 562,
    left: 32,
    width: 64,
    height: 89,
  },
  {
    key: 'drink',
    label: '饮品',
    targetPath: '/design/Eq_',
    top: 564,
    left: 112,
    width: 64,
    height: 86,
  },
  {
    key: 'vegetable',
    label: '蔬菜',
    targetPath: '/design/SL_',
    top: 563,
    left: 198,
    width: 64,
    height: 89,
  },
  {
    key: 'soup',
    label: '汤品',
    targetPath: '/design/Pfh',
    top: 564,
    left: 277,
    width: 64,
    height: 89,
  },
]
