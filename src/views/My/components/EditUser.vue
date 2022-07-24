<template>
  <div class="main">
    <Header title="个人信息"></Header>
    <!-- 头像图片上传 -->
    <form>
      <input type="file" ref="files" hidden accept=".jpg,.png,.gif,.jpeg" />
      <van-cell title="头像" is-link @click="updateAvatar">
        <van-image round width="30" height="30" :src="imgUrl" />
      </van-cell>
      <van-popup
        v-model="show"
        v-if="show"
        class="popup"
        :style="{ height: '100%', width: '100%', backgroundColor: 'black' }"
      >
        <UpdatePhoto :photo="photo" ref="upimg"></UpdatePhoto>
        <span @click="show = false" class="cancel">取消</span>
        <span class="confirm" @click="confirm">确定</span>
      </van-popup>
    </form>
    <!-- 更改昵称 -->
    <van-cell title="昵称" @click="updateName" :value="userInfo.name" is-link />
    <van-popup
      v-model="nameIsShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        @UpNameFn="UpNameFn"
        @UpdateNameCancel="UpdateNameCancel"
        :message="userInfo.name"
      ></UpdateName>
    </van-popup>
    <!-- 更改性别 -->
    <van-cell
      title="性别"
      @click="sexIsShow = true"
      :value="userInfo.gender ? '女' : '男'"
      is-link
    />
    <van-popup v-model="sexIsShow" position="bottom" :style="{ height: '50%' }">
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 更新生日 -->
    <van-cell
      title="生日"
      @click="updateBirthday"
      :value="userInfo.birthday"
      is-link
    />
    <van-popup
      v-model="birthdayIsShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="setBir"
        @cancel="birthdayIsShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdatePhoto from './UpdatePhoto.vue'
import Header from '@/components/Header.vue'
import UpdateName from './UpdateName.vue'
import dayjs from '@/utils/dayjs'
import { uploadPhoto, getProfile, setUserInfo } from '@/api'
export default {
  data () {
    return {
      photo: '',
      show: false,
      userInfo: {},
      imgUrl: '',
      nameIsShow: false,
      sexIsShow: false,
      birthdayIsShow: false,
      columns: ['男', '女'],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 6, 24),
      currentDate: new Date()
    }
  },
  components: {
    Header,
    UpdatePhoto,
    UpdateName
  },
  methods: {
    updateAvatar () {
      this.$refs.files.click()
    },
    confirm () {
      try {
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true,
          duration: 0
        })
        const fm = new FormData()
        this.$refs.upimg.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          fm.append('photo', blob)
          const { data } = await uploadPhoto(fm)
          this.imgUrl = data.data.photo
          this.$toast.success('头像上传成功')
        })
        // this.imgUrl = this.photo
        this.show = false
      } catch (error) {
        console.log(error)
      }
    },
    async getProfile () {
      const { data } = await getProfile()
      console.log(data)
      this.userInfo = data.data
      this.imgUrl = data.data.photo
    },
    // 设置昵称
    updateName () {
      this.nameIsShow = true
    },
    UpdateNameCancel () {
      this.nameIsShow = false
    },
    UpNameFn (name) {
      this.userInfo.name = name
    },

    // 设置性别
    onCancel () {
      this.sexIsShow = false
    },
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // this.$toast(`当前值：${value}, 当前索引：${index}`)
        await setUserInfo({ gender: index })
        this.userInfo.gender = index
        this.$toast.success('更新成功')
        this.sexIsShow = false
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新失败')
      }
    },
    // 设置生日
    updateBirthday () {
      this.birthdayIsShow = true
      const date = this.userInfo.birthday.split('-').join()
      //   console.log(date)
      this.currentDate = new Date(date)
    },
    async setBir () {
      try {
        this.$toast.loading({
          message: '更新中...',
          forbidClick: true,
          duration: 0
        })
        this.currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        console.log(this.currentDate)
        await setUserInfo({ birthday: this.currentDate })
        this.userInfo.birthday = this.currentDate
        this.birthdayIsShow = false
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
        console.log(error)
      }
    }
  },
  mounted () {
    this.$refs.files.addEventListener('change', (e) => {
      //   console.log(e)
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.show = true
      }
    })
  },
  created () {
    this.getProfile()
  }
}
</script>

<style scoped lang="less">
.main {
  padding-top: 92px;
}
.popup {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.confirm {
  position: fixed;
  bottom: 10px;
  right: 10px;
  color: #fff;
}
.cancel {
  position: fixed;
  bottom: 10px;
  left: 10px;
  color: #fff;
}
</style>
