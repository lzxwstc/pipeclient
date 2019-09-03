<template>
  <div>
    <div>
      <div style="float:left;">
        <el-button
          v-loading="loading2"
          :disabled="buttonForbid"
          round
          icon="el-icon-menu"
          @click="checkAndEdit()"
        >查看编辑</el-button>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="fuelNew"
      :cell-style="{borderColor: 'blue',backgroundColor:'lightgrey'}"
      :header-cell-style="{backgroundColor: 'lightblue',fontWeight: 500}"
      :span-method="combine"
      style="width: 100%"
      height="500"
      border
      stripe
      highlight-current-row
      @cell-click="tableclick"
    >
      <el-table-column align="center" width="60">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.row" @change.native="selDetail(scope.row)">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column class-name="need" prop="shipname" label="船名" />
      <el-table-column class-name="need" prop="shiptime" label="船次" />
      <el-table-column class-name="need" prop="coalname" label="煤种" />
      <el-table-column class-name="need" prop="shipping_list_id" label="船运ID" />
      <el-table-column :formatter="typeFormat" label="化验类型" />
      <el-table-column label="Qnet,ar">
        <template slot-scope="scope">{{ utility.toFixed(scope.row.qnetar,2) }}</template>
      </el-table-column>
      <el-table-column prop="mtar" label="Mt">
        <template slot-scope="scope">{{ utility.toFixed(scope.row.mtar,2) }}</template>
      </el-table-column>
      <el-table-column prop="mad" label="Mad">
        <template slot-scope="scope">{{ utility.toFixed(scope.row.mad,2) }}</template>
      </el-table-column>
      <el-table-column prop="sar" label="St,ar">
        <template slot-scope="scope">{{ utility.toFixed(scope.row.sar,2) }}</template>
      </el-table-column>
      <el-table-column prop="vdaf" label="Vdaf">
        <template slot-scope="scope">{{ utility.toFixed(scope.row.vdaf,2) }}</template>
      </el-table-column>
      <el-table-column prop="fcd" label="FCd">
        <template slot-scope="scope">{{ utility.toFixed(scope.row.fcd,2) }}</template>
      </el-table-column>
      <el-table-column prop="ad" label="Ad">
        <template slot-scope="scope">{{ utility.toFixed(scope.row.ad,2) }}</template>
      </el-table-column>
      <el-table-column prop="st" label="ST" />
    </el-table>

    <el-pagination
      :total="totalPage"
      :page-sizes="pageSize"
      :page-size="currentPageSize"
      :current-page="currentPage"
      background
      layout="prev, pager, next, jumper,total, sizes "
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <div>
      <fuel-varify-dialog
        :option="selectFuel"
        :show-table.sync="shownodialog"
        :baseontype="baseontype"
        :refreshupdate.sync="refreshupdate"
        :refreshinsert.sync="refreshinsert"
        :other-type-selected="otherTypeSelected"
        :other-type="otherType"
      />
    </div>
    <!-- <div>
      <fuel-varify-insert-dialog
        :showinsert.sync="showinsertdialog"
        :choose.sync="selectFuel.data"
        :refreshinsert.sync="refreshinsert"
      ></fuel-varify-insert-dialog>
    </div>-->
  </div>
</template>

<script>
import FuelVarifyDialog from './FuelVarifyDialog.vue'
// import FuelVarifyInsertDialog from './FuelVarifyInsertDialog'
// import utility from '../../../assets/js/utility'

export default {
  name: 'FuelVarifyManage',
  components: { FuelVarifyDialog },
  props: {
    tabledata: {
      type: Object,
      coalId: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: null
      }, // 传输的数据源
      default: undefined
    },
    showtime: {// 显示表单
      type: Boolean,
      default: false
    },
    refreshmenu: {// 刷新表单
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: true
    },
    spanArr: {// 合并数组
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      selectFuel: {
        coalId: '10',
        data: []
      },
      fuelVarifies: [], // 存放全部的数据
      fuelNew: [], // 截取一页的数据存放
      pageSize: [10, 15, 20], // 以下一系列为分页
      currentPageSize: 10,
      currentPage: 1,
      totalPage: 1,
      shownodialog: false,
      refreshinsert: false, // 在插入提交后刷新插入组件
      refreshupdate: false, // 修改提交后刷新组件
      loading2: false,
      baseontype: null,
      radio: '1',
      otherType: {
        typeNJ: 'NJ',
        typeGK: 'GK',
        typeDC: 'DC'
      },
      otherTypeSelected: '', // 没有数据的type的列表
      buttonForbid: true, // 按钮是否点击
      selectId: '', // 存放选择数据的船运ID
      newspanArr: []// 存放因每页显示数改变而更新的合并数组

    }
  },

  watch: {
    showtime(newVal, oldVal) {
      if (newVal === true) { // 当其值更新为true时才执行更新
        this.fuelNew = []
        this.fuelVarifies = this.tabledata.data
        this.startdata()
        this.copyArr()
      }
    },
    refreshupdate(newVal) { // 修改后刷新
      if (newVal) {
        this.$emit('update:refreshmenu', true)
        this.refreshupdate = false
      }
    },
    refreshinsert() { // 插入后刷新
      this.$emit('update:refreshmenu', true)
    }
  },

  methods: {
    typeFormat(row) { // 显示的type转化为中文
      const type = row.type
      let chineseType = ''
      if (type === 'NJ') {
        chineseType = '能检'
      } else if (type === 'GK') {
        chineseType = '前港'
      } else if (type === 'DC') {
        chineseType = '到厂'
      }
      return chineseType
    },
    qnetarFormat(row) {
      const qnetar = row.qnetar
      const qnetar2 = this.utility.toFixed(qnetar)
      return qnetar2
    },
    tableclick(row, column, cell, event) { // 点击单元格触发单选按钮
      this.selDetail(row)
      if (column.className === 'need') {
        this.radio = row
      }
    },
    combine({ row, column, rowIndex, columnIndex }) {
      rowIndex = rowIndex + this.currentPageSize * (this.currentPage - 1)// 根据页数来读取合并数量的数组
      var startcol = this.currentPageSize * (this.currentPage - 1) // 不同pageSize下每页第一条数据的行数

      if (this.newspanArr[startcol] === 0) { // 根据每页第一行来修改合并数组
        if (this.newspanArr[startcol - 1] === 0 || this.newspanArr[startcol - 1] === 2) {
          this.newspanArr[startcol] = 1
        } else if (this.newspanArr[startcol - 1] === 3) {
          this.newspanArr[startcol] = 2
        }
      }
      // 由于前5列必定重复，将其合并
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
        const _row = this.newspanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    handleCurrentChange(val) { // 分页相关
      // alert(`当前页: ${val}`)
      this.currentPage = val
      this.fuelNew = []
      for (var i = (this.currentPage - 1) * this.currentPageSize; i < this.currentPageSize * this.currentPage; i++) {
        if (i < this.fuelVarifies.length) {
          this.fuelNew.push(this.fuelVarifies[i])
        }
      }
    },
    startdata() { // 每页的数据
      for (var i = 0; i < this.currentPageSize; i++) {
        if (i < this.fuelVarifies.length) {
          this.fuelNew.push(this.fuelVarifies[i])
        }
      }
      this.totalPage = this.fuelVarifies.length
    },
    handleSizeChange(num) {
      this.currentPageSize = num
      this.startdata()
      this.handleCurrentChange(this.currentPage)
      this.copyArr()
    },
    copyArr() {
      // 将一个spanArr的值给一个新数组，用于到时还原数组
      this.newspanArr = this.spanArr.slice(0, this.spanArr.length)
    },
    selDetail(row) { // 单选按钮获得船运ID
      this.buttonForbid = false
      this.otherType = {
        typeNJ: 'NJ',
        typeGK: 'GK',
        typeDC: 'DC'
      }
      this.selectId = row.shipping_list_id
    },

    checkAndEdit() {
      this.loading2 = true
      this.buttonForbid = true
      this.selectByShipId(this.selectId)
    },
    selectByShipId(id) { // 根据船ID查找讯息
      this.$store.dispatch('reportsSelectByShipId', id).then(res => {
        this.selectFuel.data = res.data
        var typeArray = []
        for (var item in this.selectFuel.data) {
          typeArray.push(this.selectFuel.data[item].type)
        }

        if (typeArray.indexOf('NJ') !== -1) {
          this.baseontype = 'NJ'
        } else if (typeArray.indexOf('GK') !== -1) {
          this.baseontype = 'GK'
        } else {
          this.baseontype = 'DC'
        }
        for (item in this.selectFuel.data) { // 过滤掉有数据的type
          if (this.selectFuel.data[item].type === 'NJ') {
            delete this.otherType.typeNJ
          }
          if (this.selectFuel.data[item].type === 'GK') {
            delete this.otherType.typeGK
          }
          if (this.selectFuel.data[item].type === 'DC') {
            delete this.otherType.typeDC
          }
        }

        // 设置新建选项的select默认的选择
        var typearr = []
        for (var key in this.otherType) {
          typearr.push(this.otherType[key])
        }
        if (typearr.indexOf('NJ') !== -1) {
          this.otherTypeSelected = 'NJ'
        } else if (typearr.indexOf('GK') !== -1) {
          this.otherTypeSelected = 'GK'
        } else if (typearr.indexOf('DC') !== -1) {
          this.otherTypeSelected = 'DC'
        } else {
          this.otherTypeSelected = 'NO'
        }
        this.loading2 = false
        this.buttonForbid = false
        this.shownodialog = true
      })
    }
  }
}
</script>

<style>
.fuelVarifyModal {
  width: 80px;
  line-height: 20px;
  padding: 0;
}
.need:hover {
  background-color: #c6cfdf !important;
}
</style>
