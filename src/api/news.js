import request from '@/utils/request'

export const getArticleList = (channeId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channeId,
      timestamp
    }
  })
}

/**
 * 获取新闻详情
 * @returns promise
 */
export const getArticleInfo = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

/**
 * 对文章点赞
 * @param {String} id 文章id
 * @returns promise
 */
export const thumbsUp = (id) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 对文章取消点赞
 * @param {*} id 文章id
 * @returns promise
 */
export const unThumbsUp = (id) => {
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
}

/**
 * 对文章收藏
 * @param {String} id 文章id
 * @returns promise
 */
export const collected = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}

/**
 * 取消文章收藏
 * @param {String} id 文章id
 * @returns promise
 */
export const unCollected = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

/**
 * 关注用户
 * @param {*} target 用户id
 * @returns promise
 */
export const following = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 * @param {*} target 用户id
 * @returns promise
 */
export const unFollowing = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
