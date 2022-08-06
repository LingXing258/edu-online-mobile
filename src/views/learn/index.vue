<template>
  <div class="learn">
    <van-nav-bar title="已购课程"/>
    <course-content-list :fetch-data="fetchData"></course-content-list>
    <layout-footer></layout-footer>
  </div>
</template>
<script>
import { NavBar } from 'vant'
import CourseContentList from '@/components/CourseContentList'
import LayoutFooter from '@/components/LayoutFooter'
import { getPurchaseCourse } from '@/services/course'
export default {
  name: 'Learn',
  data () {
    return {
    }
  },
  created () {
    this.loadCourse()
  },
  components: {
    LayoutFooter, CourseContentList, VanNavBar: NavBar
  },
  methods: {
    loadCourse () {
      getPurchaseCourse()
    },
    fetchData (options) {
      return getPurchaseCourse(options)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
