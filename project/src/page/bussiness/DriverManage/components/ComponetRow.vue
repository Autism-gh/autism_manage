<template>
  <div>
    <el-tag @click="handleEmitEvent('fuck')">哈哈哈</el-tag>
  </div>
</template>
<script>
import EVENTS from '@/util/EVENTS'
export default {
  name: '',
  components: {  },
  props: {  },
  data () {
    return {
     
    }
  },
  computed: {

  },
  methods: {    
    handleEmitEvent(type) {
        console.log('this.params', this)
        this.$parent.$parent.$emit(EVENTS.MANAGE_HANDLER, type)
    }
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
