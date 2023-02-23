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
    import { seriesData, lableData } from '../mock/labelmap'
    export default {
        name: 'Map-label',
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
                        'markerColor': '#ff8003',
                        'emphasisColor': 'rgba(0,0,0,0.5)',
                        'zoom': 1.1,
                        'aspectScale': 0.85
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
                        aspectScale: this.chartStyle.aspectScale,
                        layoutCenter: ["50%", "50%"], //地图位置
                        layoutSize: '100%',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: this.chartStyle.areaColor,
                                borderColor: this.chartStyle.borderColor,
                                shadowOffsetX: 0,
                                shadowOffsetY: 15,
                                opacity: 0.5,
                            },
                            emphasis: {
                                areaColor: this.chartStyle.emphasisColor
                            }
                        },
                        
                        regions: [{
                            name: '南海诸岛',
                            itemStyle: {
                                areaColor: this.chartStyle.areaColor,
                                borderColor: this.chartStyle.borderColor,
                                normal: {
                                    opacity: 0,
                                    label: {
                                        show: false,
                                        color: this.chartStyle.labelColor,
                                    }
                                },
                            },
                            label: {
                                show: false,
                                color: this.chartStyle.labelColor,
                                fontSize: 12,
                            },
                        }],
                    },
                    series: [
                        /**
                         * 
                         * 常规地图
                         * 
                         */
                        {
                            type: 'map',
                            mapType: 'china',
                            aspectScale: this.chartStyle.aspectScale,
                            layoutCenter: ["50%", "50%"], //地图位置
                            layoutSize: '100%',
                            zoom: 1.1, //当前视角的缩放比例
                            roam: false, //是否开启平游或缩放
                            scaleLimit: { //滚轮缩放的极限控制
                                min: 1,
                                max: 2
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: this.chartStyle.areaColor,
                                    borderColor: this.chartStyle.borderColor,
                                    // borderWidth: 1.5
                                },
                                emphasis: {
                                    areaColor: this.chartStyle.emphasisColor,
                                    label: {
                                        color: this.chartStyle.labelColor,
                                        fontSize: this.formatFontSize(14)
                                    }
                                }
                            },
                        },

                        /**
                         * 
                         * 聚合点图层
                         * 
                         */
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            symbolSize: this.formatFontSize(10),

                            /**
                             * 
                             * 闪烁效果
                             * 
                             */
                            rippleEffect: { 
                                period: 3,                                      // 闪烁时常
                                scale: this.formatFontSize(5),                   // 聚合点大小
                                brushType: 'fill'
                            },

                            /**
                             * 
                             * 聚合点文字样式
                             * 
                             */
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}',
                                    color: this.chartStyle.labelColor,
                                    fontWeight: "bold",
                                    fontSize: this.formatFontSize(16)
                                }
                            },

                            data: [],

                            /**
                             * 
                             * 聚合点样式
                             * 
                             */
                            itemStyle: {
                                normal: {
                                    show: true,
                                    color: this.chartStyle.markerColor,               // 聚合点颜色
                                    shadowBlur: this.formatFontSize(20)
                                }
                            },
                        },

                        {

                            type: 'lines',
                            zlevel: 3,
                            symbol: 'circle',
                            symbolSize: [this.formatFontSize(5), this.formatFontSize(5)],
                            // color: 'red',
                            // opacity: 1,
                            label: {
                                show: true,
                                padding: [this.formatFontSize(10), this.formatFontSize(15)],
                                color: '#fff',
                                backgroundColor: this.chartStyle.areaColor,
                                borderColor: this.chartStyle.borderColor,
                                borderWidth: this.formatFontSize(1),
                                borderRadius: this.formatFontSize(6),
                                formatter(params) {
                                    let arr = [params.name, "废水污染：" + params.value[1] + "家", "废气污染：" + params.value[0] + "家"];
                                    return arr.join("\n")
                                },
                                textStyle: {
                                    align: 'left',
                                    lineHeight: this.formatFontSize(20),
                                    fontSize: this.formatFontSize(12)
                                }
                            },
                            lineStyle: {
                                type: 'solid',
                                color: this.chartStyle.borderColor,
                                width: this.formatFontSize(1),
                                opacity: 1,
                            },
                            data: [],
                        },
                    ]
                }
            }
        },
        computed: {

        },
        methods: {
            refreshMockData() {
                const last = this.defaultOptions.series.length - 1
                this.defaultOptions.series[1].data = seriesData
                // this.defaultOptions.series[2].data = seriesData
                this.defaultOptions.series[last].data = lableData
                this.setOption(this.defaultOptions, true)
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