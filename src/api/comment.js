import request from '@/utils/request'
// 获取文章评论
export const getComments = ({
  type,
  source,
  offset,
  limit
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
// 添加文章评论 回复评论添加
export const addComment = ({
  target,
  content,
  artId
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
