import request from '@/utils/request'

export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {String} q
 * @param {Number} page
 * @returns promise
 */
export const getSearchResults = (q, page = 1) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
