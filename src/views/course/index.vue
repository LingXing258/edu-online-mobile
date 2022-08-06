<template>
  <div class="course">
    <course-header></course-header>
    <course-content></course-content>
   <layout-footer></layout-footer>
  </div>
</template>
<script>
import LayoutFooter from '@/components/LayoutFooter'
import CourseHeader from './components/CourseHeader.vue'
import CourseContent from './components/CourseContent.vue'
export default {
  name: 'Course',
  components: { LayoutFooter, CourseHeader, CourseContent },
  data () {
    return {
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
