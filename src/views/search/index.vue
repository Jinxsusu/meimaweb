<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- / 搜索框 -->
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell
      icon="search"
      v-for="item in 5"
      :key="item"
      >
        <div slot="title">{{item}}</div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->
    <!-- 历史记录 -->
    <van-cell-group>
      <van-cell title="历史记录">
        <span style="margin-right:10px">全部删除</span>
        <span>完成</span>
        <van-icon
        name="delete"
        slot="right-icon"
        style="line-height:inherit"
         />
      </van-cell>
      <!-- line-height: inherit
      这样设置的话 规定应该从父元素继承 line-height 属性的值。-->
      <van-cell
      title="hello"
      v-for="value in 5"
      :key="value"
      >
        <van-icon
        name="close"
        slot="right-icon"
        style="line-height:inherit"
        />
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {},
    onCancel () {}
  }
}
</script>

<style>
</style>
