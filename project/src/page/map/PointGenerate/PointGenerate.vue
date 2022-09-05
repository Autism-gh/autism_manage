<template>
  <FlexContainer :leftWidth="480" class="pointgenerate">
        <div class="leftWrapper" slot="leftWrapper">
            <el-form ref="form" :model="formData" label-width="110px">
                <el-form-item label="坐标系类型">
                    <el-radio-group v-model="formData.activeCoordinate">
                        <el-radio-button v-for="item in coordinateList" :key="item.key" :label="item.key">{{ item.name }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="经纬度位置">
                    <el-radio-group v-model="formData.lngInBefore">
                        <el-radio-button v-for="item in lnglatlist" :key="item.key" :label="item.key">{{ item.name }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="绘制图形">
                    <el-radio-group v-model="formData.drawType">
                        <el-radio-button v-for="item in drawList" :disabled="item.disable" :key="item.key" :label="item.key">{{ item.name }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="默认颜色A">
                    <el-color-picker v-model="formData.colorA"></el-color-picker>
                </el-form-item>
                <el-form-item label="默认颜色B">
                    <el-color-picker v-model="formData.colorB"></el-color-picker>
                </el-form-item>
                <el-form-item label="图形大小">
                    <el-input-number v-model="formData.size" :min="1" :max="50"></el-input-number>
                </el-form-item>
                <el-form-item label="图形宽度">
                    <el-input-number v-model="formData.width" :min="1" :max="50"></el-input-number>
                </el-form-item>
                <el-form-item label="经纬度">
                    <el-input type="textarea" :rows="20" v-model="formData.pointString"></el-input>
                </el-form-item>

                <el-form-item label="操作">
                    <el-button type="primary" @click="generateCurrentLayer">生成图层</el-button>
                    <el-button type="danger" @click="removeMapLayer">清除当前图层</el-button>
                </el-form-item>
            </el-form>
        </div>
        <template slot="rightBottom">
            <LeafletMap ref="leafletmapref" @ready="readyMapInstance"></LeafletMap>
        </template>
  </FlexContainer>
</template>
<script>
import FlexContainer from '@/components/Layout/FlexContainer2'
import L , { LeafletMap } from '@/components/Leaflet'
import { bd09togcj02, wgs84togcj02 } from '@/util/map/coordinateChange'
import { leafletMapIcon } from '@/components/Leaflet/maputils'
export default {
  name: 'PointGenerate',
  components: { FlexContainer, LeafletMap },
  props: {  },
  data () {
    return {
        activeName: 'first',
        
        fenceGroupLayer: null,

        formData: {
            activeCoordinate: 'gcj02',  
            lngInBefore: 'lnglat',
            colorA: '#ff7940',
            colorB: '#00c1de',
            drawType: 'point',
            size: 20,
            width: 10,
            pointString: ''
        },

        drawList: [
            { name: '点', key: 'point' },
            { name: '线', key: 'line' },
            { name: '线段', key: 'linepart', disable: true },
        ],

        coordinateList: [
            { name: 'GCJ02 (高德 / 谷歌)', key: 'gcj02' },
            { name: 'WGS84 (天地图)', key: 'wgs84' },
            { name: 'BD09 (百度)', key: 'bd09' },
        ],

        lnglatlist: [
            { name: '经度在前 (lng,lat)', key: 'lnglat' },
            { name: '纬度在前 (lat,lng)', key: 'latlng' },
        ]
    }
  },
  computed: {
    mapInstance() {
        return this.$refs['leafletmapref'].mapInstance
    }
  },
  methods: {
    getFormattedLatlng() {
        let latlngList = this.formData.pointString.split(';')

        if(!latlngList || !latlngList.length) {
            this.$warning('经纬度不能为空哦，兄弟')
            return
        }

        let returnResult = []
        const { lngInBefore, activeCoordinate } = this.formData

        latlngList.forEach(item => {
            let latlng = item.split(',')
            if(!latlng || !latlng.length) return
            // 经度在前 统一改成经度在前的
            let handleLatLng
            if(lngInBefore === 'latlng') {
                handleLatLng = [latlng[1], latlng[0]]
            } else {
                handleLatLng = latlng
            }
            // 高德地图的不用管，其他的转换一下
            switch (activeCoordinate) {
                case 'wgs84':
                    handleLatLng = wgs84togcj02(handleLatLng[0], handleLatLng[1])
                    break;
                case 'bd09':
                    handleLatLng = bd09togcj02(handleLatLng[0], handleLatLng[1])
                    break;
            }
            returnResult.push([handleLatLng[1], handleLatLng[0]])
        })
        return returnResult
    },

    
    generateCurrentLayer() {
        this.removeMapLayer()
        const { drawType }  = this.formData
        switch (drawType) {
            case 'point':
                this.generatePointInfo()
                break;
            case 'line':
                this.generateLineInfo()
                break;
            case 'linepart':
                this.generateLinePartInfo()
                break;
        }

        this.mapInstance.fitBounds(this.fenceGroupLayer.getBounds())
    },

    /**
     * 测试数据
     * 120.200378,30.189977
     */
    generatePointInfo() {
        const handleList = this.getFormattedLatlng()
        if(!handleList || !handleList.length) {
            this.$warning('没有生成点数据')
            return
        }
        const { colorA, size } = this.formData
        handleList.forEach(item => {
            let icon = new L.DivIcon({
                html: `<div class="leaflet-cross" 
                        style="background-color: ${colorA}; 
                        border-radius: 50px; 
                        width: ${size}px; 
                        height: ${size}px">
                    </div>`,
                className: 'leaflet-center-text'
            })
            const marker = L.marker(item, { icon: icon, zIndexOffset: 100 })
            marker && this.fenceGroupLayer.addLayer(marker)
        })
    },

    /**
     * 测试数据
     * 120.20041,30.189198;120.202878,30.189291;120.202792,30.191711;120.206987,30.191906;120.210656,30.192221;120.210763,30.189476
     */
    generateLineInfo() {
        const handleList = this.getFormattedLatlng()
        if(!handleList || !handleList.length) {
            this.$warning('没有生成点数据')
            return
        }
        const { colorA, width } = this.formData

        const startLatlng = handleList[0]
        const endLatlng = handleList[handleList.length - 1]
        // 起点终点
        const startMarker = new L.Marker(startLatlng, { icon: leafletMapIcon['start'] })
        this.fenceGroupLayer.addLayer(startMarker)
        const endMarker = new L.Marker(endLatlng, { icon: leafletMapIcon['end'] })
        this.fenceGroupLayer.addLayer(endMarker)
        

        leafletMapIcon
        const path = L.polyline(handleList, {stroke: true, color: colorA, weight: width})
        path && this.fenceGroupLayer.addLayer(path)
    },


    generateLinePartInfo() {

    },
    

    removeMapLayer() {
        if(this.fenceGroupLayer) this.fenceGroupLayer.clearLayers()
    },


    readyMapInstance(map) {
        this.fenceGroupLayer = new L.FeatureGroup().addTo(map)
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
.pointgenerate {
    .leftWrapper {
        position: relative;
        height: 100%;
        padding: 10px 15px 10px 0;
        overflow-y: auto;
    }
}
</style>
