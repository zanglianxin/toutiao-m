<template>
  <van-nav-bar :title="title" left-arrow @click-left="goPreBackBtn" class="title-header"/>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    goPreBackBtn () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 30px;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
    font-size: 28px;
  }
}
</style>
