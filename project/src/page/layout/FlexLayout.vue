<template>
    <FlexContainer>
        <template slot="leftWrapper">
            这里是操作栏
        </template>

        <template slot="rightTop">
            这里是条件筛选栏
        </template>

        <template slot="rightBottom">
            这里是数据展示栏
        </template>
    </FlexContainer>
</template>
<script>
    import FlexContainer from '@/components/Layout/FlexContainer2'
    export default {
        name: 'FlexLayout',
        components: {
            FlexContainer
        },
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

</style>