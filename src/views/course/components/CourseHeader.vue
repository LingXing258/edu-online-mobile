<template>
  <div class="course-header">
       <van-image :src="require('@/assets/logo.png')"></van-image>
  </div>
</template>
<script>
import { Image } from 'vant'
export default {
  name: 'CourseHeader',
  data () {
    return {
    }
  },
  components: {
    VanImage: Image
  }
}
</script>
<style lang='scss' scoped>
.course-header {
   height: 50px;
   padding-top: 20px;
   padding-left: 20px;
}
</style>
