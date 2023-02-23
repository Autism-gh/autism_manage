<template>
    <div>
        欢迎使用
        <!-- 首页测试最好使
        <el-button type="primary" @click="download">嘿嘿</el-button>

        <el-button type="primary" @click="download2">嘿嘿嘿</el-button>

        <div style="height: 500px">
            <CodeArea color :code="code" ></CodeArea>
        </div>

        <div style="height: 100px;">
            {{ formatData }}
        </div> -->

        <!-- <el-button type="primary" @click="beliveLight">你相信光吗？</el-button> -->
    </div>
</template>

<script>
    // import CodeArea from '@/components/CodeArea/CodeArea'
    export default {
        components: {
            // CodeArea
        },
        props: {},
        name: 'ManageGuide',
        data() {
            return {
                code: {
                    id: '12138',
                    name: '武闯',
                    age: '24',
                    color: '#00c1de',
                    sex: false,

                    obj: {
                        id: '12138',
                        name: 'giao',
                        age: '24',
                        color: '#00c1de',
                        sex: true,
                    }
                },

                url: 'http://oss-sz-pluro8cxuvbf.oss-cn-shenzhen.aliyuncs.com/record%2Flive%2F013611111111-1%2F6_2022-06-14-15-49-54_2022-06-14-15-51-56.mp4?Expires=1656492473&OSSAccessKeyId=LTAI5tHR4t9GsTfko8DqvaRZ&Signature=%2B7RChcKXKKCWHYPGFIPWzV7uZns%3D'
            };
        },
        watch: {
            formatData(newVal) {
                console.log('newVal', newVal)
            } 
        },
        computed: {
            // formatValue() {
            //     return window.formatValue
            // },

            formatData: {
                set(value) {
                    window.formatValue = value
                    console.log('value 设置了吗', value)
                },
                get() {
                    console.log('value 获取了吗', this.formatValue)
                    return this.formatValue
                }
            }
        },
        methods: {
            

            async beliveLight() {
                // this.formatData = Math.floor(Math.random() * 10000)

                this.formatData = Math.floor(Math.random() * 10000)
                // window.formatValue = Math.floor(Math.random() * 10000)

                console.log('window', window)
                console.log('window', window.formatValue)
            },

            download() {

            },

            download2() {
                let url = this.url
                const a = document.createElement('a')
                a.href = url
                a.download = '文件名' // 下载后文件名
                a.style.display = 'none'
                document.body.appendChild(a)
                a.click() // 点击下载
                document.body.removeChild(a)
            }
        },
        created() {

        },
        mounted() {
            var formatValue = {};
            var defaultName = Math.floor(Math.random() * 10000)
            Object.defineProperty(formatValue, "name" ,{
                get: function(){
                    console.log('取值')
                    return defaultName;
                },
                set: function(value){
                    console.log('设置值', value)
                    defaultName = value;
                }
            })
            window.formatValue = formatValue

            // Vue.set(window, 'formatValue', '浙A2B22P')
        },
    };
</script>
<style lang="scss" scoped>

</style>