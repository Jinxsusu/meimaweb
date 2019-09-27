<template>
  <div class="article-container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <!-- 文章加载中 组件 -->
    <van-loading class="article-loading" v-if="loading" />
    <!-- 文章加载中 组件/ -->
    <!-- 文章详情内容 -->
    <!-- v-else-if="article.title" 如果文章题目如果有显示的话 v-if 就是 true 否则是v-else  -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate}}</p>
        </div>
        <!-- 关注按钮 -->
        <van-button
          round
          size="small"
          :type="article.is_followed ? 'default':'info'"
          @click="onFollow"
        >{{article.is_followed ? '已关注':'+ 关注'}}</van-button>
        <!-- 关注按钮 /-->
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <!-- 点赞按钮 -->
        <van-button
          @click="onLike"
          round
          size="small"
          hairline
          :type="article.attitude===1 ?'default':'primary'"
          plain
          icon="good-job-o"
        >{{article.attitude===1 ?'取消点赞':'点赞'}}</van-button>
        <!-- 点赞按钮 /-->
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 不喜欢按钮 -->
        <van-button
          @click="onDislike"
          round
          size="small"
          hairline
          :type="article.attitude===0 ?'default':'danger'"
          plain
          icon="delete"
        >{{article.attitude===0 ?'取消踩':'踩'}}</van-button>
        <!-- 不喜欢按钮 /-->
      </div>
    </div>
    <!-- 文章详情内容/ -->
    <!-- 文章获取失败 提示 -->
    <!-- v-else 对应上面的v-else-if 失败显示 提示 -->
    <div class="error" v-else>
      <p>
        网络超时，点击
        <a href="#" @click.prevent="loadArticle">刷新</a> 试一试。
      </p>
    </div>
    <!-- 文章获取失败 提示/ -->
    <!-- 文章评论 -->
    <article-comment :article-id="$route.params.articleId" />
    <!-- 文章评论/ -->
  </div>
</template>

<script>
import {
  getArticle,
  likeArticle,
  unlikeArticle,
  undislikeArticle,
  dislikeArticle
} from '@/api/article'
import { followUser, unfollowUser } from '@/api/user'
import ArticleComment from './component/comments'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleComment
  },
  data () {
    return {
      loading: true,
      article: {
        // title: 'hello world',
        // content: '<p>hello hello</p>',
        // aut_name: 'LPZ',
        // pubdate: '4天前',
        // aut_photo: 'http://toutiao.meiduo.site/FsyeQUotMscq-vji-2ZDiXrc44k5'
      }
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    // 踩文章 取消踩(不喜欢)
    onDislike () {
      const { attitude } = this.article
      const articleId = this.article.art_id.toString()
      if (attitude === 0) {
        // 如果用户已经踩(不喜欢) 就取消踩(不喜欢)
        undislikeArticle(articleId)
        this.article.attitude = -1
      } else {
        // 否则的话就踩(不喜欢)
        dislikeArticle(articleId)
        this.article.attitude = 0
      }
    },
    // 点赞文章 取消点赞
    onLike () {
      const { attitude } = this.article
      const articleId = this.article.art_id.toString()
      if (attitude === 1) {
        // 如果用户已经点赞 就取消点赞
        unlikeArticle(articleId)
        this.article.attitude = -1
      } else {
        // 否则的话就点赞
        likeArticle(articleId)
        this.article.attitude = 1
      }
    },
    // 关注用户 取消关注
    onFollow () {
      const { is_followed: isFollowed, aut_id: autId } = this.article
      // 如果已经关注的话 就是取消关注 否则进行关注
      if (isFollowed) {
        // 如果已经关注的话 就是取消关注
        unfollowUser(autId)
      } else {
        // 没有关注 进行关注
        followUser(autId)
      }
      // 修改数据的状态
      this.article.is_followed = !isFollowed
    },
    // 获取文章详情 和 loading 状态
    async loadArticle () {
      this.loading = true
      // 请求失败的话会报错 阻止代码进行 要用try{} 和catch{} 处理一下错误
      try {
        const { data } = await getArticle(this.$route.params.articleId)
        this.article = data.data
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang='less'>
.article-container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error {
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan {
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
