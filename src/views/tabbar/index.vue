<template>
  <div>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- /路由出口 -->
    <!-- 底部导航栏 -->
    <van-tabbar fixed>
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item name="setting" icon="contact" to="/my">
        {{$store.state.user ? '我的' :'未登录'}}
      </van-tabbar-item>
    </van-tabbar>
    <!--/底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'TabbarIndex'
}
</script>

<style>
</style>
