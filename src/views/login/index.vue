<template>
  <div class="login">
    <van-nav-bar
  title="登录"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="form.username"
      name="phone"
      label="手机号"
      placeholder="请输入手机号"
      :rules="[
        { required: true, message: '请填写手机号' },
        { validator: phoneCheck, message: '格式有误,请重新输入' }
        ]"
    />
    <van-field
      v-model="form.password"
      type="password"
      name="password"
      label="密码"
      placeholder="请输入密码"
      :rules="[
        { required: true, message: '请填写密码' },
        { pattern: /[a-zaA-Z0-9]{6,12}$/, message: '格式有误，请重新填写密码' }
        ]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit" :loading="isLoading">
      提交
    </van-button>
  </div>
</van-form>
  </div>
</template>
<script>
import { NavBar, Form, CellGroup, Field, Toast } from 'vant'
import { login } from '@/services/user'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '123555477764',
        password: '5454sdsd'
      },
      isLoading: false
    }
  },
  components: { VanNavBar: NavBar, VanForm: Form, VanCellGroup: CellGroup, VanField: Field },
  methods: {
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      // console.log(data.content)
      if (data.data.state === 1) {
        Toast('登录成功')
        // this.$toast.success('登录成功')
        this.$store.commit('setUser', data.content)
        this.$router.push(this.$route.query.redirct || '/')
      } else {
        Toast('登录失败')
        // this.$toast.fail('登录失败')
      }
      this.isLoading = false
    },
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
