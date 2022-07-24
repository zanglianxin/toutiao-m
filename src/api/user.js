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

/**
 *  获取用户信息
 * @returns promise
 */

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

/**
 * 上传图片
 * @param {*} file 图片的FORM DATA
 * @returns
 */
export const uploadPhoto = (file) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: file
  })
}

/**
 * 获取用户个人资料
 * @returns promise
 */
export const getProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 设置用户信息
 * @param {*} info 对象的形式 name:昵称，gender:性别,birthday:生日,intro:个人介绍
 * @returns
 */
export const setUserInfo = (info) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: info
  })
}
