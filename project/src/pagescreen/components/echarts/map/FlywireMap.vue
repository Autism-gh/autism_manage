<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    import chartmixins from '../util/echart4mixins'
    const allData = require('../../mockjson/flywiremap.json')
    import * as echarts4 from 'echarts4'

    export default {
        name: 'FlywireMap',
        components: {},
        props: {

        },
        mixins: [chartmixins],
        data() {
            return {
                defaultOptions: {

                    title: {
                        text: '',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    legend: {
                        show: false,
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data: ['地点', '线路'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: 'rgba(0,0,0,0.25)',
                                borderColor: '#0177ff'
                            },
                            emphasis: {
                                areaColor: '#071537' //鼠标指上市时的颜色
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
                        symbolSize: 2,
                        showEffectOn: 'render',
                        itemStyle: {
                            normal: {
                                color: '#46bee9'
                            }
                        },
                        data: allData.citys
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
                            symbolSize: 3,
                            trailLength: 0,
                        },
                        lineStyle: {
                            normal: {
                                color: new echarts4.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#58B3CC'
                                }, {
                                    offset: 1,
                                    color: '#F58158'
                                }], false),
                                width: 1,
                                opacity: 0.2,
                                curveness: 0.1
                            }
                        },
                        data: allData.moveLines
                    }]
                }
            }
        },
        computed: {

        },
        methods: {

        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {

        },
        mounted() {
            
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