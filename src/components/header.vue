<template>
  <div>
    <div class="head-logo clearfix">
      <div style="width:80%;margin: 0 auto;">
        <div class="leftBox">
          <span class="logo">河南省大数据管理局</span>
          <span class="headTit">区块链+存量房交易平台</span>
        </div>
        <div class="rightBox">
          <span class="phoneIcon">
            <img src="../assets/imgs/phone.png" alt="">
            咨询电话</span><br/>
          <span class="phoneNum"><img src="../assets/imgs/phoneNum.png" alt=""></span>
        </div>
      </div>
    </div>
    <div v-if="navLeftActive !=='/'" class="navBar">
      <el-menu class="el-menu-vertical-demo" mode="horizontal" :default-active="navLeftActive">
        <el-menu-item v-for="(routeItem, index) in routesList" :key="index"
        @click="goDataPages(routeItem.path, index)"
        :index="routeItem.path">
          <!-- <i class="el-icon-menu"></i> -->
          <span slot="title">{{routeItem.meta.title}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routesList: []
    }
  },
  computed: {
    navLeftActive: function () {
      const { meta, path } = this.$route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created () {
    this.routesList = this.$router.options.routes.filter(item => {
      return item.path !== '/login' && item.path !== '*'
    })
    console.log(this.routesList)
  },
  methods: {
    goDataPages (path, index) {
      console.log(path)
      this.$router.push({
        path: path
      })
    }
  }
}
</script>
<style  lang="less" scoped>
.head-logo{
    height: 100px;
    width: 100%;
    background: url('../assets/imgs/header_bg.jpg') no-repeat;
    background-size: cover;
    // filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size:100% 100%;
    background-size:100% 100%;
}
.navBar{
  background: #1D3FA0;
}
.el-menu.el-menu--horizontal{
  width: 80%;
  margin: 0 auto;
  display: flex;
  border-bottom: none;
}
.el-menu--horizontal>.el-menu-item{
    height: 38px;
    line-height: 38px;
    flex: 1;
    text-align: center;
    background: #1D3FA0 !important;
    color:#fff;
    // border: 1px solid #999 !important;
}
.el-menu--horizontal>.el-menu-item:hover{
    background: #1D3FA0 !important;
    color:#fff !important;
}
.el-menu-item.is-active{
  border-bottom: 4px solid #FF9201 !important;
  color:#fff !important;
}
.leftBox{
  width: 300px;
  float: left;
  padding-top: 20px;
  .logo{
    display: inline-block;
    background: #1D3FA0;
    padding: 3px 10px;
    color: #fff;
    font-size: 16px;
  }
  .headTit{
    display: inline-block;
    color: #FFF;
    font-weight: bold;
    font-size: 20px;
    margin-top: 8px;
  }
}
.rightBox{
  float: right;
  width: 200px;
  padding-top: 16px;
  .phoneIcon{
    display: inline-block;
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    text-align: right;
    img{
      height: 16px;
      width: 16px;
    }
  }
  .phoneNum{
    margin-top: 8px;
    display: inline-block;
    color: #FFF;
    font-weight: bold;
    width: 100%;
    text-align: right;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
