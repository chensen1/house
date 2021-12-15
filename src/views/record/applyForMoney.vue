<template>
  <div>
    <StepInfo :stepCode="houseInfo.status"></StepInfo>
    <div class="listTab">
      <p class="title"><span class="lingxing"></span>挂牌房源摘要</p>
      <DetailTab :houseInfo="houseInfo"></DetailTab>
      <p class="title" style="margin-top:30px;margin-bottom: 30px"><span class="lingxing"></span>卖家申请放款</p>
      <p style="margin-top:50px;text-align:center" v-if="houseInfo.status > 10">
        <el-button type="info" > 已放款</el-button>
      </p>
      <div v-else>
        <p class="labelP">
          <span class="labelName">开户名</span>
          <el-input type="text" style="width:220px" size="small" v-model="form.name" />
        </p>
        <p class="labelP">
          <span class="labelName">开户银行 </span>
          <el-input type="text" style="width:220px" size="small" v-model="form.bank" />
        </p>
        <p class="labelP">
          <span class="labelName">开户账户</span>
          <el-input type="text" style="width:220px" size="small" v-model="form.cardNum" />
        </p>
        <p class="labelP">
          <span class="labelName">图片验证码</span>
          <el-input type="text" size="small" v-model="val" style="width:120px"></el-input>
          <span style=" display:inline-block;vertical-align: middle;margin-left: 10px;">
            <canvas width="100" height="40" id="verifyCanvas"></canvas>
            <img id="code_img" @click="drawCode">
          </span>
        </p>
        <p style="margin-top:50px;text-align:center">
          <el-button type="primary"  @click="submit"> 提交申请</el-button>
        </p>
      </div>
    </div>
    <div class="rightConatiner">
      <div class="toNewAdd">
        <div class="imgbox">
          <img src="../../assets/imgs/barcode.png">
        </div>
        <p class="tipsPhone">用手机扫一扫</p>
        <p><el-button type="primary"> 查看房源详细信息</el-button></p>
        <p><span class="downLoad">下载双方网签电子协议</span></p>
        <p><span class="downLoad">下载买家完税证明</span></p>
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
      radio: '',
      form: {
        name: '',
        bank: '',
        cardNum: ''
      },
      val: '',
      nums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      houseInfo: { },
      hangOutUser: {},
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
    }
  },
  mounted () {
    this.drawCode()
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
    submit () {
      if (!this.form.name || !this.form.bank || !this.form.cardNum) {
        this.$message.warning('信息不能为空')
        return
      }
      if (this.validateCode.join('') !== this.val) {
        this.$message.warning('验证码错误')
        return
      }
      updataHouseStatue({ hid: this.houseId, uid: this.hangOutUser.uid, status: 11 }).then(res => {
        this.getHouseInfo()
      })
        .catch(error => {
          console.log(error)
        })
    },
    drawCode () {
      var canvas = document.getElementById('verifyCanvas') // 获取HTML端画布
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
      var image = document.getElementById('code_img')
      image.src = canvas.toDataURL('image/png')
      return image
    }
  }
}
</script>

<style lang="less" scoped>
.labelP{
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
}
.labelName{
  display: inline-block;
  color: #4D4D4D;
  font-size: 14px;
  font-weight: 600;
  width: 80px;
}
.content{
  display: inline-block;
  color: #3E60C1;
  font-size: 14px;
  line-height: 26px;
  border-bottom: 1px solid #3E60C1;
}
#code_img{
  height: 36px;
  line-height: 36px;
  vertical-align: middle;
}
</style>
