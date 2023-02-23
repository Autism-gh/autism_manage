<template>
    <div class="normalVideo">
        <div class="wrapper border--both">
            <div class="header">
                <el-button type="primary" @click="startPlay1">播放</el-button>
                <el-button type="primary" @click="stopPlay1">暂停</el-button>
                <el-button type="primary" @click="changeVideo1(2)">换视频</el-button>
                <el-button type="primary" @click="changeVideo1(1)">换视频2</el-button>
            </div>
            <div class="content">
                <!-- :style="videoStyle"  -->
                <OriginalVideoVue ref="OriginalVideoVue" :url="activeUrl"></OriginalVideoVue>
            </div>
        </div>
        <div class="wrapper border--both">
            <div class="header">
                <el-button type="primary" @click="startPlay2">播放</el-button>
                <el-button type="primary" @click="stopPlay2">暂停</el-button>
                <el-button type="primary" @click="fullScreen">全屏</el-button>
                <el-button type="primary" @click="EditFullScreen">退出全屏</el-button>
                <el-button type="primary" @click="showControl">显示工具</el-button>
                <el-button type="primary" @click="destoryPlay">销毁</el-button>
                <el-button type="primary" @click="changeVideo2(2)">换视频</el-button>
                <el-button type="primary" @click="changeVideo2(1)">换视频2</el-button>
            </div>
            <!-- :style="videoStyle"  -->
            <div class="content">
                <VideoPlayerVue ref="VideoJsComponentVue"></VideoPlayerVue>
                <!-- <VideoJsComponentVue ref="VideoJsComponentVue"></VideoJsComponentVue> -->
            </div>
        </div>
    </div>
</template>
<script>
    import OriginalVideoVue from '@/components/VideoPlayer/OriginalVideo.vue'
    import VideoPlayerVue from '@/components/VideoPlayer/VideoPlayer.vue'
    // import VideoJsComponentVue from '@/components/VideoPlayer/VideoJsComponent.vue'
    export default {
        name: '',
        components: {
            OriginalVideoVue,
            // VideoJsComponentVue,
            VideoPlayerVue
        },
        props: {},
        data() {
            return {
                control: true,

                videoStyle: `width: 500px; height: 250px`,

                activeUrl: 'http://migtlfusamctpbz.oss-cn-shenzhen.aliyuncs.com/record%2Flive%2F000000091901-7%2F34_2022-08-10-02-45-10_2022-08-10-03-00-10.mp4?Expires=1660187971&OSSAccessKeyId=LTAI5tHiNoP1duny7uqZNRDM&Signature=wFc3mvJOneS7xtRhqYxbA9Iya2k%3D',
            }
        },
        computed: {
            videoInstance1() {
                return this.$refs['OriginalVideoVue']
            },

            videoInstance2() {
                return this.$refs['VideoJsComponentVue']
            }
        },
        methods: {
            /**
             * 左边
             */
            startPlay1() {
                this.videoInstance1.play()
            },

            stopPlay1() {
                this.videoInstance1.pause()
            },

            async changeVideo1(index) {
                const videoObj = {
                    1: 'http://migtlfusamctpbz.oss-cn-shenzhen.aliyuncs.com/record%2Flive%2F000000091901-7%2F2_2022-08-09-18-45-10_2022-08-09-19-00-10.mp4?Expires=1660187971&OSSAccessKeyId=LTAI5tHiNoP1duny7uqZNRDM&Signature=CLRflTwP8MKkQhvCkw74EzumVro%3D',
                    2: 'http://migtlfusamctpbz.oss-cn-shenzhen.aliyuncs.com/record%2Flive%2F000000091901-7%2F7_2022-08-09-20-00-10_2022-08-09-20-15-10.mp4?Expires=1660187971&OSSAccessKeyId=LTAI5tHiNoP1duny7uqZNRDM&Signature=dfJK2F9WsCVk6FqNv%2FOZWS%2Fnp%2FM%3D',
                }
                this.activeUrl = videoObj[index]
                await this.$nextTick()
                this.videoInstance1.play()
            },  

            /**
             * 右边
             */


            startPlay2() {
                this.videoInstance2.play()
            },

            stopPlay2() {
                this.videoInstance2.pause()
            },

            fullScreen() {
                this.videoInstance2.fullScreen()
            },

            EditFullScreen() {
                this.videoInstance2.editScreen()
            },

            showControl() {
                this.control = !this.control
                this.videoInstance2.showControl(this.control)
            },

            destoryPlay() {
                this.videoInstance2.close()
            },

            changeVideo2(index) {
                const videoObj = {
                    1: 'http://migtlfusamctpbz.oss-cn-shenzhen.aliyuncs.com/record%2Flive%2F000000091901-7%2F2_2022-08-09-18-45-10_2022-08-09-19-00-10.mp4?Expires=1660187971&OSSAccessKeyId=LTAI5tHiNoP1duny7uqZNRDM&Signature=CLRflTwP8MKkQhvCkw74EzumVro%3D',
                    2: 'http://migtlfusamctpbz.oss-cn-shenzhen.aliyuncs.com/record%2Flive%2F000000091901-7%2F7_2022-08-09-20-00-10_2022-08-09-20-15-10.mp4?Expires=1660187971&OSSAccessKeyId=LTAI5tHiNoP1duny7uqZNRDM&Signature=dfJK2F9WsCVk6FqNv%2FOZWS%2Fnp%2FM%3D',
                }

                const url = videoObj[index]
                this.videoInstance2.changeVideo({ src: url })
            }   

        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {

        },
        mounted() {

        },
        beforeDestroy() {

        },
    }
</script>
<style lang="scss" scoped>
    .normalVideo {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        background-color: var(--color-white);

        .wrapper {
            position: relative;
            height: 100%;
            width: 50%;
            display: flex;
            flex-direction: column;

            .header {
                height: 50px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 20px;
            }

            .content {
                width: 100%;
                height: calc(100% - 50px);
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>