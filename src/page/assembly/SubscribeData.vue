<template>
<el-row class="mqtt-container">
    <el-row  class="header">
        <el-button type="primary" @click="startRealSubscript">开始订阅 PLANA</el-button>
        <el-button type="primary" @click="stopRealSubscript">关闭订阅 PLANA</el-button>
        <span :class="['margin--lr', subscriptState ? 'text--success':'text--danger']">{{ subscriptState ? '开':'关' }}</span>

        <el-button type="primary" @click="startRealSubscriptB">开始订阅 PLANB</el-button>
        <el-button type="primary" @click="stopRealSubscriptB">关闭订阅 PLANB</el-button>
        <span>打开F12看日志</span>
    </el-row>
    <el-row class="main">
        <el-col :span="8" class="area">
            <el-row class="title">topicA</el-row>
            <CodeArea v-for="(item, index) in Alist" :key="index" color :code="item" ></CodeArea>
        </el-col>
        <el-col :span="8" class="area">
            <el-row class="title">topicB</el-row>
            <CodeArea v-for="(item, index) in Blist" :key="index" color :code="item" ></CodeArea>
        </el-col>
        <el-col :span="8" class="area">
            <el-row class="title">topicC</el-row>
            <CodeArea v-for="(item, index) in Clist" :key="index" color :code="item" ></CodeArea>
        </el-col>
    </el-row>
</el-row>
</template>
<script>

import { MQTT_topicA, MQTT_topicB, MQTT_topicC } from '@/service/mqttservice'
import CodeArea from '@/components/CodeArea/CodeArea'
export default {
  name: 'SubscribeData',
  components: { CodeArea },
  data () {
    return {
        realSubscript: [],

        subscriptState: false,

        Alist: [],

        Blist: [],

        Clist: [],

        mqttinstance: null
    }
  },
  computed: {

  },
  methods: {

      startRealSubscriptB() {
          this.mqttinstance.subscribe('testtopic', this.testMessage)
      },

      testMessage(name, data) {
          console.log('name', name, data)
      },

      stopRealSubscriptB() {
          this.mqttinstance.unsubscribe('testtopic', this.testMessage)
      },

      /**
       * 
       * 这里的 AB 都是无向上订阅，即数据过来且页面内订阅我来者不拒直接show 
       * C 则是真正的订阅形式的
       * 
       */
      startRealSubscript() {
          this.stopRealSubscript()

          this.realSubscript.push(
              MQTT_topicA.subscribe(msg => {
                  this.Alist.push(msg)
              }),
              MQTT_topicB.subscribe(msg => {
                  const { payloadString } = msg
                  this.Blist.push(JSON.parse(payloadString))
              }),
              MQTT_topicC.subscribe(msg => {
                  const { payloadString } = msg
                  this.Clist.push(JSON.parse(payloadString))
              })
          )

          this.subscriptState = true
      },

      stopRealSubscript() {
          if(this.realSubscript.length) {
              this.realSubscript.forEach(item => item.unsubscribe())
          }

          this.subscriptState = false
      }
  },
  beforeCreate () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {
    this.mqttinstance = this.$getMqtt()
    if(!this.mqttinstance.connected) {
        this.mqttinstance.connect()
    }
  },
  beforeDestroy() {
      this.stopRealSubscript()
  },
}
</script>
<style lang="scss" scoped>
.mqtt-container {
    width: 100%;
    height: 100%;
    padding: var(--default-padding);

    .header {
        height: 60px;
        background-color: var(--color-white);
        display: flex;
        align-items: center;
        padding: 0 var(--default-padding);
    }

    .main {
        margin-top: var(--default-padding);
        height: calc(100% - 60px - #{var(--default-padding)});
        background-color: var(--color-white);

        .area {
            height: 100%;
            overflow-y: auto;
            padding: var(--default-padding);
            margin-bottom: var(--default-padding);
        }

        .title {
            line-height: 40px;
            text-align: center;
        }
    }
}
</style>
