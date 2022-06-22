<template>
    <div :class="['flex-container', { hasBorder, hasShadow }]">
        <div class="left-wrapper" 
            v-show="$slots.leftWrapper" 
            v-resize="{ 
                min: [240,0],
                max: [500,0],
                triggerHint: true, 
                triggerPosition: ['right']
            }"
            :style="{width: leftSize + 'px'}">
            <slot name="leftWrapper"></slot>
        </div>
        
        <div class="right-wrapper">
            <div class="right-wrapper__top" 
                v-show="$slots.rightTop"
                v-resize="{ 
                    min: [0,0],
                    max: [Infinity, '50%'],
                    triggerHint: true, 
                    triggerPosition: ['bottom']
                }"
                :style="{height: topSize + 'px'}">
                <slot name="rightTop"></slot>
            </div>
            <div class="right-wrapper__bottom">
                <slot name="rightBottom"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            leftSize: {
                type: [Number, String],
                default: 280
            },

            topSize: {
                type: [Number, String],
                default: 100
            },

            hasBorder: {
                type: Boolean,
                default: true
            },

            hasShadow: {
                type: Boolean,
                default: false
            }
        },
        name: 'FlexContainer',
        data() {
            return {
                
            };
        },
        watch: {

        },
        computed: {
            
        },
        methods: {

        },
        created() {

        },
        mounted() {

        },
    };
</script>
<style lang="scss" scoped>
.flex-container {
    width: 100%;
    height: 100%;
    display: block;
    // justify-content: space-between;
    // flex-direction: row;

    padding: var(--default-padding);

    .left-wrapper {
        position: relative;
        float: left;
        height: 100%;
        border-radius: 4px;
        background-color: var(--color-white);
        margin-right: var(--default-padding);
        z-index: 100;
    }
    .right-wrapper {
        position: relative;
        height: 100%;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        // flex-grow: 1;
        overflow: hidden;
    }
    
    .right-wrapper__top {   
        width: 100%;
        padding: var(--default-padding);
        margin-bottom: var(--default-padding);
        background-color: var(--color-white);
    }   

    .right-wrapper__bottom {
        width: 100%;
        flex-grow: 1;
        height: 50%;
        background-color: var(--color-white);
    }


    &.hasBorder {
        .left-wrapper, .right-wrapper__top, .right-wrapper__bottom {
            border: solid 1px var(--border-color-base);
        }
    }

    &.hasShadow {
        .left-wrapper, .right-wrapper__top, .right-wrapper__bottom {
            box-shadow: var(--box-shadow-base);
        }
    }
}
</style>