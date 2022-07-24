<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickCancel"
      @click-right="onClickSave"
    />
    <van-field
      v-model="msg"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      show-word-limit
    />
  </div>
</template>

<script>
import { setUserInfo } from '@/api'
export default {
  data () {
    return {
      msg: ''
    }
  },
  props: ['message'],
  methods: {
    onClickCancel () {
      this.$emit('UpdateNameCancel')
    },
    async onClickSave () {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await setUserInfo({ name: this.msg })
        this.$emit('UpNameFn', this.msg)
        this.onClickCancel()
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新失败')
      }
    }
  },
  mounted () {
    this.msg = this.message
  }
}
</script>

<style></style>
