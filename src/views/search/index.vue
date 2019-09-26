<template>
<div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="onCancel"
      />
    </form>
    <!-- / 搜索框 -->
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell
      icon="search"
      v-for="item in suggestions"
      :key="item"
      @click="onSearch(item)"
      >
        <!-- 如果绑定的数据中有HTML 标签 ,则默认当做字符串渲染
        <div slot="title">{{item}}</div>-->
        <!-- 如果想要字符串中的Html标签渲染出来,则使用v-html指定来渲染 -->
        <!-- <div slot="title" v-html="item"></div> -->
        <!-- 如果这里是{{}} 绑定,那建议使用过滤器来处理渲染成其它内容,不影响数本身
        但是,过滤器只能用于{{}} 和v-bind
        实现方式: 使用函数就可以了-->
         <div slot="title" v-html="highLight(item)"></div>
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
      :title="item"
      v-for="item in searchHistories"
      :key="item"
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
import { getSuggestions } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      suggestions: [], // 获取的后台建议数据
      searchHistories: getItem('search-histories') || []// 获取本地保存的搜索历史记录
    }
  },
  watch: {
    // 监视搜索框中输入的数据变化
    async searchText (newValue) {
      // 检验新的数据是否为空
      if (!newValue.length) {
        return // 如果是空的就停止代码
      }
      // 获取数据 调用api方法 接收 获取到的后台建议数据
      const { data } = await getSuggestions(newValue)
      /* 为了实现搜索内容的返回数据中 的搜索关键字高亮 (字体颜色变红)
      方式1:直接对返回的数据进行更改:
      把返回数据中的关键字加上span标签改变颜色 用 v-html 属性渲染到视图中
      这种方式直接改变了后台返回给我们的数据不合适 */
      const options = data.data.options
      //   options.forEach((item, index) => {
      //     // 遍历返回的数据 用正则表达式 来判断是否和关键字一样
      //     /* 正则表达式的两种表示方法
      //         1./newValue/gi 这种方法的话 就直接把关键词当成固定值newValue,不符合实际 因为 newValue是变量
      //         2.new RegExp('字符串匹配模式) //相当于创建了一个正则表达式 里面是一个格式 是变量可以不是固定值
      //     */
      //     //   处理
      //     const reg = new RegExp(newValue, 'gi') // gi表示全局搜索 i 表示 大小写不区分 规则
      //     options[index] = item.replace(
      //       reg,
      //       `<span style="color:red">${newValue}</span>`
      //     )
      //   })
      //   绑定数据在视图
      this.suggestions = options
    }
  },
  methods: {
    onSearch (q) {
      // trim() 字符串方法把字符串的头部和尾部空格都去掉
      if (!q.trim().length) {
        return
      }
      // 记录历史记录
      const searchHistories = this.searchHistories
      // 如果搜索记录数组中不存在当前关键字
      // 则添加该关键字到数组中
      // 如果有的话找到该关键字在数组中
      // 的位置 删除
      const index = searchHistories.findIndex(item => {
        // 关键字和历史记录的每一项 数据对比的时候忽略大小写和空格
        return item.trim().toLowerCase() === q.trim().toLowerCase()
      })
      if (index !== -1) {
        searchHistories.splice(index, 1)
      }
      // 再添加让其变成首位
      searchHistories.unshift(q)
      // 保存历史记录到本地存储(防止刷新页面数据丢失)
      setItem('search-histories', searchHistories)
      // // 跳转到搜索结果页面
    // this.$router.push({
    //   name: 'searchresult',
    //   params: {
    //     q
    //   }
    // })
    },

    onCancel () {
    // 取消跳转到home页
      this.$router.push('/')
    },
    highLight (str) {
      const reg = new RegExp(this.searchText, 'gi') // gi表示全局搜索 i 表示 大小写不区分 规则
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  }
}

</script>

<style>
</style>
