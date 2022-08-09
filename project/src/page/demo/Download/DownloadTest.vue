<template>
  <div>
    <div style="width: 200px; height: 80px">
      <DownloadVue :href="qianghref" text="美女蹦迪">
        <el-button icon="el-icon-download" circle></el-button>
      </DownloadVue>
    </div>
    <div style="width: 200px; height: 80px">
      <DownloadVue :href="qianghref" text="美女蹦迪"></DownloadVue>
    </div>
  </div>
</template>
<script>
// import DownloadScreenVue from '@/components/Download/DownloadScreen.vue'
import DownloadVue from '@/components/Download/Download.vue'
export default {
  name: 'DownloadTest',
  components: { DownloadVue },
  props: {  },
  data () {
    return {
      onlinehref: 'https://oss-sz-pluro8cxuvbf.oss-cn-shenzhen.aliyuncs.com/ABUIABA6GAAgyO6akgYopuP1iQc.mp4?OSSAccessKeyId=LTAI5tHiNoP1duny7uqZNRDM&Expires=1660054549&Signature=htiTDmCgYoWQ1Ek%2FcsdDpC%2FUqko%3D.mp4',
      localhref: '@/assets/mp4/test.mp4',
      qianghref: 'http://10.33.0.201:1323/static/ABUIABA6GAAgyO6akgYopuP1iQc.mp4'
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
