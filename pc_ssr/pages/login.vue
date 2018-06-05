<template>
    <div class="login_wrapper">
        <div class="login_content_wrapper">
            <!--头部-->
            <div class="login_content_header">
                <h1 class="header_h1">Lavas</h1>
                <!--标题-->
                <div class="header_title">{{showRegisteredModule ? '注册Lavas社区，发现更大的PWA世界' : '登录Lavas社区，发现更大的PWA世界'}}
                </div>
            </div>
            <div class="login_content">
                <!--登录输入框-->
                <div class="login_content_input" v-show="!showRegisteredModule">
                    <!--账号输入-->
                    <input class="account_input" type="text" placeholder="请输入邮箱"/>
                    <!--账号密码输入-->
                    <div class="account_pwd_input_wrapper">
                        <input class="account_pwd_input"
                               placeholder="请输入密码"
                               :class="{'account_pwd_show' : !showPwd && (pwd.length > 0)}"
                               :type="showPwd ? 'text' : 'password'"
                               v-model="pwd"
                        />
                        <!--密码隐藏显示-->
                        <v-icon class="account_pwd_show" @click="clickShowPwd('loginPwd')">
                            {{showPwd ? 'visibility' : 'visibility_off' }}
                        </v-icon>
                    </div>
                </div>
                <!--注册输入框-->
                <div class="login_content_input" v-show="showRegisteredModule">
                    <!--账号输入-->
                    <input class="account_input" type="text" placeholder="邮箱"/>
                    <!--账号密码输入-->
                    <div class="account_pwd_input_wrapper">
                        <input class="account_pwd_input"
                               placeholder="邮箱验证码"
                               type="number"
                               v-model="emailCode"
                        />
                        <!--密码隐藏显示-->
                        <p class="account_get_email_code" @click="getEmailCode">获取邮箱验证码</p>
                    </div>
                    <!--注册输入密码-->
                    <div v-show="showRegisteredInputPwd">
                        <!--密码输入-->
                        <div class="account_pwd_input_wrapper">
                            <input class="account_pwd_input"
                                   placeholder="请输入密码"
                                   :class="{'account_pwd_show' : !showRegisteredPwd && (registeredPwd.length > 0)}"
                                   :type="showRegisteredPwd ? 'text' : 'password'"
                                   v-model="registeredPwd"
                            />
                            <!--密码隐藏显示-->
                            <v-icon class="account_pwd_show" @click="clickShowPwd('registeredPwd')">
                                {{showRegisteredPwd ? 'visibility' : 'visibility_off' }}
                            </v-icon>
                        </div>
                        <!--密码输入-->
                        <div class="account_pwd_input_wrapper">
                            <input class="account_pwd_input"
                                   placeholder="请再次输入密码"
                                   :class="{'account_pwd_show' : !showRegisteredAgainPwd && (registeredAgainPwd.length > 0)}"
                                   :type="showRegisteredAgainPwd ? 'text' : 'password'"
                                   v-model="registeredAgainPwd"
                            />
                            <!--密码隐藏显示-->
                            <v-icon class="account_pwd_show" @click="clickShowPwd('registeredAgainPwd')">
                                {{showRegisteredAgainPwd ? 'visibility' : 'visibility_off' }}
                            </v-icon>
                        </div>
                    </div>
                </div>
                <!--确定按钮-->
                <v-btn flat color="white" class="login_btn">{{showRegisteredModule ? '注册' : '登录'}}</v-btn>
                <!--协议-->
                <p class="login_protocol" :class="{'forget_password': !showRegisteredModule}">
                    {{showRegisteredModule ? '注册即代表同意《Lavas社区协议》《隐私政策》' : '忘了密码？'}}
                </p>
            </div>
            <!--跳转提示-->
            <div class="login_transfer">
                <p class="txt">没有帐号？</p>
                <p class="txt transfer" @click="switchModule">{{showRegisteredModule ? '登录' : '注册'}}</p>
            </div>
        </div>
        <!--<router-link to="/"><h2>LAVAS</h2></router-link>-->
        <!--<button @click="login()">点击登录</button>-->
        <!--<div class="tips" ref="tips"></div>-->
    </div>
</template>

<script>
    let state = {
        appHeaderState: {
            show: false
        },
        appFooterState: {
            show: false
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
        store.dispatch('appShell/appFooter/setAppFooter', state.appFooterState);
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
                 * 是否显示注册模块
                 * @type {Boolean}
                 * */
                showRegisteredModule: false,
                /*
                 * 注册输入密码显示
                 * @type {Boolean}
                 * */
                showRegisteredPwd: false,
                /*
                 * 注册再次输入密码显示
                 * @type {Boolean}
                 * */
                showRegisteredAgainPwd: false,
                /*
                 * 是否显示密码
                 * @type {Boolean}
                 * */
                showPwd: false,
                /*
                 * 点击获取邮箱验证码显示注册输入密码
                 * @type {Boolean}
                 * */
                showRegisteredInputPwd: false,
                /*
                 * 密码
                 * @type {String}
                 * */
                pwd: '',
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
                 * 邮箱验证码
                 * @type {String}
                 * */
                emailCode: ''
            }
        },
        methods: {
            async login() {
                // 如果未登录，设置登录成功
                if (!this.$store.state.common.login) {

                    // 修改 store 中的登录状态为 true
                    await this.$store.dispatch('common/setLogin', true);
                    this.$refs.tips.innerHTML = 'tips：登录成功';
                }
                // 如果登录显示已登录
                else {
                    this.$refs.tips.innerHTML = 'tips：已登录';
                }
            },
            // 显示隐藏密码
            clickShowPwd(data) {
                console.log(data)
                if (data === 'loginPwd') {
                    this.showPwd = !this.showPwd;
                }
                else if (data === 'registeredPwd') {
                    this.showRegisteredPwd = !this.showRegisteredPwd;
                }
                else if (data === 'registeredAgainPwd') {
                    this.showRegisteredAgainPwd = !this.showRegisteredAgainPwd;
                }
            },
            // 切换模块
            switchModule () {
                this.showRegisteredModule = !this.showRegisteredModule;
            },
            // 获取邮箱验证码
            getEmailCode () {
                this.showRegisteredInputPwd = true;
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .login_wrapper {
        display: flex;
        align-items: center;
        background-color: #edeff1 !important;
        background-image: url("/static/img/login-bg.png") !important;
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

    /*输入框*/
    .login_content_input {
        font-size: 14px;
        input:
        :-webkit-outer-spin-button, input::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
            margin: 0;
        }
        /*账号输入*/
        .account_input {
            margin-top: 16px;
            border-bottom: 1px solid #ebebeb;
            color: #1a1a1a;
            line-height: 24px;
            font-size: 14px;
            width: 100%;
            height: 48px;
            outline: none;
        }
        /*账号密码输入*/
        .account_pwd_input_wrapper {
            display: flex;
            align-items: center;
            margin-top: 12px;
            border-bottom: 1px solid #ebebeb;
            line-height: 24px;
            height: 48px;
        }
        .account_pwd_input {
            flex: 1;
            padding: 0 20px 0 0;
            font-size: 14px;
            overflow: hidden;
            outline: none;
        }

        /*密码隐藏显示*/
        .account_pwd_show {
            cursor: pointer;
            font-size: 24px;
            letter-spacing: 1.8px;
            user-select: none;
        }
        /*获取短信验证码*/
        .account_get_email_code {
            margin: 0;
            cursor: pointer;
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
        color: #8590a6;
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
        border-top: 1px solid #ebebeb;
        background: #f6f6f6;
        .txt {
            margin: 0
        }
        .transfer {
            cursor: pointer;
            color: $login-color;
        }
    }
</style>
