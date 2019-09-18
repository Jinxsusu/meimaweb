import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import { ValidationProvider, extend } from 'vee-validate'
import {
  Button,
  NavBar,
  Cell,
  CellGroup,
  Field,
  Toast
} from 'vant'

Vue
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Button)
  .use(NavBar)
  .use(Toast)
  // 配置表单验证插件
  // 自定义添加验证规则 extend 扩展功能 (函数)
extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
})
// Register it globally 注册了一个全局组件
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
