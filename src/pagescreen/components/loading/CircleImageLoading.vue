<template>
    <div class="loading-layout" v-if="show">
        <div class="loading-content">
            <img class="loading-image outside" src="@/assets/images/screen/loading/circle1.png">
            <img class="loading-image inside" src="@/assets/images/screen/loading/circle2.png">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Carousel',
        components: {},
        model: {
            prop: "show",
            event: "change"
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
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
    @keyframes outside {
        from {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(180deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    @keyframes inside {
        from {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(-180deg);
        }

        to {
            transform: rotate(-360deg);
        }
    }

    .loading-layout {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10000;
        background-color: black;

        .loading-content {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .loading-image {
                position: absolute;
                width: 365px;
                height: 365px;
                left: 50%;
                top: 50%;
                margin-left: -183px;
                margin-top: -200px;

                &.outside {
                    animation:outside 8s infinite linear;
                }

                &.inside {
                    animation:inside 7s infinite linear;
                }
            }
        }
    }
</style>