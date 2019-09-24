import request from '@/utils/request'
// 获取所有频道列表

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 获取用户频道列表或者默认推荐的频道列表
// 如果登录的话 就会有token 返回用户频道列表
// 如果没有的话就显示默认的频道列表

export const getUserOrDefalutChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 新增用户频道列表(这个接口有问题 删除频道以后 该频道无法再次添加在我的频道中)
// 重置用户频道列表
export const resetUserChannels = channels => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
// 删除用户频道信息
export const deleteUserChannels = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
