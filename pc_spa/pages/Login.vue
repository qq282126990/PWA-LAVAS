<template>
    <div class="login_wrapper">
        <div class="login_content_wrapper">
            <!--头部-->
            <div class="login_content_header">
                <h1 class="header_h1">Lavas</h1>
                <!--标题-->
                <div class="header_title">
                    {{switchModule ? '注册Lavas社区，发现更大的PWA世界' : '登录Lavas社区，发现更大的PWA世界'}}
                </div>
            </div>
            <div class="login_content">
                <!--登录输入框-->
                <login-module :loginEmailError="loginEmailError"
                              :loginPwdError="loginPwdError"
                              @loginEmail="_loginEmail"
                              @loginPwd="_loginPwd"
                              v-show="!switchModule"
                >
                </login-module>
                <!--注册输入框-->
                <registered-module :registeredEmailError="registeredEmailError"
                                   :registeredEmailCodeError="registeredEmailCodeError"
                                   @registeredEmail="_registeredEmail"
                                   @registeredEmailCode="_registeredEmailCode"
                                   @registeredPwd="_registeredPwd"
                                   @registeredAgainPwd="_registeredAgainPwd"
                                   @registeredEmailCodeFocus="_registeredEmailCodeFocus"
                                   v-show="switchModule"
                ></registered-module>
                <!--确定按钮-->
                <v-btn flat color="white" class="login_btn" @click="clickEndBtn(switchModule)">
                    {{switchModule ? '注册' : '登录'}}
                </v-btn>
                <!--协议-->
                <p class="login_protocol" :class="{'forget_password': !switchModule}">
                    {{switchModule ? '注册即代表同意《Lavas社区协议》《隐私政策》' : '忘了密码？'}}
                </p>
            </div>
            <!--跳转提示-->
            <div class="login_transfer">
                <p class="txt">没有帐号？</p>
                <p class="txt transfer" @click="_switchModule">{{switchModule ? '登录' : '注册'}}</p>
            </div>
        </div>
        <v-alert class="login_alter"
                 :value="loginAlter.show"
                 :icon="loginAlter.icon"
                 :color="loginAlter.color"
                 transition="fade">
            {{loginAlter.msg}}
        </v-alert>
    </div>
</template>

<script>
    import UserManager from 'api/UserManager';
    import LoginModule from 'components/Login/LoginModule';
    import RegisteredModule from 'components/Login/RegisteredModule';

    let state = {
        appHeaderState: {
            show: false
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
    }

    export default {
        name: 'login',
        metaInfo: {
            title: 'Lavas社区 - 发现更大的PWA世界',
            titleTemplate: '%s - Lavas',
            meta: [
                {name: 'keywords', content: 'lavas社区'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        async asyncData({store, route}) {
            setState(store);
        },
        data () {
            return {
                /*
                 * 切换模块
                 * @type {Boolean}
                 * */
                switchModule: false,
                /*
                 * 登录邮箱错误提示
                 * @type {Boolean}
                 * */
                loginEmailError: false,
                /*
                 * 登录输入密码错误提示
                 * @type {Boolean}
                 * */
                loginPwdError: false,
                /*
                 * 注册邮箱错误提示
                 * @type {Boolean}
                 * */
                registeredEmailError: false,
                /*
                 * 注册邮箱验证码错误提示
                 * @type {Boolean}
                 * */
                registeredEmailCodeError: false,
                /*
                 * 登录邮箱
                 * @type {String}
                 * */
                loginEmail: '',
                /*
                 * 登录密码
                 * @type {String}
                 * */
                loginPwd: '',
                /*
                 * 注册邮箱
                 * @type {String}
                 * */
                registeredEmail: '',
                /*
                 * 注册邮箱验证码
                 * @type {String}
                 * */
                registeredEmailCode: '',
                /*
                 * 注册输入密码
                 * @type {String}
                 * */
                registeredPwd: '',
                /*
                 * 注册再次输入密码
                 * @type {String}
                 * */
                registeredAgainPwd: '',
                /*
                 * 弹出框提示
                 * @type {String}
                 * */
                loginAlter: {
                    'msg': '',
                    'color': '',
                    'show': false
                }
            }
        },
        methods: {
//            async login() {
//                // 如果未登录，设置登录成功
//                if (!this.$store.state.common.login) {
//
//                    // 修改 store 中的登录状态为 true
//                    await this.$store.dispatch('common/setLogin', true);
//                    this.$refs.tips.innerHTML = 'tips：登录成功';
//                }
//                // 如果登录显示已登录
//                else {
//                    this.$refs.tips.innerHTML = 'tips：已登录';
//                }
//            },
            // 接收登录邮箱输入
            _loginEmail (data) {
                this.loginEmail = data;
            },
            // 接收登录密码输入
            _loginPwd (data) {
                this.loginPwd = data;
            },
            // 接收注册邮箱输入
            _registeredEmail (data) {
                this.registeredEmail = data;
            },
            //  接收注册邮箱验证码输入
            _registeredEmailCode (data) {
                this.registeredEmailCode = data;
            },
            //  接收注册输入密码
            _registeredPwd (data) {
                this.registeredPwd = data;
            },
            //  接收注册再次输入密码
            _registeredAgainPwd (data) {
                this.registeredAgainPwd = data;
            },
            // 接收注册邮箱验证码输入焦点获取
            _registeredEmailCodeFocus (data) {
                this.registeredEmailCodeError = !data;
            },
            // 切换模块
            _switchModule () {
                this.switchModule = !this.switchModule;
            },
            // 点击确定按钮 登录/注册
            clickEndBtn (btn) {
                let checkEmailRegExp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

                // 登录
                if (!btn) {
                    // 如果登录邮箱和密码都没有输入不执行 ajax
                    if (this.loginEmail.length === 0 || this.loginPwd.length === 0) {
                        this.loginEmailError = true
                        return;
                    }

                    // 判断邮箱是否正确再进行下一步
                    if (checkEmailRegExp.test(this.loginEmail)) {
                        this.loginEmailError = false;
                    }
                    else {
                        this.loginEmailError = true
                        return;
                    }

                    UserManager.usertLogin({'username': this.loginEmail, 'password': this.loginPwd})
                        .then(response => {
                            if (response.data.msg === '登录成功') {
                                this.loginAlter = {
                                    'msg': response.data.msg,
                                    'show': true,
                                    'color': 'green',
                                    'icon': 'check_circle'
                                }
                            }
                            else {
                                this.loginAlter = {
                                    'msg': response.data.msg,
                                    'show': true,
                                    'color': 'red',
                                    'icon': 'warning'
                                }
                            }

                            // 隐藏弹出框
                            setTimeout(() => {
                                this.loginAlter.show = false;

                                this.$router.go(-1)
                            }, 1000)
                            console.log(response.data.msg)
                        }).catch(err => {
                        console.log(err.data)
                    })
                }
                // 注册
                else {
                    // 如果登录邮箱和密码都没有输入不执行 ajax
                    if (this.registeredEmail.length === 0 ||
                        this.registeredEmailCode.length === 0 ||
                        this.registeredPwd.length === 0 ||
                        this.registeredAgainPwd.length === 0) {
                    }

                    // 判断邮箱
                    if (checkEmailRegExp.test(this.registeredEmail)) {
                        this.registeredEmailError = false;
                    }
                    else {
                        this.registeredEmailError = true;
                    }

                    if (this.registeredEmailCode.length > 6) {
                        this.registeredEmailCodeError = true
                    }

                }
            }
        },
        components: {
            LoginModule,
            RegisteredModule
        }
    };
</script>

<style lang="scss" scoped>
    @import '../assets/sass/variable';

    .fade-enter-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .login_wrapper {
        display: flex;
        align-items: center;
        background-color: #edeff1 !important;
        background-image: url("/p/static/img/login-bg.png") !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        width: 100%;
        height: 100%;
    }

    .login_content_wrapper {
        margin: 0 auto;
        box-sizing: border-box;
        width: 430px;
        background: $login-content-bg;
    }

    .login_content {
        padding: 0 40px 50px 40px;
    }

    /*头部*/
    .login_content_header {
        padding-top: 30px;
        .header_h1 {
            margin: 0 auto;
            color: $login-color;
            font-size: 64px;
            font-weight: 400;
            text-align: center;
        }
        /*标题*/
        .header_title {
            margin-top: 15px;
            color: $login-color;
            font-size: 22px;
        }
    }

    /*登录按钮*/
    .login_btn {
        margin: 30px 0 0 0;
        width: 100%;
        background: $login-color !important;
    }

    /*协议*/
    .login_protocol {
        text-align: center;
        margin: 16px 0 0 0;
        font-size: 14px;
    }

    .forget_password {
        text-align: right;
        cursor: pointer;
    }

    /*跳转提示*/
    .login_transfer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 58px;
        font-size: 16px;
        .txt {
            margin: 0
        }
        .transfer {
            cursor: pointer;
            color: $login-color;
        }
    }

    /*弹出框*/
    .login_alter {
        position: fixed;
        top: 100px;
        left: 0;
        right: 0;
        padding: 10px;
        margin: 0 auto;
        border: none;
        border-radius: 5px;
        width: 200px;
        height: 20px;
        background: rgba(0, 0, 0, .5);
    }

</style>
