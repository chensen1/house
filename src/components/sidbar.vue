<template>
  <div>
    <el-menu class="el-menu-vertical-demo" :default-active="navLeftActive"  background-color="#545c64">
      <el-menu-item v-for="(routeItem, index) in routesList" :key="index"
       @click="goDataPages(routeItem.path, index)"
       :index="routeItem.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{routeItem.meta.title}}</span>
      </el-menu-item>
    </el-menu>
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
      this.$router.push({
        path: path
      })
    }
  }
}
</script>
<style  lang="less" scoped>
/deep/.is-active {
  color: #fff !important;
  .el-icon-menu{
    color: #fff !important;
  }
  background-color: rgb(67, 74, 80) !important;
}
/deep/.el-menu{
  border-right: none;
}
/deep/.el-menu-item{
  color: #fff;
}
/deep/.el-menu-item:hover{
  color: #fff;
  .el-icon-menu{
    color: #fff;
  }
}
</style>
