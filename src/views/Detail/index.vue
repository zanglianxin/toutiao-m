<template>
  <div class="container">
    <Header title="黑马头条"></Header>
    <h1 class="article-title">{{ articleInfo.title }}</h1>
    <van-row class="article-user">
      <van-col span="12">
        <van-row class="user-row" type="flex">
          <van-col>
            <van-image
              width="35"
              height="35"
              round
              :src="articleInfo.aut_photo"
            />
          </van-col>
          <van-col>
            <van-row type="flex">
              <van-col>{{ articleInfo.aut_name }}</van-col>
              <van-col style="color: #b7b7b7">{{
                dayjs(articleInfo.pubdate).fromNow()
              }}</van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
      <van-col span="12" style="text-align: right">
        <van-button round type="info" class="btn" @click="followFn">{{
          isFollow ? '已关注' : '+ 关注'
        }}</van-button>
      </van-col>
    </van-row>
    <div class="content">
      <div v-html="articleInfo.content" class="text-area markdown-body"></div>
    </div>
    <van-divider :hairline="false">正文结束</van-divider>

    <!-- 底部标签栏 -->
    <van-tabbar>
      <van-tabbar-item class="btn-pl">
        <template #icon>
          <van-button
            plain
            round
            hairline
            type="info"
            class="xie-pl"
            @click="writeReview"
            >写评论</van-button
          >
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        class="icon-size"
        :badge="articleInfo.comm_count"
        icon="comment-o"
      ></van-tabbar-item>
      <van-tabbar-item
        class="icon-size"
        icon="star-o"
        v-if="!isCollected"
        @click="collectFn"
      ></van-tabbar-item>
      <van-tabbar-item
        class="icon-size"
        icon="star"
        style="color: rgb(50, 150, 250)"
        v-if="isCollected"
        @click="collectFn"
      ></van-tabbar-item>
      <van-tabbar-item
        class="icon-size"
        icon="good-job"
        @click="thumbsFn"
        v-if="isLike"
        style="color: skyblue"
      ></van-tabbar-item>
      <van-tabbar-item
        class="icon-size"
        icon="good-job-o"
        @click="thumbsFn"
        v-else
      ></van-tabbar-item>
      <van-tabbar-item class="icon-size" icon="share-o"></van-tabbar-item>
    </van-tabbar>
    <!-- 弹出层 -->
    <van-popup
      v-model="popupShow"
      position="bottom"
      :style="{ height: '15%' }"
      class="popup-box"
    >
      <!-- 弹出文本域 -->

      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        class="popup-txt"
      />
      <van-button class="popup-btn" @click="sendMsg">发布</van-button>
    </van-popup>
    <CommentsLIst :artID="articleID" ref="commentslist"></CommentsLIst>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import '@/assets/css/news.css'
import Header from '@/components/Header.vue'
import {
  getArticleInfo,
  thumbsUp,
  unThumbsUp,
  collected,
  unCollected,
  following,
  unFollowing,
  setArticleReply
} from '@/api'
import CommentsLIst from './components/CommentsLIst'
export default {
  data () {
    return {
      articleInfo: {},
      dayjs,
      popupShow: false,
      message: '',
      articleID: this.$route.query.id,
      isLike: false,
      isCollected: false,
      isFollow: false
    }
  },
  components: {
    Header,
    CommentsLIst
  },
  created () {
    this.getArticleInfo()
  },
  methods: {
    async getArticleInfo () {
      try {
        const id = this.$route.query.id
        const { data } = await getArticleInfo(id)
        // console.log(data)
        this.articleInfo = data.data
        this.likeCount = data.data.like_count
        this.isCollected = data.data.is_collected
        this.isFollow = data.data.is_followed
        this.isLike = data.data.attitude === 1
      } catch (error) {
        console.log(error)
      }
    },
    writeReview () {
      this.popupShow = true
    },

    // 对文章点赞
    async thumbsUp () {
      await thumbsUp(this.articleID)
    },
    // 对文章取消点赞
    async unThumbsUp () {
      await unThumbsUp(this.articleID)
    },
    thumbsFn () {
      if (!this.isLike) {
        this.thumbsUp()
        this.isLike = true
      } else {
        this.unThumbsUp()
        this.isLike = false
      }
    },
    // 收藏文章
    async collectFn () {
      try {
        if (!this.isCollected) {
          await collected(this.articleID)
          this.$toast('收藏文章成功')
          this.isCollected = true
        } else {
          await unCollected(this.articleID)
          this.$toast('取消收藏文章成功')
          this.isCollected = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 关注用户
    async followFn () {
      if (!this.isFollow) {
        await following(this.articleInfo.aut_id)
        this.isFollow = true
        this.$toast('关注用户成功')
      } else {
        await unFollowing(this.articleInfo.aut_id)
        this.isFollow = false
        this.$toast('取消关注用户成功')
      }
    },
    // 对文章进行评论
    async sendMsg () {
      try {
        const { data } = await setArticleReply(this.articleID, this.message)
        console.log(data)
        this.$refs.commentslist.getCommentsInit()
        this.popupShow = false
        this.message = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 92px 32px 100px;
}
.article-title {
  font-size: 38px;
  padding: 50px 0px;
  margin: 0;
}
.article-user {
  height: 84px;
  .user-row {
    align-items: center;
    .van-row {
      flex-direction: column;
      font-size: 14px;
      justify-content: center;
    }
    > .van-col:first-child {
      line-height: 42px;
      .van-image {
        margin-right: 20px;
      }
    }
    > .van-col:last-child {
      .van-col:first-child {
        margin-bottom: 10px;
      }
    }
  }

  > .van-col:last-child {
    line-height: 44px;
    .btn {
      width: 170px;
      height: 60px;
    }
  }
}

.text-area {
  margin: 55px 0;
}

.van-tabbar {
  box-sizing: border-box;
  padding: 0 32px;
  .btn-pl {
    flex: 3.2;
  }
  .xie-pl {
    width: 280px;
    height: 46px;
    color: #a7a7a7;
    border: 0.02667rem solid #eee;
  }
  /deep/.van-icon {
    font-size: 36px;
  }
}

.popup-box {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .popup-txt {
    background-color: #f5f7f9;
    box-sizing: border-box;
    width: 78%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
  }
  .popup-btn {
    border: none;
    color: #6ba3d8;
    line-height: 1.2;
    text-align: center;
    font-size: 0.37333rem;
  }
}
</style>
