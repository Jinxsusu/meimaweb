<template>
  <div class="home">
    <!-- 导航栏 -->
    <!-- fixed 这个是组件中国nav-bar 的属性是否固定在顶部 -->
    <van-nav-bar fixed>
      <!-- 自定义文本内容 搜索按钮 -->
      <van-button
      size="small"
      class="search-btn"
      round type="info"
      slot="title"
      icon="search"
      @click="$router.push('/search')"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <!-- 设置面包按钮 点击的时候能出现 标签弹层 -->
      <!-- 使用的是标签插槽  nav-right显示在标题的右侧-->
      <van-tab
      :title="channel.name"
      v-for="channel in channels"
      :key="channel.id"
      >
        <!-- 标签页的内容 展现的是当前频道下的 文章列表 -->
        <!-- v-model="loading" 控制列表组件的上拉加载的loading状态
        finished 用来控制列表是否加载结束
        如果为true ,则列表组件会提示:'没有更多了'.停止继续加载更多
        如果为false,则会继续触发loading 加载更多 finished-text配置加载结束的文本提示
        load 事件:用来配置加载更多 的方法
        列表初始化的时候 loading默认设置为true
        那个加载动画就会出现 当数据加载完毕以后 loading就设置为false
        onLoad 方法
            初始化的时候调用
        加载更多的时候调用-->
        <!-- List 组件通过loading和finished两个变量控制加载状态，
        当组件滚动到底部时，会触发load事件并将loading设置成true。
        此时可以发起异步操作并更新数据，数据更新完毕后，
        将loading设置成false即可。
        若数据已全部加载完毕，则直接将finished设置成true即可。-->
        <van-pull-refresh
        v-model="channel.pullDownLoading"
        @refresh="onRefresh"
        >
          <!-- refresh这个是下拉刷新组件用户向下拉列表 刷新文章列表数据。
          -注册下拉刷新事件（组件）的处理函数
          发送请求获取文章列表数据
          把获取到的数据添加到当前频道的文章列表的顶部
          提示用户刷新成功！
          -->
          <!--  v-model="pullDownLoading 是 下拉刷新的时候页面状态 -->
          <!-- onRefresh 这个事件 会调用获取文章列表的数据  -->
          <van-list
            v-model="channel.loading "
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
              @click="$router.push({
                name:'article',
                params:{
                  articleId:article.art_id.toString()
                }
              })"
            >
              <!-- 文章的详细信息 -->
              <div slot="label">
                <!-- 文章图片 -->
                <!-- 使用了vant组件库的两个组件 一个是grid 宫格组件调整结构 -->
                <!-- 一个是image 图片组件 (这个组件能实现图片的懒加载) -->
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img,index) in article.cover.images" :key="index" text="文字">
                    <van-image height="80" :src="img" lazy-load />
                  </van-grid-item>
                </van-grid>
                <!-- 文章详细的文字信息 -->
                <div class="article-info">
                  <div class="meta">
                    <span>{{article.aut_name}}</span>
                    <span>评论{{article.comm_count}}条</span>
                    <span>{{article.pubdate | relativeTime }}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 在这个小按钮上设置点击事件 当点击时显示弹层 -->
      <div
      slot="nav-right"
      class="wap-nav"
      @click="isChannelEditShow=true"
      >
        <van-icon name="wap-nav" size="24" />
      </div>
      <!-- /面包按钮 -->
    </van-tabs>
    <!-- 频道列表/ -->
    <!-- 频道管理 -->
    <!-- 通过position属性设置弹出位置，
    默认居中弹出，可以设置为top、bottom、left、right
     closeable close-icon-position="top-left"
     自定义图标 关闭按钮 后面设置的是自定义图标的显示位置
    round 把弹层的样式设置为 圆角-->
    <van-popup
    v-model="isChannelEditShow"
    position="bottom"
    :style="{ height: '95%' }"
    round
    >
      <!-- 弹层关闭按钮图标 -->
      <van-cell
      icon="cross"
      :border="false"
      @click="isChannelEditShow=false" />
      <div>
        <!-- 我的频道 -->
        <van-cell title="我的频道" :border="false">
          <van-button
          type="danger"
          @click="isEdit=!isEdit"
          size="mini"
          >{{isEdit ? '完成':'编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            @click="onUserChannelClick(channel,index)"
            v-for="(channel,index) in channels"
            :key="channel.id"
            :text="channel.name"
          >
            <!-- 编辑情况下的显示关闭小按钮 -->
            <van-icon
            v-show="isEdit"
            class="close-icon"
            slot="icon"
            name="close" />
          </van-grid-item>
        </van-grid>
      </div>
      <!--/ 我的频道 -->
      <!-- 频道推荐 -->
      <div>
        <van-cell title="频道推荐" :border="false"></van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="channel in remainingChannels"
            :key="channel.id"
            :text="channel.name"
            @click="onAddChannels(channel)"
          />
        </van-grid>
      </div>
      <!--/ 频道推荐 -->
    </van-popup>
    <!-- /频道管理 -->
  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage' // 导入本地存储的数据
import {
  getUserOrDefalutChannels,
  getAllChannels,
  resetUserChannels,
  deleteUserChannels
} from '@/api/channel'
import { getArticles } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [], // 我的频道数据
      isChannelEditShow: false, // 控制弹出的显示和隐藏
      AllChannels: [], // 全部频道数据
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']), // 获取vuex容器中的user的内容
    // 自定义了 一个对象 获取当前频道对象
    // this.active 是对应标签的active 正好能对应上
    // 频道列表 channels 的下标
    currentChannel () {
      return this.channels[this.active]
    },
    // 获取剩余频道 思路:全部频道-我的频道
    remainingChannels () {
      // return this.AllChannels - this.channels 思路
      const rchannels = [] // 剩余频道 数据
      this.AllChannels.forEach(channel => {
        // 如果我的频道不包含当前遍历频道,那就是剩余的频道
        // find 方法:遍历数组,查找满足 item.id===channel.id的元素 ,找到的话就返回该元素
        // findIndex返回该元素的索引
        // 如果直到遍历结束都没有,就返回undefined
        const index = this.channels.findIndex(item => item.id === channel.id)
        if (index === -1) {
          // index===-1的话就是不存在这一项,把这一项放在 剩余频道数组
          rchannels.push(channel)
        }
      })
      return rchannels
    }
  },
  created () {
    this.loadUserOrDefalutChannels()
    this.getAllChannels()
  },
  methods: {
    // 注册下拉刷新事件（组件）的处理函数
    async onRefresh () {
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channelId: currentChannel.id,
        timestamp: Date.now(),
        withTop: 1
      })
      // console.log(data)
      // 将数据渲染到当前文章列表的顶部
      currentChannel.articles.unshift(...data.data.results)
      // 关闭当前频道下拉刷新的loading状态
      currentChannel.pullDownLoading = false
      // 提示用户刷新成功
      this.$toast('刷新成功哦')
    },
    async onLoad () {
      // 1.请求加载文章列表
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        // channelId: 6,
        channelId: currentChannel.id,
        // 如果currentChannel.timestamp 有的话就取这个值
        // 如果没有的话就是当前的时间戳
        timestamp: currentChannel.timestamp || Date.now(),
        /* 第一页数据传递当前最新时间戳
        下一页数据传递上一页返回数据结果中pre_timestamp
        所以 我们要取到这个pre_timestamp */
        withTop: 1
      })
      // console.log(data)

      // 2.将得到的文章列表添加到当前频道的articles中
      //   currentChannel.articles.push(data.data.results)
      /** 上面的写法错误的 因为articles是一个数组 results 也是一个数组
       * 我们要把后面的数组一项一项的展开把 每一项赋值给 前面的数组
       * 用的是... 展开符
       */
      const { pre_timestamp: preTimestamp, results } = data.data
      currentChannel.articles.push(...results)
      // 3. 判断本次的onLoad数据 加载完毕,将loading设置为false
      currentChannel.loading = false
      // 4.判断数据是否已全部加载完毕
      // 如果pre_timestamp 没有数据的话证明数据已经加载完成
      if (!preTimestamp) {
        // 这里是取反
        currentChannel.finished = true
      } else {
        // 还有数据,将本次得到的pre_timestamp
        // 存储到当前频道,用于加载到下一页
        currentChannel.timestamp = preTimestamp
      }
    },
    async loadUserOrDefalutChannels () {
      //* *思路 */ 开始的时候没有 考虑频道管理这件事儿,所以为了简单,直接获取了所有的频道列表
      // 实现频道管理的思路
      //     1.如果用户已经登录,则请求获取后端存储的用户频道列表
      let channels = [] // 设置一个空数组 来根据实际情况来赋值,这个数组就是展示的不同的频道
      //
      if (this.user) {
        // 如果user存在的话 证明用户已经登录 获取用户的频道列表
        const { data } = await getUserOrDefalutChannels()
        channels = data.data.channels // 给我们的设置的空数组channels 填上我们获取的数据
      } else {
        // 2.如果用户没有登录,则查看本地存储是否有频道列表
        //    2.1如果本地存储,则获取使用
        const localChannels = getItem('channels') // 获取本地存储数据 localChannels
        if (localChannels) {
          channels = localChannels
        } else {
          //    2.2如果本地存储没有,则获取默认推荐的频道列表
          const { data } = await getUserOrDefalutChannels()
          channels = data.data.channels
        }
      }
      // 为每一个频道初始化一个成员 articles 用来存储该频道的文章列表
      // channels.forEach(channel => {
      //   channel.articles = [] // 添加的这个成员是一个数组 该频道的文章列表
      //   channel.loading = false // 频道的上拉加载更多的loading
      //   channel.finished = false // 频道的加载结束的状态
      //   channel.timestamp = null // 用于获取下一页数据的时间戳
      //   channel.pullDownLoading = false // 当前频道文章下拉刷新的页面状态
      // })
      channels.forEach(channel => {
        const extendDate = this.extendChannelDate()// 这个是新的对象
        Object.assign(channel, extendDate) // 将两个对象合并
      })
      //   console.log(data.data.channels)
      this.channels = channels
    },
    // 获取所有频道
    async getAllChannels () {
      const { data } = await getAllChannels()
      const channels = data.data.channels
      // channels.forEach(channel => {
      //   channel.articles = [] // 添加的这个成员是一个数组 该频道的文章列表
      //   channel.loading = false // 频道的上拉加载更多的loading
      //   channel.finished = false // 频道的加载结束的状态
      //   channel.timestamp = null // 用于获取下一页数据的时间戳
      //   channel.pullDownLoading = false // 当前频道文章下拉刷新的页面状态
      // })
      channels.forEach(channel => {
        const extendDate = this.extendChannelDate()// 这个是新的对象
        Object.assign(channel, extendDate) // 将两个对象合并
      })
      this.AllChannels = channels
    },
    // 添加新频道到我的频道
    async onAddChannels (channel) {
      this.channels.push(channel)

      if (this.user) {
        // 如果用户登录,数据保存在后端
        const channels = [] // 定义一个空数组保存新的我的频道数据
        // slice 这个方法是数组方法截取 下标为1以后的成员 包括1;
        // 不包括第一个成员(index=0) 因为这个频道是推荐 是默认存在的
        this.channels.slice(1).forEach((item, index) => {
          channels.push({
            id: item.id,
            seq: index + 2
          })
          // 这个channels 就是我们重新添加了新的 成员的channels 作为参数传到方法中去
        })
        await resetUserChannels(channels)
      } else {
        // 未登录的话,在本地存储
        setItem('channels', this.channels)
      }
    },
    // 切换频道列表
    async onUserChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑状态下 删除该频道
        // 在视图中 移除该数据
        this.channels.splice(index, 1)
        if (this.user) {
          // 已登录,发送请求删除后端数据
          await deleteUserChannels(channel.id)
        } else {
          // 未登录,删除本地存储数据 当前的channels数组的数据已经改变 重新存储
          // 本地数据只能存储或者全部删除 所以我们要做的是重新存贮一遍也就覆盖了
          setItem('channels', this.channels)
        }
      } else {
        // 非编辑状态下 隐藏弹层跳转到该频道
        this.active = index
        // 获取对应频道的文章列表
        this.isChannelEditShow = false
      }
    },
    extendChannelDate () {
      return {
        articles: [],
        loading: false,
        finished: false,
        timestamp: null,
        pullDownLoading: false
      }
    }
  }
  // 列表组件的方法
  // onLoad () {
  // //   console.log('调用了onLoad事件')
  //   // 异步更新数据
  //   setTimeout(() => {
  //     for (let i = 0; i < 10; i++) {
  //     //   this.list.push(this.list.length + 1)
  //     // 将数据添加到当前频道的文章列表那个数组中 我们自己forEach
  //     // 自定义添加的那个属性
  //       const articles = this.currentChannel.articles
  //       // 将数据添加到当前频道的文章列表那个数组中
  //       // 当文章频道 改变的时候 之前的频道的 数据不会被之前的数据覆盖掉了
  //       // 自定义了 一个对象 获取当前频道对象 articles 数组保存了
  //       //
  //       articles.push(articles.length + 1)
  //     }
  //     // 本次数据加载完毕以后 loading就设置为false
  //     // 加载状态结束
  //     this.currentChannel.articles.loading = false
  //     /* 本次 loading完毕以后 列表数据也渲染到视图了
  //     本次组件会判断当前视图中的数据是否充满一屏
  //     如果不够一屏,它会自动继续调用onload方法
  //     每次调用的时候会自动把loading设置为true */
  //     // 数据全部加载完成
  //     if (this.currentChannel.articles.length >= 40) {
  //     //   this.finished = true
  //       // 上面这样设置的话 当前的频道的信息加载结束以后 你会发现所有的
  //       // 文章列表都会加载结束了 这是不正确的
  //       // 我们是想只有本频道的文章列表加载结束
  //       // 是因为我们所有的列表都绑定了同一份数据finished
  //       this.currentChannel.articles.finished = true
  //     }
  //   }, 1000)
  // },
}
</script>

<style lang="less" scoped>
.home {
  .van-tabs {
    .wap-nav {
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
    }
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      right: 16px;
      z-index: 2;
    }
    /deep/ .van-tabs__content {
      margin-top: 90px;
    }
  }
  .article-info {
    .meta span {
      margin-right: 10px;
    }
  }
  .close-icon {
    position: absolute;
    top: -5px;
    right: -5px;
  }
  .search-btn{
    width: 100%;
    background-color: #5babfb;
  }
  .van-icon-search{
    font-size: 16px;
    color: #fff;
    margin-bottom: 2px
  }
}
</style>
