<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    /**
     * 
     *  线条风格的横向  渐变色风格
     * 
     *  数据格式参考  ./bar-mock-data.js 中提供的格式
     * 
     *  该charts 只支持单个数据哦
     * 
     */
    import chartmixins from '../util/echartmixins'
    import { maticsTransmit24 } from '../util/bar-mock-data'
    import * as echarts from 'echarts'
    export default {
        name: 'Bar-hor-gradient',
        components: {},
        mixins: [chartmixins],
        props: {
            chartData: {
                type: Array,
                default: () => []
            },

            labelKey: {
                type: [Array, String],
                default: ''
            },

            valueKey: {
                type: [Array, String],
                default: ''
            },

            chartStyle: {
                type: Object,
                default: () => {
                    return {
                        'labelColor': 'rgba(255,255,255,0.6)',
                        'lineColor': 'rgba(255,255,255,0.05)',
                        'seriesColor': [
                            { offset: 0,  color: '#3876cd' },
                            { offset: 0.5, color: '#45b4e7' },
                            { offset: 1, color: '#54ffff'}
                        ]
                    }
                }
            }
        },
        data() {
            return {
                defaultOptions: {
                    grid: {
                        top: this.formatFontSize(10),
                        left: '5%',
                        right: '4%',
                        bottom: '7%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        // 坐标轴文字颜色
                        axisLabel: {
                            color: this.chartStyle.labelColor,
                            fontSize: this.formatFontSize(12)
                        },
                        // 轴线
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.chartStyle.lineColor,
                                width: this.formatFontSize(1)
                            }
                        },
                        // 分界线
                        splitLine: {
                            show: false
                        }
                    },

                    yAxis: {
                        type: 'value',
                        // 坐标轴文字颜色
                        axisLabel: {
                            color: this.chartStyle.labelColor,
                            fontSize: this.formatFontSize(12)
                        },
                        // 轴线
                        axisLine: {
                            show: false
                        },
                        // 分界线
                        splitLine: {
                            show: false
                        }
                    },
                    series: {
                        name: '',
                        type: 'bar',
                        barWidth: this.formatFontSize(10),
                        data: [],
                        itemStyle: {
                            normal: {
                                barBorderRadius: this.formatFontSize(5),
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, this.chartStyle.seriesColor),
                            },
                        },
                    }
                }
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
            formatOptions() {
                return Object.assign({
                        'labelColor': 'rgba(255,255,255,0.6)',
                        'lineColor': 'rgba(255,255,255,0.05)',
                        'seriesColor': [
                            { offset: 0,  color: '#3876cd' },
                            { offset: 0.5, color: '#45b4e7' },
                            { offset: 1, color: '#54ffff'}
                        ],
                    }, this.chartStyle)
            },

            chartStyleOptions() {
                const { labelColor, lineColor, seriesColor } = this.formatOptions
                return {
                    xAxis: {
                        axisLabel: {
                            color: labelColor
                        },
                        // 轴线
                        axisLine: {
                            lineStyle: {
                                color: lineColor,
                            }
                        }
                    },

                    yAxis: {
                        axisLabel: {
                            color: labelColor,
                        },
                    },
                    series: {
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, seriesColor),
                            },
                        },
                    }
                }
            }
        },
        methods: {
            refreshMockData() {
                this.refreshApiData(maticsTransmit24)
            },

            refreshApiData({ chartData, valueKey, labelKey } = this) {
                // 这里有数据代表不是直接传递，需要手动取值
                if(chartData?.length) {
                    if(Array.isArray(this.labelKey) || Array.isArray(this.valueKey)) {
                        this.errorMsg = '数据格式传递错误'
                        return
                    }
                    let chartLabelList = chartData.map(item => item[labelKey])
                    let seriesList = chartData.map(item => item[valueKey])

                    this.defaultOptions.xAxis.data = chartLabelList
                    this.defaultOptions.series.data = seriesList
                } else {
                    if(Array.isArray(labelKey) && Array.isArray(valueKey)) {
                        this.defaultOptions.xAxis.data = [...labelKey]
                        this.defaultOptions.series.data = [...valueKey]
                    } else {
                        this.errorMsg = '数据格式传递错误'
                    }
                }
                this.setOption(this.defaultOptions)
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