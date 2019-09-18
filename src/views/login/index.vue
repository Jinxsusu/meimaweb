<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <!-- v-model 绑定 组件内的数据 -->
      <van-field v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号" />
      <van-field v-model="user.code" type="password" label="验证码" placeholder="请输入验证码" required />
    </van-cell-group>
    <div class="btn">
      <!-- 给登录按钮注册事件 -->
      <van-button
      @click="onLogin"
      type="info"
      :loading="isloading">登录</van-button>
    </div>
  </div>
</template>

<script>
// 引入 api 方法
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      isloading: false, // 控制登录按钮的loading的状态
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async  onLogin () {
      this.isloading = true
      // 使用try 和catch 处理异步函数的错误
      try {
        const { data } = await login(this.user)
        // 在 login 函数中 传入对应的参数
        this.$toast.success('登录成功')
        console.log(data)
      } catch (err) {
        // 给出错误提示
        if (err.response && err.response.status === 400) {
          // 请求失败  提示用户
          // 使用组件库vant 中的组件Toast 轻提示
          this.$toast.fail('登录失败,手机号或验证码有误')
        }
      }
      // 无论登录成功还是失败 都要停止 loading 给用户返回结果
      this.isloading = false
    }

  }
}
</script>

<style lang="less" scoped>
//设置组件自己的样式
.login {
  .btn {
    padding: 20px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
