
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store' // 在非组件中用Vuex容器的东西谁用谁引用

// 创建axios实例
// axios.create 的作用 是克隆一个axios 实例
// 它的作用是和axios 是一样的 它们的配置可以不一样
// 加入 一个应用中有多个不同的后台接口路径
// http://api.a.com
// http://api.b.com
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 这样的话可以再克隆一个
// const request2 = axios.create({
//     baseURL: '请求基准路径'
//   })
// 配置axios
// 处理后端返回数据超出 JS 安全整数范围问题
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 添加 token 请求拦截器统一添加token
  // 添加拦截器要使用 自己克隆出来的axios实例上进行添加
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer${user.token}`
  }
  return config
},
function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
},
function (error) {
  return Promise.reject(error)
})
// 导出请求对象
// 配置超出安全整数范围的数据 的处理方式
request.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]
export default request
