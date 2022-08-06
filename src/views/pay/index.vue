<template>
  <div class="pay">
    <van-cell-group>
     <van-cell class="course-info">
      <img src="@/assets/11.jpg">
      <div class="price-info">
        <p class="course-name">{{course.courseName}}</p>
        <p class="discount">￥{{course.price}}</p>
      </div>
     </van-cell>
     <van-cell class="count-info">
        <p>购买信息</p>
        <p>购买课程后使用此账号登录【拉钩教育】学习课程</p>
         <p class="username" >当前账号：{{  username }}</p>
         <!-- <p class="username" v-else>当前账号：{{this.$store.state.user.organization}}</p> -->
     </van-cell>
     <van-cell class="pay-chnnel">
       <p>支付方式</p>
       <div class="title">
       <van-radio-group v-model="checked">
  <van-cell-group inset>
    <van-cell title="单选框 1" clickable @click="checked = '1'">
      <template #title>
        <img src="../../assets/zhifupay.png" alt="">
        <span>微信支付</span>
      </template>
      <template #right-icon>
        <van-radio name="1" />
      </template>
    </van-cell>
    <van-cell title="单选框 2" clickable @click="checked = '2'">
       <template #title>
        <img src="../../assets/weixin.png" alt="">
        <span>支付宝</span>
      </template>
      <template #right-icon>
        <van-radio name="2" />
      </template>
    </van-cell>
   </van-cell-group>
  </van-radio-group>
  </div>
  <van-button @click='handlePay'>￥{{course.discount}}</van-button>
     </van-cell>
  </van-cell-group>
  </div>
</template>
<script>
// import Vue from 'vue'
import { CellGroup, Cell, Button, Radio, RadioGroup, Toast } from 'vant'
import { getCourseById } from '@/services/course'
import { createOrder, getPayInfo, getPayResult } from '@/services/pay'
// Vue.use(Toast)
export default {
  name: 'Pay',
  data () {
    return {
      course: {},
      checked: null
    }
  },
  components: {
    VanCell: Cell,
    VanButton: Button,
    VanCellGroup: CellGroup,
    VanRadio: Radio,
    VanRadioGroup: RadioGroup
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true,
      orderNo: null
    }
  },
  created () {
    this.loadCouerse()
    this.loadCreateOrder()
  },
  methods: {
    async loadCouerse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      this.course = data.content
    },
    async loadCreateOrder () {
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      this.orderNo = data.content.orderNo
    },
    async handlePay () {
      if (!this.checked) {
        Toast.fail('请选择支付方式')
        return
      }
      const { data } = await getPayInfo({
        goodsOrderNo: this.orderNo,
        channel: this.checked === '1' ? 'weChat' : 'aliPay'
      })
      // const { data: redata } = await getPayResult({
      //   orderNo: data.content.orderNo
      // })
      // console.log(redata.PayResult)

      // redata.PayResult.content.status
      // console.log(redata.PayResult.content.status)
      // if (redata.PayResult.content && redata.PayResult.content.status === 2) {
      //   // clearInterval(timer)
      //   this.$toast.success('购买成功')
      //   this.$router.push({
      //     name: 'learn'
      //   })
      // }
      // window.location.href = data.content.payUrl getPayResult
      const timer = setInterval(async () => {
        const { data: redata } = await getPayResult({
          orderNo: data.content.orderNo
        })
        if (redata.PayResult.content && redata.PayResult.content.status === 2) {
          clearInterval(timer)
          Toast.success('购买成功')
          this.checked = null
          this.$router.push({
            name: 'learn'
          })
        }
      }, 1000)
    }
  },
  computed: {
    username () {
      const replaceDate = this.$store.state.user.organization
      return replaceDate.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
    }
  }
}
</script>
<style lang='less' scoped>
.course-info p {
  margin: 0px;
  padding: 0px;
  }
.pay {
 height: 100%;
 position: absolute;
 width: 100%;
}
.van-cell-group{
  display: flex;
  flex-direction: column;
  height: 100%;
}
 .course-info {
    height: 170px;
    display: flex;
    padding: 40px 20px 0;
    margin-bottom: 10px;
 }

 .course-info .van-cell__value {
  display: flex;
}
.course-info img {
    width: 80px;
    height: 107px;
    border-radius: 10px;
  }
  .course-info .price-info {
    padding:5px 20px;
    height: 107px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
 }
 .price-info .course-name {
    font-size: 16px;
 }
 .price-info .discount {
    font-size: 22px;
    font-weight: 700;
    color: #ff7452;
 }
 .count-info {
    height: 140px;
    margin-bottom:10px;
 }
 .count-info p:nth-child(2) {
    font-size: 12px;
    color: #999;
    margin-top:5px;
 }
 .count-info .username {
    margin: 25px 0 10px;
    font-size: 16px;
 }
 .pay-chnnel {
  flex: 1;
 }
 .pay-chnnel .van-cell img {
  width: 28px;
  height: 28px;
 }
 .pay-chnnel .van-cell {
  padding: 20px 10px;
 }
 .pay-chnnel .van-cell__title {
  display: flex;
  align-items: center;
 }
 .pay-chnnel .van-cell__value {
  display: flex;
  // flex: 1;
  flex-direction: column;
  justify-content: space-between;
 }
 .pay-chnnel .title {
   flex: 1;
 }
 .pay-chnnel .van-cell span {
  font-size: 16px;
  margin-right: 10px;
 }
 ::v-deep .van-radio__icon--checked .van-icon {
  background-color: #f6c546;
  border-radius: #f6c546;
 }
 .pay-chnnel .van-button {
   background:linear-gradient(270deg,#faa83e,#f6c546);
   border-radius: 20px;
   margin-bottom: 10px;
   font-size: 18px;
 }
</style>
