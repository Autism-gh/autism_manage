<template>
    <NormalLayout class="screen-Layout demoscreen">
        <CircleImageLoading v-model="demoLoading"></CircleImageLoading>
        <template slot="header">
            <div class="demoscreen__header">
                <RealTime></RealTime>
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
                    <ActiveBorder>
                        <RollTable></RollTable>
                    </ActiveBorder>
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
                    <ActiveBorder title="中间图2">
                        <Barhorgradient :chartStyle="seriesColor"></Barhorgradient>
                    </ActiveBorder>
                </div>
            </div>
        </template>
        <template slot="right">
            <div class="demoscreen__right">
                <div class="range range-h33-w100">
                    <ActiveBorder title="右侧图1">
                        <Barhorline></Barhorline>
                    </ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="右侧图2">
                        <Linehorline></Linehorline>
                    </ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="右侧图3">
                        <Linehorpile></Linehorpile>
                    </ActiveBorder>
                </div>
            </div>
        </template>
    </NormalLayout>
</template>
<script>
    import CircleImageLoading from '../../components/loading/CircleImageLoading.vue'
    import NormalLayout from '../../package/layout/NormalLayout.vue'
    import ActiveBorder from '../../package/border/Quadrangle.vue'
    import ProgressPie from '../../components/echarts/pie/ProgressPie.vue'
    import KewWord from '../../components/manual/KewWord.vue'
    // import CurrentMap from '../../components/echarts/map/FlywireMap.vue'
    import CurrentMap from '../../components/echarts/map/TransmitMap.vue'
    // import CurrentMap from '../../components/echarts/map/LabelMap.vue'

    import RealTime from '../../components/manual/RealTime.vue'
    import RollTable from '../../components/manual/RollTable.vue'
    import { timeSleep } from '../../util/common'


    import Barhorline from '../../components/echarts/bar/Bar-hor-line.vue'
    import Linehorline from '../../components/echarts/line/Line-hor-line.vue'

    import Barhorgradient from '../../components/echarts/bar/Bar-hor-gradient.vue'

    import Linehorpile from '../../components/echarts/line/Line-hor-pile.vue'

    export default {
        name: 'DemoScreen',
        components: {
            CircleImageLoading,
            NormalLayout,
            ActiveBorder,
            ProgressPie,
            KewWord,
            CurrentMap,
            RollTable,
            RealTime,
            Barhorline,
            Linehorline,
            Barhorgradient,
            Linehorpile
        },
        props: {},
        data() {
            return {
                demoLoading: false,

                seriesColor: {
                    seriesColor: [
                        { offset: 0,  color: 'rgb(255, 121, 64)' },
                        { offset: 0.5, color: 'rgb(255, 121, 64)' },
                        { offset: 1, color: '#e5e5e5'}
                    ]
                }
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