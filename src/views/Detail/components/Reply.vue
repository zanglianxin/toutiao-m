<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <van-nav-bar
        :title="
          currentObj.reply_count
            ? currentObj.reply_count + '条回复'
            : '暂无回复'
        "
      />
      <ComItem :Obj="currentObj"></ComItem>
      <van-cell title="全部回复" />
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ComItem
          v-for="(item, index) in replyList"
          :key="index"
          :Obj="item"
        ></ComItem>
      </van-list>
      <!-- 底部输入框 -->

      <div class="footer-btn">
        <van-button round class="sendbtn" @click="sendbtn">评论</van-button>
      </div>

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
    </van-popup>
  </div>
</template>

<script>
import ComItem from './ComItem.vue'
import { getComments, setArticleReply } from '@/api'
export default {
  props: {
    currentObj: {
      type: Object,
      required: true
    },
    artID: {
      type: String
    }
  },
  data () {
    return {
      isShow: false,
      comId: '',
      replyList: [],
      loading: false,
      finished: false,
      error: false,
      last_id: '',
      popupShow: false,
      message: ''
    }
  },
  components: {
    ComItem
  },
  watch: {
    comId: {
      //   immediate: true,
      handler () {
        console.log(this.comId)
        this.getComments()
      }
    }
  },
  methods: {
    async getComments () {
      const { data } = await getComments('c', this.comId)
      console.log(data)
      this.replyList = data.data.results
      this.last_id = data.data.last_id
    },
    async onLoad () {
      try {
        console.log(this.last_id)
        const {
          data: { data }
        } = await getComments('c', this.comId, this.last_id)
        //   console.log(data)
        this.last_id = data.last_id
        if (this.last_id === data.end_id) {
          return (this.finished = true)
        }
        this.replyList.unshift(...data.results)
        this.loading = false
      } catch (error) {
        this.error = true
        console.log(error)
      }
    },
    sendbtn () {
      this.popupShow = true
    },
    async sendMsg () {
      try {
        const { data } = await setArticleReply(
          this.comId,
          this.message,
          this.artID
        )

        this.replyList.unshift(data.data.new_obj)
        console.log(data)
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
.footer-btn {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 0.01333rem solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4;
  line-height: 100px;
  .sendbtn {
    width: 640px;
    height: 80px;
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
