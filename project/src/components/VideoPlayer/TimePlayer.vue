<template>
  <div class="time-video">
    <div class="video-no-data" v-show="!handleing">
        <i class="el-icon-video-play" v-show="videoInfo.length" @click="_loadSource"></i>
    </div>
    <div class="video-center" v-show="handleing">
        <FlvjsVideo ref="player"
            @ready="_onPlayerMounted">
        </FlvjsVideo>
    </div>

    <div class="video-change" v-show="videoInfo.length">
        <div class="name" @click="channelShow = !channelShow">
            {{ activeChannel || '通道' }}
        </div>
        <el-collapse-transition>
            <ul v-show="channelShow">
                <li :class="activeChannel === item.name ? 'active' : ''" 
                    v-for="item in videoInfo" :key="item.key" 
                    @click="changePlayChannel(item)">
                    {{ item.name }}
                </li>
            </ul>
        </el-collapse-transition>
    </div>
  </div>
</template>
<script>
import FlvjsVideo from './components/FlvjsVideo.vue'

const VIDEO_URL = process.env.VUE_APP_TIME_VIDEO_URL

export default {
  name: 'TimeVideo',
  components: { FlvjsVideo },
  props: {  
    // 车辆数据，至少包含 SIM + 通道号
    videoData: {
        type: Array,
        default: () => []
    },  

    autoPlay: {
        type: Boolean,
        default: false
    }
  },
  data () {
    return {
        player: null,

        prefix: '【TIME-VIDEO】',

        loading: false,

        loaded: false,  // 当前是否有请求的加载流

        activeUrl: '',

        handleing: false,

        activeChannel:  null,

        channelShow: false,

        requestLoadSourceHandle: null,

        timeOutTimer: null,

        timeOut: 10 * 1000,
    }
  },
  computed: {
    playerInstance() {
        return this.$refs['player']
    },  
    videoInfo() {
        return this.videoData  || []
    },
    formatUrl() {
        // return 'https://play.live.ulinqdata.com/live/012312312301-4.flv'
        return this.activeUrl ? `${ VIDEO_URL }/${ this.activeUrl }.flv` : ''
    }
  },
  watch: {
    videoInfo(newVal) {
        this.changePlayChannel(newVal?.[0])
    }
  },
  methods: {
        changePlayChannel({ name, url } = {}) {
            if(!name) return
            this.activeChannel = name
            this.activeUrl = url
            if(this.loaded) {
                this._loadSource()
            }
            this.channelShow = false
        },


        async _loadSource() {
            await this._freeSource()
            await this._requestSource()
        },


        stopLoadSource() {
            this.loaded = false
            if(this.playerInstance) {
                this.playerInstance.pause()
                this.playerInstance.unload()
            }
        },


        startTimeOut() {
            this.clearRequestTimer()
            this.timeOutTimer = setTimeout(() => {
                this.handleing = false
                // 释放资源
                this.stopRequestVideo('请求超时')
                this.$warning('请求监控视频超时')
            }, this.timeOut)
        },
        

        stopRequestVideo(name) {
            if(this.requestLoadSourceHandle) {
                this.requestLoadSourceHandle.reject({from: 'interrupt', msg: name});
                this.requestLoadSourceHandle = null;
            }
        },

        
        clearRequestTimer() {
            if(this.timeOutTimer) {
                clearTimeout(this.timeOutTimer)
                this.timeOutTimer = null
            }
        },
        

        /**
         * 
         * 释放之前播放流
         * 
         */
        async _freeSource() {
            try {
                this.loading = true
                this.handleing = false
                // 如果此时再请求别的，尝试直接打断请求
                this.stopRequestVideo('人工打断视频请求')
                // 停止现有的实时视频加载
                this.stopLoadSource()

                // 调一下接口高速后端不需要上一次的实时视频流了让他关闭
                console.log(`${ this.prefix }:: 释放之前的请求`)
            } catch (error) {
                console.log('error', error)
            } finally {
                this.loading = false
            }
        },


        /**
         * 
         * 请求开启播放流
         * 
         */
        async _requestSource() {
            this.loading = true
            this.handleing = true
            await this.$nextTick()

            // 开始超时鉴定
            this.startTimeOut()

            try {
                console.log(`${ this.prefix }:: 请求视频地址`, this.formatUrl)

                await Promise.race([
                    //  设置个卡子 允许中断操作
                    new Promise((resolve, reject) => {
                        this.requestLoadSourceHandle = {resolve, reject};
                    }),

                    Promise.all([
                        (async () => {

                            // 这里再次之前要调接口的哦，让视频开始推流
                            console.log(`${ this.prefix }:: 视频指令下发成功`)

                        })(),

                        // 开始加载实时视频
                        this.playerInstance.load(this.formatUrl)
                    ]),
                ])

                // 有东西返回了
                this.requestLoadSourceHandle.resolve();
                this.requestLoadSourceHandle = null;
                this.loaded = true
                
                // 有结果过来了，不管什么结果结束 timeout 再说
                this.clearRequestTimer()
                console.log(`${ this.prefix }:: 开始播放视频`)
            } catch (error) {
                console.log('error', error)
            }
        },

        _onPlayerMounted() {
            console.log(`${ this.prefix }:: 初始化完成`)
        },
  },
  beforeCreate () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {

  },
  beforeDestroy() {
    this._freeSource()
    this.clearRequestTimer()
  },
}
</script>
<style lang="scss" scoped>
.time-video {
    position: relative;
    width: 100%;
    height: 100%;

    .video-no-data {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url('~@/assets/images/video/no-url.jpg') 100% 100% no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            font-size: 40px;
            color: #FFFFFF;
            cursor: pointer;
        }
    }

    .video-center {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .video-change {
        position: absolute;
        z-index: 10;
        top: 5px;
        right: 5px;
        
        .name {
            background: var(--color-white);
            border-radius: 2px;
            padding: 0 6px;
            font-size: 12px;
            cursor: pointer;
        }

        ul {
            font-size: 12px;
            background: var(--color-white);
            width: max-content;
            padding: 0 6px;
            border-radius: 2px;
            margin-top: 5px;

            li {
                cursor: pointer;
                line-height: 20px;

                &:hover {
                    color: var(--color-primary);
                }

                &.active {
                    color: var(--color-primary);
                }
            }
        }
    }
}
</style>
