<template>
  <div class="video-container">
    <video v-if="videoRet" class="video-center"
        ref="jsVideoRef"
        preload="auto"
        :controls="controls"
        :muted="muted"
        :autoplay="autoplay">
        <source :src="formatUrl" type="video/mp4" />
    </video>
  </div>
</template>
<script>
export default {
  name: 'JsVideo',
  components: {  },
  props: {
    url: {
        type: String,
        default: ''
    },

    muted: {
        type: Boolean,
        default: false,
    },

    controls: {
        type: Boolean,
        default: true,
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
        videoRet: true,

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
        if(!newVal) return

        this.domRefresh()
    }
  },
  methods: {
    async domRefresh() {
        this.videoRet = false
        await this.$nextTick()
        this.videoRet = true
    },

    async initVideoPlayer() {
        await this.domRefresh()

        this.videoInstance = this.$refs['jsVideoRef']
        
        this.videoInstance.addEventListener("playing", () => {
            this.showPoster = false;
            this.videoPlay = true;
            this.showLoading = false;
            this.videoEnd = false;
            this.$emit("playing")
        });

        this.videoInstance.addEventListener("durationchange", () => {
            this.videoTimeLong = this.videoInstance.duration;
            // 存在播放历史记录
            this.videoInstance.currentTime = this.playProcess || 0;
        });


        this.videoInstance.addEventListener("pause", () => {
            this.videoPlay = false;
            if (this.videoInstance.currentTime < 0.1) {
                this.showPoster = true;
            }
            this.showLoading = false;
            this.$emit("pause")
        });


        this.videoInstance.addEventListener("timeupdate", () => {
            // 存储当前播放进度
            this.currentTime = this.videoInstance.currentTime;
        }, false);

        
        this.videoInstance.addEventListener("ended", () => {
            // 重置状态
            this.videoPlay = false;
            this.showPoster = true;
            this.videoEnd = true;
            this.currentTime = JSON.parse(JSON.stringify(this.videoTimeLong));
        });
    },


    play() {
        if(!this.videoInstance) return
        
        // 已经播放完了
        if(this.videoEnd) {
            this.currentTime = 0;
            this.videoInstance.currentTime = 0;
        }

        this.videoInstance.play();
        this.videoPlay = true;
    },

    pause() {
        if(!this.videoInstance) return
        this.videoInstance.pause()
        this.videoPlay = false
    },

    destroyed() {
        if(this.videoInstance) {
            this.videoInstance.pause()
            this.videoInstance = null
            this.videoRet = false
        }
    },
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
    this.destroyed()
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
