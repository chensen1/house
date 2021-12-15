<template>
  <div>
    <div class="listTab">
      <p class="title"><span class="lingxing"></span>交易记录</p>
      <el-table
          class="tab"
          @row-dblclick='rowClick'
          :header-row-class-name="'headerBg'"
          :data="tableData"
          :cell-style="{borderColor: '#7D7D7D'}"
          :header-cell-style="{borderColor: '#7D7D7D'}"
          border
          style="width: 100%">。
          <el-table-column
            prop="date"
            show-overflow-tooltip
            label="类别">
            <template slot-scope="scope">
              {{scope.row.uid === uidInfo ? '卖房' : '买房'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="houseNum"
            show-overflow-tooltip
            label="房屋编码">
          </el-table-column>
          <el-table-column
            prop="district"
            show-overflow-tooltip
            label="所属城区">
          </el-table-column>
          <el-table-column
            prop="community"
            show-overflow-tooltip
            label="小区">
          </el-table-column>
          <el-table-column
            prop="area"
            show-overflow-tooltip
            label="面积（㎡）">
          </el-table-column>
          <el-table-column
            prop="price"
            show-overflow-tooltip
            label="总价（万元）">
          </el-table-column>
          <el-table-column
            prop="hangOutTime"
            show-overflow-tooltip
            label="时间">
            <template slot-scope="scope">
                {{formateTime(scope.row.hangOutTime)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            label="交易阶段">
            <template slot-scope="scope">
              {{getStepLabel(scope.row)}}
            </template>
          </el-table-column>
    </el-table>
    </div>
    <div class="rightConatiner">
      <div class="toNewAdd rightCon">
        <p><el-button type="primary" @click="toNewAdd"> 我要自主挂牌</el-button></p>
        <p><el-button type="default" @click="goMyHouse"> 我的挂牌房源</el-button></p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index'
import { getHouseList } from '@/api/index'
export default {
  data () {
    return {
      tableData: [],
      stepList: [{
        code: 0,
        label: '未挂牌'
      }, {
        code: 1,
        label: '已挂牌'
      }, {
        code: 2,
        label: '买家购买意向'
      }, {
        code: 3,
        label: '双方达成意向'
      }, {
        code: 4,
        label: '卖家网签确认'
      }, {
        code: 5,
        label: '买家网签确认'
      }, {
        code: 6,
        label: '双方网签确认'
      }, {
        code: 7,
        label: '买家已付款'
      }, {
        code: 8,
        label: '卖家已纳税'
      }, {
        code: 9,
        label: '买家已纳税'
      }, {
        code: 10,
        label: '买家申请产权证'
      }, {
        code: 11,
        label: '卖家申请放款'
      }]
    }
  },
  computed: {
    uidInfo () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      return userInfo.uid || ''
    }
  },
  created () {
    this.getHouseList()
  },
  methods: {
    formateTime (time) {
      return utils.formatDate(time)
    },
    getHouseList () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      getHouseList({
        uid: userInfo.uid,
        statusList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        type: 3
      }).then(res => {
        console.log(res)
        this.tableData = res.data.map(item => {
          item.type = userInfo.uid === item.uid ? 1 : 2
          return item
        })
      })
        .catch(error => {
          console.log(error)
        })
    },
    toNewAdd () {
      this.$router.push({
        path: '/newAdd'
      })
    },
    goMyHouse () {
      this.$router.push({
        path: '/myHouse'
      })
    },
    rowClick (row, column, event) {
      console.log(row)
      switch (row.status) {
        case 1:
          if (row.type === 1) {
            this.$router.push({
              path: '/toAgree',
              query: {
                isSeller: '1',
                hid: row.hid
              }
            })
          } else {
            this.$router.push({
              path: '/houseInfo',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 2:
          if (row.type === 1) {
            this.$router.push({
              path: '/toAgree',
              query: {
                hid: row.hid
              }
            })
          } else {
            this.$router.push({
              path: '/houseInfo',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 3:
          if (row.type === 1) {
            this.$router.push({
              path: '/toSign',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/toSign',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 4:
          if (row.type === 1) {
            this.$router.push({
              path: '/toSign',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/toSign',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 5:
          if (row.type === 1) {
            this.$router.push({
              path: '/toSign',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/toSign',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 6:
          if (row.type === 1) {
            this.$router.push({
              path: '/toSign',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/toSign',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 7:
          if (row.type === 1) {
            this.$router.push({
              path: '/toThirdPartyAccount',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/toThirdPartyAccount',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 8:
          if (row.type === 1) {
            this.$router.push({
              path: '/sellerPay',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/buyersPay',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 9:
          if (row.type === 1) {
            this.$router.push({
              path: '/sellerPay',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/buyersPay',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 10:
          if (row.type === 1) {
            this.$router.push({
              path: '/applyForMoney',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {
            this.$router.push({
              path: '/buyersPay',
              query: {
                isSeller: '0',
                hid: row.hid
              }
            })
          }
          break
        case 11:
          if (row.type === 1) {
            this.$router.push({
              path: '/applyForMoney',
              query: {
                hid: row.hid,
                isSeller: '1'
              }
            })
          } else {

          }
          break
      }
    },
    getStepLabel (row) {
      const item = this.stepList.filter(el => {
        return el.code == row.status
      })
      console.log(item)
      return item[0] ? item[0].label : row.status
    }
  }
}
</script>

<style lang="less" scoped>
.tab{
  margin-top: 20px;
  border: 1px solid #7D7D7D!important;
}
/deep/.headerBg{
  background: #B5B5B5 !important;
  th.el-table__cell{
   background-color: #B5B5B5 !important;
   color: #4D4D4D;
  }
}
.rightCon{
  margin-top: 20px;
  background: #F7F7F9;
}
</style>
