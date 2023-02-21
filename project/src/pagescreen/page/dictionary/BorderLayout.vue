<template>
    <DemoLayout title="边框效果">
        <div class="border-content">
            <div class="bordercard" v-for="(item, index) in borderStyleList" :key="index">
                <component :is="item.component" ></component>
            </div>
        </div>
    </DemoLayout>
</template>
<script>
    import DemoLayout from '../../package/layout/DemoLayout.vue'

    const allBorder = require.context("../../package/border", false, /\.vue$/);

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
        name: 'BorderLayout',
        components: resComponents,
        // components: DemoLayout,
        props: {},
        data() {
            return {
                borderStyleList: resComponentsList
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
    .border-content {
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