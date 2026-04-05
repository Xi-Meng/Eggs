export interface OilFumeOverlayLayout {
  key: string
  variant: 'stacked' | 'inline'
  top: number
  left: number
  width: number
  height: number
  fontSize: number
  fontWeight: number
  textColor: string
  backgroundColor?: string
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
  boxShadow?: string
  textShadow?: string
  unitFontSize?: number
  lineHeight?: number
}

export const oilFumeOverlayLayouts: Record<string, OilFumeOverlayLayout[]> = {
  oJi: [
    {
      key: 'home-oil-fume-card',
      variant: 'stacked',
      top: 185,
      left: 215,
      width: 123,
      height: 123,
      fontSize: 23,
      fontWeight: 400,
      textColor: '#eff6f7',
      backgroundColor: '#8fcbee',
      borderRadius: 999,
      borderColor: '#8fcbee',
      borderWidth: 2,
      boxShadow: '0 12px 28px rgba(118, 165, 188, 0.24)',
      textShadow: '0 3px 12px rgba(102, 160, 188, 0.58)',
      lineHeight: 1.08,
      unitFontSize: 18,
    },
  ],
  a7b: [
    {
      key: 'home-oil-fume-card',
      variant: 'stacked',
      top: 130,
      left: 48,
      width: 275,
      height: 275,
      fontSize: 35,
      fontWeight: 400,
      textColor: '#ebf4f5',
      backgroundColor: '#8cd7ee',
      borderRadius: 999,
      borderColor: '#ccdde7',
      borderWidth: 2,
      boxShadow: '0 12px 28px rgba(118, 165, 188, 0.24)',
      textShadow: '0 3px 12px rgba(102, 160, 188, 0.58)',
      lineHeight: 1.08,
      unitFontSize: 18,
    },
    {
      key: 'air-quality-oil-fume',
      variant: 'inline',
      top: 560,
      left: 152,
      width: 160,
      height: 26,
      fontSize: 24,
      fontWeight: 400,
      textColor: '#544848',
      backgroundColor: '#d9f4ff',
      borderRadius: 999,
      borderColor: '#86cee9',
      borderWidth: 2,
    },
  ],
  KKk: [
    {
      key: 'air-quality-open-oil-fume',
      variant: 'inline',
      top: 560,
      left: 152,
      width: 160,
      height: 26,
      fontSize: 24,
      fontWeight: 400,
      textColor: '#544848',
      backgroundColor: '#d9f4ff',
      borderRadius: 999,
      borderColor: '#86cee9',
      borderWidth: 2,
    },
  ],
  W4y: [
    {
      key: 'air-quality-bad-oil-fume',
      variant: 'inline',
      top: 560,
      left: 152,
      width: 160,
      height: 26,
      fontSize: 24,
      fontWeight: 400,
      textColor: '#544848',
      backgroundColor: '#d9f4ff',
      borderRadius: 999,
      borderColor: '#86cee9',
      borderWidth: 2,
    },
  ],
  MYI: [
    {
      key: 'air-quality-bad-open-oil-fume',
      variant: 'inline',
      top: 560,
      left: 152,
      width: 160,
      height: 26,
      fontSize: 24,
      fontWeight: 400,
      textColor: '#544848',
      backgroundColor: '#d9f4ff',
      borderRadius: 999,
      borderColor: '#86cee9',
      borderWidth: 2,
    },
  ],
  Ynv: [
    {
      key: 'air-quality-bad-open-1-oil-fume',
      variant: 'inline',
      top: 560,
      left: 152,
      width: 160,
      height: 26,
      fontSize: 24,
      fontWeight: 400,
      textColor: '#544848',
      backgroundColor: '#d9f4ff',
      borderRadius: 999,
      borderColor: '#86cee9',
      borderWidth: 2,
    },
  ],
}
