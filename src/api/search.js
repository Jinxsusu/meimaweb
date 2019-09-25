import request from '@/utils/request'
// 获取联想建议
export const getSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchResult = ({
  page,
  perPage,
  q
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      page, // 页数，不传默认为1
      per_page: perPage, // 每页数量，不传每页数量由后端决定
      q // 搜索关键词
    }
  })
}
