import {
    debounce
} from 'lodash'

import * as echarts4 from 'echarts4'
echarts4.registerMap('china', require(`../json/china.json`))

export default {
    inheritAttrs: false,

    data() {
        return {
            chartInstance: null,
            resizeHandler: null,

            noData: false,
            errorMsg: ''
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
            this.chartInstance = echarts4.init(this.$refs[this.$options.name])
            this.defaultOptions && this.setOption(this.defaultOptions)
            this.$emit('reload', this.chartInstance)
            this.resize()
            setTimeout(() => {
                this.resize()
            }, 1000)
            window.addEventListener('resize', this.resizeHandler)
        },
        setOption(options, type = false) {
            this.chartInstance && this.chartInstance.setOption(options, type)
        },
        clear() {
            this.chartInstance && this.chartInstance.clear()
        },
        resize() {
            this.chartInstance && this.chartInstance.resize()
        },

        change16IntoRgb(color) {
            let r = /^#?[0-9A-Fa-f]{6}$/;
            if (!r.test(color)) return alert('输入错误的hex颜色值');
            color = color.replace("#", "");
            let hxs = color.match(/../g);
            for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
            return `rgba(${ hxs.join(',') })`;
        },

        change16IntoRgba(color, alpha) {
            let r = /^#?[0-9A-Fa-f]{6}$/;
            if (!r.test(color)) return alert('输入错误的hex颜色值');
            color = color.replace("#", "");
            let hxs = color.match(/../g);
            for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
            return `rgba(${ hxs.join(',') }, ${ alpha })`;
        },

        formatFontSize(res, designWidth = 1920) {
            const clientWidth = window.innerWidth || document.documentElement?.clientWidth || document.body.clientWidth
            if (!clientWidth) return
            let fontSize = 100 * (clientWidth / designWidth);
            return (res / 100) * fontSize;
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