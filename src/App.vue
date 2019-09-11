<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <br>
    <!-- <directive /> -->
    <!-- <input id="message" v-model="message" type="text">
    <button id="button" type="button" name="button" @click="myclick">
      click me
    </button>
    <button id="button2" type="button" name="button" @click="connect">
      connect?
    </button>
    <br>
    <input id="message2" v-model="cmessage" type="text">
    <button id="button3" type="button" name="button" @click="connectC">
      Connect?
    </button>
    <button id="button4" type="button" name="button" @click="send">
      send?
    </button>
    <div v-for="item in this.getdata" :key="item">
      <span>{{item}}</span>
    </div>输出返回值-->
    <!-- <div>客户端发送条数：{{ timeC }}</div>
    <div>服务端返回条数：{{ timeS }}</div>
    <div>服务端返回的数值：{{ Sdata }}</div>
    <canvas id="tutorial" width="300" height="20" /> -->
    <button id="button6" type="button" name="button" @click="connectC2">
      Connect2?
    </button>
    <button id="button5" type="button" name="button" @click="send2">
      send2?
    </button>
    <button id="button7" type="button" name="button" @click="stop2">
      stop2?
    </button>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="500"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        prop="time"
        label="时间"
      />
    </el-table>
  </div>
</template>

<script>
import { Socket } from 'dgram'
// import directive from './fuel/directive.vue'
// 引入 ipcRenderer 模块。
// const { ipcRenderer } = require('electron')
// const { spawn } = require('child_process')
// const remote = require('electron').remote
const path = require('path')
const net = require('net')
// const edge = require('electron-edge-js')

export default {
  name: 'App',
  //   components: {
  //     directive
  //   },
  data() {
    return {
    //   getdata: [],
    //   clientNew: {
    //     type: Socket
    //   },
      clientNew2: {
        type: Socket
      },
      //   timeC: 0,
      //   timeS: 0,
      //   Sdata: '',
      //   message: '',
      //   cmessage: '',
      tableData: [],
      Interval: ''
    }
  },
  //   mounted() {
  //     // canvas相关
  //     var canvas = document.getElementById('tutorial')
  //     var ctx = canvas.getContext('2d')
  //     var img = new Image()
  //     img.src = './火焰2.jpg'
  //     img.onload = function() {
  //       ctx.drawImage(img, 0, 0)
  //     }
  //   },
  methods: {
    // myclick() {
    //   // 使用 ipcRenderer.send 向主进程发送消息。
    //   ipcRenderer.send('asynchronous-message', this.message)
    // },
    // connect() {
    //   spawn('ExampleGUI.exe', {
    //     cwd: 'E:/namePipesDemo/named-pipe-wrapper/ExampleGUI/bin/Debug', // 运行子进程的目录
    //     detached: true// 让父进程退出后，子进程能独立运行
    //   })
    //     // 当子进程退出时，检查是否有错误，同时关闭文件流
    //     .on('exit', function(code) {
    //       if (code !== 0) {
    //         console.log('Failed: ' + code)
    //       } else {
    //         console.log('Failed: ' + code)
    //       }
    //     })
    //   // console.log(path.join(__dirname, '../Debug'))
    // },
    // connectC() {
    //   var client = net.createConnection({ path: path.join('\\\\.\\pipe', 'haha') }, () => {
    //     // 'connect' listener
    //     console.log('connected to server!')
    //   })
    //   this.clientNew = client
    //   client.on('data', (dataNew) => {
    //     this.timeS++
    //     this.Sdata = dataNew
    //     this.getdata.push(dataNew.toString())
    //   })
    //   client.on('end', () => {
    //     console.log('connected end!')
    //   })
    // },
    // myfunc(Interval) {
    //   console.time()
    //   const buf = new Buffer((this.timeC++).toString())
    //   const buf1 = new Buffer(4)
    //   buf1.writeUInt32BE(buf.length, 0, 4)
    //   this.clientNew.write(buf1)
    //   this.clientNew.write(buf)
    //   console.log('myfunc ' + Interval)
    //   console.timeEnd()
    // },
    // send() {
    //   // const myInterval =
    //   setInterval(this.myfunc, 10, 'Interval')
    // //   setTimeout(() => {
    // //     clearTimeout(myInterval)
    // //     console.log('3000s stop interval1 of setInterval.')
    // //   }, 50000)
    // },
    tableRowClassName({ row, rowIndex }) { // 将表格奇数行改变颜色
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      } else if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    },
    connectC2() {
      var client = net.createConnection({ path: path.join('\\\\.\\pipe', 'tabletest') }, () => {
        // 'connect' listener
        console.log('connected to server!')
      })
      this.clientNew2 = client
      client.on('data', (dataNew) => {
        this.tableData = JSON.parse(dataNew.toString())
      })
      client.on('end', () => {
        console.log('connected end!')
      })
    },
    send2() {
      this.Interval = setInterval(() => {
        const buf = new Buffer('哈哈哈')
        const buf1 = new Buffer(4)
        buf1.writeUInt32BE(buf.length, 0, 4)
        this.clientNew2.write(buf1)
        this.clientNew2.write(buf)
      }, 500, 'Interval')
    },
    stop2() {
      clearInterval(this.Interval)
    }
  }
}

// 监听主进程返回的消息
// ipcRenderer.on('asynchronous-reply', function(event, arg) {
//   console.log(arg)
// })
// ipcRenderer.on('ping', function(event, arg) {//接受主进程主动返回的消息的测试
//   console.log(arg)
// })

// 使用remote传递数据
// const BrowserWindow = remote.BrowserWindow
// var win = new BrowserWindow({ width: 800, height: 600 })
// win.loadURL('https://github.com')

// 调用其他语言代码，由于Node版本问题现在无法调用
// var helloWorld = edge.func("E:/namePipesDemo/named-pipe-wrapper/ExampleGUI/bin/Debug/NamedPipeWrapper.dll");
// helloWorld(function (error, result) {
//   if (error) throw error;
//   console.log(result);
// })
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #efebf9;
  }

</style>
