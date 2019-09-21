<template>
  <div>
    <router-view></router-view>
    <van-tabbar>
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item name="setting" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabbarIndex'
}
</script>

<style>
</style>
