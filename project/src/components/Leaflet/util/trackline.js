
import L from '@/components/Leaflet/leaflet'
import { leafletMapIcon } from '@/components/Leaflet/maputils'
import { isNumber, isObject } from '@/util/common/type-check'

class TrackLine {
    constructor(map) {
        // 地图实例
        this.mapInstance = map

        this.activePolyline = null
        this.activeOptions = {
            weight: 8,
            opacity: 1,
            color: '#FF9900'
        }

        this.playedPolyline = null
        this.playedOptions = {
            weight: 8,
            opacity: 1,
            color: 'red'
        }
        this.playedList = []

        this.activeDecorator = null

        this.activeMarker = null

        this.featureGroup = null

        this.playedSpeed = 1

        this.isDrawed = false
    }

    /**
     * 创建好线，起点终点
     * @param {经纬度列表} latlng 
     */
    create(list) {
        if(!list || !list.length) return

        this.playedList = []

        const latlng = list.map(item => [+item.lat, +item.lng])

        const speedList = list.map(item => +item.speed || 0)
        
        const startLatlng = latlng[0]
        const endLatlng = latlng[latlng.length - 1]

        // 起点终点
        const startMarker = new L.Marker(startLatlng, { icon: leafletMapIcon['start'] })
        const endMarker = new L.Marker(endLatlng, { icon: leafletMapIcon['end'] })

        this.featureGroup = new L.FeatureGroup([startMarker, endMarker])
        this.mapInstance.addLayer(this.featureGroup)
        
        // 轨迹线
        this.activePolyline = L.polyline(latlng, this.activeOptions).addTo(this.mapInstance)

        // 已经播放的线
        this.playedPolyline = L.polyline(this.playedList, this.playedOptions).addTo(this.mapInstance)

        // 线上的麻子
        this.activeDecorator = L.polylineDecorator(this.activePolyline, {
            patterns: [
                {
                    // 箭头起始位置距离线条两端的距离
                    // offset: 30,

                    // 箭头重复的间隔
                    repeat: 100,

                    // 箭头配置
                    symbol: L.Symbol.arrowHead({
                        // 箭头大小
                        pixelSize: 5,   

                        // 箭头角度
                        headAngle: 75,  

                        // 箭头是否为多边形
                        polygon: false, 

                        // 路径配置
                        pathOptions: {
                            stroke: true,
                            //箭头粗细
                            weight: 5,
                            //箭头颜色
                            color: '#FFFFFF'
                        }
                    })
                }
            ]
        }).addTo(this.mapInstance)

        const listLine = this.activePolyline.getLatLngs()

        this.activeMarker = L.animatedMarker([...listLine], {
            speedList: speedList,
            interval: 200, // 默认为100mm
            icon: leafletMapIcon['online'],
            playCall: () => {
                this.playedList && this.playedList.push(latlng)
                console.log('this.playedList', this.playedList)
                this.playedList && this.playedPolyline.setLatLngs(this.playedList)
            }
        }).addTo(this.mapInstance)

        this.isDrawed = true

        this.mapInstance.fitBounds(this.activePolyline.getBounds())
    }


    updatePlayedLine(latlng) {
        console.log('s', this)
        console.log('latlng', latlng)
        this.playedList && this.playedList.push(latlng)
        console.log('this.playedList', this.playedList)
        this.playedList && this.playedPolyline.setLatLngs(this.playedList)
    }


    clear() {
        if(this.featureGroup) {
            this.featureGroup.clearLayers()
            this.featureGroup = null
        }

        if(this.activePolyline) {
            this.mapInstance.removeLayer(this.activePolyline)
            this.activePolyline = null
        }

        if(this.playedPolyline) {
            this.mapInstance.removeLayer(this.playedPolyline)
            this.playedPolyline = null
        }
        
        if(this.activeDecorator) {
            this.mapInstance.removeLayer(this.activeDecorator)
            this.activeDecorator = null
        }

        if(this.activeMarker) {
            this.mapInstance.removeLayer(this.activeMarker)
            this.activeMarker = null
        }

        if(this.playedList) {
            this.playedList = []
        }

        this.isDrawed = false
    }

    /**
     * 
     * 播放过的操作
     * 
     */
    setPlayedStyle(options) {
        if(!options || !isObject(options)) return
        if(this.playedPolyline) {
            this.playedPolyline.setStyle(options)
            Object.assign(this.playedOptions, options)
        }
    }


    /**
     * 
     * 箭头线条
     * 
     */
    setPolylinePatterns(patterns) {
        if(!patterns) return

        if(this.activeDecorator) {
            this.activeDecorator.setPatterns(patterns)
        }
    }



    /**
     * 
     * 线操作
     * 
     */
    setPolylineStyle(options) {
        if(!options || !isObject(options)) return
        if(this.activePolyline) {
            this.activePolyline.setStyle(options)
            Object.assign(this.activeOptions, options)
        }
    }


    /**
     * 方向  经纬度   图标  透明度
     * dire, latlng, icon, opacity
     * 点操作
     * 
     */
    setProgress() {

    }

    start() {
        this.activeMarker && this.activeMarker.start()
    }

    pause() {
        this.activeMarker && this.activeMarker.pause()
    }

    speedUp() {
        this.setPlaySpeed(this.playedSpeed * 2)
    }

    speedDown() {
        this.setPlaySpeed(this.playedSpeed / 2)
    }

    stop() {
        this.playedList = []
        this.activeMarker.stop()
    }

    setPlaySpeed(speed) {
        if(!isNumber(speed)) return
        this.playedSpeed = speed
        this.activeMarker.setSpeetX(speed)
    }

    setMarkerStyle({ dire, latlng, icon, opacity }) {
        if(!this.activeMarker) return
        if(icon) {
            this.activeMarker.setIcon(icon)
        }
        if(latlng) {
            this.activeMarker.setLatLng(latlng)
        }
        if(dire) {
            this.activeMarker.setRotationAngle(dire)
        }
        if(opacity) {
            this.activeMarker.setOpacity(opacity)
        }
    }


    destroy() {
        this.clear()
    }
}


export default TrackLine