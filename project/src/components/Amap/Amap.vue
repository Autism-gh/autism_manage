<template>
    <div class="amap-container">
        <div ref="amap" class="amap-center"></div>
    </div>
</template>

<script>
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