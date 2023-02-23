<template>
    <div class="real-time">
        {{ activeTime }}
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        name: 'RealTime',
        components: {},
        props: {},
        data() {
            return {
                changeTimer: null,
                activeTime: ''
            }
        },
        computed: {

        },
        methods: {
            startChangeTime() {
                this.stopChangeTime()
                this.handleChangeTime()
                this.changeTimer = setInterval(this.handleChangeTime, 1000)
            },

            handleChangeTime() {
                this.activeTime = moment().format('YYYY-MM-DD HH:mm:ss')
            },

            stopChangeTime() {
                if(this.changeTimer) {
                    clearInterval(this.changeTimer)
                    this.changeTimer = null
                }
            }
        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {

        },
        mounted() {
            this.startChangeTime()
        },
        beforeDestroy() {
            this.stopChangeTime()
        },
    }
</script>
<style lang="scss" scoped>
.real-time {
    
}
</style>