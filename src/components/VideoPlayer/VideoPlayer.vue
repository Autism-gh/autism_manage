<template>
  <div class="video-container">
    <div class="no-data" v-if="!playOptions">{{ title }}</div>
    <div class="video-center" v-else>
      <video-player
          ref="videoPlayer"
          :playsinline="true"
          :options="formatOptions"
          v-on="$listeners">
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
  props: {  
    title: {
      type: String,
      default: '监控页面'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      playOptions: null
    }
  },
  computed: {
    urlOptions() {
      return this.playOptions || []
    },

    formatOptions() {
      return Object.assign({
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

          sources: this.urlOptions,
          //你的封面地址
          // poster: "poster.jpg", 

          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          
          controlBar: {
            timeDivider: true, 
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true 
          }
      }, this.options)
    },

    player() {
      return this.$refs['videoPlayer']?.player
    }
  },
  methods: {
      async changeVideo(options) {
        this.reset()
        const { type } = options
        const format = Object.assign(options, {
          type: type || 'video/mp4'
        })
        this.playOptions = [format]

        await this.$nextTick()
        this.play()
      },

      play() {
        this.player && this.player.play()
      },

      pause() {
        this.player && this.player.pause()
      },

      close() {
        this.stop()
        this.reset()
        this.playOptions = null
      },

      fullScreen() {
        this.player && this.player.requestFullscreen()
      },

      editScreen() {
        this.player && this.player.exitFullscreen()
      },

      reset() {
        this.player && this.player.reset()
      },

      getSource() {
        return this.player ? this.player.currentSources() : null
      },

      showControl(type) {
        this.player &&  this.player.controls(type)
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

<style lang="scss">
.video-container {
  .video-js {
    height: 100%;
    width: 100%;
    &.vjs-fluid, &.vjs-16-9, &.vjs-4-3, &.vjs-9-16, &.vjs-1-1 {
      &:not(.vjs-audio-only-mode) {
        height: 100%;
        padding: 0;
      }
    }

    .vjs-big-play-button {
      left: 50%;
      top: 50%;
      margin-left: -45px;
      margin-top: -25px;
    }
  }
}
</style>
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
  }

  .video-center {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .video-player {
    height: 100%;
    width: 100%;
  }
}
</style>
