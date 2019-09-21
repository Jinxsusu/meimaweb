import request from '@/utils/request'
// 获取文章列表
export const getArticles = ({
  channeld,
  timestamp,
  withTop }) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channeld, // 频道ID
      timestamp, // 时间戳整数单位毫秒时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      with_top: withTop // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    }
  })
}
