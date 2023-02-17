<template>
    <div class="echart-show-layout">
        <div class="layout-header">
            {{  text  }}
        </div>
        <div class="layout-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ChartLayout',
        components: {},
        props: {
            text: {
                type: String,
                default: '图表'
            }
        },
        data() {
            return {

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
.echart-show-layout {
    height: 100%;
    width: 100%;
}

.layout-header {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.layout-content {
    height: calc(100% - 80px);
    width: 100%;
}
</style>