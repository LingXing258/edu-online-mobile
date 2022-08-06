!<template>
  <div class="course-info">
    <van-cell-group>
       <van-cell class="coruse-img">
        <img :src="course.couserImgUrl" alt="">
       </van-cell>
       <van-cell class="coruse-description">
        <h2 v-text="course.courseName"></h2>
        <p v-text="course.previewFirstField"></p>
        <div class="course-sale-info">
          <p class="course-price">
            <span class="discounts">￥{{course.discount}}</span>
            <span >￥{{course.price}}</span>
          </p>
            <span class="tag">{{course.salse}}人购买</span>
            <span class="tag">每周三、五更新</span>
        </div>
       </van-cell>
       <van-cell class="course-details">
        <van-tabs scrollspy sticky>
       <van-tab title="详情">
        <div v-html="course.courseDescription"></div>
       </van-tab>
       <van-tab title="内容">
         <course-session v-for="item in session" :key="item.id" :section-data="item"></course-session>
       </van-tab>
       </van-tabs>
       </van-cell>
    </van-cell-group>
    <van-tabbar v-if="!course.isBuy">
      <div class="price">
        <span v-text="course.discountsTag"></span>
        <span class="discounts">￥{{course.discount}}</span>
        <span>￥{{course.price}}</span>
      </div>
      <van-button type="primary" v-on:click="handlePay()">立即购买</van-button>
    </van-tabbar>
  </div>
</template>
<script>
import { CellGroup, Cell, Tabs, Tab, Tabbar, Button } from 'vant'
import CourseSession from '@/views/course-info/components/CourseSession'
import { getCourseById, getSessionAndLesson } from '@/services/course'
export default {
  name: 'CourseInfo',
  data () {
    return {
      course: {},
      session: {}
    }
  },
  components: {
    CourseSession,
    VanCell: Cell,
    VanTabs: Tabs,
    VanTab: Tab,
    VanTabbar: Tabbar,
    VanButton: Button,
    VanCellGroup: CellGroup
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadCourse()
    this.loadSessons()
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
      if (data.content.isBuy) {
        // this.sty
      }
    },
    async loadSessons () {
      const { data } = await getSessionAndLesson()
      this.session = data.content.courseSetionList
      // console.log(this.session)
    },
    handlePay () {
      if (this.$store.state.user) {
        this.$router.push({ name: 'pay', params: { courseId: this.courseId } })
      } else {
        this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.van-cell {
  padding:0px
}
.coruse-img{
  height:210px

}
.coruse-description {
  padding: 0px 20px;
  height: 150px
}
.course-sale-info {
  display: flex;
}
.course-sale-info .course-price {
   flex: 1;
   margin: 0;
   }
   .discounts {
    color: #ff7452;
    font-size: 24px;
    font-weight: 700;
  }
  .course-sale-info .tag {
    background: #f8f9fa;
    font-size: 12px;
    font-weight: 700;
    color:#666;
    margin-left: 10px;
    padding:7px;
    line-height: 15px;
    border-radius: 3px;
  }
  .van-cell-group {
    width: 100%;
    position: fixed;
    top:0;
    bottom: 50px;
    overflow-y: auto;
  }
  .van-tabbar {
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
