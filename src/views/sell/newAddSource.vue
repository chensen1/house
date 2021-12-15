<template>
  <div>
    <div class="listTab">
      <p class="title"><span class="lingxing"></span>卖家新增挂牌</p>
      <p class="newadd-tit">
        <span class="lingxing"></span>身份认证
        <span class="tips">身份信息来源于河南省政务服务平台</span>
      </p>
      <el-form  label-position="left" label-width="110px" class="formDiv">
        <el-form-item label="产权人姓名">
          <el-input v-model="userInfo.name" disabled ></el-input>
        </el-form-item>
        <el-form-item label="产权人证件号">
          <el-input v-model="userInfo.idNum" disabled ></el-input>
        </el-form-item>
      </el-form>
      <p class="newadd-tit">
        <span class="lingxing"></span>请选择出售房源
      </p>
      <el-form label-position="left" label-width="110px" class="formDiv">
        <el-form-item label="产权证">
          <el-select v-model="formLabelAlign.propertyNum"
            @change="changeHouse"
            placeholder="请选择" style="width:100%" >
            <el-option
              v-for="item in tableData"
              :key="item.propertyNum"
              :label="item.propertyNum"
              :value="item.hid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房产基础信息：">
        </el-form-item>
        <el-form-item label="所属小区">
          <el-input v-model="formLabelAlign.community"  disabled></el-input>
        </el-form-item>
        <el-form-item label="房屋朝向">
          <el-input v-model="formLabelAlign.orientations" style="width:150px" disabled ></el-input>
        </el-form-item>
        <el-form-item label="户型">
          <el-input v-model="formLabelAlign.shi" style="width:80px"  disabled></el-input> 室
          <el-input v-model="formLabelAlign.ting" style="width:80px"  disabled></el-input> 厅
          <el-input v-model="formLabelAlign.wei" style="width:80px"  disabled></el-input> 卫
        </el-form-item>
      </el-form>
      <p class="newadd-tit">
        <span class="lingxing"></span>请完善房源信息
      </p>
      <el-form label-position="left" label-width="110px" class="formDiv">
        <el-form-item label="挂牌价格">
          <el-input v-model.number="formEdit.price"  style="width:160px"></el-input> 万元
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formEdit.phone"  style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="房源照片"
          v-if="!houseImgUrl">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :multiple="false"
            :accept='acceptList'
            :on-change="fileChange">
            <i class=" el-icon-upload"></i>
            <span class="uploadText">点击上传图片</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="房源照片" v-else>
          <div class="imgShow">
            <i class="el-icon-close" @click="deleImg"></i>
            <img :src="houseImgUrl"  alt="">
          </div>
        </el-form-item>
        <el-form-item label="公开销售">
          <el-radio v-model="formEdit.open" :label='true' @change="formEdit.appointBuyer = ''">是</el-radio>
          <el-radio v-model="formEdit.open" :label="false">否</el-radio>
          <el-input v-model="formEdit.appointBuyer" placeholder="请填写指定买家身份证号信息" v-if="!formEdit.open"  style="width:160px"></el-input>
        </el-form-item>
        <el-form-item label="图片验证码">
          <el-input v-model="formEdit.region"  style="width:160px"></el-input>
          <span style=" display:inline-block;vertical-align: top;margin-left: 10px;">
            <canvas width="100" height="40" id="verifyCanvas"></canvas>
            <img id="code_img" @click="drawCode">
          </span>
        </el-form-item>
      </el-form>
      <div style="text-align:center;margin-top:30px">
        <el-button type="primary" class="submitBtn"  @click="submitForm"> 提交 </el-button>
      </div>
    </div>
    <div class="rightConatiner">
      <div class="toNewAdd">
        <div class="imgbox">
          <img src="../../assets/imgs/barcode.png">
        </div>
        <p class="tipsPhone">用手机扫一扫</p>
        <p><el-button type="primary" @click="goMyHouse">我的挂牌房源</el-button></p>
        <p><el-button type="default"> 服务指南</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getHouseList, updataHouseInfo } from '@/api/index'
export default {
  data () {
    return {
      nums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      acceptList: '.jpg , .png',
      tableData: [],
      userInfo: {},
      formLabelAlign: {
        propertyNum: '',
        community: '',
        orientations: '',
        shi: '',
        ting: '',
        wei: ''
      },
      activeHouse: {},
      formEdit: {
        open: true,
        price: '',
        phone: '',
        appointBuyer: ''
      },
      options: [],
      houseImgUrl: '',
      validateCode: []
    }
  },
  created () {
    this.getHouseList()
  },
  mounted () {
    this.drawCode()
  },
  methods: {
    changeHouse (hid) {
      const selectItem = this.tableData.filter(item => {
        return item.hid === hid
      })
      if (!selectItem && !selectItem[0]) {
        return
      }
      const item = selectItem[0]
      console.log(selectItem)
      this.activeHouse = item
      this.formLabelAlign.community = item.community
      this.formLabelAlign.orientations = item.orientations
      this.formLabelAlign.shi = item.roomForm.substr(0, 1)
      console.log(item.roomForm)
      this.formLabelAlign.ting = item.roomForm.substr(2, 1)
      this.formLabelAlign.wei = item.roomForm.substr(4, 1)
    },
    goMyHouse () {
      this.$router.push({
        path: '/myHouse'
      })
    },
    submitForm () {
      if (!this.activeHouse.hid) {
        this.$message.warning('选择房屋')
        return
      }
      if (!this.formEdit.price || !this.formEdit.phone) {
        this.$message.warning('房屋信息不能为空')
        return
      }
      if (!this.formEdit.open && !this.formEdit.appointBuyer) {
        this.$message.warning('房屋信息不能为空')
        return
      }
      if (this.validateCode.join('') !== this.formEdit.region) {
        this.$message.warning('验证码错误')
        return
      }
      updataHouseInfo(Object.assign(this.formEdit, { hid: this.activeHouse.hid })).then(res => {
        this.$router.push({
          path: '/myHouse'
        })
      }).catch(error => [
        console.log(error)
      ])
    },
    getHouseList () {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      getHouseList({
        uid: this.userInfo.uid,
        type: 1,
        statusList: [0, 1]
      }).then(res => {
        console.log(res)
        this.tableData = res.data
      })
        .catch(error => {
          console.log(error)
        })
    },
    deleImg () {
      this.houseImgUrl = ''
    },
    fileChange (file) {
      let URL = window.URL || window.webkitURL
      this.houseImgUrl = URL.createObjectURL(file.raw)
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
      this.validateCode = rand
      console.log(rand)
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
.imgShow{
  height: 160px;
  width: 160px;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  i{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    opacity: 0;
  }
}
.imgShow:hover{
  i{
    opacity: 1;
  }
}
.formDiv{
  margin-top: 20px;
  width: 80%;
  /deep/.el-form-item{
    margin-bottom: 10px;
  }
}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .el-icon-upload {
    font-size: 36px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 60px;
    text-align: center;
    border: 1px dashed #BFBFBF;
  }
  .uploadText{
    position: absolute;
    bottom: 20px;
    left: 15px;
    font-size: 12px;
  }
  /deep/.el-form-item__label{
    color: #606266 !important
  }
.submitBtn{
    width: 140px;
    font-size: 18px;
}
</style>
