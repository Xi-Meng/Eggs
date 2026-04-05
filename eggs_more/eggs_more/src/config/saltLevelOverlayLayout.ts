export interface SaltLevelOverlayItemLayout {
  key: string
  value: string
  top: number
  left: number
  width: number
  height: number
  fontSize: number
  fontWeight: number
  backgroundColor: string
  textColor: string
  borderRadius: number
}

export const saltLevelOverlayLayouts: Record<string, SaltLevelOverlayItemLayout[]> = {
  tAa: [
    {
      key: 'device1-salt',
      value: '1.2%',
      top: 192,
      left: 143,
      width: 74,
      height: 28,
      fontSize: 18,
      fontWeight: 700,
      backgroundColor: '#d9f0d0',
      textColor: '#2b994e',
      borderRadius: 14,
    },
    {
      key: 'device2-salt',
      value: '0.9%',
      top: 322,
      left: 145,
      width: 74,
      height: 28,
      fontSize: 18,
      fontWeight: 700,
      backgroundColor: '#ddeffc',
      textColor: '#57acf2',
      borderRadius: 14,
    },
    {
      key: 'device3-salt',
      value: '1.8%',
      top: 444,
      left: 145,
      width: 76,
      height: 28,
      fontSize: 18,
      fontWeight: 700,
      backgroundColor: '#f8dddd',
      textColor: '#eb5959',
      borderRadius: 14,
    },
  ],
  ytA95: [
    {
      key: 'device1-salt',
      value: '1.2%',
      top: 192,
      left: 143,
      width: 74,
      height: 28,
      fontSize: 18,
      fontWeight: 700,
      backgroundColor: '#d9f0d0',
      textColor: '#2b994e',
      borderRadius: 14,
    },
    {
      key: 'device2-salt',
      value: '0.9%',
      top: 322,
      left: 145,
      width: 74,
      height: 28,
      fontSize: 18,
      fontWeight: 700,
      backgroundColor: '#ddeffc',
      textColor: '#57acf2',
      borderRadius: 14,
    },
    {
      key: 'device3-salt',
      value: '1.8%',
      top: 444,
      left: 145,
      width: 76,
      height: 28,
      fontSize: 18,
      fontWeight: 700,
      backgroundColor: '#f8dddd',
      textColor: '#eb5959',
      borderRadius: 14,
    },
  ],
  AnX: [
    {
      key: 'device1-salt',
      value: '0.9%',
      top: 240,
      left: 84,
      width: 164,
      height: 66,
      fontSize: 42,
      fontWeight: 600,
      backgroundColor: '#eef2c0',
      textColor: '#6d6a47',
      borderRadius: 18,
    },
  ],
  wXj: [
    {
      key: 'device1-salt',
      value: '0.9%',
      top: 240,
      left: 84,
      width: 164,
      height: 66,
      fontSize: 42,
      fontWeight: 600,
      backgroundColor: '#eef2c0',
      textColor: '#6d6a47',
      borderRadius: 18,
    },
  ],
}
