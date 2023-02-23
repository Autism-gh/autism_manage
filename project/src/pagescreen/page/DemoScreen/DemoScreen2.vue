<template>
    <ActiveLayout class="screen-Layout demoscreen">
        <template slot="header">
            <div class="demoscreen__header">
                
            </div>
        </template>
        <template slot="left">
            <div class="demoscreen__left">
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图1"></ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图2"></ActiveBorder>
                </div>
                <div class="range range-h33-w100">
                    <ActiveBorder title="左侧图3"></ActiveBorder>
                </div>
            </div>
        </template>
        <template slot="center">
            <div class="demoscreen__center">
                <ActiveBorder title="中间图1"></ActiveBorder>
            </div>
        </template>
    </ActiveLayout>
</template>
<script>
import ActiveLayout from '../../package/layout/LeftFixedLayout.vue'
import ActiveBorder from '../../package/border/HeaderBorder.vue'
export default {
  name: 'DemoScreen2',
  components: { ActiveLayout, ActiveBorder },
  props: {  },
  data () {
    return {
     
    }
  },
  computed: {

  },
  methods: {

  },
  beforeCreate () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {

  },
  beforeDestroy() {

  },
}
</script>
<style lang="scss" scoped  horizontalvw>
@import '../../scss/common.scss';
.demoscreen {
    background-color: #2e2e2e;

    &__header {
        position: relative;
        height: 100%;
        display: flex;
        font-size: 40px;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,0.2);
    }
    &__left {   
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    &__center {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    &__right {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
}
</style>
