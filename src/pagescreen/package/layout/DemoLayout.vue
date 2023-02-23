<template>
    <div class="demo-layout screen-Layout">
        <div class="header">
            {{ title }}
        </div>
        <div class="content hide-scrollbar">
            <slot></slot>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'DemoLayout',
        components: {},
        props: {
            title: {
                type: String,
                default: ''
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
<style lang="scss" scoped horizontalvw>
    .demo-layout {
        position: relative;
        width: 100%;
        height: 100%;
        background: #010101;
        background-size: 100% 100%;

        .header {
            height: 100px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
        }

        .content {
            height: calc(100% - 100px);
            width: 100%;
            overflow-y: auto;
        }
    }
</style>