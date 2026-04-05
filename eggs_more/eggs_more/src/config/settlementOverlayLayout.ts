export interface SettlementOverlayLayout {
  foodValueBox: {
    top: number
    left: number
    width: number
    height: number
  }
  ratingInputBox: {
    top: number
    left: number
    width: number
    height: number
  }
  feelingInputBox: {
    top: number
    left: number
    width: number
    height: number
  }
  durationValueBox: {
    top: number
    left: number
    width: number
    height: number
  }
}

export const settlementOverlayLayout: SettlementOverlayLayout = {
  foodValueBox: {
    top: 417,
    left: 184,
    width: 104,
    height: 24,
  },
  ratingInputBox: {
    top: 491,
    left: 165,
    width: 122,
    height: 40,
  },
  feelingInputBox: {
    top: 569,
    left: 164,
    width: 124,
    height: 42,
  },
  durationValueBox: {
    top: 652,
    left: 184,
    width: 110,
    height: 24,
  },
}
