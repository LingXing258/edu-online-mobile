<template>
  <div>
<van-nav-bar
  title="视频"
  left-text="返回"
  left-arrow
  @click-left="$router.go(-1)"
/>
  </div>
</template>
<script>
import { NavBar } from 'vant'
import { getVideoInfo } from '@/services/course'
export default {
  data () {
    return {
      videoInfo: {}
    }
  },
  components: { VanNavBar: NavBar },
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadAudioPlay()
  },
  methods: {
    async loadAudioPlay () {
      const { data } = await getVideoInfo({ lessonId: this.lessonId })
      console.log(data)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
