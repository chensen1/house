<template>
  <div>
    <StepInfo :stepCode="houseInfo.status"></StepInfo>
    <div class="clearFix">
      <div class="listTab">
        <p class="title"><span class="lingxing"></span>挂牌房源详细信息</p>
        <DetailTab :houseInfo='houseInfo'></DetailTab>
        <p class="title" style="margin-top:80px"><span class="lingxing"></span>双方网签</p>
      </div>
      <div class="rightConatiner">
        <div class="toNewAdd">
          <div class="imgbox">
            <img src="../../assets/imgs/barcode.png">
          </div>
          <p class="tipsPhone">用手机扫一扫</p>
          <p><el-button type="primary"> 查看房源详细信息</el-button></p>
          <p><el-button type="default"> 取消交易</el-button></p>
        </div>
      </div>
    </div>
    <div class="infoDiv clearFix">
      <p class="second-tit">一、出卖人与买受人基本信息</p>
      <div class="buyTab tableBox">
       <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
        <tr>
          <td align="left">出卖人：</td>
          <td align="right">{{hangOutUser.name}}</td>
        </tr>
        <tr>
          <td align="left">证件类型：</td>
          <td align="right">身份证</td>
        </tr>
        <tr>
          <td align="left">证件号码：</td>
          <td align="right">{{hangOutUser.idNum}}</td>
        </tr>
        <tr>
          <td align="left">联系地址：</td>
          <td align="right">{{hangOutUser.address}}</td>
        </tr>
        <tr>
          <td align="left">联系电话：</td>
          <td align="right">{{hangOutUser.phone}}</td>
        </tr>
       </table>
      </div>
      <div class="sellTab tableBox">
       <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
        <tr>
          <td align="left">买受人：</td>
          <td align="right">{{buyUser.name}}</td>
        </tr>
        <tr>
          <td align="left">证件类型：</td>
          <td align="right">身份证</td>
        </tr>
        <tr>
          <td align="left">证件号码：</td>
          <td align="right">{{buyUser.idNum}}</td>
        </tr>
        <tr>
          <td align="left">联系地址：</td>
          <td align="right">{{buyUser.address}}</td>
        </tr>
        <tr>
          <td align="left">联系电话：</td>
          <td align="right">{{buyUser.phone}}</td>
        </tr>
      </table>
      </div>
    </div>
    <div class="infoDiv clearFix">
      <p class="second-tit">二、合同条款</p>
      <p class="tips">依据《中华人民共和国城市房地产管理法》、《城市房地产转让管理规定》及本市有关房地产的政策、法规，遵循平等互利、协商一致、等价有偿的原则，为维护房产转让双方的合法权利，履行双方义务，经甲、乙双方充分协商特签订本合同，以求共同信守。</p>
      <p class="tips">第一条 甲方将其合法拥有的位于河南省郑州市金水区海洋路（国基路）与索凌路交汇处的房产依法转让给乙方。</p>
      <p class="tips">第二条 房屋基本情况如下：房屋1：房产证号 豫（2018）郑州市 不动产权第 0270001 号，结构混合结构，所在层2，户型间数 三室二厅二卫，建筑面积95㎡，用途住宅。</p>
      <p class="tips">第三条 双方协商转让总价格为人民币：784200元（大写：柒拾捌万肆仟贰佰圆整)。</p>
      <p class="tips">第四条 付款方式为以下第1种。</p>
      <p class="tips">1、一次性付：本合同签订之日起7日内，乙方一次性付清房款。</p>
      <p class="tips">2、公积金贷款：</p>
      <p class="tips">3、按揭贷款</p>
      <div class="contract">
        <span class="imgspan"><img src="../../assets/imgs/one.png" alt=""></span><span class="text-box" @click="downLoad('/demo.doc', '房屋买卖合同')">《房屋买卖合同》</span>
        <span class="imgspan"><img src="../../assets/imgs/two.png" alt=""></span><span class="text-box" @click="downLoad('/demo.doc', '法律责任声明书')">《法律责任声明书》</span>
      </div>
    </div>
    <div class="infoDiv clearFix">
      <p class="second-tit">三、网上确认</p>
      <div class="sellerSign">
        <div v-if="isSellerFlag && (houseInfo.status < 4 || houseInfo.status == 5)">
          <p style="color:'#4D4D4D'" >出卖人：{{hangOutUser.name || '-'}}</p>
          <p class="warn-msg">请填写验证码并确认，确认不可撤销。</p>
          <p class="valInput">
            <el-input type="text" v-model="val" style="width:120px"></el-input>
            <span style=" display:inline-block;vertical-align: middle;margin-left: 10px;">
              <!-- <canvas width="100" height="40" id="verifyCanvas"></canvas> -->
              <img id="code_img" :src="imgSrc" @click="drawCode">
            </span>
            <span >
              <el-button style="margin-left: 50px;"  type="primary" @click="updateStatus1(4)">出卖人确认签约</el-button>
            </span>
          </p>
        </div>
        <div v-else>
          <p style="color:'#4D4D4D'" >出卖人：{{hangOutUser.name || '-'}}</p>
          <p style="color:red;margin-top:10px" >状  态：{{(houseInfo.status < 4 || houseInfo.status == 5) ? '未网签' : '已网签'}}</p>
        </div>
      </div>
      <div  class="buyerSign">
        <div v-if="!isSellerFlag && houseInfo.status < 5">
          <p style="color:'#4D4D4D'" >出买人：{{buyUser.name || '-'}}</p>
          <p class="warn-msg">请填写验证码并确认，确认不可撤销。</p>
          <p class="valInput">
            <el-input type="text" v-model="val" style="width:120px"></el-input>
            <span style=" display:inline-block;vertical-align: middle;margin-left: 10px;">
              <img id="code_img" :src="imgSrc" @click="drawCode">
            </span>
            <span >
              <el-button style="margin-left: 50px;"  type="primary" @click="updateStatus2(5)">出买人确认签约</el-button>
            </span>
          </p>
        </div>
        <div v-else>
          <p style="color:'#4D4D4D'" >出买人：{{buyUser.name || '-'}}</p>
          <p style="color: red;margin-top:10px" >状  态：{{houseInfo.status < 5 ? '未网签' : '已网签'}}</p>
        </div>
      </div>
      <canvas width="100" height="40" id="verifyCanvas" class="verifyCanvas"></canvas>
      <p style="margin-top:50px;text-align:center">
        <el-button type="info" v-if="houseInfo.status < 6"> 进入下一步</el-button>
        <el-button type="primary"  v-else @click="payToMedel"> 进入下一步</el-button>
      </p>
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
      picList: [{}, {}, {}, {}, {}, {}],
      val: '',
      nums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      houseInfo: {},
      hangOutUser: {},
      buyUser: {},
      imgSrc: '',
      validateCode: []
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
  mounted () {
    this.drawCode()
  },
  methods: {
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
    updateStatus1 (code) {
      if (this.validateCode.join('') !== this.val) {
        this.$message.warning('验证码错误')
        return
      }
      let updateCode = 3
      if (this.houseInfo.status === 3) {
        updateCode = code
      } else {
        updateCode = 6
      }
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      updataHouseStatue({ hid: this.houseId, uid: userInfo.uid, status: updateCode }).then(res => {
        this.getHouseInfo()
      })
        .catch(error => {
          console.log(error)
        })
    },
    updateStatus2 (code) {
      if (this.validateCode.join('') !== this.val) {
        this.$message.warning('验证码错误')
        return
      }
      let updateCode = 3
      if (this.houseInfo.status === 3) {
        updateCode = code
      } else {
        updateCode = 6
      }
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      updataHouseStatue({ hid: this.houseId, uid: userInfo.uid, status: updateCode }).then(res => {
        this.getHouseInfo()
      })
        .catch(error => {
          console.log(error)
        })
    },
    getHouseInfo () {
      getHouseList({ hid: this.houseId }).then(res => {
        this.houseInfo = res.data[0]
        this.getHangoutUser()
        this.getbuyUser()
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
    getbuyUser () {
      getUserInfo({ idNum: this.houseInfo.appointBuyer }).then(res => {
        this.buyUser = res.data
      })
        .catch(error => {
          console.log(error)
        })
    },
    payToMedel () {
      this.$router.push({
        path: '/toThirdPartyAccount',
        query: {
          hid: this.houseId,
          isSeller: this.$route.query.isSeller
        }
      })
    },
    drawCode () {
      var canvas = document.getElementById('verifyCanvas') // 获取HTML端画布
      // canvas.remove()
      // var testDiv = document.getElementById('test')
      // testDiv.innerHTML = '<canvas width="100" height="40" id="verifyCanvas" class="verifyCanvas"></canvas>'
      var context = canvas.getContext('2d') // 获取画布2D上下文
      context.fillStyle = 'cornflowerblue' // 画布填充色
      context.fillRect(0, 0, canvas.width, canvas.height)
      // 创建渐变
      var gradient = context.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop('0', 'magenta')
      // gradient.addColorStop('0.5', 'blue')
      // gradient.addColorStop('1.0', 'red')
      // 清空画布
      context.fillStyle = gradient // 设置字体颜色
      context.font = '25px Arial' // 设置字体
      var rand = new Array()
      var x = new Array()
      var y = new Array()
      for (var i = 0; i < 4; i++) {
        rand[i] = this.nums[Math.floor(Math.random() * this.nums.length)]
        x[i] = i * 16 + 10
        y[i] = Math.random() * 20 + 20
        context.fillText(rand[i], x[i], y[i])
      }
      // console.log(rand);
      this.validateCode = rand
      // 画3条随机线
      for (var i = 0; i < 3; i++) {
        this.drawline(canvas, context)
      }

      // 画30个随机点
      for (var i = 0; i < 30; i++) {
        this.drawDot(canvas, context)
      }
      this.convertCanvasToImage(canvas)
    },
    drawline (canvas, context) {
      context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)) // 随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
      context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)) // 随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
      context.lineWidth = 0.5 // 随机线宽
      context.strokeStyle = 'rgba(50,50,50,0.3)' // 随机线描边属性
      context.stroke() // 描边，即起点描到终点
    },
    drawDot (canvas, context) {
      var px = Math.floor(Math.random() * canvas.width)
      var py = Math.floor(Math.random() * canvas.height)
      context.moveTo(px, py)
      context.lineTo(px + 1, py + 1)
      context.lineWidth = 0.2
      context.stroke()
    },
    convertCanvasToImage (canvas) {
      document.getElementById('verifyCanvas').style.display = 'none'
      // var image = document.getElementById('code_img')
      this.imgSrc = canvas.toDataURL('image/png')
      // return image
    }
  }
}
</script>

<style lang="less" scoped>
.sellerSign{
  width: 50%;
  min-height: 150px;
  float: left;
}
.buyerSign{
  width: 50%;
  min-height: 150px;
  float: left;
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
  img{
    margin-left: 1px ;
  }
}
.infoDiv{
  width: 100%;
  .buyTab{
    width: 49%;
    float: left;
    margin-right: 1%;
  }
  .sellTab{
    width: 49%;
    float: left;
  }
}
.tips{
  font-size: 12px;
  color: #4D4D4D;
  line-height: 26px;
}
.imgspan{
  display: inline-block;
  height: 28px;
  width: 28px;
  img{
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
.contract{
  span{
    float: left;
    line-height: 36px;
    font-size: 12px;
  }
  .text-box{
    color: #3E60C1;
    border-bottom: 2px solid #3E60C1;
    margin-left: 10px;
    margin-right: 100px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 900;
  }
}
.warn-msg{
  font-size: 12px;
  color: red;
  margin-top: 5px;
}
.valInput{
  margin-top: 20px;
}
.verifyCanvas{
  position: fixed;
  top: -100px;
  left: -1000px;
}
</style>
