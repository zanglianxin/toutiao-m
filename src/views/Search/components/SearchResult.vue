<template>
  <div>
    <van-list
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        :title="item.title"
        v-for="(item, index) in list"
        :key="index"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },
  created () {
    this.getRes()
  },
  methods: {
    async getRes () {
      const q = this.$store.state.keyword
      try {
        const { data } = await getSearchResults(q)
        this.list = data.data.results
      } catch (error) {
        this.$toast('获取信息失败，请重试')
      }
    },
    async onLoad () {
      try {
        this.page++
        const { data } = await getSearchResults(
          this.$store.state.keyword,
          this.page
        )
        this.list.push(...data.data.results)
        // console.log(this.list)
        this.loading = false
        if (data.data.results.length === 0) {
          this.finished = true
        }
        // console.log(data)
      } catch (error) {
        this.error = true
      }
    }
  }
}
</script>

<style></style>
