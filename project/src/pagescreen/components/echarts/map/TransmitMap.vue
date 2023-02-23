<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    /**
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
    const apiAdviceData = require('../../mockjson/transmitmap.json')
    const planePath =
        'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';
    export default {
        name: 'TransmitMap',
        components: {},
        props: {
            chartData: {
                type: Array,
                default: () => []
            },

            color: {
                type: Array,
                default: () => ['#3ed4ff', '#ffa022', '#a6c84c']
            }
        },
        mixins: [chartmixins],
        data() {
            /**
             * 
             * 动态线
             * 
             */
            const seriesLightLine = {
                name: '',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: '',
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: []
            }

            /**
             * 
             * 连接线
             * 
             */
            const seriesLockLine = {
                name: '',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath, // 图标
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: '',
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                data: []
            }

            /**
             * 
             * marker点
             * 
             */
            const seriesMarker = {
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
                        fontSize: 14
                    }
                },
                itemStyle: {
                    normal: {
                        color: ''
                    }
                },
                data: []
            }

            return {
                defaultOptions: {
                    title: {
                        left: 'left',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data: ['北京 Top10', '上海 Top10', '广州 Top10'],
                        textStyle: {
                            color: '#fff'
                        },
                        selectedMode: 'single'
                    },
                    geo: {
                        map: 'china',
                        zoom: 1.1,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: 'rgba(0,0,0,0.25)',
                                borderColor: 'rgba(255,255,255,0.15)'
                            },
                            emphasis: {
                                areaColor: 'rgba(0,0,0,0.5)'
                            }
                        }
                    },
                    series: []
                },


                seriesLightLine,
                seriesLockLine,
                seriesMarker
            }
        },
        computed: {

        },
        methods: {
            refreshMockData() {
                const seriesData = []
                apiAdviceData.forEach((line, index) => {
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

                    const LightLineOptions = JSON.parse(JSON.stringify(this.seriesLightLine))
                    LightLineOptions.name = `我是Light第${ index + 1 }个`
                    LightLineOptions.data = lineData
                    LightLineOptions.lineStyle.normal.color = this.color[index]

                    const LockLineOptions = JSON.parse(JSON.stringify(this.seriesLockLine))
                    LockLineOptions.name = `我是Lock第${ index + 1 }个`
                    LockLineOptions.data = lineData
                    LockLineOptions.lineStyle.normal.width = this.formatFontSize(1)
                    LockLineOptions.lineStyle.normal.color = this.color[index]

                    const MarkerOptions = JSON.parse(JSON.stringify(this.seriesMarker))
                    MarkerOptions.name = `我是Marker第${ index + 1 }个`
                    MarkerOptions.label.normal.fontSize = this.formatFontSize(14)
                    MarkerOptions.symbolSize = (val) => {
                        return this.formatFontSize(val[2] / 8)
                    }
                    MarkerOptions.itemStyle.normal.color = this.color[index]
                    MarkerOptions.data = markData

                    seriesData.push(LightLineOptions, LockLineOptions, MarkerOptions)
                })
                this.defaultOptions.series = seriesData
                this.setOption(this.defaultOptions, true)
                // console.log('seriesData', seriesData)
            },

            refreshChartData() {
                
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
            // this.refreshChartData()
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