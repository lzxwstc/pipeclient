<template>
  <div class="app-container">
    <!--以下是煤质-->
    <div style="float:right;width:300px">
      <el-input
        v-model="theFirstFour"
        placeholder="请输入内容"
        class="input-with-select"
        @keyup.enter.native="selectByTheFirstFour"
      >
        <el-button slot="append" icon="el-icon-search" @click="selectByTheFirstFour" />
      </el-input>
    </div>
    <fuel-varify-manage
      :tabledata="conf"
      :showtime.sync="showFuelVarify"
      :refreshmenu.sync="refreshmenu"
      :loading="aboutloading"
      :span-arr="spanArr"
    />
  </div>
</template>

<script>

import FuelVarifyManage from './fuelvarifymanage.vue'
export default {
  name: 'DirectivePermission',
  components: { FuelVarifyManage },
  data() {
    return {
      conf: {
        coalId: '10',
        data: ''
      },
      showFuelVarify: false,
      refreshmenu: false, // 刷新页面
      aboutloading: true,
      spanArr: [], // 传到子组件的单元格合并的数组
      theFirstFour: ''// 根据前四项进行模糊查询
    }
  },
  watch: {
    refreshmenu(newVal) {
      if (newVal) {
        this.showFuelVarify = false
        this.changedata()
        this.refreshmenu = false
        this.selectByTheFirstFour()
      }
    }
  },
  mounted() {
    this.changedata()
  },
  methods: {
    changedata() {
      this.aboutloading = true
      this.conf.data = []
      this.$store.dispatch('reportsSelectAll').then(res => {
        this.conf.data = res.data
        this.showFuelVarify = true// 显示表单
        this.aboutloading = false
        this.getSpanArr(res.data)
      })
    },
    selectByTheFirstFour() {
      this.showFuelVarify = false// 修改为false是为了变为true时可以更新表
      if (this.theFirstFour === '') { // 输入为空跳转全部
        this.changedata()
      } else {
        this.$store.dispatch('reportsSelectByFour', this.theFirstFour).then(res => {
          this.conf.data = res.data
          this.showFuelVarify = true// 显示表单
          this.aboutloading = false
          this.getSpanArr(res.data)
          if (res.data.length === 0) { // 没查到数据跳转全部
            this.showFuelVarify = false// 更新表
            this.changedata()
            window.vm.$message.error('没有此数据！')
          }
        })
      }
    },
    getSpanArr(data) { // 合并单元格数量的数组
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          // 如果是第一条记录（即索引是0的时候），向数组中加入１
          this.spanArr.push(1)
          this.pos = 0
        } else {
          if (data[i].shipping_list_id === data[i - 1].shipping_list_id) {
            // 如果shipping_list_id相等就累加，并且push 0
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            // 不相等push 1
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  /deep/ .permission-sourceCode {
    margin-left: 15px;
  }
  /deep/ .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>

