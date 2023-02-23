<template>
  <LeftRight v-model="test">
    <template slot="leftWrapper">
      迪迦！
    </template>
    <template slot="rightWrapper">
      {{ test }}
    </template>

    <el-button type="primary" @click="test = true">清空</el-button>
    <el-button type="primary" @click="test = false">显示</el-button>
  </LeftRight>
</template>
<script>
import LeftRight from '@/components/Layout/LeftRight.vue';
export default {
  name: 'LeftRightLayout.vue',
  components: { LeftRight },
  props: {  },
  data () {
    return {
      test: false
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
<style lang="scss" scoped>

</style>
