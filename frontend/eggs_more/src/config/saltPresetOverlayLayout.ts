export interface SaltPresetOverlayLayout {
  searchBox: {
    top: number
    left: number
    width: number
    height: number
  }
  searchValueBox: {
    top: number
    left: number
    width: number
    height: number
  }
  dropdownBox: {
    top: number
    left: number
    width: number
    height: number
  }
  dropdownItemHeight: number
  foodValueBox: {
    top: number
    left: number
    width: number
    height: number
  }
  referenceValueBox: {
    top: number
    left: number
    width: number
    height: number
  }
  cookingTimeBox: {
    top: number
    left: number
    width: number
    height: number
  }
  elapsedTimeBox: {
    top: number
    left: number
    width: number
    height: number
  }
  actionButtonBox: {
    top: number
    left: number
    width: number
    height: number
  }
}

export const saltPresetOverlayLayouts: Record<'AnX' | 'wXj', SaltPresetOverlayLayout> = {
  AnX: {
    searchBox: {
      top: 95,
      left: 49,
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
      top: 439,
      left: 184,
      width: 106,
      height: 24,
    },
    referenceValueBox: {
      top: 526,
      left: 194,
      width: 96,
      height: 24,
    },
    cookingTimeBox: {
      top: 609,
      left: 194,
      width: 96,
      height: 24,
    },
    elapsedTimeBox: {
      top: 690,
      left: 184,
      width: 110,
      height: 24,
    },
    actionButtonBox: {
      top: 340,
      left: 120,
      width: 122,
      height: 40,
    },
  },
  wXj: {
    searchBox: {
      top: 95,
      left: 49,
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
      top: 454,
      left: 184,
      width: 106,
      height: 24,
    },
    referenceValueBox: {
      top: 537,
      left: 194,
      width: 96,
      height: 24,
    },
    cookingTimeBox: {
      top: 620,
      left: 194,
      width: 96,
      height: 24,
    },
    elapsedTimeBox: {
      top: 703,
      left: 184,
      width: 110,
      height: 24,
    },
    actionButtonBox: {
      top: 351,
      left: 125,
      width: 114,
      height: 36,
    },
  },
}
