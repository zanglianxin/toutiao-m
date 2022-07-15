<template>
  <div>
    <van-nav-bar title="登录" @click-left="backToPrePage" class="navbar">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <van-form @submit="login" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            :time="3 * 1000"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            round
            size="mini"
            class="code-btn"
            @click.prevent="sendCode"
            v-else
            >发送验证码</van-button
          >
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
// 引入api
import { login, sendCode } from '@/api/user'
// 引入正则
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isCountDown: false
    }
  },
  methods: {
    // 返回上一级页面
    backToPrePage () {
      this.$router.back()
    },
    // 登录请求
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      } catch (error) {
        // console.log(error)

        const status = error.response.status
        let message = '登录失败，请重试'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录失败，请重试')
        //     break
        //   default:
        //     this.$toast.fail('登录失败，请重试')
        //     break
        // }
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isCountDown = true
      } catch (error) {
        // console.log(error)
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else if (
          error.response.status === 429 ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        }
      }
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
