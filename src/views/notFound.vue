<template>
  <div class="noRoute">
    <img :src="noDataSrc" alt="" srcset="">
  </div>
</template>

<script>
import noData from '@/assets/imgs/404.png'
export default {
  data () {
    return {
      noDataSrc: noData
    }
  }
}
</script>
<style lang="less" scoped>
.noRoute{
  width: 100%;
  text-align: center;
  margin-top: 100px;
  img{
    height: 400px;
    width: 700px;
  }
}
</style>
