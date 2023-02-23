<template>
    <div id="app">
        <router-view />

        <MyWife></MyWife>

        <el-drawer title="系统设置" :modal="false" size="300px" :visible.sync="systemSetting" direction="rtl">
            <Setting></Setting>
        </el-drawer>

    </div>
</template>

<script>
    import MyWife from '@/entry/wife/MyWife'
    import Setting from '../src/entry/app/Setting'
    export default {
        name: 'App',
        components: {
            MyWife,
            Setting
        },
        computed: {

            systemSetting: {
                get() {
                    return this.$store.state.settings.systemSetting
                },
                set(val) {
                    this.$store.dispatch('settings/switchChange', val)
                }
            },
        }
    }
</script>

<style>
    html,
    body {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #app {
        position: relative;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
</style>