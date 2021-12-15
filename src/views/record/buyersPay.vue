<template>
  <div>
    <StepInfo :stepCode="houseInfo.status"></StepInfo>
    <div class="listTab">
      <p class="title"><span class="lingxing"></span>挂牌房源详细信息</p>
      <DetailTab :houseInfo="houseInfo"></DetailTab>
      <p class="title" style="margin-top:80px"><span class="lingxing"></span>买家纳税</p>

      <p class="second-tit">一、房屋信息</p>
      <div class="tableBox tableBg">
        <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
           <tr>
            <td align="left" class="leftTit">房源编码：</td>
            <td align="right">{{houseInfo.houseNum}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">原房权证编号：</td>
            <td align="right">{{houseInfo.propertyNum}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">房屋地址：</td>
            <td align="right">{{houseInfo.address}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">建筑面积：</td>
            <td align="right">{{houseInfo.area}}</td>
          </tr>
        </table>
      </div>
      <p class="second-tit">二、交易信息</p>
      <div class="tableBox tableBg">
        <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
          <tr>
            <td align="left" class="leftTit">合同编号：</td>
            <td align="right">12889975</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">合同金额：</td>
            <td align="right">{{houseInfo.price ? houseInfo.price *10000 : 0}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">合同签订日期：</td>
            <td align="right">{{houseInfo.price}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">合同金额是否含税：</td>
            <td align="right">{{getCount('taxPay') > 0 ? '是':'否'}}</td>
          </tr>
        </table>
      </div>
      <p class="second-tit">三、买受人信息</p>
      <div class="tableBox tableBg">
        <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
          <tr>
            <td align="left" class="leftTit">买受人：</td>
            <td align="right">{{buyerInfo.name}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">证件类别：</td>
            <td align="right">身份证</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">证件号码：</td>
            <td align="right">{{buyerInfo.idNum}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">联系地址：</td>
            <td align="right">{{buyerInfo.address}}</td>
          </tr>
          <tr>
            <td align="left" class="leftTit">联系电话：</td>
            <td align="right">{{buyerInfo.phone}}</td>
          </tr>
        </table>
      </div>
      <p class="second-tit" style="color:red">四、买受人税款信息</p>
      <div class="tableBox tableBg">
        <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
          <tr>
            <td align="left">征收项目</td>
            <td align="right">计税基数（万元）</td>
            <td align="right">税率（征收率）</td>
            <td align="right">其他减免扣除金额（万元）</td>
            <td align="right">应纳税额（万元）</td>
          </tr>
          <tr v-for="(item,index) in payInfoList" :key="index">
            <td align="left">{{item.desc}}</td>
            <td align="right">{{item.taxBase}}</td>
            <td align="right">{{item.taxRate}}%</td>
            <td align="right">{{item.taxCredit}}</td>
            <td align="right">{{item.taxPay}}</td>
          </tr>
          <tr>
            <td align="left">金额小计</td>
            <td align="right">-</td>
            <td align="right">-</td>
            <td align="right">{{getCount('taxCredit')}}</td>
            <td align="right">{{getCount('taxPay')}}</td>
          </tr>
        </table>
      </div>
      <p style="margin-top: 30px;text-align:center" v-if="houseInfo.status < 8">
        <el-button type="info"> 等待卖家纳税</el-button>
      </p>
      <p style="margin-top: 30px;text-align:center" v-else>
        <span v-if="houseInfo.status < 9">
          <el-button type="primary"  @click="toPay"> 网上支付</el-button>
          <span class="refreshBtn" @click="getHouseInfo">已付款？<br/> 刷新交易状态</span>
        </span>
        <span v-else>
          <el-button type="primary"  @click="downLoad('/demo.doc', '缴税发票')"> 开具缴税发票</el-button>
          <el-button type="primary"  @click="downLoad('/demo.doc', '完税证明')"> 下载完税证明</el-button>
        </span>
      </p>
      <p style="margin-top:50px;text-align:center">
        <el-button type="info" v-if="houseInfo.status < 9"> 进入下一步</el-button>
        <el-button type="primary" @click="toNext" v-else> 进入下一步</el-button>
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
      </div>
    </div>
  </div>
</template>

<script>
import { getHouseList, getUserInfo, updataHouseStatue, getCalcTax } from '@/api/index'
import DetailTab from './component/detailTab.vue'
import StepInfo from './component/stepInfo.vue'
export default {
  data () {
    return {
      houseInfo: { },
      buyerInfo: {},
      payInfoList: []
    }
  },
  components: {
    DetailTab,
    StepInfo
  },
  computed: {
    houseId () {
      return this.$route.query.hid
    }
  },
  created () {
    this.getHouseInfo()
  },
  methods: {
    toNext () {
      this.$router.push({
        path: '/credentials',
        query: {
          hid: this.houseId
        }
      })
    },
    getHouseInfo () {
      getHouseList({ hid: this.houseId }).then(res => {
        this.houseInfo = res.data[0]
        this.getPayUser()
      })
        .catch(error => {
          console.log(error)
        })
    },
    getPayUser () {
      getUserInfo({ idNum: this.houseInfo.appointBuyer }).then(res => {
        this.buyerInfo = res.data
        this.getCalcTax({
          role: 2,
          uid: this.buyerInfo.uid,
          hid: this.houseInfo.hid
        })
      })
        .catch(error => {
          console.log(error)
        })
    },
    getCount (type) {
      let count = 0
      this.payInfoList.forEach(item => {
        count += item[type]
      })
      return count
    },
    getCalcTax (params) {
      getCalcTax(params).then(res => {
        this.payInfoList = res.data
      })
        .catch(error => {
          console.log(error)
        })
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
    toPay () {
      // this.houseInfo.status = 9
      updataHouseStatue({ hid: this.houseId, uid: this.buyerInfo.uid, status: 9 }).then(res => {
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
.refreshBtn{
    display: inline-block;
    font-size: 12px;
    padding: 3px 10px;
    vertical-align: middle;
    text-align: center;
    background: #999;
    border-radius: 5px;
    margin-left: 10px;
    color: #fff;
    cursor: pointer;
}
</style>
