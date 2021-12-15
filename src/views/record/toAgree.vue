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

      <div class="userInfo tableBox">
        <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
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
    </div>
    <div class="rightConatiner">
      <div class="toNewAdd">
        <div class="imgbox">
          <img src="../../assets/imgs/barcode.png">
        </div>
        <p class="tipsPhone">用手机扫一扫</p>
        <p><el-button type="primary"> 管理房源</el-button></p>
        <p><el-button type="default"> 下线房源</el-button></p>
      </div>
      <div class="toChoose tableBox">
        <h4>意向买家信息：</h4>
        <p class="tips">
          温馨提示：选择买家后，请及时与买家联系，并在七日内办理网签，否则将失效处理。
        </p>
        <table class="table" style="width:100%" cellpadding="0" border="0" cellspacing="0">
          <tr>
            <td align="left">意向买家姓名</td>
            <td align="right">意向买入日期</td>
          </tr>
          <tr v-for="(item,index) in houseInfo.buyerList" :key="index" @click="chooseBuyer(item)"
            :class="activeBuyer.idNum === item.idNum ? 'activeTr': ''">
            <td align="left">{{item.name}}</td>
            <td align="right">{{formateTime(item.buyTime) || '-'}}</td>
          </tr>
        </table>
        <p><el-button type="primary" @click="goSign" size="small"> 接受确认</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTab from './component/detailTab.vue'
import StepInfo from './component/stepInfo.vue'
import utils from '@/utils/index'
import { getHouseList, getUserInfo, confirmBuyer } from '@/api/index'
export default {
  data () {
    return {
      picList: [{}],
      houseInfo: {
      },
      hangOutUser: {},
      activeBuyer: {}
    }
  },
  components: {
    DetailTab,
    StepInfo
  },
  computed: {
    type () {
      return this.$route.query.type
    },
    houseId () {
      return this.$route.query.hid
    }
  },
  created () {
    this.getHouseInfo()
  },
  methods: {
    formateTime (time) {
      return utils.formatDate(time)
    },
    chooseBuyer (item) {
      this.activeBuyer = item
      console.log(this.activeBuyer.idNum)
    },
    goSign () {
      if (!this.activeBuyer.idNum) {
        this.$message.warning('选择买家')
        return
      }
      confirmBuyer({
        hid: this.houseId,
        appointBuyer: this.activeBuyer.idNum
      }).then(res => {
        this.$router.push({
          path: '/toSign',
          query: {
            isSeller: '1',
            hid: this.houseId
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    getHouseInfo () {
      getHouseList({ hid: this.houseId }).then(res => {
        this.houseInfo = res.data[0]
        this.houseInfo.pic = !this.houseInfo.pic ? [] : JSON.parse(this.houseInfo.pic)
        this.houseInfo.buyerList = !this.houseInfo.buyerList ? [] : JSON.parse(this.houseInfo.buyerList)
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
    }
  }
}
</script>

<style lang="less" scoped>
.activeTr{
background: #FFD183;
}
.newadd-tit{
  color: #3E60C1;
  border-bottom: 2px solid #DCDCDC;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  margin-top: 15px;
  height: 26px;
  line-height: 26px;
  .tips{
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    float: right;
  }
  .lingxing{
    display: inline-block;
    height: 8px;
    width: 8px;
    background: #3E60C1;
    transform: rotate(-45deg);
    margin: 2px 10px;
  }
}
.picBox{
  padding-top: 10px;
  height: 180px;
  width: 180px;
  img{
    height: 100%;
    width: 100%;
    margin-left: 1px ;
  }
}
// .table{border: 1px solid #ccc;border-collapse: collapse; width:80%;}.table th,.table td{border: 1px solid #ccc;padding: 10px;}
.userInfo{
  padding-top: 10px;
  td{
    background:#EEEEEE;
  }
}
.toChoose{
  background: #fff;
  padding: 15px;
  margin-top: 20px;
  table{
    margin: 10px 0;
  }
  p{
    text-align: center;
    margin-top: 10px;
  }
  .tips{
    text-align: left;
    color: #5D5D5D;
    font-size: 12px;
  }
}
</style>
