<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    import chartmixins from '../util/echartmixins'
    import * as echarts from 'echarts'

    export default {
        name: 'PieFinish',
        components: {},
        mixins: [chartmixins],
        props: {
            chartData: {
                type: Number,
                default: 63
            }
        },
        data() {
            return {
                defaultOptions: {
                    title: [
                        {
                            text: `0%`,
                            top: "41%",
                            left: "center",
                            textStyle: {
                                fontSize: this.formatFontSize(24),
                                color: "#FFFFFF",
                                fontWeight: 600
                            }
                        },
                        {
                            text: "已完成",
                            top: "52%",
                            left: "center",
                            textStyle: {
                                color: "#FFFFFF",
                                fontSize: this.formatFontSize(20),
                                fontWeight: 300
                            }
                        }
                    ],
                    polar: {
                        radius: ["54%", "66%"],   // 带颜色的那一圈
                        center: ["50%", "50%"]
                    },
                    angleAxis: {
                        max: 100,
                        show: false
                    },
                    radiusAxis: {
                        type: "category",
                        show: true,
                        axisLabel: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    series: [
                        /**
                         * 带颜色的那一圈数值
                         */
                        {
                            name: "数据",
                            type: "bar",
                            roundCap: true,
                            barWidth: 30,
                            showBackground: true,
                            data: [0],
                            coordinateSystem: "polar",
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#16CEB9"
                                    },
                                    {
                                        offset: 1,
                                        color: "#6648FF"
                                    }
                                ])
                            }
                        },

                        {
                            name: "外部",
                            type: "pie",
                            radius: ["70%"],
                            center: ["50%", "50%"],
                            itemStyle: {
                                color: "rgba(66, 66, 66, 0.1)",
                                borderWidth: 1,
                                borderColor: "#5269EE"
                            },
                            data: [100]
                        },
                        {
                            name: "内部",
                            type: "pie",
                            radius: ["50%"],
                            center: ["50%", "50%"],
                            itemStyle: {
                                color: "rgba(66, 66, 66, .1)",
                                borderWidth: 1,
                                borderColor: "#5269EE"
                            },
                            data: [100]
                        }
                    ]
                }
            }
        },
        watch: {
            chartData(newVal) {
                this.refreshChartData(newVal)
            }
        },  
        computed: {
            
        },
        methods: {
            refreshChartData(data) {
                this.defaultOptions.title[0].text = `${ data }%`
                this.defaultOptions.series[0].data = [data]
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
            this.refreshChartData(this.chartData)
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