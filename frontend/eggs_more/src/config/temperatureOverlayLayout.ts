export interface TemperatureOverlayItemLayout {
  key: string
  historyId?: string
  staticValue?: string
  temperatureTop: number
  temperatureLeft: number
  temperatureWidth: number
  temperatureHeight: number
  temperatureFontSize: number
  temperatureWeight: number
  unitScale?: number
  backgroundColor?: string
  borderRadius?: number
  textColor?: string
  hintTop?: number
  hintLeft?: number
  hintWidth?: number
}

export interface TemperatureOverlayLayout {
  items: TemperatureOverlayItemLayout[]
}

// 这些坐标都基于 375 x 812 的设计稿。
// 如果温度位置要微调，只改这里即可。
export const temperatureOverlayLayouts: Record<string, TemperatureOverlayLayout> = {
  p3Y: {
    items: [
      {
        key: 'device1-live',
        temperatureTop: 200,
        temperatureLeft: 145,
        temperatureWidth: 80,
        temperatureHeight: 24,
        temperatureFontSize: 17,
        temperatureWeight: 700,
        unitScale: 0.82,
        backgroundColor: '#bcf1bc',
        borderRadius: 12,
        textColor: '#79a15f',
      },
      {
        key: 'device2-static',
        staticValue: '80°C',
        temperatureTop: 326,
        temperatureLeft: 145,
        temperatureWidth: 80,
        temperatureHeight: 24,
        temperatureFontSize: 17,
        temperatureWeight: 700,
        unitScale: 0.82,
        backgroundColor: '#f3efad',
        borderRadius: 12,
        textColor: '#887a44',
      },
      {
        key: 'device3-static',
        staticValue: '100°C',
        temperatureTop: 456,
        temperatureLeft: 145,
        temperatureWidth: 80,
        temperatureHeight: 24,
        temperatureFontSize: 17,
        temperatureWeight: 700,
        unitScale: 0.82,
        backgroundColor: '#f5d4a6',
        borderRadius: 12,
        textColor: '#9a6b34',
      },
    ],
  },
  gAr: {
    items: [
      {
        key: 'device1-live',
        temperatureTop: 250,
        temperatureLeft: 114,
        temperatureWidth: 150,
        temperatureHeight: 58,
        temperatureFontSize: 34,
        temperatureWeight: 500,
        backgroundColor: '#ebf186',
        borderRadius: 18,
        textColor: '#75704c',
      },
    ],
  },
  '4-t': {
    items: [
      {
        key: 'device1-live',
        temperatureTop: 260,
        temperatureLeft: 108,
        temperatureWidth: 150,
        temperatureHeight: 58,
        temperatureFontSize: 34,
        temperatureWeight: 500,
        unitScale: 0.82,
        backgroundColor: '#ebf186',
        borderRadius: 18,
        textColor: '#75704c',
      },
    ],
  },
}
