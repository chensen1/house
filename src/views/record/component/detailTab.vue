<template>
  <div>
    <div style="margin-top: 20px">
      <span class="infoNum">
        <span class="tit">房源编码</span>
        <span class="num">{{houseInfo.houseNum|| '-'}}</span>
      </span>
    </div>
    <div class="tableBox">
      <table style="width:100%" cellpadding="0" border="0" cellspacing="0">
        <tr>
          <td align="left">所属地区：{{houseInfo.district|| '-'}}</td>
          <td align="right">小区：{{houseInfo.community|| '-'}}</td>
          <td align="right">建筑面积（m ）：{{houseInfo.area|| '-'}}</td>
        </tr>
        <tr>
          <td align="left">规划用途：{{houseInfo.category|| '-'}}</td>
          <td align="right">委托价格（万元）：{{houseInfo.price|| '-'}}</td>
          <td align="right">挂牌时间：{{formateTime(houseInfo.hangOutTime)|| '-'}}</td>
        </tr>
        <tr>
          <td align="left">所在楼层：{{houseInfo.floor|| '-'}}</td>
          <td align="right"> </td>
          <td align="right"> </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index'
export default {
  data () {
    return {

    }
  },
  props: {
    houseInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    formateTime (time) {
      return utils.formatDate(time)
    }
  }
}
</script>

<style lang="less" scoped>
.tableBox{
  margin-top: 10px;
}
.infoNum{
  display: inline-block;
  height: 90px;
  width: 200px;
  border: 1px solid #7D7D7D;
  .tit{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100%;
    background: #3E60C1;
    color: #fff;
  }
  .num{
    display: inline-block;
    height: 60px;
    line-height: 60px;
    text-align: center;
    width: 100%;
    background: #FFFFFF;
    color: #4D4D4D;
    font-weight: bold;
  }
}
</style>
