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
    headers: {
      'Content-Type': 'application/json'
    },
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

/**
 * 获取评论
 * @param {String} type a或c,a获取对文章的评论，c获取对评论的回复
 * @param {String} source 源id，文章的id或评论的id
 * @param {String} offset 评论数据的偏移量，评论id，表示从此id的数据向后取，不传默认从第一页开始读取数据
 * @returns promise
 */
export const getComments = (type, source, offset) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset
    }
  })
}

/**
 * 对文章或者评论进行评论
 * @param {String} id 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content 评论内容
 * @param {String} artId 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns promise
 */
export const setArticleReply = (id, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target: id,
      content,
      art_id: artId
    }
  })
}

/**
 * 对评论进行点赞
 * @param {*} target 评论id
 * @returns
 */
export const comLikings = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target
    }
  })
}

/**
 * 取消对评论进行点赞
 * @param {*} target 评论id
 * @returns
 */
export const comUnLikings = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
