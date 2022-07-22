<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        offset="20"
        @load="loadNextPage"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
          :id="item.art_id"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
        console.log(this.articles)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async loadNextPage () {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error('出错了')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        // console.log(data)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
