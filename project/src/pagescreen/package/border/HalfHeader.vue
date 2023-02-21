<template>
    <div class="HalfHeader" :style="formatBackStyle">
        <div class="prefix" :style="formatHeaderStyle"></div>
        <div class="header">
            {{  title  }}
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'HalfHeader',
        components: {},
        props: {
            title: {
                type: String,
                default: '半个头部'
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
                    color: 'rgba(255,121,64)',
                    radius: '0',
                    background: 'rgba(0,0,0,0.25)'
                }, this.styleOptions)
            },      


            formatBackStyle() {
                const { radius, background } = this.formatStyleOption

                return {
                    'border-radius': `${ radius }`,
                    'background': `${ background }`
                }
            },


            formatHeaderStyle() {
                const { color } = this.formatStyleOption
                return {
                    'background': `${ color }`
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
.HalfHeader {
    position: relative;
    height: 100%;
    width: 100%;

    .prefix {
        position: absolute;
        top: 0;
        left: 0;
        height: 5px;
        width: 50px;
    }

    .header {
        position: absolute;
        top: 15px;
        left: 10px;
        color: #e5e5e5;
    }
}
</style>