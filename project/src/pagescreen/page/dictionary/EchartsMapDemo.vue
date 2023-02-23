<template>
    <DemoLayout title="Echarts Bar Demo">
        <div class="echart-bar-content">
            <div class="bordercard" v-for="(item, index) in echartBarDemo" :key="index">
                <Quadrangle :title="item.name">
                    <component :is="item.component"></component>
                </Quadrangle>
            </div>
        </div>
    </DemoLayout>
</template>
<script>
    import DemoLayout from '../../package/layout/DemoLayout.vue'
    import Quadrangle from '../../package/border/Quadrangle.vue'

    const allBorder = require.context("../../components/echarts/map", false, /\.vue$/);

    let resComponents = {};
    let resComponentsList = []
    allBorder.keys().forEach(comName => {
        const comp = allBorder(comName);
        const formatName = comName.replace(/^\.\/(.*)\.\w+$/, "$1")
        resComponentsList.push({name: formatName, component: formatName})
        resComponents[formatName] = comp.default;
    });

    resComponents[DemoLayout.name] = DemoLayout
    resComponents[Quadrangle.name] = Quadrangle

    export default {
        name: 'EchartsMapDemo',
        components: resComponents,
        props: {},
        data() {
            return {
                echartBarDemo: resComponentsList
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
    .echart-bar-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .bordercard {
        height: 500px;
        width: calc((100% - 40px) / 2);
        margin: 10px;
        margin-bottom: 10px;
    }
</style>