<template>
  <div class="video-container">
    <video ref="videoRef" class="video-center" :class="prefix"></video>
  </div>
</template>
<script>

const videojs = require('video.js')
videojs.addLanguage('zh', require('./lib/videojs-zh.json'))

export default {
  name: 'JsVideo',
  components: {  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },

    prefix: {
        type: String,
        default: 'video-skin'
    },

    url: {
        type: String,
        default: () => {}
    },

    muted: {
        type: Boolean,
        default: false,
    },

    autoplay: {
        type: Boolean,
        default: false
    },

    playProcess: {
        type: [String, Number],
        default: 0
    }
  },
  data () {
    return {
        videoInstance: null,
        
        
        videoPlay: false, // 是否正在播放

        videoEnd: false, // 是否播放结束

        showPoster: true, // 是否显示视屏封面

        showLoading: false, // 加载中

        currentTime: 0, // 当前播放位置

        videoTimeLong: 0,
    }
  },
  computed: {
    formatUrl() {
        return this.url || ''
    }
  },
  watch: {
    formatUrl(newVal) {
        if(!newVal) {
            this.pause()
            return
        }
    }
  },
  methods: {
    initVideoPlayer() {
        const videoOptions = Object.assign({
          autoplay: false,                    
          controls: true,
          preload: 'auto',                
          fluid: false,                   
          muted: false,
          width: '100%',
          height: '100%',
          language: 'zh',
          controlBar: {
              remainingTimeDisplay: false,
              playToggle: {},
              progressControl: {},
              fullscreenToggle: {},
              volumeMenuButton: {
                  inline: false,
                  vertical: true
              }
          },
          techOrder: ['html5'],          
          plugins:{}
        }, this.options)


        const _self = this

        this.videoInstance = videojs(this.$refs['videoRef'], videoOptions, function() {
          _self.$emit('ready', this)
          const events = [
            'play', 'pause', 'waiting', 'playing', 'ended', 'timeupdate', 'error', 'loadeddata', 'canplay', 'canplaythrough'
          ]

          events.forEach(event => this.on(event, () => _self.eventEmiter(event, this)))
        })
    },


    eventEmiter(event,...values){
        this.$emit(event, values)
    },


    destoryVideoInstance() {
        if (this.videoInstance) {
            this.videoInstance.pause()
            this.videoInstance.reset()

            const domInstance = this.$refs['videoRef']

            videojs(domInstance).dispose()

            if (!domInstance) {
                var video = document.createElement('video')
                video.className = 'video-js ' + this.prefix
                this.$el.appendChild(video)
            }
            this.videoInstance = null
        }
    },

    changeVideo(parmas) {
      // parmas { src: 'url', type: 'mp4' }
      this.videoInstance && this.videoInstance.src(parmas)
    },

    play() {
        this.videoInstance && this.videoInstance.play()
    },

    pause() {
        this.videoInstance && this.videoInstance.pause()
    },

    reset() {
        this.videoInstance && this.videoInstance.reset()
    },

    fullScreen() {
        this.videoInstance && this.videoInstance.requestFullscreen()
    },

    editScreen() {
        this.videoInstance && this.videoInstance.exitFullscreen()
    },

    close() {
        this.pause()
        this.reset()
    },

    showControl(type) {
        this.videoInstance &&  this.videoInstance.controls(type)
    }
  },
  beforeCreate () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {
    this.initVideoPlayer()
  },
  beforeDestroy() {
    this.destoryVideoInstance()
  },
}
</script>
<style lang="scss" scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 100%;

  .video-center {
    width: 100%;
    height: 100%;
  }
}
</style>
