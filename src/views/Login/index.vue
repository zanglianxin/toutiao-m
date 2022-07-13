<template>
  <div>
    <van-nav-bar title="登录" @click-left="backToPrePage" class="navbar">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号', trigger: 'onChange' }
        ]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini" class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" color="#6db4fb"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}

.form {
  .toutiao-shouji {
    font-size: 0.49333rem;
  }
  .toutiao-yanzhengma {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #ededed;
    color: #666;
    padding: 0 20px;
  }
}
</style>
