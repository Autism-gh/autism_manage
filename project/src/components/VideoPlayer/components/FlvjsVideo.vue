<template>
  <div class="flv-video"></div>
</template>
<script>

// import flvjs from './lib/flv'
import flvjs from 'flv.js'
flvjs.LoggingControl.enableAll = false;
import UUID from '@/assets/lib/uuid'
import moment from 'moment'
export default {
  name: 'FlvjsVideo',
  components: {  },
  props: {  },
  data () {
    return {
        playerId: null,

        videoElm: null,
        
        flvPlayerInstance: null
    }
  },
  computed: {

  },
  methods: {
    _onPlay(ev) {
        this.$emit('play', ev);
    },
    _onEnded(ev) {
        this.$emit('ended', ev);
    },
    _onLoadedData(ev) {
        this.$emit('loadeddata', ev);
    },
    _onProgress(ev) {
        this.$emit('progress', ev.target.buffered.length ? ev.target.buffered.end(0) : 0, ev);
    },
    _onTimeUpdate(ev) {
        this.$emit('timeupdate', ev.target.currentTime, ev);
    },
    _onPause() {
        this.$emit('pause', true);
    },
    _onWaiting(ev) {
        this.$emit('waiting', ev);
        this.$emit('loading', true);//没有数据足以播放时触发
    },
    _onCanPlayThrough(ev) {
        this.$emit('canplaythrough', ev);
        this.videoElm.readyState === 4 && this.$emit('loading', false);//缓冲足够的数据时触发
    },
    _onSeeked(ev) {
        this.$emit('seeked', ev);
        this.$emit('loading', false);
    },
    _onError(error) {
        this.$emit('error', error);
    },


    _initDOM() {
        let videoElm = document.createElement('video');
        videoElm.style.width = '100%';
        videoElm.style.height = '100%';
        videoElm.style.objectFit = 'fill';
        videoElm.id = this.playerId;

        // 开启按钮
        videoElm.controls = true

        //bind events
        Object.entries(this.$options.methods).filter(([key]) => key.startsWith('_on')).forEach(([key, handler]) => {
            let eventName = key.slice(3).toLowerCase();
            this[key] = handler.bind(this);
            videoElm.addEventListener(eventName, this[key]);
        })

        this.videoElm = videoElm;
        this.$el.appendChild(videoElm);
    },

    _destroy() {
        this.flvPlayerInstance?.destroy();
        if (!this.videoElm) return;
        this.$el.removeChild(this.videoElm);
        this.videoElm = null;
    },

    init() {
        this._destroy();
        this._initDOM();
    },
    

    _downloadFile(fileName, blob) {
        let aLink = document.createElement('a');
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);  //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
    },

    async load(videoUrl, hasAudio = false) {
        if (!this.videoElm) {
            throw new Error('the video element is not mounted');
        }

        this.flvPlayerInstance?.destroy();

        let flvPlayer = this.flvPlayerInstance = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            cors: true,
            hasAudio: hasAudio,//flvjs必须指定有无音轨才能解码对应视频
            hasVideo: true,
            enableStashBuffer: false,
            url: videoUrl
        }, {
            // enableWorker:true,
            autoCleanupSourceBuffer: false,
            enableStashBuffer: false,
            stashInitialSize: 128,
        });

        flvPlayer.attachMediaElement(this.videoElm);
        flvPlayer.volume = 1;
        flvPlayer.muted = true;
        flvPlayer.on(flvjs.Events.STATISTICS_INFO, (arg) => {
            this.$emit('speedChange', arg.speed.toFixed(1));
        });

        let successLoad = new Promise((resolve, reject) => {
            flvPlayer.on(flvjs.Events.ERROR, (error, type, detail) => {
                reject({from: 'flvjs', error, type, detail})
            });
            flvPlayer.on(flvjs.Events.MEDIA_INFO, () => {
                resolve()
            });
        })

        //加载资源
        await flvPlayer.load();
        //如果加载资源出错（例如流地址404了)，那么下面这个promise就不会结束
        //await flvPlayer.play();
        //所以特殊处理
        await successLoad;
        await flvPlayer.play();
    },

    // 截图
    screenShot(filename) {
        let videoE = this.videoElm;
        let canvas = document.createElement('canvas');
        canvas.width = videoE.videoWidth;
        canvas.height = videoE.videoHeight;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(videoE, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            this._downloadFile(`${filename}_${moment().format('YYYY_MM_DD_HH_mm_SS')}`, blob);
        }, 'image/jpeg', 1)
    },

    // 声音控制
    toggleMuted(muted) {
        this.flvPlayerInstance.muted = muted !== undefined ? muted : !this.flvPlayerInstance.muted;
    },
    
    unload() {
        this.flvPlayerInstance?.unload();
    },

    play() {
        this.flvPlayerInstance?.play()
    },

    pause() {
        this.flvPlayerInstance?.pause()
    },

  },
  beforeCreate () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {
    this.playerId = UUID.genV4();
    this.init();
    this.$emit('ready')
  },
  beforeDestroy() {
    this._destroy()
    
  },
}
</script>
<style lang="scss" scoped>

</style>
