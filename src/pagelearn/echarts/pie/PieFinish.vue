<template>
    <div :ref="$options.name" class="chartInstance" />
</template>
<script>
    import chartmixins from '../chartmixins'
    import * as echarts from 'echarts'
    
    export default {
        name: 'PieFinish',
        components: {},
        mixins: [chartmixins],
        props: {},
        data() {
            return {
                defaultOptions: {
                    title: [{
                            text: "已完成",
                            top: "55%",
                            left: "48%",
                            textStyle: {
                                color: "#FFFFFF",
                                fontSize: 16,
                                fontWeight: 100
                            }
                        },
                        {
                            text: "75%",
                            top: "center",
                            left: "center",
                            textStyle: {
                                fontSize: "60",
                                color: "#FFFFFF",
                                fontWeight: 600
                            }
                        }
                    ],
                    backgroundColor: "#111",
                    polar: {
                        radius: ["42%", "52%"],
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
                    series: [{
                            name: "数据",
                            type: "bar",
                            roundCap: true,
                            barWidth: 30,
                            showBackground: true,
                            data: [60],
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
                            radius: ["56%"],
                            center: ["50%", "50%"],
                            itemStyle: {
                                color: "rgba(66, 66, 66, .1)",
                                borderWidth: 1,
                                borderColor: "#5269EE"
                            },
                            data: [100]
                        },
                        {
                            name: "内部",
                            type: "pie",
                            radius: ["38%"],
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
<style lang="scss" scoped>

</style>