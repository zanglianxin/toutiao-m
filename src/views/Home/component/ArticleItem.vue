<template>
  <div @click="clickFn()">
    <!-- 渲染无图片的结构 -->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 0"
    />

    <!-- 渲染一张图片的结构 -->
    <van-cell
      :title="articleInfo.title"
      v-if="articleInfo.cover.type === 1"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <!-- 渲染三张图片的结构 -->
    <van-cell :title="articleInfo.title" v-if="articleInfo.cover.type === 3">
      <template #label>
        <div>
          <van-image
            width="3rem"
            height="2rem"
            v-for="(item,index) in articleInfo.cover.images" :key="index"
            :src="item"
          />
          <span>{{articleDesc}}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  },
  methods: {
    clickFn () {
      // console.log(this.id)
      this.$router.push({
        path: '/detail',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style></style>
