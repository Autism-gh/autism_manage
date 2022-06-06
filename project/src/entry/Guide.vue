<template>
    <div>
        首页测试最好使
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
                }
            };
        },
        watch: {

        },
        computed: {

        },
        methods: {

        },
        created() {

        },
        mounted() {

        },
    };
</script>
<style lang="scss" scoped>

</style>