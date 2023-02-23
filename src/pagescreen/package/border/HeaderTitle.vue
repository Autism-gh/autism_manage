<template>
    <div class="HeaderBorder" :style="formatBackStyle">
        <div class="header" :style="formatHeaderStyle">
            {{  title  }}
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'HeaderBorder',
        components: {},
        props: {
            title: {
                type: String,
                default: '带头部的'
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
                    color: 'rgba(255,121,64,0.25)',
                    radius: '0',
                    background: 'rgba(255,121,64,0.45)'
                }, this.styleOptions)
            },      


            formatBackStyle() {
                const { color, radius } = this.formatStyleOption

                return {
                    'border-radius': `${ radius }`,
                    'border': `1px solid ${ color }`
                }
            },


            formatHeaderStyle() {
                const { background } = this.formatStyleOption
                return {
                    'background': `${ background }`
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
.HeaderBorder {
    position: relative;
    height: 100%;
    width: 100%;

    .header {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 30px;
        width: 100%;
        color: #e5e5e5;
    }
}
</style>