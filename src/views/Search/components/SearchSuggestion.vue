<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="goResults(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon"></van-icon>
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  props: {
    keywords: {
      type: String
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
        console.log(this.suggestions)
      } catch (error) {
        console.log(error)
      }
    },
    async goResults (index) {
      // console.log(this.suggestions[index])
      const q = this.suggestions[index]
      this.$parent.keywords = q
      this.$store.commit('setKeyword', q)
      this.$parent.isShowSearchResult = true
    }
  },
  computed: {
    highlightData () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
