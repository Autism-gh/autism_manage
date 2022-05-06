<template>
    <div class="navbar">

        <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-menu">

            <template v-if="device!=='mobile'">

                <ErrorLog class="errLog-container right-menu-item hover-effect" />

            </template>

            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">

                <div class="avatar-wrapper">
                    <img src="@/assets/images/headpic/default_headpic.jpg" class="user-avatar">
                    <span class="name-avatar">您好：Admin</span>
                    <i class="el-icon-caret-bottom" />
                </div>
                
                <template v-slot:dropdown>
                    <el-dropdown-menu >
                        <el-dropdown-item @click="changeSettingSwitch">
                            系统设置
                        </el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">
                            退出登入
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>

            </el-dropdown>
        </div>

    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import Breadcrumb from './Breadcrumb/index'
    import Hamburger from './Hamburger/index'
    import ErrorLog from './ErrorLog/index.vue'


    export default {
        components: {
            Breadcrumb,
            Hamburger,
            ErrorLog
        },
        computed: {
            ...mapGetters(['sidebar', 'device'])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            },

            changeSettingSwitch() {
                this.$store.dispatch('settings/switchChange')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 15px;

                .avatar-wrapper {
                    display: flex;
                    align-items: center;
                    position: relative;

                    .name-avatar {
                        margin: 0 10px;
                        font-size: 14px;
                    }

                    .user-avatar {
                        cursor: pointer;
                        width: 32px;
                        height: 32px;
                        border-radius: 4px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>