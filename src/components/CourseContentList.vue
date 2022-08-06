<template>
  <div class="course-content-list">
    <van-pull-refresh  v-model="refreshing" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" @click="$router.push({name: 'course-info', params: {courseId:item.id}})">
   <div>
   <img :src="item.courseImgurl || item.Imgurl" alt="">
  </div>
    <div class="course-info">
    <h3>{{item.courseName || item.name}}</h3>
    <p class="course-preview" v-html="item.previewFirstField"></p>
     <p class="course-container" v-if="item.price">
     <span class="course-discounter">￥{{item.discounter}}</span>
     <s class="course-price">￥{{item.price}}</s>
     </p>
  </div>
</van-cell>
</van-list>
</van-pull-refresh>
  </div>
</template>
<script>
import { PullRefresh, List, Cell } from 'vant'
export default {
  name: 'CourseContentList',
  props: {
    fetchData: {
      type: Function,
      required: true
    }
  },
  components: { VanPullRefresh: PullRefresh, VanList: List, VanCell: Cell },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1,
      refreshing: false
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.onLoad()
    },
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      //   console.log(data)
      // console.log(data.data.records.length)
      // console.log(data.data.records)
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      this.currentPage++
      this.loading = false
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length <= 6) {
        this.finished = true
      }
    },
    async onRefresh () {
      this.currentPage = 1
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      this.$toast('刷新成功')
      this.refreshing = false
    }
  }
}
</script>
<style lang='scss' scoped>
// @import '../../node_modules/vant/lib/index.less';
.course-header {
   height: 50px;
  //  background-color: @black;
   padding-top: 20px;
   padding-left: 20px;
}
.course-content-list {
 position: fixed;
 overflow-y: auto;
 left: 0;
 right: 0;
}
.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
  img {
   width: 75px;
   height: 100%;
   border-radius: 10px;
  }
  .course-info {
    flex:1;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }
   .course-info,.course-preview {
    flex-grow: 1
  }
  .course-info .course-discounter {
    color: #ff7452;
    margin-right: 10px;
  }
  p,h3 {
    margin: 0;
  }
}
.course-content-list {
  top : 50px;
  bottom: 50px;
}

</style>
