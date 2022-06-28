<template>
    <div>
        首页测试最好使
        <el-button type="primary" @click="download">嘿嘿</el-button>

        <el-button type="primary" @click="download2">嘿嘿嘿</el-button>

        <div style="height: 400px; height: 500px">
            <CodeArea color :code="code" ></CodeArea>
        </div>

        
    </div>
</template>

<script>
    import CodeArea from '@/components/CodeArea/CodeArea'
    export default {
        components: {
            CodeArea
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

        },
        computed: {

        },
        methods: {
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

        },
    };
</script>
<style lang="scss" scoped>

</style>