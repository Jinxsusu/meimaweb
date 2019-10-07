/*
用户相关请求模块
跟用户相关的请求 都封装成 一个个的常量 保存在这个模块里
需要发送请求时 引入这个模块对应的常量
一个原则:
仅封装请求操作,不关心任何其他业务逻辑
例如:操作视图 修改Dom,更不关心交互
*/
// 引入 配置好的aixos 实例 request
import request from '@/utils/request'

// 抛出跟用户相关 封装 好的不同请求 函数(常量)
// 登录 注册用户
export const login = ({ mobile, code }) => {
  // 接收传过来的参数 data
  // data中是数据 直接传递一个data的话
  // 不知道data中具体是有什么
  // 解构赋值
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
// 关注用户
export const followUser = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const unfollowUser = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
// 获取用户自己信息
export const getSelf = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 获取用户个人资料
export const getProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
