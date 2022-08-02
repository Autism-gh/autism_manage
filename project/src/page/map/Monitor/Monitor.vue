<template>
    <LeafletMap>
        
        
    </LeafletMap>
</template>

<script>
// import L from '@/components/Leaflet/index'
import LeafletMap from '@/components/Leaflet/LeafletMap.vue'
export default {
    components: { LeafletMap },
    props: {  },
    name: 'Monitor',
    data() {
       return {
            
       };
    },
    watch: {
        
    },
    computed: {
        
    },
    methods: {
        startPlayVideo() {
            const url = 'https://play.live.ulinqdata.com/live/012312312301-4.flv'
            this.$refs['flvplayer'].load(url)
        }
    },
    created() {
        
    },
    mounted() {
        
    },
};
</script>
<style lang="scss" scoped>

</style>