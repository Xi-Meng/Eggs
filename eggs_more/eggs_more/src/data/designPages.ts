export interface DesignPageMeta {
  id: string
  title: string
  routePath: string
  customComponent?: string
}

export const designPages: DesignPageMeta[] = [
  { id: 'otl', title: '开始页', routePath: '/design/otl', customComponent: 'Page_otl.vue' },
  { id: 'Mln', title: '注册页', routePath: '/design/Mln', customComponent: 'Page_Mln.vue' },
  { id: 'bQv', title: '登录页', routePath: '/design/bQv', customComponent: 'Page_bQv.vue' },
  { id: 'oJi', title: '主页', routePath: '/design/oJi', customComponent: 'Page_oJi.vue' },
  { id: 'Kkt', title: '设备页', routePath: '/design/Kkt' },
  { id: '88P', title: '设备关', routePath: '/design/88P' },
  { id: 'a7b', title: '厨房空气质量检测', routePath: '/design/a7b', customComponent: 'Page_a7b.vue' },
  { id: 'KKk', title: '厨房空气质量检测开', routePath: '/design/KKk', customComponent: 'Page_KKk.vue' },
  { id: 'W4y', title: '厨房空气质量检测差', routePath: '/design/W4y', customComponent: 'Page_W4y.vue' },
  { id: 'MYI', title: '厨房空气质量检测差开', routePath: '/design/MYI', customComponent: 'Page_MYI.vue' },
  { id: 'Ynv', title: '厨房空气质量检测差开1', routePath: '/design/Ynv', customComponent: 'Page_Ynv.vue' },
  { id: 'v6x', title: '语音显示', routePath: '/design/v6x' },
  { id: 'Jll', title: '社区页', routePath: '/design/Jll' },
  { id: 'Xux', title: '社区发布页', routePath: '/design/Xux' },
  { id: 'BiX', title: '社区发布页2', routePath: '/design/BiX' },
  { id: 'Do5', title: '评论区2', routePath: '/design/Do5' },
  { id: 'UI_', title: '评论区3', routePath: '/design/UI_' },
  { id: 'r9L', title: '社区点击跳转', routePath: '/design/r9L' },
  { id: 'E-8', title: '社区点击跳转2', routePath: '/design/E-8' },
  { id: 'O0s', title: '收藏页', routePath: '/design/O0s' },
  { id: '54L', title: '个人页', routePath: '/design/54L' },
  { id: 'o4T', title: '设置页', routePath: '/design/o4T' },
  { id: 'OSn', title: '关于我们', routePath: '/design/OSn' },
  { id: 'Zap', title: '肉类', routePath: '/design/Zap', customComponent: 'Page_Zap.vue' },
  { id: 'b9i', title: '牛肉', routePath: '/design/b9i', customComponent: 'Page_b9i.vue' },
  { id: 'Pfh', title: '汤品', routePath: '/design/Pfh', customComponent: 'Page_Pfh.vue' },
  { id: 'SL_', title: '蔬菜', routePath: '/design/SL_', customComponent: 'Page_SL_.vue' },
  { id: 'Eq_', title: '饮品', routePath: '/design/Eq_', customComponent: 'Page_Eq_.vue' },
  { id: '5VK', title: '食谱跳转', routePath: '/design/5VK' },
  { id: 'ik_', title: '食谱跳转2', routePath: '/design/ik_' },
  { id: 'tAa', title: '咸了吗总页面', routePath: '/design/tAa', customComponent: 'Page_tAa.vue' },
  {
    id: 'ytA95',
    title: '咸了吗总页面',
    routePath: '/design/ytA95',
    customComponent: 'Page_ytA95.vue',
  },
  { id: 'rlB', title: '咸了吗开始', routePath: '/design/rlB' },
  { id: 'a9b', title: '咸了吗结束', routePath: '/design/a9b' },
  { id: 'AnX', title: '咸了吗1开始', routePath: '/design/AnX', customComponent: 'Page_AnX.vue' },
  { id: 'wXj', title: '咸了吗1结束', routePath: '/design/wXj', customComponent: 'Page_wXj.vue' },
  { id: 'UwB', title: '咸了吗2开始', routePath: '/design/UwB' },
  { id: '_aX', title: '咸了吗2结束', routePath: '/design/_aX' },
  { id: '4Ej', title: '结算', routePath: '/design/4Ej', customComponent: 'Page_4Ej.vue' },
  { id: 'p3Y', title: '熟了吗总页面', routePath: '/design/p3Y', customComponent: 'Page_p3Y.vue' },
  { id: '8lJ', title: '熟了吗开始', routePath: '/design/8lJ', customComponent: 'Page_8lJ.vue' },
  { id: '3Xf', title: '熟了吗结束', routePath: '/design/3Xf', customComponent: 'Page_3Xf.vue' },
  { id: 'gAr', title: '熟了吗1开始', routePath: '/design/gAr', customComponent: 'Page_gAr.vue' },
  { id: '4-t', title: '熟了吗1结束', routePath: '/design/4-t', customComponent: 'Page_4_t.vue' },
  { id: 'Xmm', title: '熟了吗2开始', routePath: '/design/Xmm', customComponent: 'Page_Xmm.vue' },
  { id: '0rU', title: '熟了吗2结束', routePath: '/design/0rU', customComponent: 'Page_0rU.vue' },
  { id: 'ATP', title: '熟了吗图表', routePath: '/design/ATP', customComponent: 'Page_ATP.vue' },
  { id: 'MTDir', title: '结算', routePath: '/design/MTDir', customComponent: 'Page_MTDir.vue' },
  { id: '6pp', title: '特殊煮蛋开始', routePath: '/design/6pp' },
  { id: 'o3a', title: '特殊煮蛋全熟', routePath: '/design/o3a' },
  { id: 'U6e', title: '特殊煮蛋溏心', routePath: '/design/U6e' },
  { id: '_dJ', title: '特殊煮蛋过火', routePath: '/design/_dJ' },
]

export const designPagesById = Object.fromEntries(
  designPages.map((page) => [page.id, page]),
) as Record<string, DesignPageMeta>

export const designPagesByTitle = designPages.reduce<Record<string, DesignPageMeta[]>>((acc, page) => {
  const list = acc[page.title] ?? []
  list.push(page)
  acc[page.title] = list
  return acc
}, {})

const switchTargetOverridesBySourceAndTitle: Record<string, string> = {
  'oJi::咸了吗总页面': 'tAa',
  'oJi::肉类': 'Zap',
  'oJi::饮品': 'Eq_',
  'oJi::蔬菜': 'SL_',
  'oJi::汤品': 'Pfh',
  'a9b::结算': '4Ej',
  'wXj::结算': '4Ej',
  '_aX::结算': '4Ej',
  '3Xf::结算': 'MTDir',
  '4-t::结算': 'MTDir',
  '0rU::结算': 'MTDir',
}

export function resolveDesignPageFromSwitch(sourceFrameId: string, targetTitle: string) {
  const candidates = designPagesByTitle[targetTitle] ?? []

  if (candidates.length <= 1) {
    return candidates[0]
  }

  const overrideId = switchTargetOverridesBySourceAndTitle[`${sourceFrameId}::${targetTitle}`]

  if (!overrideId) {
    return undefined
  }

  return designPagesById[overrideId]
}
