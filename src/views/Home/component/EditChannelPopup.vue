<template>
  <!-- 弹出层 -->
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '95%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <!-- 我的频道标题 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ active: item.name === '推荐' }"
            @click="onClickMyChannel(item, index)"
          >
            <template #icon>
              <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道" />
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addMyChannel(item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannel } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  methods: {
    async getAllChannel () {
      const { data } = await getAllChannel()
      console.log(data)
      this.allChannels = data.data.channels
    },
    onClickMyChannel (channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        return this.$emit('del-mychannel', channel.id)
      }

      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    addMyChannel (mychannel) {
      this.$emit('add-mychannel', { ...mychannel })
    }
  },
  created () {
    this.getAllChannel()
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 1px solid red;
  }
}

.my-channel {
  :deep(.van-grid-item__content) {
    position: relative;
    background-color: #eee;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        font-size: 30px;
      }
    }
  }
}

// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    background-color: #eee;
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
