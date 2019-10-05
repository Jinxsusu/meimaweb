<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
    />
    <van-cell-group>
        <!-- is-link 是否展示右侧箭头并开启点击反馈 arrow-direction 控制箭头方向 -->
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          src="http://toutiao.meiduo.site/FgSTA3msGyxp5-Oufnm5c0kjVgW7"
        />
      </van-cell>
      <van-cell title="昵称" value="abc" is-link />
      <van-cell title="性别" value="男" is-link />
      <van-cell title="生日" value="2019-9-27" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserIndex'
}
</script>

<style>

</style>
