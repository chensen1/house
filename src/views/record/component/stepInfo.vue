<template>
  <div class="stepBorder clearfix">
    <div class="radioItem clearfix" v-for="(item, index) in stepList" :key="index">
      <span class="default" :class="{'isAtive' : stepCode >= item.code}">
        <span></span>
      </span>
      <span class="seleLab" :class="{'isAtiveLabel' : stepCode >= item.code}">{{item.name}}
        <!-- <br/> {{item.date}} -->
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      stepList: [{
        name: '房源挂牌',
        date: '2010.10.20',
        code: 1
      }, {
        name: '达成交易意向',
        date: '2010.10.20',
        code: 3
      },
      {
        name: '双方网签',
        date: '2010.10.20',
        code: 6
      },
      {
        name: '买家付款到监管账户',
        date: '2010.10.20',
        code: 7
      },
      {
        name: '卖家纳税',
        date: '2010.10.20',
        code: 8
      },
      {
        name: '买家纳税',
        date: '2010.10.20',
        code: 9
      },
      {
        name: '买家申请产权证',
        date: '2010.10.20',
        code: 10
      }, {
        name: '卖家申请放款',
        date: '2010.10.20',
        code: 11
      }]
    }
  },
  props: {
    stepCode: {
      type: Number,
      default: 1
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.stepBorder{
  border-bottom: 1px solid #BFBFBF;
  // margin-bottom: 20px;
  padding: 10px 0;
}
.radioItem{
  cursor: pointer;
  width: 12%;
  float: left;
  .default{/*大圈*/
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border:2px solid #7D7D7D;/*这里写自己喜欢的颜色*/
    float: left;
    text-align: center;
    line-height: 16px;
  }
  .isAtive{
    border:2px solid #FF9201;/*这里写自己喜欢的颜色*/
    span{
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #FF9201;/*这里写自己喜欢的颜色*/
    }
  }
}
.seleLab{
  display: inline-block;
  width: calc(100% - 36px);
  margin-left: 5px;
  float: left;
  color: #4D4D4D;
  font-size: 14px;
  font-weight:600;
}
.isAtiveLabel{
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  color: #3E60C1;
}
</style>
