import L from './leaflet'

import {
    getArrayDifference
} from '@/util/common/common'
import {
    getAddressByLnglat
} from '@/util/map/mapGaodeWebApi'
import {
    acctiveMap,
    timmeMap
} from './maputils'

export default {
    data() {
        return {
            scaleLayer: null,

            polylineMeasure: null,

            drawToolInstane: null,

            minimapLayer: null,

            trafficLayer: null,

            address: {
                popup: null,
                marker: null,
                result: {}
            },

            control: {
                searchSwitch: true,
                show: true,
                list: [{
                        name: '地址搜索',
                        key: 'search_control'
                    },
                    {
                        name: '中心地址',
                        key: 'center_address'
                    },
                    {
                        name: '比例尺',
                        key: 'scale_control'
                    },
                    //   { name: '级别工具', key: 'zoom_control' },
                    {
                        name: '鹰眼工具',
                        key: 'mini_control'
                    },
                    {
                        name: '路况',
                        key: 'traffic_control'
                    }
                ],
                oldselect: ['search_control', 'center_address', 'scale_control'],
                selectList: ['search_control', 'center_address', 'scale_control'],
                map: []
            },

            bottomaddress: {
                format: '',
                active: '',
                detail: {}
            },
        }
    },

    methods: {
        controlChange(value) {
            const different = getArrayDifference(value, this.control.oldselect)
            different.forEach(item => {
                // 老的里面有就是移除的 反之就是新加的
                if (this.control.oldselect.includes(item)) {
                    this.changeCurrentControl(item, false)
                } else {
                    this.changeCurrentControl(item, true)
                }
            })
            this.control.oldselect = [...value]
        },

        changeCurrentControl(type, state) {
            switch (type) {
                case 'search_control':
                    this.startSearchControl(state)
                    break;
                case 'center_address':
                    this.startCenterLatlng(state)
                    break;
                case 'scale_control':
                    this.changeScaleControl(state)
                    break;
                case 'mini_control':
                    this.changeMiniMapLayer(state)
                    break;
                case 'traffic_control':
                    this.changeTrafficLayer(state)
                    break;
            }
        },



        /**
         * 
         * 搜索功能控制器 -----------------------
         * 
         */
        async startSearchControl(state) {
            this.control.searchSwitch = state
            await this.$nextTick()
            if (state) {
                this.$refs['mapsearch'].init(this.mapInstance)
            }
        },


        /**
         * 中心经纬度开关控制器 ------------------
         */
        startCenterLatlng(state) {
            if (state) {
                this.changeCenterAddress()
                this.mapInstance.on('zoomend', this.changeCenterAddress)
                this.mapInstance.on('moveend', this.changeCenterAddress)
            } else {
                this.bottomaddress = { format: '', active: '' }
                this.mapInstance.off('zoomend', this.changeCenterAddress)
                this.mapInstance.off('moveend', this.changeCenterAddress)
            }
        },
        async changeCenterAddress() {
            const zoom = this.mapInstance.getZoom()
            const center = this.mapInstance.getCenter()
            const {
                lat,
                lng
            } = center
            const address = await getAddressByLnglat({
                lng,
                lat
            })
            const {
                formatted_address,
                addressComponent: {
                    country,
                    province,
                    city,
                    district,
                    township
                }
            } = address
            let result
            if (zoom < 5) {
                result = country
            } else if (zoom >= 5 && zoom < 10) {
                result = `${ province }-${ city }`
            } else if (zoom >= 10 && zoom < 14) {
                result = `${ province }-${ city }-${ district }-${ township }`
            } else if (zoom >= 14) {
                result = formatted_address
            }
            this.bottomaddress = {result, active: district || township}
        },


        /**
         * 位置采集功能 ----------------------------
         */
        startDrawControl() {
            if (!this.drawToolInstane.enable) {
                this.drawToolInstane.create()
            }
            this.clearPopupMarker()
            this.drawToolInstane.draw('Marker')
        },

        clearPopupMarker() {
            if (this.address.marker) this.mapInstance.removeLayer(this.address.marker)
        },

        async handleDrawCallBack(event) {
            const {
                layer,
                layer: {
                    _latlng: {
                        lng,
                        lat
                    }
                }
            } = event
            this.address.marker = layer.addTo(this.mapInstance)
            this.$refs['addressCollect'].open(layer)
            const {
                formatted_address
            } = await getAddressByLnglat({
                lng,
                lat
            })
            this.address.result = {
                lng,
                lat,
                address: formatted_address
            }
            await this.$nextTick()
            this.drawToolInstane.destroyed()
        },



        /**
         * 测距工具开关 -----------------------------
         */
        startMeasureControl() {
            if (!this.polylineMeasure) return
            if (this.polylineMeasure._enabled) {
                this.polylineMeasure.disable()
            } else {
                this.polylineMeasure.enable()
            }
        },



        /**
         * 视野添加开关 -----------------------------------
         */
        addNewView() {

        },



        /**
         * 比例尺开关 --------------------------------------
         */
        changeScaleControl(type) {
            if (type) {
                if (this.scaleLayer) {
                    this.scaleLayer.addTo(this.mapInstance)
                } else {
                    this.scaleLayer = new L.Control.Scale({
                        imperial: false
                    })
                }
            } else {
                this.scaleLayer && this.scaleLayer.remove()
            }
        },


        changeMiniMapLayer(type) {
            if (type) {
                if (!this.minimapLayer) {
                    const titleLayer = L.tileLayer.chinaProvider(acctiveMap, {
                        maxZoom: 13,
                        minZoom: 3
                    })
                    this.minimapLayer = L.control.minimap(titleLayer, {
                        position: "bottomright",
                        toggleDisplay: true,
                        collapsedWidth: 20,
                        collapsedHeight: 20,
                        minimized: true,
                        aimingRectOptions: {
                            color: "#ff1100",
                            weight: 2
                        },
                        shadowRectOptions: {
                            color: "#0000AA",
                            weight: 1,
                            opacity: 0,
                            fillOpacity: 0
                        }
                    }).addTo(this.mapInstance)
                } else {
                    this.minimapLayer.addTo(this.mapInstance)
                }
            } else {
                this.minimapLayer && this.minimapLayer.remove()
            }
        },



        changeTrafficLayer(type) {
            if (type) {
                if (!this.trafficLayer) {
                    this.trafficLayer = L.tileLayer.chinaProvider(timmeMap, {
                        maxZoom: 18,
                        minZoom: 3
                    }).addTo(this.mapInstance)
                } else {
                    this.trafficLayer.addTo(this.mapInstance)
                }
            } else {
                this.trafficLayer && this.trafficLayer.remove()
            }
        }


    },
}