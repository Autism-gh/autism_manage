<template>
    <DemoLayout title="Echarts Pie Demo">
        <div class="echart-pie-content">
            <div class="bordercard" v-for="(item, index) in echartBarDemo" :key="index">
                <component :is="item.component"></component>
            </div>
        </div>
    </DemoLayout>
</template>
<script>
    import DemoLayout from '../../package/layout/DemoLayout.vue'

    const allBorder = require.context("../../components/echarts/pie", false, /\.vue$/);

    let resComponents = {};
    let resComponentsList = []
    allBorder.keys().forEach(comName => {
        const comp = allBorder(comName);
        const formatName = comName.replace(/^\.\/(.*)\.\w+$/, "$1")
        resComponentsList.push({name: formatName, component: formatName})
        resComponents[formatName] = comp.default;
    });

    resComponents[DemoLayout.name] = DemoLayout

    export default {
        name: 'EchartsPieDemo',
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
<style lang="scss" scoped>
    .echart-pie-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .bordercard {
        height: 300px;
        width: 30%;
        margin-bottom: 20px;
    }
</style>