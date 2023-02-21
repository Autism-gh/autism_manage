<template>
    <div class="left-right-wrapper">
        <div class="header-warpper">
            <slot name="header"></slot>
        </div>
        <div class="content-warpper">
            <div class="left-warpper">
                <slot name="left"></slot>
            </div>
            <div class="center-wrapper">
                <slot name="center"></slot>
            </div>
            <div class="right-wrapper">
                <slot name="right"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'FloatLeftRight',
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
.left-right-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .header-warpper {
        height: 80px;
        width: 100%;
    }
    .content-warpper {
        height: calc(100% - 80px);
        width: 100%;
        display: flex;
        flex-direction: row;


        .left-warpper {
            width: 25%;
            height: 100%;
        }
        .center-wrapper {
            width: 50%;
            height: 100%;
        }
        .right-wrapper {
            width: 25%;
            height: 100%;
        }
    }
}
</style>