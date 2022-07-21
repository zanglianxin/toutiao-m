<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="goBackPrege"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>

    <component :is="componentName" :keywords="keywords" ref="componentF"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch () {
      console.log('正在搜索')
      this.isShowSearchResult = true
      this.$store.commit('setKeyword', this.keywords)
    },
    goBackPrege () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResult = false
    }
  },
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }

      return 'SearchSuggestion'
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
