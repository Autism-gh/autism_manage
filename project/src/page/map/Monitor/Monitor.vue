<template>
    <LeafletMap>
        
        <div class="time-video">
            <div class="content">
                <FlvjsVideo ref="flvplayer"></FlvjsVideo>
            </div>
            
            <div class="footer">
                <el-button type="primary" @click="startPlayVideo">开始播放</el-button>
            </div>
        </div>
        
    </LeafletMap>
</template>

<script>
// import L from '@/components/Leaflet/index'
import LeafletMap from '@/components/Leaflet/LeafletMap.vue'
import FlvjsVideo from '@/components/VideoPlayer/FlvjsVideo.vue';
export default {
    components: { LeafletMap, FlvjsVideo },
    props: {  },
    name: 'Monitor',
    data() {
       return {
            
       };
    },
    watch: {
        
    },
    computed: {
        
    },
    methods: {
        startPlayVideo() {
            const url = 'https://play.live.ulinqdata.com/live/012312312301-4.flv'
            this.$refs['flvplayer'].load(url)
        }
    },
    created() {
        
    },
    mounted() {
        
    },
};
</script>
<style lang="scss" scoped>
 .time-video {
    position: absolute;
    left: 50%;
    margin-left: -300px;
    top: 50%;
    margin-top: -200px;
    background-color: var(--color-white);
    box-shadow: var(--box-shadow-base);
    z-index: 10000;
    width: 600px;
    height: 400px;

    .content {
        height: calc(100% - 40px);
        width: 100%;
    }

    .footer {
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 10px;
    }
 }
</style>