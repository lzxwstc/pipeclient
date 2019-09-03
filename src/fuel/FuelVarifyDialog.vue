<template>
  <div class="dialog-container">
    <el-dialog
      :show="showTable"
      :visible.sync="visible"
      top="30px"
      width="640px"
      @close="$emit('update:showTable', false)"
    >
      <table id="fuelVarifyTable" class="table table-bordered">
        <tbody>
          <tr>
            <td
              class="fuelVarifyModal"
              colspan="5"
              style="border:hidden;border-bottom-style:none;font-size:larger;"
            >煤质检验数据</td>
          </tr>
          <tr>
            <td>
              <el-tabs v-model="state" stretch @tab-click="swithchange" >
                <el-tab-pane label="查看" name="first"/>
                <el-tab-pane label="修改" name="second"/>
                <el-tab-pane label="新建" name="third"/>
              </el-tabs>
            </td>
            <td v-if="state=='second'&&typeSelected=='DC'" :style="{color:'red',width:'150'}">此类别不允许修改</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal" style="width:23%">船名</td>
            <td class="name fuelVarifyModal">{{ fuelVarify.shipname }}</td>
            <td class="fuelVarifyModal">船次</td>
            <td class="fuelVarifyModal">{{ fuelVarify.shiptime }}</td>
            <td class="fuelVarifyModal">煤种</td>
            <td class="fuelVarifyModal">{{ fuelVarify.coalname }}</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">类型</td>
            <td class="fuelVarifyModal">
              <select
                v-if="state!='third'"
                v-model="typeSelected"
                style="width:70px;height:20px;border-radius:4px;"
                @change="typeChange(typeSelected)"
              >
                <option
                  v-for="item in fuelVarifies"
                  :key="item.id"
                  :value="item.type"
                >{{ item.typename }}</option>
              </select>
              <select
                v-if="state=='third'"
                v-model="otherTypeSelected"
                style="width:70px;height:20px;border-radius:4px;"
                @change="otherTypeChange(otherTypeSelected)"
              >
                <option
                  v-for="(value,key) in otherType"
                  :key="key"
                  :value="value"
                >{{ value=='NJ'?'能检':value=='GK'?'前港':'到厂' }}</option>
              </select>
            </td>
            <td class="fuelVarifyModal">船运ID</td>
            <td class="fuelVarifyModal">{{ fuelVarify.shipping_list_id }}</td>
            <td class="fuelVarifyModal">更新时间</td>
            <td
              class="fuelVarifyModal"
            >{{ fuelVarify.updateTime?moment(fuelVarify.updateTime).format('MM-DD HH:mm'):'' }}</td>
          </tr>
          <tr>
            <td
              class="fuelVarifyModal"
              colspan="6"
              style="background:#D3D3D3;line-height:20px;font-weight:bold"
            >工业分析(%)</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal"/>
            <td class="fuelVarifyModal">全水分 Mt</td>
            <td class="fuelVarifyModal">内水分 Mad</td>
            <td class="fuelVarifyModal">挥发分 V</td>
            <td class="fuelVarifyModal">灰分 A</td>
            <td class="fuelVarifyModal">固定碳 FC</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">收到基 ar</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.mtar,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.mtar" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\.\d]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal">——</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.var,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.var" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.aar,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.aar" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.fcar,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.fcar" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">空干基 ad</td>
            <td class="fuelVarifyModal">——</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.mad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.mad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.vad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.vad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.aad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.aad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.fcad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.fcad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>

          </tr>
          <tr>
            <td class="fuelVarifyModal">干燥基 d</td>
            <td class="fuelVarifyModal">——</td>
            <td class="fuelVarifyModal">——</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.vd,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.vd" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.ad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.ad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.fcd,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.fcd" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">干燥无灰基 daf</td>
            <td class="fuelVarifyModal">——</td>
            <td class="fuelVarifyModal">——</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.vdaf,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.vdaf" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="fuelVarifyModal">——</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.fcdaf,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.fcdaf" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
          </tr>
          <tr>
            <td
              class="fuelVarifyModal"
              colspan="6"
              style="background:#D3D3D3;line-height:20px;font-weight:bold"
            >热值</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal"/>
            <td colspan="2" class="fuelVarifyModal">低位 net</td>
            <td colspan="2" class="fuelVarifyModal">高位 gr</td>
            <td class="fuelVarifyModal"/>
          </tr>
          <tr>
            <td class="fuelVarifyModal"/>
            <td class="fuelVarifyModal">MJ/kg</td>
            <td class="fuelVarifyModal">kcal/kg</td>
            <td class="fuelVarifyModal">MJ/kg</td>
            <td class="fuelVarifyModal">kcal/kg</td>
            <td class="fuelVarifyModal"/>
          </tr>
          <tr>
            <td class="fuelVarifyModal">收到基 ar</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qnetar,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qnetar" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td
              class="integer fuelVarifyModal"
            ><span v-if="!Iswork">{{ fuelVarify.qnetar?utility.toFixed(fuelVarify.qnetar/0.0041816,0):'' }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="Qnetars" onfocus="this.select()" type="text" class="input-text" maxlength="20" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgrarMj,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgrarMj" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgrarKcal,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgrarKcal" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>

            <td class="fuelVarifyModal"/>
          </tr>
          <tr>
            <td class="fuelVarifyModal">空干基 ad</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qnetadMj,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qnetadMj" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qnetadKcal,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qnetadKcal" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgradMj,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgradMj" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgradKcal,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgradKcal" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="fuelVarifyModal"/>
          </tr>
          <tr>
            <td class="fuelVarifyModal">干燥基 d</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qnetdMj,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qnetdMj" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qnetdKcal,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qnetdKcal" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgrdMj,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgrdMj" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgrdKcal,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgrdKcal" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="fuelVarifyModal"/>
          </tr>
          <tr>
            <td class="fuelVarifyModal">干燥无灰基 daf</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qnetdafMj,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qnetdafMj" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qnetdafKcal,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qnetdafKcal" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgrdafMj,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgrdafMj" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.qgrdafKcal,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.qgrdafKcal" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="fuelVarifyModal"/>
          </tr>
          <tr>
            <td
              class="fuelVarifyModal"
              colspan="6"
              style="background:#D3D3D3;line-height:20px;font-weight:bold"
            >元素分析(%)</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal" />
            <td class="fuelVarifyModal">碳 C</td>
            <td class="fuelVarifyModal">氢 H</td>
            <td class="fuelVarifyModal">氧 O</td>
            <td class="fuelVarifyModal">氮 N</td>
            <td class="fuelVarifyModal">硫 St</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">收到基 ar</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.car,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.car" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.har,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.har" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.oar,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.oar" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.nar,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.nar" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.sar,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.sar" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">空干基 ad</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.cad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.cad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.had,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.had" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.oad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.oad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.nad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.nad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.sad,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.sad" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">干燥基 d</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.cd,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.cd" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.hd,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.hd" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.od,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.od" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.nd,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.nd" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.std,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.std" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">干燥无灰基 daf</td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.cdaf,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.cdaf" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.hdaf,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.hdaf" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.odaf,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.odaf" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.ndaf,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.ndaf" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.sdaf,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.sdaf" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
          </tr>
          <tr>
            <td
              class="fuelVarifyModal"
              colspan="4"
              style="background:#D3D3D3;line-height:20px;font-weight:bold"
            >灰熔点(℃)(还原性气氛)</td>
            <td
              class="fuelVarifyModal"
              style="background:#D3D3D3;line-height:10px;font-weight:bold"
            >焦渣特性</td>
            <td
              class="fuelVarifyModal"
              style="background:#D3D3D3;line-height:10px;font-weight:bold"
            >可磨性系数</td>
          </tr>
          <tr>
            <td class="fuelVarifyModal">DT</td>
            <td class="fuelVarifyModal">ST</td>
            <td class="fuelVarifyModal">HT</td>
            <td class="fuelVarifyModal">FT</td>
            <td class="fuelVarifyModal">CRC</td>
            <td class="fuelVarifyModal">HGI</td>
          </tr>
          <tr>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.dt,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.dt" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.st,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.st" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.ft,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.ft" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.ht,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.ht" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.crc,0) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.crc" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>
            <td class="double fuelVarifyModal"><span v-if="state=='first'">{{ utility.toFixed(fuelVarify.hgi,2) }}</span><input v-if="state=='second'||state=='third'" :disabled="showOrNot" v-model="fuelVarify.hgi" onfocus="this.select()" type="text" class="input-text" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')" onchange="this.value=this.value.replace(/[^\d.]/g,'')"></td>

          </tr>
        </tbody>
      </table>
      <div v-if="state=='second'" >
        <el-button :plain="true" type="warning" @click="Update" >保存修改</el-button>
      </div>
      <div v-if="state=='third'&&otherTypeSelected!='NO'" >
        <el-button :plain="true" type="warning" @click="Insert" >新建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FuelVarifyDialog',
  props: {
    showTable: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: undefined,
      coalId: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: null
      } // 传输的数据源
    },
    baseontype: {
      type: String,
      default: ''
    },
    refreshupdate: {
      type: Boolean,
      default: false
    },
    refreshinsert: {
      type: Boolean,
      default: false
    },
    otherTypeSelected: {
      type: String,
      default: null
    },
    otherType: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      Qnetars: 0,
      Iswork: false,
      visible: this.showTable,
      fuelVarifies: [],
      typeSelected: null,
      fuelVarifyLoading: false,
      fuelVarify: {},
      state: 'first',
      showOrNot: false
    }
  },
  computed: {
    constantVA() {
      return (100 - this.fuelVarify['mad']) / (100 - this.fuelVarify['mtar'])
    },
    constantVB() {
      return (100) / (100 - this.fuelVarify['mad'])
    },
    constantVC() {
      return (100) / (100 - this.fuelVarify['mtar'])
    },
    constantVD() {
      return (100 - this.fuelVarify.aad - this.fuelVarify.mad) / 100
    }
  },
  watch: {
    showTable() {
      this.visible = this.showTable// 打开该组件
      this.getData(this.option.data, this.baseontype)// 获取数据
      this.state = 'first'// 设置默认为查看
    },
    Qnetarss() {
      this.fuelVarify.qnetar = this.Qnetars * 0.0041816
    },
    'fuelVarify.qnetar': function() {
      this.Qnetars = this.fuelVarify.qnetar / 0.0041816
    },
    // 监听全水
    'fuelVarify.mtar': function() {
      this.mtarchange()
    },
    // 监听内水
    'fuelVarify.mad': function() {
      this.madchange()
    },
    // 监听挥发分 V
    'fuelVarify.var': function() {
      this.fuelVarify.vad = this.fuelVarify.var * this.constantVA
    },
    'fuelVarify.vad': function() {
      this.fuelVarify.var = this.fuelVarify.vad / this.constantVA
      this.fuelVarify.vd = this.fuelVarify.vad * this.constantVB
      this.fuelVarify.vdaf = this.fuelVarify.vad / this.constantVD
    },
    'fuelVarify.vd': function() {
      this.fuelVarify.vad = this.fuelVarify.vd / this.constantVB
    },
    'fuelVarify.vdaf': function() {
      this.fuelVarify.vad = this.constantVD * this.fuelVarify.vdaf
    },
    // 监听灰分 A
    'fuelVarify.aar': function() {
      this.fuelVarify.aad = this.fuelVarify.aar * this.constantVA
    },
    'fuelVarify.aad': function() {
      console.log('aad:' + this.fuelVarify.aad)
      console.log('mad:' + this.fuelVarify.mad)
      console.log('firstVD:' + ((100 - (this.fuelVarify.aad + this.fuelVarify.mad)) / 100))
      console.log('firstVD:' + ((100 - this.fuelVarify.aad - this.fuelVarify.mad) / 100))
      this.fuelVarify.aar = this.fuelVarify.aad / this.constantVA
      this.fuelVarify.ad = this.fuelVarify.aad * this.constantVB
    },
    'fuelVarify.ad': function() {
      this.fuelVarify.aad = this.fuelVarify.ad / this.constantVB
    },
    // 监听固定碳 FC
    'fuelVarify.fcar': function() {
      this.fuelVarify.fcad = this.fuelVarify.fcar * this.constantVA
    },
    'fuelVarify.fcad': function() {
      this.fuelVarify.fcar = this.fuelVarify.fcad / this.constantVA
      this.fuelVarify.fcd = this.fuelVarify.fcad * this.constantVB
      this.fuelVarify.fcdaf = this.fuelVarify.fcad / this.constantVD
    },
    'fuelVarify.fcd': function() {
      this.fuelVarify.fcad = this.fuelVarify.fcd / this.constantVB
    },
    'fuelVarify.fcdaf': function() {
      this.fuelVarify.fcad = this.fuelVarify.fcdaf * this.constantVD
    },
    // 监听硫 St
    'fuelVarify.sar': function() {
      this.fuelVarify.sad = this.fuelVarify.sar * this.constantVA
    },
    'fuelVarify.sad': function() {
      this.fuelVarify.sar = this.fuelVarify.sad / this.constantVA
      this.fuelVarify.std = this.fuelVarify.sad * this.constantVB
      this.fuelVarify.sdaf = this.fuelVarify.sad / this.constantVD
    },
    'fuelVarify.std': function() {
      this.fuelVarify.sad = this.fuelVarify.std / this.constantVB
    },
    'fuelVarify.sdaf': function() {
      this.fuelVarify.sad = this.fuelVarify.sdaf * this.constantVD
    }
  },
  methods: {
    mtarchange() {
      this.fuelVarify.var = this.fuelVarify.vad / this.constantVA
      this.fuelVarify.aar = this.fuelVarify.aad / this.constantVA
      this.fuelVarify.fcar = this.fuelVarify.fcad / this.constantVA
      this.fuelVarify.sar = this.fuelVarify.sad / this.constantVA
    },
    madchange() {
      this.fuelVarify.vad = this.fuelVarify.var * this.constantVA
      this.fuelVarify.aad = this.fuelVarify.aar * this.constantVA
      this.fuelVarify.fcad = this.fuelVarify.fcar * this.constantVA
      this.fuelVarify.sad = this.fuelVarify.sar * this.constantVA
    },
    typeChange(type) {
      this.fuelVarify = { ...this.fuelVarifies.find(x => x.type === type) }
      this.clearFuelVarify()
    },
    otherTypeChange(type) {
      this.typeChange(this.typeSelected)
      this.clearFuelVarify()
    },
    swithchange(tab) {
      this.typeChange(this.typeSelected)
      this.clearFuelVarify()
    },
    clearFuelVarify() {
      if (this.state === 'third') { // 把得到的对象清空
        this.showOrNot = false
        for (var item in this.fuelVarify) {
          this.fuelVarify[item] = 0
        }
        console.log(this.fuelVarify)
        delete this.fuelVarify.id// 把几个默认字段清除
        delete this.fuelVarify.createTime
        delete this.fuelVarify.createBy
        delete this.fuelVarify.updateBy
        delete this.fuelVarify.updateTime
        this.fuelVarify.shipping_list_id = this.fuelVarifies[0].shipping_list_id// 把几个不变字段添加
        this.fuelVarify.shiptime = this.fuelVarifies[0].shiptime
        this.fuelVarify.coalname = this.fuelVarifies[0].coalname
        this.fuelVarify.shipname = this.fuelVarifies[0].shipname
        this.fuelVarify.firstdate = new Date()
        this.fuelVarify.type = this.otherTypeSelected
      } else if (this.state === 'second') {
        if (this.typeSelected === 'DC') {
          this.showOrNot = true
        } else if (this.typeSelected !== 'DC') {
          this.showOrNot = false
        }
      }
    },
    getFuelVarify(type) {
    },
    getData(data, type) {
      this.fuelVarifies = []
      this.fuelVarify = {}
      data.forEach((item, index) => {
        if (item.type === 'GK') {
          item.typename = '前港'
        } else if (item.type === 'NJ') {
          item.typename = '能检'
        } else if (item.type === 'DC') {
          item.typename = '到厂'
        }
        this.fuelVarifies.push(item)
      })
      const GK = this.fuelVarifies.find(x => x.type === 'GK')
      const NJ = this.fuelVarifies.find(x => x.type === 'NJ')
      const DC = this.fuelVarifies.find(x => x.type === 'DC')
      if (type === 'NJ') {
        this.typeSelected = 'NJ'
        this.fuelVarify = { ...NJ }
      } else if (type === 'GK') {
        this.typeSelected = 'GK'
        this.fuelVarify = { ...GK }
      } else if (type === 'DC') {
        this.typeSelected = 'DC'
        this.fuelVarify = { ...DC }
      }
    },
    // 提交数据
    Update() {
      this.$store.dispatch('changeAll', this.fuelVarify).then(res => {
        this.$emit('update:refreshupdate', true)
        this.$message({
          message: '修改成功！',
          type: 'success'
        })
      }).catch(() => {
        window.vm.$message.error('修改失败')
      })
      this.visible = false// 关闭窗口
    },
    Insert() {
      const reports = this.fuelVarify
      this.$store.dispatch('insNew', reports).then(res => {
        window.vm.$message.success('插入成功！')
        this.$emit('update:refreshinsert', true)
      }).catch(() => {
        window.vm.$message.error('插入失败')
      })
      this.visible = false// 关闭窗口
    }
  }
}
</script>

<style scoped>

.table.td {
  line-height: 15px;
  padding: 0px;
  margin: 0px;
}
#fuelVarifyTable {
  margin-left: 0px;
  margin-top: -10px;
  width: 600px;
  text-align: center;
}
.fuelVarifyModal {
  width: 80px;
  line-height: 20px;
  padding: 0;
}
.table td {
  height:10%;
  padding: 0;
  vertical-align: middle;
  text-align: center;
}
.footer {
  position: absolute;
  right: 30px;
  bottom: 23px;

}
.input-text{
  width:80px;
  height: 20px;
  border: none;
  padding-left:10px;
  padding-right:10px;
}
</style>
