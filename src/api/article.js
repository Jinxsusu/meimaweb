import request from '@/utils/request'
// 获取文章列表
export const getArticles = ({
  channelId,
  timestamp,
  withTop
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId, // 频道id
      timestamp, // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      with_top: withTop // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    }
  })
}
// 获取文章详情
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`

  })
}
// 点赞文章
export const likeArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
// 取消点赞文章
export const unlikeArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
// 踩文章
export const dislikeArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
// 取消踩文章
export const undislikeArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/dislikes/${articleId}`
  })
}
