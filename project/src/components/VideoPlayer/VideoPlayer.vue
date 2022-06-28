<template>
  <div class="video-container">
    <div class="no-data" v-show="!haveUrl">监控画面</div>
    <div class="video-center" v-show="haveUrl">
      <video-player
          ref="videoPlayer"
          :options="playerOptions"
          v-on="$listeners"
          @ready="playerReadied">
      </video-player>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'


/**
 *   可以抛出的事件
 *  'loadeddata',
    'canplay', 
    'canplaythrough', 
    'play', 
    'pause', 
    'waiting', 
    'playing', 
    'ended',
    'error',
    'timeupdate'
 * 
 */


export default {
  name: 'VideoPlayer',
  components: { videoPlayer },
  props: {  },
  data () {
    return {
      playerOptions: {
          //播放速度
          playbackRates: [0.7, 1.0, 1.5, 2.0], 
          //如果true,浏览器准备好时开始回放。
          autoplay: false,
          // 默认情况下将会消除任何音频。
          muted: false, 
          // 导致视频一结束就重新开始。
          loop: false, 
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: 'auto', 

          language: 'zh-CN',
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: '16:9', 
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true, 

          sources: [],

          //你的封面地址
          poster: "poster.jpg", 

          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true 
          }
      },


      videoInstance: null
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },

    haveUrl() {
        const { sources } = this.playerOptions
        return sources && sources.length && sources.filter(item => item.url !== '').length
    }
  },
  methods: {
      playerReadied(player) {
        console.log('player', player)
        // player.tech({ IWillNotUseThisInPlugins: true }).hls
        // player.tech_.hls.xhr.beforeRequest = function(options) {
        //   // console.log(options)
        //   return options
        // }
      },

      init(options) {
        Object.assign(this.playerOptions, options)
        console.log('this.playerOptions', this.playerOptions.sources)
      },

      setProgress(url) {
        this.player.src(url)
      },
      
      play() {
        this.player.play()
      },

      stop() {
        this.player.pause()
      },

      fullScreen() {
        this.player.requestFullscreen()
      },

      editScreen() {
        this.player.exitFullscreen()
      },

      reset() {
        this.player.reset()
      },

      getSource() {
        return this.player.currentSources()
      },

      showControl(type) {
        this.player.controls(type)
      }

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

  },
}
</script>
<style lang="scss" scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 100%;

  .no-data {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url('~@/assets/images/video/no-url.jpg') no-repeat;
  }

  .video-center {
    width: 100%;
    height: 100%;
  }

}
</style>
