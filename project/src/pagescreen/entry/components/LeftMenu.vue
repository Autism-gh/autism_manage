<template>
    <div class="screen-left">
        
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'LeftMenu',
        components: {},
        props: {},
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState('permission', ['addRoutes'])
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
            console.log('addRoutes', this.addRoutes)
        },
        beforeDestroy() {

        },
    }
</script>
<style lang="scss" scoped>

</style>