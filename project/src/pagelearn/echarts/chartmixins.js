import {
    debounce
} from 'lodash'

import * as echarts from 'echarts'
echarts.registerMap('china', require(`./json/china.json`))

export default {
    inheritAttrs: false,

    data() {
        return {
            chartInstance: null,
            resizeHandler: null
        }
    },
    props: {
        doResize: {
            type: [Object, Boolean],
            default: function () {
                return {
                    value: '',
                    event: true
                }
            }
        }
    },

    computed: {
        formatDoResize() {
            if (typeof this.doResize === 'boolean') {
                return Object.assign({
                    value: false,
                    event: 'all' //  true  false  all( 不管啥情况都执行 )
                }, {
                    value: this.doResize
                })
            } else {
                return Object.assign({
                    value: false,
                    event: true
                }, this.doResize)
            }
        }
    },

    watch: {
        doResize() {
            const {
                value,
                event
            } = this.formatDoResize
            if (event === 'all' || value === event) {
                this.resize()
            }
        }
    },

    methods: {
        initChart() {
            this.chartInstance = echarts.init(this.$refs[this.$options.name])
            this.defaultOptions && this.setOption(this.defaultOptions)
            this.$emit('reload', this.chartInstance)
            this.resize()
            setTimeout(() => {
                this.resize()
            }, 1000)
            window.addEventListener('resize', this.resizeHandler)
        },
        setOption(options, type = false) {
            this.chartInstance.setOption(options, type)
        },
        clear() {
            this.chartInstance.clear()
        },
        resize() {
            this.chartInstance && this.chartInstance.resize()
        }
    },
    mounted() {
        this.resizeHandler = debounce(this.resize.bind(this), 200)
        this.initChart()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
        this.chartInstance.dispose()
        this.chartInstance = null
    },

    activated() {
        this.resize()
    }

}