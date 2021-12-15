<template>
  <div>
    <div class="listTab">
      <p class="title"><span class="lingxing"></span>卖家挂牌房源</p>
      <el-table
          class="tab"
          @row-dblclick='rowClick'
          :header-row-class-name="'headerBg'"
          :data="tableData"
          :cell-style="{borderColor: '#7D7D7D'}"
          :header-cell-style="{borderColor: '#7D7D7D'}"
          border
          style="width: 100%">
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
        </el-table>
    </div>
    <div class="rightConatiner">
      <div class="toNewAdd">
      <div class="imgbox">
        <img src="../../assets/imgs/barcode.png">
      </div>
      <p class="tipsPhone">用手机扫一扫</p>
      <p><el-button type="primary" @click="toNewAdd"> 我要自主挂牌</el-button></p>
      <p><el-button type="default"> 我的挂牌房源</el-button></p>
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
      tableData: []
    }
  },
  created () {
    this.getHouseList()
  },
  methods: {
    formateTime (time) {
      return utils.formatDate(time)
    },
    toNewAdd () {
      this.$router.push({
        path: '/newAdd'
      })
    },
    rowClick (row, column, event) {
      this.$router.push({
        path: '/toAgree',
        query: {
          isSeller: '1',
          hid: row.hid
        }
      })
    },
    getHouseList () {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      getHouseList({
        uid: userInfo.uid,
        statusList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        type: 1
      }).then(res => {
        this.tableData = res.data
      })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.tab{
  width: 100%;
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
</style>
