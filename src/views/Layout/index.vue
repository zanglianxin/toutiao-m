<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <span>首页</span>
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <span>视频</span>
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <span>问答</span>
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <span>我的</span>
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item) {
  font-size: 0.32rem;
  .toutiao {
    font-size: 0.5333rem
  }
}
</style>
