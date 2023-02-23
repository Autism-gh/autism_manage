<template>
    <div class="HeaderTitle" :style="formatBackStyle">
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
        name: 'HeaderTitle',
        components: {},
        props: {
            title: {
                type: String,
                default: ''
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
                    boreder: '5px',
                    color: '#ff7940',
                    radius: '0',
                    background: 'rgba(0,0,0,0.15)'
                }, this.styleOptions)
            },      


            formatBackStyle() {
                const { boreder, color, radius, background } = this.formatStyleOption

                return {
                    'border-radius': `${ radius }`,
                    'border-top': `${ boreder } solid ${ color }`,
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
<style lang="scss" scoped horizontalvw>
.HeaderTitle {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 10px;

    .header {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #e5e5e5;
        font-size: 14px;
    }

    .content {
        height: 100%;
        width: 100%;
    }
}
</style>