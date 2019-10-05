import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Tabbar from '@/views/tabbar'
import Home from '@/views/home'
import Search from '@/views/search'
import SearchResult from '@/views/search-result'
import Article from '@/views/article'
import My from '@/views/my'
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
      name: 'search',
      path: '/search',
      component: Search
    },
    {
      name: 'searchresult',
      path: '/search/:q', // 动态路由 传递参数关键词
      component: SearchResult
    },
    {
      name: 'article', // 文章详情页
      path: '/article/:articleId', // 动态路由 获取对应参数的文章详情
      component: Article
    },
    {
      // 嵌套路由如果有默认子路由，则不需要 name
      // name: 'tabbar',
      path: '/',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '', // 默认子路由
          component: Home
        },
        {
          name: 'my',
          path: '/my', // 默认子路由
          component: My
        }
      ]
    }
  ]
})
export default router
