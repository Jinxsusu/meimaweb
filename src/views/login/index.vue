<template>
  <div class="login">
    <!-- validationProvider 是验证插件提供的一个全局组件
rules="secret" 配置验证规则
v-slot={errors} 获取验证相关的结果参数
errors[0] 用来获取验证 的错误消息
    name 是校验插件的组件的属性 自定义提示字段的名称 xx是必须的-->
    <!-- <validationProvider rules="required"  name="手机号" v-slot="{ errors }">
      <input v-model="user.mobile" type="text" />
      <span>{{ errors[0] }}</span>
    </validationProvider>-->

    <van-nav-bar title="登录" />
    <!-- ValidationObserver这个组件能 校验多个字段
    这个组件会渲染成一个from 表单 tag 设置成了from
    可以通过ref 调用这个组件的方法 :validate 来记性js验证
    验证通过提交表单 验证失败 不提交表单-->
    <ValidationObserver tag="form" ref="loginForm">
      <!-- 需要验证的字段用 ValidationProvider 包裹起来
        在其上面配置对应的验证规则等信息 就是设置 name rules 等标签属性
          ValidationProvider这个组件只能验证一个字段
      这个组件会渲染成一个div  因为tag 设置成了div-->
      <validationProvider tag="div" rules="required|phone" name="手机号" v-slot="{ errors }">
        <!-- | 后面加上我们的自定义的校验规则 -->
        <!-- v-model 绑定 组件内的数据 -->
        <van-field
          :error-message="errors[0]"
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
        />
      </validationProvider>
      <validationProvider tag="div" rules="required" name="验证码" v-slot="{ errors }">
        <van-field
          :error-message="errors[0]"
          v-model="user.code"
          type="password"
          label="验证码"
          placeholder="请输入验证码"
          required
        />
        <!-- error-message这个是vant组件中设置的 提示错误信息的属性
        我们把它跟 ValidationProvider中的错误信息的提示绑定 v-slot="{ errors }"
        当然上下两个errors 不是一样的.-->
        <!-- errors是组件内置的一个数据模型，用来存储和处理错误信息。
        默认情况下，错误包实例将注入组件 errors 名称下的计算属性中，
        可以对其进行自定义以避免与其他 库/组件 发送冲突。 -->
      </validationProvider>
    </ValidationObserver>
    <div class="btn">
      <!-- 给登录按钮注册事件 -->
      <van-button @click="onLogin" type="info" :loading="isloading">登录</van-button>
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
        mobile: '15201230123',
        code: '246810'
      }
    }
  },
  methods: {
    async onLogin () {
      // 使用try 和catch 处理异步函数的错误
      try {
        // 进行表单验证可以通过ref 调用这个组件的方法 :validate 来记性js验证
        // 这个是一个异步的 获取到一个结果 保存到一个常量中
        const isValid = await this.$refs.loginForm.validate()
        // 进行一个判断 如果验证失败的话 什么的都不做  直接return
        // 阻止代码往下执行
        if (!isValid) {
          return
        }
        // 验证通过提交表单
        this.isloading = true
        const { data } = await login(this.user)
        // 在
        //  login 函数中 传入对应的参数
        // console.log(data)
        // 在登录事件发生以后登录成功了
        // 存储 token 存储在Vuex
        // (这里没有在本地,刷新以后数据就不存在了)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
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
