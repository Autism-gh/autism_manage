<template>
  <div class="amap-page-container">
    <AmapVue></AmapVue>
  </div>
</template>
<script>
import AmapVue from '@/components/Amap/Amap.vue';
export default {
  name: 'AmapDefault',
  components: { AmapVue },
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
<style lang="scss" scoped>
.amap-page-container {
    position: relative;
    width: 100%;
    height: 100%;
}   
</style>
