<template>
    <div class="t-header">
        <div class="title-left"></div>
        <div class="title-center">{{  text  }}</div>
        <div class="title-right"></div>
    </div>
</template>
<script>
    export default {
        name: 'Theader',
        components: {},
        props: {
            text: {
                type: String,
                default: 'Autsim-Manage Screnn Test'
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
.t-header {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #ff7940;
    background: rgba(0,0,0,0.35);

    .title-left {
        height: 2px;
        width: calc((100% - 520px) / 2);
        background: #ff7940;
    }

    .title-center {
        width: 520px;
        text-align: center;
        border-left: solid 5px #ff7940;
        border-right: solid 5px #ff7940;
    }

    .title-right {
        height: 2px;
        width: calc((100% - 520px) / 2);
        background: #ff7940;
    }   
}
</style>