import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 把数据存储到 Vuex 容器 初始化一个数据
    user: getItem('user')
  },
  mutations: {
    // 添加一个 mutation 用于修改 state
    setUser (state, user) {
      state.user = user
      // 为了防止页面刷新数据丢失
      // 还需要将数据存储到本地
      setItem('user', state.user)
    }
  },
  actions: {

  }
})
