<template>
    <div class="screen-wrapper">
        <LeftMenu></LeftMenu>
        <router-view />
    </div>
</template>
<script>
    import LeftMenu from './components/LeftMenu.vue'
    export default {
        name: '',
        components: { LeftMenu },
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
.screen-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
}
</style>