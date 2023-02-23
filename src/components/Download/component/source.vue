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
      <slot></slot>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Download',
  components: {  },
  props: {  
    href: {
      type: String,
      default: ''
    },

    strokeWdith: {
      type: Number,
      default: 16
    },

    // 数据来源   local 本地， http  fetch
    from: {
      type: String,
      default: 'axios'
    }
  },
  data () {
    return {
      percentage: 0,

      downloading: false
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
    clearProgress() {
      this.percentage = 0
      this.downloading = false
    },

    /**
     * 
     * OK
     * 
     */
    donwloadFromFetch(url = this.href, name = 'test') {
      fetch(url).then((res) => {

          console.log('res', res)
          res.blob().then((blob) => {
              console.log('blob', blob)

              const blobUrl = window.URL.createObjectURL(blob);

              console.log('blobUrl', blobUrl)
              const filename = name;
              const a = document.createElement('a');
              a.href = blobUrl;
              a.download = `${ filename }.mp4`;
              a.click();
              window.URL.revokeObjectURL(blobUrl);
          });
      });
    },

    downloadFromHttp() {
      const xhrInstance = new XMLHttpRequest()
      xhrInstance.open('GET', this.href, true)
      xhrInstance.responseType = 'arraybuffer'
      xhrInstance.onload = function () {
        if(xhrInstance.readyState === 4 && xhrInstance.status === 200) {
          const blob = this.response
          console.log(blob);
            // 转换一个blob链接
            // 注: URL.createObjectURL() 静态方法会创建一个 DOMString(DOMString 是一个UTF-16字符串)，
            // 其中包含一个表示参数中给出的对象的URL。这个URL的生命周期和创建它的窗口中的document绑定
            let downLoadUrl = window.URL.createObjectURL(new Blob([blob], { type: 'video/mp4' }));
            // 视频的type是video/mp4，图片是image/jpeg
            // 01.创建a标签
            let linkInstance = document.createElement('a');
            // 02.给a标签的属性download设定名称
            linkInstance.download = name;
            // 03.设置下载的文件名
            linkInstance.href = downLoadUrl;
            // 04.对a标签做一个隐藏处理
            linkInstance.style.display = 'none';
            // 05.向文档中添加a标签
            document.body.appendChild(linkInstance);
            // 06.启动点击事件
            linkInstance.click();
            // 07.下载完毕删除此标签
            linkInstance.remove();
        }
      }
      xhrInstance.send()
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
      const total = progress.srcElement.getResponseHeader('Real-Content-Length')
      const downProgress = Math.floor((progress.loaded / total) * 100)
      this.percentage = downProgress
    },  

    async donwloadFromLoack() {
      const uniSign = `${ moment().valueOf() }`
      const result = await this.getBolbFromAxios(this.href, this.callBackProgress, uniSign)
      console.log('result', result)
    },


    handleDownloadEvent() {
      switch (this.from) {
        case 'axios':
          this.donwloadFromLoack()
          break;
        case 'http':
          this.downloadFromHttp()
          break;
        case 'fetch':
          this.donwloadFromFetch()
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
<style lang="scss" scoped>
.download-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .in-download {
    width: 100%;
    height: 100%;
  }
}
</style>
