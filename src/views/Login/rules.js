export const mobileRules = [
  { required: true, message: '请填写手机号' },
  {
    pattern:
      /^1[0-9]\d{9}$/,
    message: '手机号码格式不正确'
  }
]

export const codeRules = [
  { required: true, message: '请填写验证码' },
  { pattern: /^[0-9]{6}$/, message: '请输入6位验证码' }
]
