<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    import chartmixins from '../util/echart4mixins'
    import {
        seriesData,
        lableData
    } from '../../mockjson/labelmap'

    export default {
        name: 'LabelMap',
        components: {},
        props: {},
        mixins: [chartmixins],
        data() {
            return {
                defaultOptions: {
                    geo: {
                        map: 'china',
                        zoom: 1.1,
                        aspectScale: 0.85,
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
                                areaColor: 'rgba(0,0,0,0.15)',
                                borderColor: 'rgba(255,255,255,0.45)',

                                shadowOffsetX: 0,
                                shadowOffsetY: 15,
                                opacity: 0.5,
                            },
                            emphasis: {
                                areaColor: 'rgba(0,0,0,0.5)'
                            }
                        },
                        
                        regions: [{
                            name: '南海诸岛',
                            itemStyle: {
                                areaColor: 'rgba(0, 10, 52, 1)',
                                borderColor: 'rgba(0, 10, 52, 1)',
                                normal: {
                                    opacity: 0,
                                    label: {
                                        show: false,
                                        color: "#009cc9",
                                    }
                                },
                            },
                            label: {
                                show: false,
                                color: '#FFFFFF',
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
                            aspectScale: 0.85,
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
                                    areaColor: 'rgba(0,0,0,0.25)',
                                    borderColor: 'rgba(0,0,0,0.35)',
                                    // borderWidth: 1.5
                                },
                                emphasis: {
                                    areaColor: 'rgba(0,0,0,0.5)',
                                    label: {
                                        color: "#fff",
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
                            symbolSize: 10,

                            /**
                             * 
                             * 闪烁效果
                             * 
                             */
                            rippleEffect: { 
                                period: 3,                  // 闪烁时常
                                scale: 5,                   // 聚合点大小
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
                                    color: '#b3e2f2',
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
                                    color: '#ff8003',               // 聚合点颜色
                                    shadowBlur: 20,
                                    shadowColor: '#fff'
                                },
                                emphasis: {
                                    areaColor: '#f00'
                                }
                            },
                        },

                        {

                            type: 'lines',
                            zlevel: 3,
                            symbol: 'circle',
                            symbolSize: [5, 5],
                            color: '#ff8003',
                            opacity: 1,
                            label: {
                                show: true,
                                padding: [this.formatFontSize(10), this.formatFontSize(15)],
                                color: '#fff',
                                backgroundColor: "rgba(0,0,0,0.65)",
                                borderColor: 'rgba(0,0,0,0.25)',
                                borderWidth: 1,
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
                                color: '#999999',
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
            refreshChartData() {
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
            this.refreshChartData()
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