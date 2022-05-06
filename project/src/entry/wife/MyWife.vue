<template>
    <div class="waifu">

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
        ...mapState('wife', ['modelId', 'wifemessage'])
    },

    watch: {
        // this.$store.commit('wife/setCurrentState', { key: 'modelId', value: radoModelId })
        modelId(newVal) {
            this.changeWifeClothes()
        }  
    },

    mounted() { 
        console.log('loadlive2d', loadlive2d)

        if(!loadlive2d) {
            this.$warning('live2d 加载失败')
            return
        }
        
        this.changeWifeClothes(this.modelId)
    },

    methods: {
        async changeWifeClothes(modelId = null) {
            let radoModelId = modelId || Math.ceil(Math.random() * 87);
            // 随时换皮肤哦 由于改成直接调取，所以请求的这个速度啊，刚刚的！
            await this.$nextTick()
            loadlive2d("live2d", `/wife/model/index${ radoModelId }.json`);
        },
    }
}

</script>

<style lang='scss' scoped>
@import url('./MyWife.scss');
</style>