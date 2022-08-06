<template>
  <div class="course-content">
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="item in activeAdList" :key="item.id">
  <img :src="item.img" alt="">
  </van-swipe-item>
</van-swipe>
<course-content-list :fetch-data="fetchData" ></course-content-list>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant'
import CourseContentList from '@/components/CourseContentList'
import { getAllAds, getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContent',
  data () {
    return {
      adList: []
    }
  },
  created () {
    this.loadAds()
  },
  components: { CourseContentList, VanSwipe: Swipe, VanSwipeItem: SwipeItem },
  methods: {
    fetchData (options) {
      return getQueryCourses(options)
    },
    async loadAds () {
      const { data } = await getAllAds({
        spacekeys: '999'
      })
      this.adList = data.content[0].adDOList
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.statu === 1)
    }
  }
}
</script>
<style lang='scss' scoped>
 .my-swipe {
  width: 100%;
  img {
     width: 100%;
  }
 }
 .course-content-list {
  top: 250px;
 bottom: 60px;
 }
</style>
