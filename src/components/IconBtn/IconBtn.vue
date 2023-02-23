<template>
  <i v-tooltip="{'content': title}" 
    :class="['font-icon', icon, { 'font-icon--hover': hover }]" 
    :style="formatStyle"
    v-on="$listeners">
  </i>
</template>
<script>
import { isString } from '@/util/common/type-check'
export default {
  name: 'IconBtn',
  components: {  },
  props: {  
    title: {
        type: String,
        default: ''
    },

    icon: {
        require: true,
        type: String,
        default: ''
    },

    hover: {
        type: Boolean,
        default: true
    },

    size: {
        type: [Number,String],
        default: 16
    }
  },
  data () {
    return {
     
    }
  },
  computed: {
    formatStyle() {
      return isString(this.size) ? `font-size: ${ this.size }` : `font-size: ${ this.size }px`
    }
  },
  methods: {
    handleEmitEvent() {
      this.$emit('click')
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
.font-icon {
  &--hover {
    &:hover {
      color: var(--color-primary);
    }
  }

  & +.font-icon {
    margin-left: 5px;
  }
}
</style>
