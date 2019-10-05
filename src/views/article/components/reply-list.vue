<template>
  <div class="article-comments">
    <!-- 关闭按钮 -->
    <van-nav-bar :title="totalReplyCount + '条回复'">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /关闭按钮 -->

    <!-- 当前评论 -->
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636;">{{ comment.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime }}</span>
        </p>
      </div>
      <van-icon slot="right-icon" name="like-o" />
    </van-cell>
    <!-- /当前评论 -->

    <!-- 评论的回复列表 -->
    <van-cell title="全部评论" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="comment in list" :key="comment.com_id.toString()">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论的回复列表 -->

    <!-- 发布评论回复 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容" v-model="commentText">
        <van-button slot="button" size="mini" type="info" @click="onPublishComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论回复 -->
  </div>
</template>

<script>
import { getComments, addComment } from '@/api/comment'

export default {
  name: 'ReplyList',
  props: ['articleId', 'comment'],
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 10,
      commentText: '', // 用户输入的评论内容
      totalReplyCount: 0 // 总回复数量
    }
  },

  created () {
    console.log('reply-list created')
  },

  methods: {
    async onLoad () {
      // 1. 请求获取评论数据
      const { data } = await getComments({
        type: 'c', // 获取评论回复传 c
        source: this.comment.com_id.toString(), // 评论id
        offset: this.offset,
        limit: this.limit
      })

      // 2. 将数据添加到数组中
      this.list.push(...data.data.results)

      // 更新总回复数量
      this.totalReplyCount = data.data.total_count

      // 3. 将 loading 设置为 false
      this.loading = false

      // 4. 判断数据是否已加载结束
      if (data.data.last_id) {
        // 4.1 如果后面还有数据，则更新获取下一页数据的页码
        this.offset = data.data.last_id
      } else {
        // 4.2 如果后面没数据了，则将 finished 设置为 true
        this.finished = true
      }
    },

    async onPublishComment () {
      const commentText = this.commentText.trim()
      if (!commentText.length) {
        return
      }

      // 请求添加评论
      const { data } = await addComment({
        target: this.comment.com_id.toString(), // 评论id
        content: this.commentText, // 评论内容
        artId: this.articleId // 文章id
      })

      // 将最新的评论数据添加到列表顶部
      this.list.unshift(data.data.new_obj)

      // 清空用户输入的文本框
      this.commentText = ''

      // 更新总回复数量
      this.totalReplyCount++
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
