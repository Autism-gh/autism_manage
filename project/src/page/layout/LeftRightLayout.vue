<template>
  <LeftRight :rightmost="sb">
    <template slot="leftWrapper">
      迪迦！
    </template>
    <template slot="rightWrapper">
      你要永远相信光
    </template>
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
      sb: true
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
