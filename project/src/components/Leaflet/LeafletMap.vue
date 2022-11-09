<template>
  <div class="leaflet-container">
    <div class="leaflet-center" ref="leafletref"></div>

    <!-- 右上角控制器 -->
    <div class="leaflet-control-container">
      <div class="left_top_control bg" v-show="control.show">
        <div class="row" ><IconBtn icon="el-icon-aim" title="我的视野"></IconBtn></div>
        <div class="row" @click="startMeasureControl"><IconBtn icon="el-icon-sugar" title="距离测量"></IconBtn></div>
        <div class="row" @click="startDrawControl"><IconBtn icon="el-icon-map-location" title="采集位置"></IconBtn></div>
        <div class="row">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <IconBtn icon="el-icon-view" title="显示控制"></IconBtn>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group v-model="control.selectList" @change="controlChange">
                <div class="custom-drop-row" v-for="item in control.list" :key="item.key" >
                  <el-checkbox 
                    :label="item.key">
                    {{ item.name }}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="right_top_btn" @click="control.show = !control.show">
        <i class="el-icon-menu"></i>
      </div>
    </div>

    <!-- 左上角查询 -->
    <MapSearch v-if="control.searchSwitch" ref="mapsearch" :area="bottomaddress.active"></MapSearch>

    <MapPopup ref="addressCollect" :minWidth="250" :offset="[0, -20]">
        <div class="address_popup">
            <li><span>经度:</span><span>{{ address.result.lng }}</span></li>
            <li><span>维度:</span><span>{{ address.result.lat }}</span></li>
            <li><span>地址:</span><span>{{ address.result.address }}</span></li>
        </div>
    </MapPopup>

    <div class="leaflet-bottom-address" v-show="control.bottomSwitch"><span>{{ bottomaddress.format }}</span></div>

    <slot></slot>
  </div>
</template>
<script>
import L from './leaflet'
import MapSearch from './components/MapSearch.vue'
import MapPopup from './components/MapPopup.vue'
import DrawTool from './util/drawcenter'
import mapmixin from './mapmixin'
import { acctiveMap } from './maputils'
export default {
  name: '',
  components: { MapSearch, MapPopup },
  mixins: [mapmixin],
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
        
        waitForInit: null,

        promiseResolve: null,

        observerInstance: null,
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

    /**
     * 
     * 生成地图的
     * 
     */
    generateMap() {
        this.mapInstance = L.map(this.$refs['leafletref'] , this.formatOptions)
        this.mapTitleLayer = L.tileLayer.chinaProvider(acctiveMap, { 
            maxZoom:18, minZoom:3
        }).addTo(this.mapInstance);
        
        this.addControOnMap()
        this.reflashMap()
        this.promiseResolve(this.mapInstance)
        this.$emit('ready', this.mapInstance)
    },

    addControOnMap() {
      // 测距
      this.polylineMeasure = new L.Polyline.Measure(this.mapInstance)

      // 生成好绘图工具箱
      this.drawToolInstane = new DrawTool(this.mapInstance, this.handleDrawCallBack)

      // 坐标采集的框框
      this.address.popup = this.$refs['addressCollect'].init(this.mapInstance)

      this.startListerCenter(this.closeSingle)

      if(this.control.selectList) {
        this.control.selectList.forEach(item => {
          this.changeCurrentControl(item, true)
        })
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
    this.generateMap()
    this.addControOnMap()

    this.observerInstance = new ResizeObserver(() => this.reflashMap())
    this.observerInstance.observe(this.$refs['leafletref'])
  },

  beforeDestroy() {
    if(this.observerInstance) {
      this.observerInstance.unobserve(this.$refs['leafletref'])
      this.observerInstance = null
    }
    this.drawToolInstane.destroy()
    this.distoryMap()
  },

  activated() {
    this.reflashMap()
  },
}
</script>
<style lang="scss">
.custom-drop-row {
  padding: 0 8px;
  line-height: 20px;
}
</style>

<style lang="scss">
@import './scss/leaflet-custom.scss';
</style>

<style lang="scss" scoped>
.leaflet-container {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 12px;
}

.leaflet-center {
    height: 100%;
    width: 100%;
}
</style>
