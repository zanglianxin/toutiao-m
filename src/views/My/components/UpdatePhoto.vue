<template>
  <div>
    <img :src="photo" alt="" ref="img" class="img" />
  </div>
</template>

<script>
// cropper

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: ['photo'],
  mounted () {
    const img = this.$refs.img
    // console.log(this)
    this.myCropper = new Cropper(img, {
      viewMode: 3,
      autoCropArea: 1,
      movable: true,
      background: false
    })
  }
}
</script>

<style scoped lang="less">
.img {
  width: 750px;
}
</style>
