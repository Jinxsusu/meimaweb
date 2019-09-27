import request from '@/utils/request'
// 获取文章评论
export const getArticleComment = ({
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
// 添加文章评论
export const addArticleComment = ({
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
