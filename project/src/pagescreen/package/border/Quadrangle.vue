<template>
    <div class="Quadrangle" :style="formatMainStyle">
        <div class="horn box-top-left"></div>
        <div class="horn box-top-right"></div>
        <div class="header">
            <div class="header-left">
                <div class="sign"></div>{{  title  }}
            </div>
            <div class="header-right">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <div class="horn box-bottom-left"></div>
        <div class="horn box-bottom-right"></div>
    </div>
</template>
<script>
    export default {
        name: 'Quadrangle',
        components: {},
        props: {
            title: {
                type: String,
                default: '四角边框'
            },

            styleOptions: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {

            }
        },
        computed: {
            formatStyleOption() {
                return Object.assign({
                    color: 'rgba(255,121,64,0.65)',
                    borderColor: 'rgba(255,121,64,0.25)',
                    background: 'rgba(0,0,0,0.15)',
                }, this.styleOptions)
            },

            formatMainStyle() {
                const {
                    borderColor,
                    background
                } = this.formatStyleOption
                return {
                    'background': `${ background }`,
                    'border': `1px solid ${ borderColor }`
                }
            },
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
    .Quadrangle {
        position: relative;
        width: 100%;
        height: 100%;
        // background-image: url(~@/assets/images/screen/bg/wangge.png);
        // background-repeat: repeat;

        .header {
            height: 40px;
            color: #e5e5e5;
            font-size: 14px;
            display: flex;
            align-items: center;
            padding-left: 20px;
        }

        .header-left {
            display: flex;
            align-items: center;

            .sign {
                width: 3px;
                height: 14px;
                background: rgb(255, 121, 64);
                margin-right: 10px;
            }
        }

        .content {
            height: calc(100% - 40px);
            width: 100%;
        }

        .horn {
            position: absolute;
            width: 10px;
            height: 10px;
            content: "";
        }

        .box-top-left {
            border-left: 2px solid rgb(255, 121, 64);
            border-top: 2px solid rgb(255, 121, 64);
            top: 0;
            left: 0;
        }

        .box-top-right {
            border-top: 2px solid rgb(255, 121, 64);
            border-right: 2px solid rgb(255, 121, 64);
            right: 0;   
            top: 0;
        }

        .box-bottom-left {
            border-bottom: 2px solid rgb(255, 121, 64);
            border-left: 2px solid rgb(255, 121, 64);
            left: 0;
            bottom: 0;
        }

        .box-bottom-right {
            border-right: 2px solid rgb(255, 121, 64);
            border-bottom: 2px solid rgb(255, 121, 64);
            bottom: 0;
            right: 0;
        }
    }
</style>