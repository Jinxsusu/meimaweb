<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="comment in list"
        :key="comment.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ comment.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{comment.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{comment.pubdate|relativeTime}}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model="commentText"
      >
        <van-button
         slot="button"
         size="mini"
         type="info"
         @click="onPublishComment"
         >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getArticleComment, addArticleComment } from '@/api/comment'
export default {
  name: 'ArticleComment',
  // 接收父组件传过来的文章id
  props: ['articleId'],
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据的页码,第一页默认为null
      limit: 10, // 每次请求获取评论的条数 也就是每页的大小
      commentText: ''
    }
  },

  methods: {
    // 添加文章评论
    async onPublishComment () {
    // 非空校验
      const commentText = this.commentText.trim()
      if (!commentText.length) {

      }
      // 请求添加文章评论
      const { data } = await addArticleComment({
        target: this.articleId,
        content: this.commentText
      })
      //   console.log(data)
      this.list.unshift(data.data.new_obj)
      // 清空 评论
      this.commentText = ''
    },
    async onLoad () {
      // 1.获取评论数据
      const { data } = await getArticleComment({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: this.limit
      })
      //   console.log(data)
      //   2.将获取的评论添加到列表数据的数组中
      this.list.push(...data.data.results)
      // 3.将loading设置为false
      this.loading = false
      // 4. 判断数据是否已加载完成
      if (data.data.last_id) {
        //   4.1 如果还有数据 就更新下一页
        this.offset = data.data.last_id
      } else {
        // 4.2如果加载完成,就将finished设置为true
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
