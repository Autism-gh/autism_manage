<template>
    <div class="BackGradient" :style="formatBackStyle">
        <div class="header">
            {{  title  }}
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'BackGradient',
        components: {},
        props: {
            title: {
                type: String,
                default: '背景渐变框'
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
                    radius: '6px',
                    borderColor: 'rgba(0,180,220,0.5)',
                    colorList: ['rgba(0,180,220,0.2)','rgba(0,180,220,0.1)','rgba(0,180,220,0.1)','rgba(0,180,220,0.2)'],
                    // colorList: ['red','green','blue', 'white'],
                    shadowColor: 'rgba(0,180,220,.1)'
                }, this.styleOptions)
            },      


            formatBackStyle() {
                const { radius, borderColor, colorList, shadowColor } = this.formatStyleOption
                const colorString = colorList.join(',')
                return {
                    'border-radius': `${ radius }`,
                    'border': `1px solid ${ borderColor }`,
                    'background': `linear-gradient(180deg, ${ colorString })`,
                    'box-shadow': `0 0 4px ${ shadowColor } inset`
                }
            }
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
.BackGradient {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 10px;

    .header {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #e5e5e5;
    }
}
</style>