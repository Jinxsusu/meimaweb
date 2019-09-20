// 获取本地存储数据
export const getItem = (name) => {
  // return window.localStorage.getItem(name)
  return JSON.parse(window.localStorage.getItem(name))
}
// 添加本地存储数据
export const setItem = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data))
}
// 删除本地存储数据
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
