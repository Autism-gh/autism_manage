<template>
    <div class="amap-container">
        <div ref="amap" class="amap-center"></div>
    </div>
</template>

<script>
const { AMap } = window
export default {
    components: {  },
    props: {  

    },
    name: '',
    data() {
       return {
           amapInstance: null,

    
       };
    },
    watch: {
        
    },
    computed: {
        formatOptions() {
            return {
                center: [120.155855,30.328691],
                zoom: 17,
                mapStyle: 'amap://styles/de973b14436206d6a3e3d8a9fd2698b9',
                // mapStyle: 'amap://styles/darkblue',
            }
        }
    },
    methods: {
        async createMap() {
            this.amapInstance = new AMap.Map(this.$refs['amap'], this.formatOptions);
            await this.$nextTick()
            this.$emit('ready', this.mapInstance)
        }
    },
    created() {
        
    },
    mounted() {
        this.createMap()
    },
};
</script>
<style lang="scss" scoped>
.amap-container {
    position: relative;
    width: 100vw;
    height: 100vh;

    .amap-center {
        width: 100%;
        height: 100%;
    }
}
</style>