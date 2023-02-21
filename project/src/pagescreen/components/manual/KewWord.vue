<template>
    <div class="tagcloud">
        <a class="b01 co01">大数据</a>
        <a class="b02 co02">大数据</a>
        <a class="b03 co05">大数据</a>
        <a class="b04 co02">大数据</a>
        <a class="b03 co05">大数据</a>
    </div>
</template>
<script>
    import TagCloud  from '../../util/bubble'
    export default {
        name: 'KewWord',
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
            // console.log('TagCloud', TagCloud)
            TagCloud({
                selector: ".tagcloud",  //元素选择器
                fontsize: 6,            //基本字体大小, 单位px
                radius: 40,             //滚动半径, 单位px 页面宽度和高度的五分之一
                mspeed: "fast",         //滚动最大速度, 取值: slow, normal(默认), fast
                ispeed: "normal",       //滚动初速度, 取值: slow, normal(默认), fast
                direction: 0,           //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
                keep: false             //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
            });
        },
        beforeDestroy() {

        },
    }
</script>
<style lang="scss" scoped horizontalvw>
    @import '../../scss/mixin.scss';

    .tagcloud {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .tagcloud a {
        display: block;
        border-radius: 50%;
        color: #fff;
        font-weight: bold;
        font-size: 14px;
        text-decoration: none;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .b01 {
        width: 50px;
        height: 50px;
    }

    .b02 {
        width: 60px;
        height: 60px;
    }

    .b03 {
        width: 70px;
        height: 70px;
    }

    .b04 {
        width: 80px;
        height: 80px;
    }

    .b05 {
        width: 90px;
        height: 90px;
    }

    .co01 {
        border: 2px solid $--first-color;
        box-shadow: inset 0 0 20px $--first-color;
    }

    .co02 {
        border: 2px solid $--second-color;
        box-shadow: inset 0 0 20px $--second-color;
    }

    .co03 {
        border: 2px solid $--third-color;
        box-shadow: inset 0 0 20px $--third-color;
    }

    .co04 {
        border: 2px solid $--fourth-color;
        box-shadow: inset 0 0 20px $--fourth-color;
    }

    .co05 {
        border: 2px solid $--fifth-color;
        box-shadow: inset 0 0 20px $--fifth-color;
    }
</style>