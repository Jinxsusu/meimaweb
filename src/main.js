import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import './styles/index.less'
/* 下面的这种加载方式没有 携带任何一种 校验规则 */
// import { ValidationProvider, extend } from 'vee-validate'

// 您可以使用应用中占用空间较大的完整包来导入所有规则：
// 如果您需要使用 其内置的验证规则 ,则使用这种方式来配置
// import { ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full'
// 下面的中方式也能导入 所有的验证 规则
// 然后 语言环境也设置了
// import { extend } from 'vee-validate'
// ValidationObserver 这个组件可以同时校验多个字段 也就是用于表单的整体验证
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules' // 所有的验证 规则
import zhCN from 'vee-validate/dist/locale/zh_CN' // 配置的语言包
import { relativeTime } from './utils/date'
import {
  Button,
  NavBar,
  Cell,
  CellGroup,
  Field,
  Toast,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  List,
  Icon,
  PullRefresh,
  Grid,
  GridItem,
  Image,
  Lazyload,
  Popup,
  Search
} from 'vant'
// 为了能在模板中使用relativeTime 方法
// 所以这里将其注册为全局过滤器
Vue.filter('relativeTime', relativeTime)
Vue.use(Icon)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Button)
  .use(NavBar)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Icon)
  .use(PullRefresh)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Lazyload)
  .use(Popup)
  .use(Search)

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}

// 配置表单验证插件
// 自定义添加验证规则 extend 扩展功能 (函数)
// extend('secret', {
//   // value就是你输入以后要校验的数据
//   validate: value => value === 'example',
//   // validate (value) {
//   //   console.log('插件进行验证', value)
//   //   return value === 'example'
//   // },
//   // 给出一个错误提示
//   message: 'This is not the magic word'
// })
// Register it globally 注册了一个全局组件

// 自定义设置手机号的校验规则
// 一个原则 如果有内置的规则 执行内置的
// 内置的没有的话再自定义的
extend('phone', {
  validate (value) {
    // 传递过来一个参数
    return /^1[3456789]\d{9}$/.test(value)
  },
  message: '必须是手机号'
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
