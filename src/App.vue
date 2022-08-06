<template>
<div>
  <router-view></router-view>
</div>
</template>
<script>
import request from '@/utils/request'
export default {
}
request({
  method: 'get',
  url: '/1d0f7ae1619cb1f55b283a5e5029ed2d/front/ad/getListadvert'
})
</script>
<style lang="scss">
</style>
