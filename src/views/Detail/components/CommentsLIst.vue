<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in commentsList" :key="index">
        <template #icon>
          <van-image
            class="avatar"
            round
            width="36"
            height="36"
            fit="cover"
            :src="item.aut_photo"
          />
        </template>
        <template #title>
          <div class="title-wrap">
            <div class="user-name">{{ item.aut_name }}</div>
            <span class="comment_zan" @click="dianzan(item)"
              ><van-icon
                name="good-job-o"
                :class="{ goodcolor: item.is_liking }"
              />{{ item.like_count ? item.like_count : '赞' }}</span
            >
          </div>
        </template>
        <template #label>
          <div>
            <p class="comment-content">{{ item.content }}</p>
            <div class="bottom-info">
              <span class="comment-pubdate">{{
                dayjs(item.pubdate).fromNow()
              }}</span>
              <van-button
                round
                size="mini"
                @click="replyFn(item, item.com_id)"
                class="reply-btn"
                >回复 {{ item.reply_count ? item.reply_count : '' }}</van-button
              >
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
    <Reply ref="reply" :currentObj="currentobj" :artID="artID"></Reply>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getComments, comLikings, comUnLikings } from '@/api'
import Reply from './Reply.vue'
export default {
  props: {
    artID: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      commentsList: [],
      dayjs,
      loading: false,
      finished: false,
      error: false,
      last_id: '',
      currentobj: {}
    }
  },
  components: {
    Reply
  },
  methods: {
    async onLoad () {
      try {
        const {
          data: { data }
        } = await getComments('a', this.artID, this.last_id)
        console.log(data)
        this.last_id = data.last_id
        if (this.last_id === data.end_id) {
          // this.loading = false
          return (this.finished = true)
        }
        this.commentsList.push(...data.results)
        this.loading = false
      } catch (error) {
        console.log(error)
        this.error = true
      }
    },
    async getCommentsInit () {
      try {
        const {
          data: { data }
        } = await getComments('a', this.artID)
        //   console.log(data)
        this.commentsList = data.results
        this.last_id = data.last_id
      } catch (error) {
        console.log(error)
      }
    },
    // 对评论进行回复
    replyFn (obj, comID) {
      // console.log(comID)
      this.$refs.reply.isShow = true
      this.currentobj = obj
      this.$refs.reply.comId = comID
    },
    // 对评论点赞
    async dianzan (obj) {
      if (!obj.is_liking) {
        await comLikings(obj.com_id)
        obj.is_liking = true
        obj.like_count++
      } else {
        await comUnLikings(obj.com_id)
        obj.is_liking = false
        obj.like_count--
      }
    }
  },
  created () {
    this.getCommentsInit()
  }
}
</script>

<style scoped lang="less">
.title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-name {
    color: #406599;
    font-size: 0.34667rem;
  }
}

/deep/.van-cell {
  padding: 20px 16px;
}
.avatar {
  width: 0.96rem;
  height: 0.96rem;
  margin-right: 0.33333rem;
}

/deep/.van-cell__label {
  margin-top: 0.10667rem;
  color: #969799;
  font-size: 0.32rem;
  line-height: 0.48rem;
  .comment-content {
    font-size: 0.42667rem;
    color: #222;
    word-break: break-all;
    text-align: justify;
  }
  .bottom-info {
    display: flex;
    align-items: center;
    .comment-pubdate {
      font-size: 0.25333rem;
      color: #222;
      margin-right: 0.33333rem;
    }
    .reply-btn {
      width: 1.8rem;
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.28rem;
      color: #222;
    }
  }
}

.goodcolor {
  color: green;
}
</style>
