<template>
    <div class="trackback">
        <LeafletMap ref="leafletmap" @ready="startTool"></LeafletMap>

        <div class="trackback__control">
            <div class="row">
                <span class="title">轨迹宽度</span>
                <div class="control">
                    <el-slider @change="changeLineOptions('width')" v-model="line.weight" :step="1" :min="1" :max="10"></el-slider>
                </div>
            </div>
            <div class="row">
                <span class="title">轨迹颜色</span>
                <div class="control">
                    <el-color-picker  @change="changeLineOptions('color')" v-model="line.color"></el-color-picker>
                </div>
            </div>
            <div class="row">
                <span class="title">轨迹透明</span>
                <div class="control">
                    <el-slider v-model="line.opacity"  @change="changeLineOptions('opacity')" :step="0.1" :min="0" :max="1"></el-slider>
                </div>
            </div>
            <div class="row">
                <span class="title">播放颜色</span>
                <div class="control">
                    <el-color-picker v-model="played.color"  @change="changePlayedOptions('color')"></el-color-picker>
                </div>
            </div>
            <div class="row">
                <span class="title">播放透明</span>
                <div class="control">
                    <el-slider v-model="played.opacity"  @change="changePlayedOptions('opacity')" :step="0.1" :min="0" :max="1"></el-slider>
                </div>
            </div>
            <div class="row">
                <span class="title">播放速度</span>
                <div class="control">
                    <el-slider v-model="playSpeed" @change="changePlaySpeed" :step="1" :min="1" :max="10"></el-slider>
                </div>
            </div>
            <div class="row">
                <el-button type="primary" @click="play">播放</el-button>
                <el-button type="primary" @click="stop">暂停</el-button>
                <el-button type="primary" @click="addSpeed">加速</el-button>
                <el-button type="primary" @click="lowSpeed">减速</el-button>
                <el-button type="primary" @click="clear">销毁</el-button>
                <el-button type="primary" @click="create">创建</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { LeafletMap, PlayLine } from '@/components/Leaflet'
import { defaultData } from './components/trackData'

export default {
    components: { LeafletMap },
    props: {  },
    name: 'TrackBack',
    data() {
       return {
           polyline: null,

           decorator: null,

           trackBackInstance: null,


           line: {
                weight: 5,
                color: '#FF9900',
                opacity: 1
           },

           played: {
                color: 'red',
                opacity: 1,
                
           },

           playSpeed: 1

       };
    },
    watch: {
        
    },
    computed: {
        mapInstance() {
            return this.$refs['leafletmap'].mapInstance
        }
    },
    methods: {
        changeLineOptions() {
            this.trackBackInstance.setPolylineStyle(this.line)
        },

        changePlayedOptions() {
            this.trackBackInstance.setPlayedStyle(this.played)
        },

        changePlaySpeed() { 
            this.trackBackInstance.startSpeedPlay(this.playSpeed)
        },


        startTool() {
            this.trackBackInstance = new PlayLine(this.mapInstance, this.handleRunStep)

            this.trackBackInstance.create(defaultData)
        },

        handleRunStep(step) {
            console.log('播放到---', step)
        },


        play() {
            this.trackBackInstance.start()
        },

        stop() {
            this.trackBackInstance.pause()
        },

        addSpeed() {
            this.trackBackInstance.speedUp()
        },

        lowSpeed() {
            this.trackBackInstance.speedDown()
        },

        clear() {
            this.trackBackInstance && this.trackBackInstance.clear()
        },

        create() {
            if(this.trackBackInstance.isDrawed) {
                this.$warning('已经创建好了')
                return
            }
            this.trackBackInstance.create(defaultData)
        }
    },
    created() {
        
    },
    mounted() {
        
    },

    beforeDestroy() {
        this.trackBackInstance.destroy()
    },
};
</script>
<style lang="scss" scoped>

.trackback {
    width: 100%;
    height: 100%;
}
 .trackback__control {
    position: absolute;
    background-color: var(--color-white);
    bottom: var(--default-padding);
    left: var(--default-padding);
    box-shadow: var(--box-shadow-base);
    z-index: 1000;
    width: 400px;
    padding: 10px 20px 10px 10px;

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;

        .title {
            margin-right: 20px;
        }

        .control {
            flex-grow: 1;
        }
    }
 }
</style>