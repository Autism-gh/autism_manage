<template>
    <LeafletMap @ready="generateObj">
        
        
    </LeafletMap>
</template>

<script>
import L, { LeafletMap } from '@/components/Leaflet/index'
// import LeafletMap from '@/components/Leaflet/LeafletMap.vue'
export default {
    components: { LeafletMap },
    props: {  },
    name: 'Monitor',
    data() {
       return {
            mapInstance: null,

            testMarkerInstance: null,

            interVaList: []
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
        },

        generateObj(obj) {
            this.mapInstance = obj
        },

        createTestMarker() {
            const latlng = [30.197747, 120.231418]
            const rotationAngle = 135
            const iconRotationAngle = -(rotationAngle * 2)
            const dicIcon = L.divIcon({
                className: 'leaflet-marker-rotate',
                html: `<div class="marker-content"><i class="el-icon-caret-top"></i><span style="transform: rotate(${ iconRotationAngle }deg);">正</span></div>`,
                iconSize: L.point(40, 40),
                iconAnchor: [20, 20]
            });
            this.testMarkerInstance = L.marker(latlng, { icon: dicIcon, rotationAngle })
            this.testMarkerInstance.addTo(this.mapInstance)            
        },

        changeMarkerRotate() {
            const rotationAngle = Math.floor(Math.random() * 360)
            const iconRotationAngle = -(rotationAngle * 2)
            const newIcon = L.divIcon({
                className: 'leaflet-marker-rotate',
                html: `<div class="marker-content"><i class="el-icon-caret-top"></i><span style="transform: rotate(${ iconRotationAngle }deg);">正</span></div>`,
                iconSize: L.point(40, 40),
                iconAnchor: [20, 20]
            });
            this.testMarkerInstance.setRotationAngle(rotationAngle)
            this.testMarkerInstance.setIcon(newIcon)
        },

        startTimeRotate() {
            this.clearTimer()
            this.interVaList.push(
                setInterval(this.changeMarkerRotate, 2000)
            )
        },

        clearTimer() {
            this.interVaList.forEach(item => {
                clearInterval(item)
            })
            this.interVaList = []
        }
    },
    created() {
        
    },
    mounted() {
        this.createTestMarker()
        // this.startTimeRotate()
    },
    beforeDestroy () {
        this.clearTimer()
    }
};
</script>
<style lang="scss" scoped>

</style>