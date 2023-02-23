<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    /**
     * 
     * API 参考 transmitmap.json 格式传递
     * 迁徙图，需要数据
     * {
     *      from_name: '',
     *      to_name: ''
     *      from_lat_lng: '',
     *      to_lat_lng: '',
     *      value: ''
     * }
     * 
     */
    import chartmixins from '../util/echart4mixins'
    import { colorOptions } from '../util/common';
    const apiAdviceData = require('../mock/transmitmap.json')
    const planePath =
        'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';
    export default {
        name: 'Map-transmit',
        components: {},
        props: {
            chartData: {
                type: Array,
                default: () => []
            },

            chartStyle: {
                type: Object,
                default: () => {
                    return {
                        'labelColor': '#FFFFFF',
                        'areaColor': 'rgba(0,0,0,0.25)',
                        'borderColor': 'rgba(255,255,255,0.15)',
                        'emphasisColor': 'rgba(0,0,0,0.5)',
                        'zoom': 1.1
                    }
                }
            },

            model: {
                type: String,
                default: 'map'
            },
        },
        mixins: [chartmixins],
        data() {

            return {
                defaultOptions: {
                    geo: {
                        map: 'china',
                        zoom: this.chartStyle.zoom,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: this.chartStyle.areaColor,
                                borderColor: this.chartStyle.borderColor
                            },
                            emphasis: {
                                areaColor: this.chartStyle.emphasisColor
                            }
                        }
                    },
                    series: []
                },

            }
        },
        watch: {
            chartData(newVal) {
                this.refreshApiData(newVal)
            },

            chartStyleOptions(newVal) {
                this.handleRefreshStyle(newVal)
            }
        },
        computed: {
            formatColor() {
                return colorOptions[this.model] || colorOptions['nromal']
            },  
            
            formatOptions() {
                return Object.assign({
                    'labelColor': '#FFFFFF',
                    'areaColor': 'rgba(0,0,0,0.25)',
                    'borderColor': 'rgba(255,255,255,0.15)',
                    'emphasisColor': 'rgba(0,0,0,0.5)',
                    'zoom': 1.1
                }, this.chartStyle)
            },

            chartStyleOptions() {
                const { zoom, areaColor, borderColor, emphasisColor } = this.formatOptions
                return {
                    geo: {
                        zoom: zoom,
                        itemStyle: {
                            normal: {
                                areaColor: areaColor,
                                borderColor: borderColor
                            },
                            emphasis: {
                                areaColor: emphasisColor
                            }
                        }
                    },
                }
            }
        },
        methods: {
            refreshApiData(dataList) {
                const seriesData = []
                dataList.forEach((line, index) => {
                    const lineData = line.map(item => {
                        const {
                            from_lat_lng,
                            to_lat_lng
                        } = item
                        return [{
                                coord: from_lat_lng
                            },
                            {
                                coord: to_lat_lng
                            }
                        ]
                    })
                    const markData = line.map(item => {
                        const {
                            to_lat_lng,
                            value,
                            to_name
                        } = item
                        return {
                            name: to_name,
                            value: to_lat_lng.concat(value)
                        }
                    })

                    const LightLineOptions = this.getLightLineOptions(index)
                    Object.assign(LightLineOptions, {
                        name: `我是Light第${ index + 1 }个`,
                        data: lineData
                    })

                    const LockLineOptions = this.getLockLineOptions(index)
                    Object.assign(LockLineOptions, {
                        name: `我是Lock第${ index + 1 }个`,
                        data: lineData
                    })

                    const MarkerOptions = this.getSeriesMarker(index)
                    Object.assign(MarkerOptions, {
                        name: `我是Marker第${ index + 1 }个`,
                        data: markData
                    })

                    seriesData.push(LightLineOptions, LockLineOptions, MarkerOptions)
                })
                this.defaultOptions.series = seriesData
                this.setOption(this.defaultOptions, true)
            },

            refreshMockData() {
                this.refreshApiData(apiAdviceData)
            },


            getLightLineOptions(index) {
                const { labelColor } = this.formatOptions
                return {
                    name: '',
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: labelColor,
                        symbolSize: this.formatFontSize(3)
                    },
                    lineStyle: {
                        normal: {
                            color: this.formatColor[index],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: []
                }
            },

            getLockLineOptions(index) {
                return {
                    name: '',
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath, // 图标
                        symbolSize: this.formatFontSize(15)
                    },
                    lineStyle: {
                        normal: {
                            color: this.formatColor[index],
                            width: this.formatFontSize(2),
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    },
                    data: []
                }
            },

            getSeriesMarker(index) {
                return {
                    name: '',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            fontSize: this.formatFontSize(14)
                        }
                    },
                    symbolSize: (val) => {
                        return this.formatFontSize(val[2] / 8)
                    },
                    itemStyle: {
                        normal: {
                            color: this.formatColor[index]
                        }
                    },
                    data: []
                }
            },

            handleRefreshStyle(options) {
                if(!options || !Object.prototype.toString.call(options)=='[object Object]') return
                this.setOption(options)
            }
        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {

        },
        mounted() {
            this.refreshMockData()
            this.handleRefreshStyle(this.chartStyleOptions)
            // this.refreshApiData()
        },
        beforeDestroy() {

        },
    }
</script>
<style lang="scss" scoped horizontalvw>
    .chartInstance {
        width: 100%;
        height: 100%;
    }
</style>