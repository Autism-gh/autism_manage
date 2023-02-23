<template>
    <NormalLayout class="screen-Layout demoscreen">
        <template slot="header">
            <div class="demoscreen__header">

            </div>
        </template>
        <template slot="left">
            <div class="demoscreen__left">
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图1"></ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图2"></ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图3"></ActiveBorder>
                </div>
            </div>
        </template>
        <template slot="center">
            <div class="demoscreen__center">
                <div class="range range-h66-w100">
                    <ActiveBorder title="中间图1">
                        <CurrentMap></CurrentMap>
                    </ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="中间图2"></ActiveBorder>
                </div>
            </div>
        </template>
        <template slot="right">
            <div class="demoscreen__right">
                <div class="range range-h33-w100">
                    <ActiveBorder title="右侧图1"></ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="右侧图2"></ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="右侧图3"></ActiveBorder>
                </div>
            </div>
        </template>
    </NormalLayout>
</template>
<script>
    import NormalLayout from '../../package/layout/NormalLayout.vue'
    import ActiveBorder from '../../package/border/HeaderBorder.vue'


    import CurrentMap from '../../components/echarts/map/TransmitMap.vue'
    export default {
        name: 'DemoScreen1',
        components: {
            NormalLayout,
            ActiveBorder,
            CurrentMap
        },
        props: {},
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
<style lang="scss" scoped horizontalvw>
    @import '../../scss/common.scss';

    .demoscreen {
        background-color: #2e2e2e;

        &__header {
            position: relative;
            height: 100%;
            display: flex;
            font-size: 40px;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.2);
        }

        &__left {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 10px;
        }

        &__center {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 10px;
        }

        &__right {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 10px;
        }
    }
</style>