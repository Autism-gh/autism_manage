<template>
  <div class="download-container">
    <div class="in-download" v-show="downloading">
      <el-progress 
        :text-inside="true" 
        :stroke-width="strokeWdith" 
        :percentage="percentage">
      </el-progress>
    </div>
    <div class="out-download" v-show="!downloading" @click="handleDownloadEvent">
        <template v-if="$slots.default">
          <slot></slot>
        </template>
        <template v-else>
          <i class="el-icon-download"></i>
        </template>
        <span v-show="downloadStep === 'success'" class="margin--l text--success">(下载完成)</span>
        <span v-show="downloadStep === 'error'" class="margin--l text--danger">(下载失败)</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Download',
  components: {  },
  props: {  
    href: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: 'download'
    },

    strokeWdith: {
      type: Number,
      default: 16
    },

    /**
     * 这个值暂时不要动，后续如果要改说一下
     */
    from: {
      type: String,
      default: 'axios'
    }
  },
  data () {
    return {
      percentage: 0,

      downloading: false,

      downloadStep: 'default'
    }
  },

  watch: {
    href() {
      this.clearProgress()
    }
  },
  computed: {

  },
  methods: {
    clearProgress(state = 'default') {
      this.percentage = 0
      this.downloading = false
      this.downloadStep = state
    },

    getBolbFromAxios(url = this.href, callBack) {
      return axios({
        url: url,
        method: 'get',
        responseType: 'blob',
        onDownloadProgress(progress){
          callBack(progress)
        }
      })
    },

    callBackProgress(progress) {
      if(!progress) return
      const { total, loaded } = progress
      const downProgress = Math.floor((loaded / total) * 100)
      this.percentage = downProgress
      this.downloadStep = 'doing'
    },  
    
    async donwloadFromLoack() {
      this.downloading = true

      const result = await this.getBolbFromAxios(this.href, this.callBackProgress)
      
      if(!result || result.status !== 200) {
        this.clearProgress('error')
        return
      }

      const blob = result.data
      let downLoadUrl = window.URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }));
      let linkInstance = document.createElement('a');
      linkInstance.download = this.text;
      linkInstance.href = downLoadUrl;
      linkInstance.style.display = 'none';
      document.body.appendChild(linkInstance);
      linkInstance.click();
      linkInstance.remove();

      this.clearProgress('success')

      this.$emit('success')
    },

    handleDownloadEvent() {
      switch (this.from) {
        case 'axios':
          this.donwloadFromLoack()
          break;
      }
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
<style lang="scss">
.download-container {
  .el-progress {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss" scoped>
.download-container {
  position: relative;
  width: 100%;
  height: 100%;
  
  .in-download {
    width: 100%;
    height: 100%;
  }

  .out-download {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .download-custom {
    cursor: pointer;
  }
}
</style>
