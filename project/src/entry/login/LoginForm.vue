<template>
    <div class="loginform">

        <div class="loginform__header">
            欢迎使用
        </div>

        <el-form ref="ruleForm" class="loginform__form" :model="modal.data" :rules="modal.rules">
            <el-form-item prop="username">
                <el-input placeholder="请输入用户名" v-model="modal.data.username" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入密码" :type="modal.inputType" v-model="modal.data.password" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item prop="identify">
                <div class="flexgraw">
                    <div class="flexgraw-graw">
                        <el-input ref="password" placeholder="请输入验证码" v-model="modal.data.identify" autocomplete="off">
                        </el-input>
                    </div>
                    <div class="flexgraw-lock">
                        <LoginIdentify ref="identify" v-model="modal.checkIdentify" />
                    </div>
                </div>
            </el-form-item>
        </el-form>


        <div class="loginform__button">
            <el-button class="loginform-btn" type="primary" @click.prevent="handleLogin">登录</el-button>
        </div>


        <el-row class="loginform__control" type="flex" align="center">
            <el-col :span="12" class="flex flex--start pointer">
                <el-checkbox v-model="rememberPassword">7天内自动登入</el-checkbox>
            </el-col>
            <el-col :span="12" class="flex flex--end pointer">
                <span class="text--brand">忘记密码?</span>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import LoginIdentify from './LoginIdentify.vue'
    export default {
        components: {
            LoginIdentify
        },
        props: {},
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入用户名'))
                } else {
                    callback()
                }
            }

            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('请输入密码'))
                } else {
                    callback()
                }
            }

            const validateIdentify = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入验证码'))
                } else if (value !== this.modal.checkIdentify) {
                    this.modal.data.identify = ''
                    this.$refs['identify'].reflashIdentifyCode()
                    callback(new Error('Verification code error'))
                } else {
                    callback()
                }
            }

            return {
                modal: {
                    data: {
                        username: 'admin',
                        password: '123546',
                        identify: '1113',
                    },

                    checkIdentify: '1113',

                    inputType: 'password',

                    rules: {
                        username: [{
                            required: true,
                            trigger: 'none',
                            validator: validateUsername
                        }],
                        password: [{
                            required: true,
                            trigger: 'none',
                            validator: validatePassword
                        }],
                        identify: [{
                            required: true,
                            trigger: 'none',
                            validator: validateIdentify
                        }]
                    }
                },

                rememberPassword: true,

                errormsg: ''
            };
        },
        watch: {

        },
        computed: {

        },
        methods: {
            handleLogin() {
                this.$refs.ruleForm.validate(async valid => {
                    if(!valid) return

                    const res = await this.$store.dispatch('user/login', {
                        username: this.modal.data.username,
                        password: this.modal.data.password,
                        remember: this.rememberPassword
                    })
                    if (res) {
                        this.$router.push({ path: '/guide' })
                    } else {
                        this.errormsg = '没有该用户'
                    }
                })
            },

            readyLoadin(event) {
                var theEvent = event || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                if (code == 13) {
                    this.handleLogin()
                }
            }
        },
        created() {

        },
        mounted() {
            document.body.addEventListener("keydown", this.readyLoadin);
        },

        beforeDestroy() {
            document.body.removeEventListener("keydown", this.readyLoadin);
        },
    };

</script>
<style lang="scss">
    .loginform__form {
        .el-input {
            .el-input__inner {
                height: 47px;
            }
        }

        .el-input__prefix {
            display: flex;
            align-items: center;
        }
    }

</style>

<style lang="scss" scoped>
    $rowHeight: 47px;

    .loginform {
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;

        &__header {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: $rowHeight;
            margin-bottom: 18px;
            font-size: 20px;
        }

        &__form {
            position: relative;
            width: 100%;

            .flexgraw {
                display: flex;
                align-items: center;
                flex-direction: row;

                .flexgraw-graw {
                    flex-grow: 1;
                    margin-right: 10px;
                }

                .flexgraw-lock {
                    width: max-content;
                }
            }
        }

        &__button {
            width: 100%;

            .loginform-btn {
                height: $rowHeight;
                width: 100%;
                font-size: 16px;
                font-weight: bold;
            }
        }

        &__control {
            height: $rowHeight;
            width: 100%;
        }
    }

</style>
