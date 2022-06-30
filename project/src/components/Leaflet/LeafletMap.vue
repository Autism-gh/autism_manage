<template>
  <div class="leaflet-container">
    <div class="leaflet-center" ref="leafletref"></div>

    <!-- 右上角控制器 -->
    <div class="leaflet-control-container">
      <div class="control-row bg" v-show="control.show">
        <div class="row" @click="addNewView"><IconBtn icon="el-icon-aim" title="我的视野"></IconBtn></div>
        <div class="row" @click="startMeasureEvent"><IconBtn icon="el-icon-sugar" title="距离测量"></IconBtn></div>
        <div class="row" @click="startDrawControl"><IconBtn icon="el-icon-map-location" title="采集位置"></IconBtn></div>
        <div class="row"><IconBtn icon="el-icon-view" title="显示控制"></IconBtn></div>
      </div>
      <div class="box-btn" @click="control.show = !control.show">
        <i class="el-icon-menu"></i>
      </div>
    </div>

    <!-- 左上角查询 -->
    <MapSearch ref="mapsearch"></MapSearch>

  </div>
</template>
<script>
import L from './index'
import MapSearch from './components/MapSearch.vue'
import DrawTool from './util/DrawTool'
export default {
  name: '',
  components: { MapSearch },
  props: {  
    propOptions: {
      type: Object,
      default: function() {
          return {}
      }
    },

    center: {
      type: Array,
      default: () => {
        return [30.266597,120.152585]
      }
    }

  },
  data () {
    return {
        mapInstance: null,

        mapTitleLayer: null,

        scaleLayer: null,


        control: {
          show: true,
          list: [],
          map: []
        },

        drawTool: null,


        waitForInit: null,

        promiseResolve: null,
    }
  },
  computed: {
    formatOptions() {
        return Object.assign({
            minZoom: 3,
            maxZoom: 18,
            zoom: 10,
            tapTolerance: 25,
            zoomControl: false,
            attributionControl: false,
            crs: L.CRS.EPSG3857,
            center: this.center
        }, this.propOptions)
    }
  },
  methods: {
    readyMap() {
      // 比例尺
      this.scaleLayer = L.control.scale({imperial: false })
    },

    generateMap() {
        this.mapInstance = L.map(this.$refs['leafletref'] , this.formatOptions)

        this.mapTitleLayer = L.tileLayer.chinaProvider(
            'GaoDe.Normal.Map', { 
            maxZoom:18, minZoom:3
        }).addTo(this.mapInstance);

        
        this.reflashMap()
        this.promiseResolve(this.mapInstance)
        this.$emit('ready', this.mapInstance)

        this.changeScale(true)
    },


    changeMapLayer() {

    },


    startDrawControl() {
      if(!this.drawTool) {
        this.drawTool = new DrawTool(this.mapInstance)
        this.drawTool.create()
      }
      this.drawTool.draw('Circle')
    },

    startMeasureEvent() {
      this.drawTool.draw('Rectangle')
    },

    
    addNewView() {
      const parmas = this.drawTool.getParmas()
      console.log('parmas', parmas)
    },

    changeScale(type) {
      if(type) {
        this.scaleLayer.addTo(this.mapInstance)
      } else {
        this.scaleLayer.remove()
      }
    },

    reflashMap() {
        if(this.mapInstance) this.mapInstance.invalidateSize()
    },

    distoryMap() {
        if(this.mapInstance) this.mapInstance.remove()
    },
  },
  beforeCreate () {

  },
  created () {
    this.waitForInit = new Promise((resolve => {
        this.promiseResolve = resolve;
    }))
  },
  beforeMount () {

  },
  mounted () {
    this.readyMap()
    this.generateMap()
  },
  beforeDestroy() {
    this.distoryMap()
  },
  activated() {
    this.reflashMap()
  },
}
</script>
<style lang="scss" scoped>
@import './scss/leaflet-custom.scss';
.leaflet-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.leaflet-center {
    height: 100%;
    width: 100%;
}
</style>
