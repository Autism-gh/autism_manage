<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    /**
     * 
     * 地图页面配色要改该全部嗷
     * 
     */
    import chartmixins from '../util/echart4mixins'
    const allData = require('../mock/flywiremap.json')
    import * as echarts4 from 'echarts4'
    export default {
        name: 'FlywireMap',
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
                        'labelColor': '#e5e5e5',
                        'areaColor': 'rgba(0,0,0,0.25)',
                        'borderColor': 'rgba(255,255,255,0.15)',
                        'markerColor': '#46bee9',
                        'emphasisColor': 'rgba(0,0,0,0.5)',
                        'seriesColor': [
                            { offset: 0,  color: '#58B3CC' },
                            { offset: 1, color: '#F58158'}
                        ],
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
                    legend: {
                        show: true,
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data: ['地点', '线路'],
                        textStyle: {
                            color: this.chartStyle.labelColor,
                            fontSize: this.formatFontSize(12)
                        }
                    },
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
                                borderColor: this.chartStyle.borderColor,
                            },
                            emphasis: {
                                areaColor: this.chartStyle.emphasisColor
                            }
                        }
                    },
                    series: [{
                        name: '地点',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            emphasis: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        symbolSize: this.formatFontSize(2),
                        showEffectOn: 'render',
                        itemStyle: {
                            normal: {
                                color: this.chartStyle.markerColor
                            }
                        },
                        data: []
                    }, {
                        name: '线路',
                        type: 'lines',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        large: true,
                        effect: {
                            show: true,
                            constantSpeed: 30,
                            symbol: 'pin',
                            symbolSize: this.formatFontSize(3),
                            trailLength: 0,
                        },
                        lineStyle: {
                            normal: {
                                color: new echarts4.graphic.LinearGradient(0, 0, 0, 1, this.chartStyle.seriesColor, false),
                                width: this.formatFontSize(1),
                                opacity: 0.2,
                                curveness: 0.1
                            }
                        },
                        data: []
                    }]
                }
            }
        },
        watch: {
            chartData(newVal) {
                this.refreshApiData(newVal)
            }
        },
        computed: {

        },
        methods: {
            refreshMockData() {
                const { citys, moveLines } = allData
                this.defaultOptions.series[0].data = citys
                this.defaultOptions.series[1].data = moveLines
                this.setOption(this.defaultOptions, true)
            },

            refreshApiData() {

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