<template>
    <div class="InsideLight" :style="formatShadowStyle">
        <div class="header">
            {{  title  }}
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    /**
     * 
     * 
     * 内发光边框，可以配置发光粗细，颜色
     * 
     * 
     */
    export default {
        name: 'InsideLight',
        components: {},
        props: {
            title: {
                type: String,
                default: '内阴影框'
            },

            styleOptions: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {

            }
        },
        computed: {
            formatStyleOption() {
                return Object.assign({
                    thick: '15px',
                    borderColor: 'rgba(255,255,255,.5)',
                    backGround: 'rgba(0,0,0,0.3)'
                }, this.styleOptions)
            },   

            formatShadowStyle() {
                const { thick, borderColor, backGround } = this.formatStyleOption
                return {
                    'box-shadow': `0 0 ${ thick } ${ borderColor } inset`,
                    'background': `${ backGround }`
                }
            }
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
.InsideLight {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 10px;

    .header {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #e5e5e5;
    }
}
</style>