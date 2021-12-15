<template>
  <div>
    <StepInfo :stepCode="houseInfo.status"></StepInfo>
    <div class="listTab">
      <p class="title"><span class="lingxing"></span>挂牌房源详细信息</p>
      <DetailTab :houseInfo='houseInfo'></DetailTab>

      <p class="newadd-tit">
        <span class="lingxing"></span>房源照片
      </p>
      <div class="clearfix">
        <div class="picBox" v-for="(item,index) in houseInfo.pic" :key="index">
          <img :src="item" alt="">
        </div>
      </div>
      <p class="newadd-tit">
        <span class="lingxing"></span>挂牌人信息
      </p>

      <div class="userInfo tableBox tableBg">
        <table style="width:100%"  cellpadding="0" border="0" cellspacing="0">
          <tr>
            <td align="left">实名认证情况：已认证</td>
            <td align="right">核验房产信息：真实</td>
            <td align="right">核验销售条件：满足</td>
          </tr>
          <tr>
            <td align="left">挂牌人员姓名：{{hangOutUser.name || '-'}}</td>
            <td align="right">联系电话：{{hangOutUser.phone || '-'}}</td>
            <td align="right">挂牌时间：{{formateTime(houseInfo.hangOutTime) || '-'}}</td>
          </tr>
        </table>
      </div>
      <p style="margin-top:50px;text-align:center">
        <el-button type="info" v-if="houseInfo.status < 3"> 进入下一步</el-button>
        <el-button type="primary"  v-else @click="goSign"> 进入下一步</el-button>
      </p>
    </div>
    <div class="rightConatiner">
      <div class="toNewAdd">
        <div class="imgbox">
          <img src="../../assets/imgs/barcode.png">
        </div>
        <p class="tipsPhone">用手机扫一扫</p>
        <div v-if="type=='1'">
            <p><el-button type="primary"> 管理房源</el-button></p>
            <p><el-button type="default"> 下线房源</el-button></p>
        </div>
        <div v-else>
            <p v-if="houseInfo.status == 2" style="color:red">等待卖家确认</p>
            <p v-if="houseInfo.status == 3" style="color:red">卖家已确认</p>
            <p v-if="houseInfo.status < 2"><el-button type="primary" @click="payHouse"> 我要买入</el-button></p>
            <p v-if="houseInfo.status < 2"><el-button type="default"> 我要举报</el-button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTab from './component/detailTab.vue'
import StepInfo from './component/stepInfo.vue'
import utils from '@/utils/index'
import { getHouseList, getUserInfo, updataHouseStatue, intendBuy } from '@/api/index'
export default {
  data () {
    return {
      picList: [{}],
      houseInfo: {},
      hangOutUser: {}
    }
  },
  components: {
    DetailTab,
    StepInfo
  },
  computed: {
    type () {
      return this.$route.query.isSeller
    },
    houseId () {
      return this.$route.query.hid
    }
  },
  created () {
    this.getHouseInfo()
    // this.role = localStorage.getItem('role')
  },
  methods: {
    formateTime (time) {
      return utils.formatDate(time)
    },
    getHouseInfo () {
      getHouseList({ hid: this.houseId }).then(res => {
        this.houseInfo = res.data[0]
        this.houseInfo.pic = this.houseInfo.pic ? JSON.parse(this.houseInfo.pic) : []
        this.getHangoutUser()
      })
        .catch(error => {
          console.log(error)
        })
    },
    getHangoutUser () {
      getUserInfo({ uid: this.houseInfo.uid }).then(res => {
        this.hangOutUser = res.data
      })
        .catch(error => {
          console.log(error)
        })
    },
    payHouse () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      intendBuy({ hid: this.houseId, uid: userInfo.uid, name: userInfo.name, idNum: userInfo.idNum }).then(res => {
        this.getHouseInfo()
      }).catch(error => {
        console.log(error)
      })
    },
    goSign () {
      this.$router.push({
        path: '/toSign',
        query: {
          isSeller: this.$route.query.isSeller || '0',
          hid: this.houseId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.picBox{
  padding-top: 10px;
  height: 180px;
  width: 180px;
  float: left;
  img{
    height: 100%;
    width: 100%;
    margin-left: 1px ;
  }
}
// .table{border: 1px solid #ccc;border-collapse: collapse; width:80%;}.table th,.table td{border: 1px solid #ccc;padding: 10px;}
.userInfo{
  padding-top: 10px;
}
</style>
