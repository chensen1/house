<template>
  <div>
    <StepInfo :stepCode="houseInfo.status"></StepInfo>
    <div class="listTab">
      <p class="title"><span class="lingxing"></span>挂牌房源详细信息</p>
      <DetailTab :houseInfo='houseInfo'></DetailTab>
      <p class="title" style="margin-top:50px"><span class="lingxing"></span>买家付款到监管账户</p>
      <p class="warn-msg">按照买受人与出卖人网签协议，请买受人在7日内一次性足额付款到政府监管账户</p>
      <div class="tableBox tableBg">
        <table style="width:100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="left">开户名：</td>
            <td align="right">郑州市不动产交易中心</td>
          </tr>
          <tr>
            <td align="left">开户银行：</td>
            <td align="right">中原银行股份有限公司</td>
          </tr>
          <tr>
            <td align="left">开户账户：</td>
            <td align="right">561790023322223-187</td>
          </tr>
          <tr>
            <td align="left">网签时间：</td>
            <td align="right">-</td>
          </tr>
          <tr>
            <td align="left">截至付款时间：</td>
            <td align="right">-</td>
          </tr>
        </table>
      </div>
      <p style="margin-top:20px">
        <el-button type="info"> 网上支付</el-button>
      </p>
      <p style="margin:20px 0px"><span class="payCode">付款状态：</span>
        <span class="payResult">{{ houseInfo.status < 7 ? '等待付款': '已付款'}}</span></p>
      <p >
        <el-button type="primary" @click="refresh" v-if="houseInfo.status < 7"> 刷新交易状态</el-button>
        <el-button type="primary" v-else @click="downLoad('/demo.doc', '付款凭证')"> 下载付款凭证</el-button>
      </p>
      <p style="margin-top:50px;text-align:center" v-if="isSellerFlag">
        <el-button type="info" v-if="houseInfo.status < 7"> 进入下一步</el-button>
        <el-button type="primary"  v-else @click="goNextpage"> 进入下一步</el-button>
      </p>
      <p style="margin-top:50px;text-align:center" v-else>
        <el-button type="info" v-if="houseInfo.status < 8"> 卖家未纳税</el-button>
        <el-button type="primary"  v-else @click="goNextpage"> 进入下一步</el-button>
      </p>
    </div>
    <div class="rightConatiner">
      <div class="toNewAdd">
        <div class="imgbox">
          <img src="../../assets/imgs/barcode.png">
        </div>
        <p class="tipsPhone">用手机扫一扫</p>
        <p><el-button type="primary"> 查看房源详细信息</el-button></p>
        <p><span class="downLoad" @click="downLoad('/demo.doc', '网签电子协议')">下载双方网签电子协议</span></p>
        <p><el-button type="default"> 取消交易</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getHouseList, getUserInfo, updataHouseStatue } from '@/api/index'
import DetailTab from './component/detailTab.vue'
import StepInfo from './component/stepInfo.vue'
export default {
  data () {
    return {
      houseInfo: {},
      hangOutUser: {}
    }
  },
  components: {
    DetailTab,
    StepInfo
  },
  computed: {
    houseId () {
      return this.$route.query.hid
    },
    isSellerFlag () {
      return this.$route.query.isSeller === '1'
    }
  },
  created () {
    this.getHouseInfo()
  },
  methods: {
    getHouseInfo () {
      getHouseList({ hid: this.houseId }).then(res => {
        this.houseInfo = res.data[0]
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
    goNextpage () {
      if (this.$route.query.isSeller === '1') {
        this.$router.push({
          path: '/sellerPay',
          query: {
            hid: this.houseId
          }
        })
      } else {
        this.$router.push({
          path: '/buyersPay',
          query: {
            hid: this.houseId
          }
        })
      }
    },
    downLoad (str, nameStr) {
      const name = nameStr
      const url = str
      const suffix = url.substring(url.lastIndexOf('.'), url.length)

      const x = new XMLHttpRequest()
      x.open('GET', url, true)
      x.responseType = 'blob'
      x.onload = function (e) {
        const url = window.URL.createObjectURL(x.response)
        const a = document.createElement('a')
        a.href = url
        a.download = name + suffix
        a.click()
      }
      x.send()
    },
    refresh () {
      // this.houseInfo.status = 7
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      updataHouseStatue({ hid: this.houseId, uid: userInfo.uid, status: 7 }).then(res => {
        this.getHouseInfo()
      })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.warn-msg{
  line-height: 36px;
  height: 36px;
  color: red;
  margin: 10px 0;
}
.payCode{
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #4D4D4D;
  float: left;
}
.payResult{
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #F04A4C;
  float: left;
}
</style>
