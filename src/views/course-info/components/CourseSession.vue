<template>
  <div class="couse-session">
    <h2 class="sectionData">{{ sectionData.sectionName }}</h2>
    <p class="lesson" v-for="item in sectionData.courseLessons" :key="item.id" @click="playradio(item)">
    <span v-text="item.theme"></span>
    <van-icon v-if="item.canPlay" name="play-circle" size="20"></van-icon>
    <van-icon v-else name="lock" size="20"></van-icon>
    </p>
  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  data () {
    return {
    }
  },
  components: {
    VanIcon: Icon
  },
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    playradio (lessonInfo) {
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.couse-session{
  padding:0 20px
}
.lesson {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
}
</style>
