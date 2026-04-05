import cookPresetsCsv from '../../csv/cook-presets.csv?raw'

export interface CookPresetOption {
  key: string
  label: string
  referenceTemperature: string
  cookingTime: string
}

const fallbackCookPresetOptions: CookPresetOption[] = [
  {
    key: 'preset-1',
    label: '溏心蛋',
    referenceTemperature: '75°C',
    cookingTime: '8分钟',
  },
  {
    key: 'preset-2',
    label: '牛肉',
    referenceTemperature: '90°C',
    cookingTime: '15分钟',
  },
  {
    key: 'preset-3',
    label: '鸡肉',
    referenceTemperature: '85°C',
    cookingTime: '12分钟',
  },
]

function parseCsvLine(line: string) {
  const cells: string[] = []
  let current = ''
  let insideQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]

    if (char === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }
      continue
    }

    if (char === ',' && !insideQuotes) {
      cells.push(current.trim())
      current = ''
      continue
    }

    current += char
  }

  cells.push(current.trim())
  return cells
}

function parseCookPresetOptions(csvText: string) {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length <= 1) {
    return fallbackCookPresetOptions
  }

  const headers = parseCsvLine(lines[0])
  const categoryIndex = headers.indexOf('类别')
  const referenceTemperatureIndex = headers.indexOf('参考温度')
  const cookingTimeIndex = headers.indexOf('烹饪时间')

  if (categoryIndex === -1 || referenceTemperatureIndex === -1 || cookingTimeIndex === -1) {
    return fallbackCookPresetOptions
  }

  const options = lines
    .slice(1)
    .map((line, index) => {
      const cells = parseCsvLine(line)
      const label = cells[categoryIndex]?.trim() ?? ''
      const referenceTemperature = cells[referenceTemperatureIndex]?.trim() ?? ''
      const cookingTime = cells[cookingTimeIndex]?.trim() ?? ''

      if (!label) {
        return null
      }

      return {
        key: `preset-${index + 1}`,
        label,
        referenceTemperature,
        cookingTime,
      } satisfies CookPresetOption
    })
    .filter((option): option is CookPresetOption => !!option)

  return options.length > 0 ? options : fallbackCookPresetOptions
}

export const cookPresetOptions = parseCookPresetOptions(cookPresetsCsv)
