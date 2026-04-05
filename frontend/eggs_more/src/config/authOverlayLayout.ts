export type AuthLayoutMode = 'register' | 'login'

export interface AuthFieldLayout {
  key: 'email' | 'password' | 'confirmPassword'
  top: number
  left: number
  width: number
  height: number
  paddingLeft: number
  placeholder: string
}

export interface AuthActionLayout {
  top: number
  left: number
  width: number
  height: number
}

export interface AuthOverlayLayout {
  registerTab: AuthActionLayout
  loginTab: AuthActionLayout
  submitButton: AuthActionLayout
  statusBox: AuthActionLayout
  fields: AuthFieldLayout[]
}

// 只需要改这里的数字，就能调整输入框 / tab / 提交按钮位置。
// top / left / width / height 全部基于手机画板 375 x 812 坐标系。
export const authOverlayLayouts: Record<AuthLayoutMode, AuthOverlayLayout> = {
  register: {
    registerTab: { top: 369, left: 28, width: 82, height: 42 },
    loginTab: { top: 369, left: 110, width: 84, height: 42 },
    submitButton: { top: 684, left: 84, width: 207, height: 38 },
    statusBox: { top: 734, left: 20, width: 335, height: 44 },
    fields: [
      {
        key: 'email',
        top: 446,
        left: 38,
        width: 300,
        height: 48,
        paddingLeft: 18,
        placeholder: '请输入邮箱',
      },
      {
        key: 'password',
        top: 540,
        left: 38,
        width: 300,
        height: 48,
        paddingLeft: 18,
        placeholder: '请输入密码',
      },
      {
        key: 'confirmPassword',
        top: 638,
        left: 40,
        width: 300,
        height: 48,
        paddingLeft: 18,
        placeholder: '再次输入密码',
      },
    ],
  },
  login: {
    registerTab: { top: 369, left: 28, width: 82, height: 42 },
    loginTab: { top: 369, left: 110, width: 84, height: 42 },
    submitButton: { top: 684, left: 84, width: 207, height: 38 },
    statusBox: { top: 734, left: 20, width: 335, height: 44 },
    fields: [
      {
        key: 'email',
        top: 506,
        left: 28,
        width: 319,
        height: 46,
        paddingLeft: 44,
        placeholder: '请输入邮箱',
      },
      {
        key: 'password',
        top: 612,
        left: 28,
        width: 319,
        height: 46,
        paddingLeft: 44,
        placeholder: '请输入密码',
      },
    ],
  },
}
