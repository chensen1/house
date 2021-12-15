<template>
  <div class="searchTabel">
    <div style="margin-top:20px">
      <p class="title"><span class="lingxing"></span>卖家挂牌房源</p>
      <el-form :inline="true" label-position="left" label-width="80px" class="searchForm">
        <el-form-item label="城市">
          <el-select v-model="formLabelAlign.city" clearable placeholder="请选择">
              <el-option
                v-for="item in cityOptions"
                :key="item.codeLabel"
                :label="item.codeLabel"
                :value="item.codeLabel">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属城区">
          <el-select v-model="formLabelAlign.district" clearable placeholder="请选择">
            <el-option
              v-for="item in districtOptions"
              :key="item.codeLabel"
              :label="item.codeLabel"
              :value="item.codeLabel">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋性质">
          <el-select v-model="formLabelAlign.category" clearable placeholder="请选择">
            <el-option
              v-for="item in categoryOptions"
              :key="item.codeLabel"
              :label="item.codeLabel"
              :value="item.codeLabel">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋总价">
          <el-select v-model="formLabelAlign.pirce" clearable placeholder="请选择">
            <el-option
              v-for="item in pirceOptions"
              :key="item.codeLabel"
              :label="item.codeLabel"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房屋面积">
          <el-select v-model="formLabelAlign.area" clearable placeholder="请选择">
            <el-option
              v-for="item in areaOptions"
              :key="item.codeLabel"
              :label="item.codeLabel"
              :value="item.codeLabel">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form  label-position="left" label-width="80px" class="formDiv">
        <el-form-item label="小区名称" >
          <el-input v-model="formLabelAlign.community" placeholder="请输入"  style="width:80%"></el-input>
        </el-form-item>
      </el-form>
      <p class="searchBox"><el-button type="primary" @click="getHouseList">查询</el-button> <el-button type="default">重置</el-button></p>
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
  </div>
</template>

<script>
import { getHouseList } from '@/api/index'
import utils from '@/utils/index'
export default {
  data () {
    return {
      areaOptions: [{ codeLabel: '0-120' }, { codeLabel: '120-200' }],
      pirceOptions: [{ codeLabel: '0-120万', code: '0-120' }, { codeLabel: '120万-200万', code: '120-200' },
        { codeLabel: '200万以上', code: '200-' }],
      categoryOptions: [{ codeLabel: '住宅' }, { codeLabel: '写字楼' }],
      districtOptions: [{ codeLabel: '金水区' }, { codeLabel: '二期区' }],
      cityOptions: [{ codeLabel: '郑州' }],
      formLabelAlign: {
        uid: '',
        hid: '',
        city: '',
        district: '',
        pirce: '',
        minPrice: '',
        maxPrice: '',
        category: '',
        area: '',
        minArea: '',
        maxArea: '',
        community: '',
        type: 1,
        statusList: [1, 2]
      },
      tableData: []
    }
  },
  created () {
    console.log(utils.formatDate(1638430158))
    this.getHouseList()
  },
  methods: {
    formateTime (time) {
      return utils.formatDate(time)
    },
    rowClick (row, column, event) {
      console.log(row)
      this.$router.push({
        path: '/houseInfo',
        query: {
          isSeller: '0',
          hid: row.hid
        }
      })
    },
    getHouseList () {
      if (this.formLabelAlign.pirce) {
        const arr = this.formLabelAlign.pirce.split('-')
        this.formLabelAlign.minPrice = arr[0] ? Number(arr[0]) : 0
        this.formLabelAlign.maxPrice = arr[1] ? Number(arr[1]) : 999999
      }
      if (this.formLabelAlign.area) {
        const arr = this.formLabelAlign.area.split('-')
        this.formLabelAlign.minArea = arr[0] ? Number(arr[0]) : 0
        this.formLabelAlign.maxArea = arr[1] ? Number(arr[1]) : 999999
      }
      console.log(this.formLabelAlign)
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      getHouseList(this.formLabelAlign).then(res => {
        console.log(res)
        // this.tableData = res.data
        this.tableData = res.data.filter(item => {
          return userInfo.uid !== item.uid
        })
      })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.searchForm{
  margin-top: 20px;
  /deep/.el-form-item{
    margin-bottom: 10px;
  }
}
.searchBox{
  text-align: center;
  margin-bottom: 20px;
}
.tab{
  margin-top: 20px;
  border: 1px solid #7D7D7D!important;
}
/deep/.headerBg{
  background: #3E60C1 !important;
  th.el-table__cell{
   background-color: #3E60C1 !important;
   color: #fff;
  }
}
</style>
