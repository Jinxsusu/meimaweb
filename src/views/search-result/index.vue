<template>
  <div class="search-result">
    <!--$router.back() 后退到上一级路由  -->
    <van-nav-bar
     fixed title="xxx的搜索结果"
     left-arrow
     @click-left="$router.back()" />
    <!-- 搜索结果文章列表 -->
    <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     @load="onLoad">
      <van-cell
       v-for="item in list"
       :key="item"
       :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.search-result{
  .van-list{
    margin-top: 46px;
  }
}
</style>
