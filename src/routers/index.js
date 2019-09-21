import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Tabbar from '@/views/tabbar'
import Home from '@/views/home'

Vue.use(VueRouter)
const router = new VueRouter({
  // 配置路由表
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      // name: 'tabbar',
      // 如果嵌套路由有默认的子路由 就不需要设置name
      path: '/',
      component: Tabbar,
      children: [
        { name: 'home',
          path: '', // 默认子路由 path内设置为空
          component: Home }
      ]
    }
  ]
})
export default router
