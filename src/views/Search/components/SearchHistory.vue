<template>
  <div>
    <van-cell title="搜索历史">
      <template #right-icon>
        <van-icon
          name="delete-o"
          class="delete-icon"
          v-if="!isDel"
          @click="isDel = !isDel"
        />
        <div style="color: #969799" v-else>
          <span @click="allDel">全部删除&nbsp;</span>
          <span @click="isDel = !isDel">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in historyKey"
      :key="index"
    >
    <template #title>
      <span @click="goHisKey(item)">{{item}}</span>
    </template>
      <template #right-icon>
        <van-icon
          name="close"
          class="delete-icon"
          v-if="isDel"
          @click.prevent="delFn(index)"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isDel: false,
      historyKey: this.$store.state.keywordsHistory || []
    }
  },
  methods: {
    allDel () {
      this.historyKey = []
      this.$store.commit('clearKeywords')
      localStorage.removeItem('KEY_HISTORY')
    },
    delFn (index) {
      console.log(index)
      this.historyKey.splice(index, 1)
      localStorage.setItem('KEY_HISTORY', JSON.stringify(this.historyKey))
    },
    async goHisKey (keyword) {
      this.$parent.keywords = keyword
      this.$store.commit('setKeyword', keyword)
      this.$parent.onSearch()
    }
  }
}
</script>

<style scoped lang="less">
/deep/.delete-icon {
  font-size: 30px;
  margin-top: 10px;
}
</style>
