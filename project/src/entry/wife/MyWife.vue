<template>
    <div class="waifu" v-show="showWife">

        <!-- 提示框 -->
        <div class="waifu-tips">
            {{ wifemessage }}
        </div>
        
        <!-- 看板娘画布 -->
        <canvas @click="changeWifeClothes()" id="live2d" width="280" height="250" class="live2d"></canvas>

    </div>
</template>

<script>
import { mapState } from 'vuex'
const loadlive2d = require('loadlive2d')
export default {
    name: 'MyWife',
    components: {  },
    data () {
        return {


        };
    },

    computed: {
        ...mapState('wife', ['modelId', 'wifemessage']),

        ...mapState('settings', ['showWife'])
    },

    watch: {
        modelId(newVal) {
            this.changeWifeClothes()
        }  
    },

    mounted() { 
        if(!loadlive2d) {
            this.$warning('live2d 加载失败')
            return
        }
        
        this.changeWifeClothes(this.modelId)
    },

    methods: {
        async changeWifeClothes(modelId = null) {
            let radoModelId = modelId || Math.ceil(Math.random() * 87);
            await this.$nextTick()
            loadlive2d("live2d", `/wife/model/index${ radoModelId }.json`);
        },
    }
}

</script>

<style lang='scss' scoped>
@import url('./MyWife.scss');
</style>