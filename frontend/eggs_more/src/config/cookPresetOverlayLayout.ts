export interface OverlayBoxLayout {
  top: number
  left: number
  width: number
  height: number
}

export interface CookPresetOverlayLayout {
  searchBox: OverlayBoxLayout
  searchValueBox: OverlayBoxLayout
  dropdownBox: OverlayBoxLayout
  dropdownItemHeight: number
  foodValueBox: OverlayBoxLayout
  referenceTemperatureBox: OverlayBoxLayout
  cookingTimeBox: OverlayBoxLayout
  startButtonBox: OverlayBoxLayout
  finishButtonBox: OverlayBoxLayout
  elapsedTimeBox: OverlayBoxLayout
}

export const cookPresetOverlayLayout: CookPresetOverlayLayout = {
  searchBox: {
    top: 95,
    left: 65,
    width: 283,
    height: 37,
  },
  searchValueBox: {
    top: 99,
    left: 84,
    width: 184,
    height: 28,
  },
  dropdownBox: {
    top: 138,
    left: 49,
    width: 283,
    height: 146,
  },
  dropdownItemHeight: 42,
  foodValueBox: {
    top: 419,
    left: 191,
    width: 102,
    height: 22,
  },
  referenceTemperatureBox: {
    top: 500,
    left: 204,
    width: 88,
    height: 24,
  },
  cookingTimeBox: {
    top: 579,
    left: 196,
    width: 96,
    height: 24,
  },
  startButtonBox: {
    top: 359,
    left: 134,
    width: 114,
    height: 36,
  },
  finishButtonBox: {
    top: 359,
    left: 134,
    width: 114,
    height: 36,
  },
  elapsedTimeBox: {
    top: 652,
    left: 186,
    width: 108,
    height: 22,
  },
}
