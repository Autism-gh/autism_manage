<template>
    <div class="screen-left-menu hide-scrollbar">
        <div class="menu-content">
            <div class="menu-logo">
                <img :src="logo" class="sidebar-logo">
                <h1 class="sidebar-title">{{ title }} </h1>
            </div>
            <ul>
                <router-link 
                    v-for="item in screenMenu" :key="item.path" 
                    :to="item.path" tag="li">
                    {{  item.meta.title  }}
                </router-link>
            </ul>
        </div>
        <div class="menu-touch-bar">
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: 'LeftMenu',
        components: {},
        props: {},
        data() {
            return {
                title: 'AUTISM_MANAGE',

                logo: require('@/assets/logo.png'),

                screenMenu: [],

                showMenu: false
            }
        },
        computed: {
            ...mapState('permission', ['addRoutes'])
        },
        methods: {
            
        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {
            
        },
        mounted() {
            const screenRouter = this.addRoutes.find(item => item.name === 'screen')
            this.screenMenu = screenRouter.children
        },
        beforeDestroy() {

        },
    }
</script>
<style lang="scss" scoped horizontalvw>

$sideWidth: 200px;

.screen-left-menu {
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 100000;
    display: flex;
    flex-direction: row;
    background-color: #2e2e2e;
    left: -$sideWidth;
    transition: all 0.3s;

    &:hover {
        left: 0;
        transition: all 0.3s;
    }

    .menu-logo {
        display: flex;
        justify-content: center;
        align-items: center;

        .sidebar-logo {
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        .sidebar-title {
            display: inline-block;
            margin: 0;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
        }
    }
    

    .menu-content {
        width: $sideWidth;
        height: 100%;
        overflow-y: auto;
        background-color: rgba(0,0,0,0.15);

        ul {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        li {
            background-color: rgba(0,0,0,0.15);
            margin-top: 15px;
            cursor: pointer;
            width: 80%;
            height: 80px;
            border-top: solid 3px #ff7940;
            display: flex;
            align-items: center;
            justify-content: center;

            &.active {
                border-left: solid 3px #ff7940;
                border-right: solid 3px #ff7940;
                border-bottom: solid 3px #ff7940;
            }
        }
    }

    .menu-touch-bar {
        height: 100%;
        width: 10px;
        background-color: rgba(0,0,0,0.25);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>