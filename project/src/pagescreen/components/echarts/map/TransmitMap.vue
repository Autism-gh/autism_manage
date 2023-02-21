<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    import chartmixins from '../util/echart4mixins'
    import { getChartData } from '../../mockjson/transmitmap'

    export default {
        name: 'TransmitMap',
        components: {},
        props: {

        },
        mixins: [chartmixins],
        data() {
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
                        zoom: 1.2,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: 'rgba(0,0,0,0.25)',
                                borderColor: '#0692a4'
                            },
                            emphasis: {
                                areaColor: 'rgba(0,0,0,0.5)'
                            }
                        }
                    },
                    series: []
                }
            }
        },
        computed: {

        },
        methods: {
            refreshChartData() {
                const seriesData = getChartData()
                this.defaultOptions.series = seriesData
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