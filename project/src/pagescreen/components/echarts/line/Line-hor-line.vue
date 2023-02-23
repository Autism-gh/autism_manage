<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    /**
     * 
     *  线条风格的横向  Echarts Line
     * 
     *  数据格式参考  ./line-mock-data.js 中提供的格式
     * 
     */
    import chartmixins from '../util/echartmixins'
    import { colorOptions } from '../util/common'
    import { moreTransmit } from '../util/line-mock-data'
    export default {
        name: 'Line-hor-line',
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

            model: {
                type: String,
                default: 'nromal'
            },

            chartStyle: {
                type: Object,
                default: () => {
                    return {
                        'labelColor': 'rgba(255,255,255,0.6)',
                        'lineColor': 'rgba(255,255,255,0.05)',
                        'splitColor': 'rgba(255,255,255,0.05)',
                        'legend': true,
                        'xAxisLine': true,
                        'xAxisSplit': true,
                        'yAxisLine': true,
                        'yAxisSplit': true,
                    }
                }
            }
        },
        data() {
            return {
                defaultOptions: {
                    color: colorOptions[this.model] || colorOptions['nromal'],
                    legend: {
                        // top: '8%',
                        textStyle: {
                            color: this.chartStyle.labelColor,
                            fontSize: this.formatFontSize(12)
                        }
                    },
                    grid: {
                        top:  this.chartStyle.legend ? this.formatFontSize(30) : this.formatFontSize(10),
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
                            show: this.chartStyle.xAxisLine,
                            lineStyle: {
                                color: this.chartStyle.lineColor,
                                width: this.formatFontSize(1)
                            }
                        },
                        // 分界线
                        splitLine: {
                            show: this.chartStyle.xAxisSplit,
                            lineStyle: {
                                color: this.chartStyle.splitColor,
                                width: this.formatFontSize(1)
                            }
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
                            show: this.chartStyle.yAxisLine,
                            lineStyle: {
                                color: this.chartStyle.lineColor,
                                width: this.formatFontSize(1)
                            }
                        },
                        // 分界线
                        splitLine: {
                            show: this.chartStyle.yAxisSplit,
                            lineStyle: {
                                color: this.chartStyle.splitColor,
                                width: this.formatFontSize(1)
                            }
                        }
                    },
                    series: []
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
                        'splitColor': 'rgba(255,255,255,0.05)',
                        'xAxisLine': true,
                        'xAxisSplit': true,
                        'yAxisLine': true,
                        'yAxisSplit': true,
                        'smooth': true
                    }, this.chartStyle)
            },

            chartStyleOptions() {
                const { labelColor, lineColor, splitColor, legend, xAxisLine, xAxisSplit, yAxisLine, yAxisSplit } = this.formatOptions
                return {
                    legend: {
                        show: legend,
                        textStyle: {
                            color: labelColor
                        }
                    },
                    xAxis: {
                        axisLabel: {
                            color: labelColor
                        },
                        axisLine: {
                            show: xAxisLine,
                            lineStyle: {
                                color: lineColor,
                            }
                        },
                        splitLine: {
                            show: xAxisSplit,
                            lineStyle: {
                                color: splitColor,
                            }
                        }
                    },

                    yAxis: {
                        axisLabel: {
                            color: labelColor
                        },
                        axisLine: {
                            show: yAxisLine,
                            lineStyle: {
                                color: lineColor,
                            }
                        },
                        splitLine: {
                            show: yAxisSplit,
                            lineStyle: {
                                color: splitColor,
                            }
                        }
                    }
                }
            }
        },
        methods: {
            refreshMockData() {
                this.refreshApiData(moreTransmit)
            },

            refreshApiData({ chartData, valueKey, labelKey } = this) {
                const screenOptions = this.getScreenOptions()

                // 这里有数据代表不是直接传递，需要手动取值
                if(chartData?.length) {
                    let xAxisLabelList = []
                    let seriesList = []

                    // valuekey 过来的数据是数组，那么代表是多表数据
                    if(Array.isArray(valueKey)) {
                        seriesList = valueKey.map(item => {
                            const { label, key } = item
                            const activeData = chartData.map(item => item[key])
                            const obj = Object.assign({}, screenOptions, {
                                name: label,
                                data: activeData
                            })
                            return obj
                        })

                        // 检查label 是不是直接传递的
                        if(Array.isArray(labelKey)) {
                            xAxisLabelList = [...labelKey]
                        } else {
                            xAxisLabelList = chartData.map(item => item[labelKey])
                        }
                    } 
                    else {
                        xAxisLabelList = chartData.map(item => item[labelKey])
                        const seriesData = chartData.map(item => item[valueKey])
                        seriesList = [Object.assign({}, screenOptions, {
                                data: [...seriesData],
                            })
                        ]
                    }

                    // console.log('xAxisLabelList', xAxisLabelList)
                    // console.log('seriesList', seriesList)
                    this.defaultOptions.xAxis.data = xAxisLabelList
                    this.defaultOptions.series = seriesList
                } else {
                    if(Array.isArray(labelKey) && Array.isArray(valueKey)) {
                        this.defaultOptions.xAxis.data = [...labelKey]
                        this.defaultOptions.series = [
                            Object.assign({}, screenOptions, {
                                data: [...valueKey],
                            })
                        ]
                    } else {
                        this.errorMsg = '数据格式传递错误'
                    }
                }
                this.setOption(this.defaultOptions)
            },

            getScreenOptions() {
                const { smooth } = this.formatOptions
                return {
                    type: 'line',
                    smooth,
                    symbolSize: this.formatFontSize(5),
                    lineStyle: {
                        width: this.formatFontSize(2)
                    }
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