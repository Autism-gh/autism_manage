<template>
    <NormalLayout class="screen-Layout demoscreen">
        <CircleImageLoading v-model="demoLoading"></CircleImageLoading>
        <template slot="header">
            <div class="demoscreen__header">

            </div>
        </template>
        <template slot="left">
            <div class="demoscreen__left">
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图1">
                        <ProgressPie :chart-data="75"></ProgressPie>
                    </ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图2">
                        <KewWord></KewWord>
                    </ActiveBorder>
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
                        <TransmitMap></TransmitMap>
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
    import CircleImageLoading from '../../components/loading/CircleImageLoading.vue'
    import NormalLayout from '../../package/layout/NormalLayout.vue'
    import ActiveBorder from '../../package/border/HeaderBorder.vue'
    import ProgressPie from '../../components/echarts/pie/ProgressPie.vue'
    import KewWord from '../../components/manual/KewWord.vue'
    // import FlywireMap from '../../components/echarts/map/FlywireMap.vue'
    import TransmitMap from '../../components/echarts/map/TransmitMap.vue'
    import { timeSleep } from '../../util/common'

    export default {
        name: 'DemoScreen',
        components: {
            CircleImageLoading,
            NormalLayout,
            ActiveBorder,
            ProgressPie,
            KewWord,
            // FlywireMap,
            TransmitMap
        },
        props: {},
        data() {
            return {
                demoLoading: false
            }
        },
        computed: {

        },
        methods: {
            async closeLoading() {
                await timeSleep(1000)
                this.demoLoading = false
            }
        },
        beforeCreate() {

        },
        created() {
            this.demoLoading = true
        },
        beforeMount() {

        },
        mounted() {
            this.closeLoading()
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