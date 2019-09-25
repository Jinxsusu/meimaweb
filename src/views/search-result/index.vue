<template>
  <div class="search-result">
    <!--$router.back() 后退到上一级路由  -->
    <van-nav-bar
     fixed
     :title="`${$route.params.q}的搜索结果`"
     left-arrow
     @click-left="$router.back()" />
    <!-- 搜索结果文章列表 -->
    <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     @load="onLoad">
      <van-cell
       v-for="article in list"
       :key="article.art_id.toString()"
       :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1// 设置默认文章展示列表 页码为1
    }
  },
  methods: {
    async onLoad () {
    // 1.请求
      const { data } = await getSearchResult({
        page: this.page,
        per_page: 10,
        q: this.$route.params.q
      })
      // 2.将请求结果保存到当前组件的list中
      const results = data.data.results
      // console.log(data)
      this.list.push(...results)
      // 3.关闭loading
      this.loading = false
      // 4.判断是否已全部结束
      if (results.length) {
        // 如果有,更新页码
        this.page++
      } else {
        // 如果已结束,则将finished 设置为true ,不再调用onLoad
        this.finished = true
      }
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
