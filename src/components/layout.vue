<template>
  <div class="container-all">
    <Header class="header-container"></Header>
    <div class="content">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import siderbar from './sidbar.vue'
import Header from './header.vue'
import Footer from './footer.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="css" scoped>
.container-all{
  min-width: 1000px;
  background: #F7F7F9;

}
.container-all ::after{
  content: '';
  display: block;
  clear: both;
}
.header-container{
  height: 130px;
  background: #fff;
  width: 100%;
}
.content{
  margin-top: 160px;
  min-height: calc(100vh - 442px);
  width: 80%;
  /* overflow: auto; */
  box-sizing: border-box;
  padding: 20px 16px 16px 16px;
  margin: 0 auto;

}
</style>
