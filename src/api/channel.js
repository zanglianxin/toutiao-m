import request from '@/utils/request'
import storage from '@/utils/storage'

/**
 * 获取用户频道列表
 * @returns promise
 */

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 *
 * @param {String | Number} target 删除用户频道的id
 * @returns Promise对象
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}

export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

const HETMA_TOUTIAO_CHANNELS = 'HETMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal = () => storage.get(HETMA_TOUTIAO_CHANNELS)

export const setMyChannelsToLocal = (channel) =>
  storage.set(HETMA_TOUTIAO_CHANNELS, channel)
