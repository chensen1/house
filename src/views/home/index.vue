<template>
  <div class="homePage">
    <div class="home-header clearfix">
      <div class="leftBox">
        <span class="logo">河南省大数据管理局</span><br/>
        <span class="headTit">区块链+存量房交易平台</span>
      </div>
      <div class="rightBox">
        <span class="phoneIcon">
          <img src="../../assets/imgs/phone.png" alt="">
          咨询电话</span><br/>
        <span class="phoneNum">
          <img src="../../assets/imgs/phoneNum1.png" alt="">
        </span>
      </div>

    </div>
    <div class="home-content">
      <img src="../../assets/imgs/bg.png" alt="">
      <div class="sellBtn" @click="toSellHouse">
        <img src="../../assets/imgs/sell.png" alt="">
        <p><span class="fontIcon">我要卖房</span></p>
        <p><span class="fontTip">房源挂牌</span></p>
      </div>
      <div class="buyBtn" @click="toBuyHouse">
        <img src="../../assets/imgs/buy.png" alt="">
        <p><span class="fontIcon">我要买房</span></p>
        <p><span class="fontTip">房源查询</span></p>
      </div>
    </div>
    <div class="home-footer">
      <div class="footer-icon">
        <div class="infoImg">
          <img src="../../assets/imgs/u26.png" alt="">
          <div class="info">
            <p>河南省大数据管理局 版权所有 © 隐私保护 豫ICP备00000099号 豫公网安备300022000012号</p>
            <p>网站标识码222000001，技术支持电话：0371-12345678</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :show-close="false"
      width="700px">
      <div class="userInfoCon">
        <div slot="title" class="header-title">
          身份认证
        </div>
        <p class="titP">用户信息 <span>身份信息来源于河南省政务服务平台</span></p>
        <el-form  label-position="right" label-width="120px" class="formDiv">
          <el-form-item label="用户姓名" >
            <el-input v-model="formInfo.name" placeholder="请输入" disabled  style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="用户手机号" >
            <el-input v-model="formInfo.phone" placeholder="请输入" disabled style="width:80%"></el-input>
          </el-form-item>
        </el-form>
        <p  class="titP">短信验证 <span>身份信息来源于河南省政务服务平台</span></p>
        <el-form  label-position="right" label-width="120px" class="formDiv">
          <el-form-item label="短信验证码" >
            <el-input v-model="formInfo.codeVal" placeholder="请输入"  style="width:200px"></el-input>
            <span class="codeTips" @click="countdown" v-if="time === 0">获取验证码</span>
            <span class="codeTips" v-else>重新获取（{{time}}s）</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">退出</el-button>
        <el-button type="primary" @click="goRoutePath">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/index'
export default {
  data () {
    return {
      dialogVisible: false,
      formInfo: {
        name: '',
        phone: '',
        codeVal: ''
      },
      time: 0,
      timer: null,
      isSellerFlag: false
    }
  },
  computed: {
  },
  methods: {
    goRoutePath () {
      if (!this.formInfo.codeVal) {
        this.$message.warning('验证码不能为空')
        return
      }
      if (this.isSellerFlag) {
        this.$router.push({
          path: '/newAdd'
        })
      } else {
        this.$router.push({
          path: '/searchHouse'
        })
      }
    },
    cancel () {
      this.formInfo.codeVal = ''
      this.time = 0
      clearInterval(this.timer)
      this.dialogVisible = false
    },
    toBuyHouse () {
      // this.dialogVisible = true
      getUserInfo({ uid: '22' }).then(res => {
        const userInfo = res.data
        this.formInfo.name = userInfo.name
        this.formInfo.phone = userInfo.phone
        localStorage.setItem('role', 'buyers')
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.isSellerFlag = false
        this.dialogVisible = true
      })
        .catch(error => {
          console.log(error)
        })
    },
    toSellHouse () {
      // this.dialogVisible = true
      getUserInfo({ uid: '11' }).then(res => {
        const userInfo = res.data
        this.formInfo.name = userInfo.name
        this.formInfo.phone = userInfo.phone
        localStorage.setItem('role', 'seller')
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.isSellerFlag = true
        this.dialogVisible = true
      })
        .catch(error => {
          console.log(error)
        })
    },
    countdown () {
      this.time = 60
      this.timer = setInterval(() => {
        if (this.time === 0) {
          clearInterval(this.timer)
        } else {
          this.time--
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.header-title{
  font-size: 24px;
  color: #3E60C1 ;
  margin-bottom: 20px;
  font-weight: 900;
}
.codeTips{
  margin-left: 10px;
  color: #3E60C1 ;
  cursor: pointer;
}
/deep/.el-dialog__header{
  display: none;
}
.dialog-footer{
  display: block;
  text-align: center;
}
.userInfoCon{
 padding-left:30px;
 .titP{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    span{
      float: right;
      font-size: 12px;
      color: #999;
    }
 }
}
.homePage{
  height: 100%;
  width: 100%;
  .home-header{
    height: 100px;
    width: 100%;
    background: url('../../assets/imgs/headerBg.png') no-repeat;
    background-size: cover;
  }
}
.leftBox{
  width: 300px;
  float: left;
  margin-left: 180px;
  padding-top: 20px;
  .logo{
    background: #1D3FA0;
    padding: 3px 10px;
    color: #fff;
    font-size: 16px;
  }
  .headTit{
    display: inline-block;
    color: #0326AC;
    font-weight: bold;
    font-size: 20px;
    margin-top: 8px;
  }
}
.rightBox{
  float: right;
  width: 200px;
  margin-right: 180px;
  padding-top: 20px;
  .phoneIcon{
    display: inline-block;
    color: #0326AC;
    font-weight: bold;
    font-size: 15px;
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
    color: #0326AC;
    font-weight: bold;
    width: 100%;
    text-align: right;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.home-content{
  height: calc(100% - 170px);
  width: 100%;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .sellBtn{
    width: 180px;
    height: 180px;
    position: absolute;
    top: 100px;
    left: calc(50% - 260px);
    cursor: pointer;
  }
  .buyBtn{
    width: 180px;
    height: 180px;
    position: absolute;
    top: 100px;
    right: calc(50% - 260px);
    cursor: pointer;
  }
  .fontIcon{
    display: inline-block;
    width: 100%;
    font-weight: bold;
    color: #fff;
    font-size: 24px;
    text-align: center;
  }
  .fontTip{
    display: inline-block;
    width: 100%;
    font-weight: bold;
    color: #fff;
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
  }
}
.footer-icon{
  height: 60px;
  background: #3E60C1;
  padding-top: 10px;
  .infoImg{
    width: 80%;
    margin: 0 auto;
    img{
      width: 30px;
      height: 40px;
      float: left;
      margin-top: 5px;
    }
    .info{
      height: 60px;
      width: calc(100% - 60px);
      padding-left: 15px;
      float: left;
      p{
        line-height: 24px;
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
}
</style>
