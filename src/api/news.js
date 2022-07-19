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
