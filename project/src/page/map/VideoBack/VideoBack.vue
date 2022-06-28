<template>
  <el-row class="video-back">
    <el-col :span="20" style="height: 100%">
        <VideoPlayer ref="videoplayer"></VideoPlayer>
    </el-col>
    
    <el-col :span="4">
        <el-button type="primary" @click="handleOpen">主要按钮</el-button>
    </el-col>
  </el-row>
</template>
<script>
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer.vue'
export default {
  name: '',
  components: { VideoPlayer },
  props: {  },
  data () {
    return {
     
    }
  },
  computed: {

  },
  methods: {
    handleOpen() {
        const $video = this.$refs['videoplayer']
        $video.init({
            sources: [
                {
                    type: "video/mp4",
                    src: 'https://oss-sz-pluro8cxuvbf.oss-cn-shenzhen.aliyuncs.com/record/live/013611111111-4/11_2022-06-14-18-18-29_2022-06-14-18-21-42.mp4?OSSAccessKeyId=LTAI5tHR4t9GsTfko8DqvaRZ&Expires=1656383790&Signature=oRcX1tXVd2aTPRnFntemgad4EaI%3D'
                }
            ]
        })
        $video.play()
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
.video-back {
    width: 100%;
    height: 100%;
}
</style>
