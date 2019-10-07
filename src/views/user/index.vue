<template>
  <div class="user">
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender===1 ? '男':'女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getProfile } from '@/api/user'
export default {
  name: 'UserIndex',
  data () {
    return {
      user: {} // 用户的个人资料
    }
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getProfile()
      this.user = data.data
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style>

</style>
