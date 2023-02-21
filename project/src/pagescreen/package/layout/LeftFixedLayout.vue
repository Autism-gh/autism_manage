<template>
    <div class="left-main-wrapper">
        <div class="header-warpper">
            <slot name="header"></slot>
        </div>

        <div class="content-warpper">
            <div class="left-warpper">
                <slot name="left"></slot>
            </div>
            <slot name="main"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LeftMainLayout',
        components: {},
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
<style lang="scss" scoped>
.left-main-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .header-warpper {
        height: 80px;
        width: 100%;
    }
    .content-warpper {
        position: relative;
        height: calc(100% - 80px);
        width: 100%;


        .left-warpper {
            position: absolute;
            width: 25%;
            height: 100%;
            left: 0;
            top: 0;
        }
    }
}
</style>