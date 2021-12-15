<template>
  <div>
    <div class="warn-info">
     <h3>风险提示：</h3>
     <p>1、本平台挂牌的拟售价格仅供参考，实际成交价格由买卖双方自行商定</p>
     <p>2、本平台发布的房屋图片由经纪机构或出售人提供，仅供参考，购房者请务必实地查看房屋真实情况。</p>
     <p>3、本平台挂牌房屋如为共有的，签订房屋买卖合同时，须由全体房屋所有权人到场签字同意。</p>
     <p>4、挂牌房屋存在抵押情形的，办理不动产登记手续前，应先办理完毕抵押注销登记。</p>
     <p>5、挂牌房屋已出租的，签订房屋买卖合同时，应确保承租人已放弃优先购买权。</p>
     <p>6、本平台挂牌房屋成交后应按规定签订房屋买卖合同，办理房屋交易确认及不动产登记手续，所需资料及办理条件以法律法规规定及主管部门的要求为准</p>
    </div>
    <div class="footer-icon">
      <div class="infoImg">
        <img src="../assets/imgs/u26.png" alt="">
        <div class="info">
          <p>河南省大数据管理局 版权所有 © 隐私保护 豫ICP备00000099号 豫公网安备300022000012号</p>
          <p>网站标识码222000001，技术支持电话：0371-12345678</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.warn-info{
  border-top: 1px solid #DCDCDC;
  padding-top: 20px;
  h3{
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  p{
    width: 80%;
    margin: 0 auto;
    color: #4D4D4D;
    line-height: 26px;
    font-size: 12px;
  }
  margin: 20px 0 30px 0;
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
