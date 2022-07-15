import request from '@/utils/request'

/**
 * 登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 *
 * @param {String} mobile 手机号
 * @returns promise
 */

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
