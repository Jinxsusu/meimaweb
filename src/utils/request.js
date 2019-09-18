
import axios from 'axios'
import JSONbig from 'json-bigint'
// 创建axios实例
// axios.create 的作用 是克隆一个axios 实例
// 它的作用是和axios 是一样的
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
// 请求拦截器
// 响应拦截器
// 导出请求对象
request.defaults.transformResponse = [function (data) {
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]
export default request
