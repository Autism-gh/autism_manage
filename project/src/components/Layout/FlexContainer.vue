<template>
    <div :class="['flex-container', { hasBorder, hasShadow }]">
        <div class="left-wrapper" :style="formatLeftStyle">
            <slot name="leftWrapper"></slot>
        </div>
        <div class="right-wrapper" :style="formatRightStyle">
            <slot name="rightWrapper"></slot>
        </div>
    </div>
</template>

<script>
    import { isString } from '@/util/common/type-check.js'
    export default {
        components: {},
        props: {
            leftSize: {
                type: [Number, String],
                default: 280
            },

            topSize: {
                type: [Number, String],
                default: 280
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
        name: '',
        data() {
            return {
                
            };
        },
        watch: {

        },
        computed: {
            formatLeftStyle() {
                return isString(this.leftSize) ? `width: ${ this.leftSize };` : `width: ${ this.leftSize }px;`
            },

            formatRightStyle() {
                const leftWidth = isString(this.leftSize) ? this.leftSize : `${ this.leftSize }px`
                return `width: calc(100% - ${ leftWidth })`
            }
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
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: var(--default-padding);

    .left-wrapper {
        height: 100%;
        border-radius: 4px;
        background-color: var(--color-white);
    }
    .right-wrapper {
        height: 100%;
        border-radius: 4px;
        margin-left: var(--default-padding);
        background-color: var(--color-white);
    }

    &.hasBorder {
        .left-wrapper, .right-wrapper {
            border: solid 1px var(--border-color-base);
        }
    }

    &.hasShadow {
        .left-wrapper, .right-wrapper {
            box-shadow: var(--box-shadow-base);
        }
    }
}
</style>