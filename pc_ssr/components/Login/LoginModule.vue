<template>
    <div class="login_content_input">
        <!--账号输入-->
        <div class="account_input_wrapper">
            <input class="account_input"
                   type="text"
                   spellcheck="false"
                   :placeholder="nologinEmail ? '' : '请输入邮箱'"
                   @blur="blurInput($event,'loginEmail')"
                   @focus="focusInput($event,'loginEmail')"
                   v-model="loginEmail"
                   ref="loginEmail"
            />

            <!--没有输入时的提示-->
            <transition name="fade">
                <p class="account_input_title"
                   @click="blurInput($event,'loginEmailClick')"
                   v-show="nologinEmail"
                >
                    请输入邮箱
                </p>
            </transition>
            <!--点击登录按钮显示邮箱错误提示-->
            <transition name="fade">
                <p class="account_input_error" v-show="loginEmailError">请输入正确的邮箱</p>
            </transition>
        </div>
        <!--账号密码输入-->
        <div class="account_pwd_input_wrapper">
            <input class="account_pwd_input"
                   spellcheck="false"
                   :placeholder="showLoginPwd.length > 0 ? '' : '请输入密码'"
                   :class="{'account_pwd_show' : !showLoginPwd && (loginPwd.length > 0)}"
                   :type="showLoginPwd ? 'text' : 'password'"
                   @blur="blurInput($event,'loginPwd')"
                   @focus="focusInput($event,'loginPwd')"
                   v-model="loginPwd"
                   ref="loginPwd"
            />
            <!--密码隐藏显示-->
            <v-icon class="account_pwd_show" @click="clickShowPwd">
                {{showLoginPwd ? 'visibility' : 'visibility_off' }}
            </v-icon>
            <!--没有输入时的提示-->
            <transition name="fade">
                <p class="login_no_pwd"
                   @click="blurInput($event,'loginPwdClick')"
                   v-show="nologinPwd"
                >
                    请输入密码
                </p>
            </transition>
            <!--错误提示-->
            <transition name="fade">
                <p class="account_pwd_error" v-show="loginPwdError">请输入正确的密码</p>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            /*
             * 点击登录按钮显示邮箱错误提示
             * @type {Boolean}
             * */
            loginEmailError: {
                type: Boolean,
                default: false
            },
            /*
             * 点击登录按钮显示密码错误提示
             * @type {Boolean}
             * */
            loginPwdError: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                /*
                 * 登录没有输入邮箱
                 * @type {Boolean}
                 * */
                nologinEmail: false,
                /*
                 * 登录没有输入密码
                 * @type {Boolean}
                 * */
                nologinPwd: false,
                /*
                 * 是否显示登录密码
                 * @type {Boolean}
                 * */
                showLoginPwd: false,
                /*
                 * 登录邮箱
                 * @type {String}
                 * */
                loginEmail: '',
                /*
                 * 登录密码
                 * @type {String}
                 * */
                loginPwd: ''
            }
        },
        methods: {
            // 输入框失去焦点
            blurInput (event, data) {
                // 登录邮箱输入判断
                if (this.loginEmail.length === 0 && data === 'loginEmail') {
                    this.nologinEmail = true;
                }
                else if (data === 'loginEmailClick') {
                    this.$refs.loginEmail.focus();
                    this.nologinEmail = false;
                }

                // 登录密码输入判断
                if (this.loginPwd.length === 0 && data === 'loginPwd') {
                    this.nologinPwd = true
                }
                else if (data === 'loginPwdClick') {
                    this.$refs.loginPwd.focus();
                    this.nologinPwd = false
                }
            },
            // 输入框获取焦点
            focusInput (event, data) {
                // 登录邮箱输入判断
                if (data === 'loginEmail') {
                    this.loginEmailError = false
                }
            },
            // 显示隐藏密码
            clickShowPwd() {
                this.showLoginPwd = !this.showLoginPwd;
            }
        },
        watch: {
            // 发送登录邮箱输入事件
            loginEmail (data) {
                this.$emit('loginEmail', data)
            },
            // 发送登录密码输入事件
            loginPwd(data) {
                this.$emit('loginPwd', data)
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .fade-enter-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
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
        .account_input_wrapper {
            position: relative;
            width: 100%;
        }
        .account_input {
            margin-top: 16px;
            border-bottom: 1px solid $account-input-br;
            color: $account-input;
            line-height: 24px;
            font-size: 14px;
            width: 100%;
            height: 48px;
            outline: none;
        }
        /*输入框提示*/
        .account_input_title, .login_no_pwd {
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            margin: 0;
            margin-top: 16px;
            font-size: inherit;
            width: 100%;
            height: 48px;
            color: $account-input-title-cl;
        }
        /*请输入正确的邮箱号*/
        .account_input_error, .account_pwd_error {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            align-items: center;
            margin: 0;
            padding-left: 20px;
            margin-top: 16px;
            text-align: center;
            font-size: inherit;
            box-sizing: content-box;
            height: 48px;
            color: $account-input-title-cl;
            background: $account-input-title-bg
        }
        /*账号密码输入*/
        .account_pwd_input_wrapper {
            position: relative;
            display: flex;
            align-items: center;
            margin-top: 12px;
            border-bottom: 1px solid $account-input-br;
            line-height: 24px;
            height: 48px;
        }
        .login_no_pwd {
            margin: 0;
        }
        .account_pwd_input {
            flex: 1;
            padding: 0 20px 0 0;
            font-size: 14px;
            overflow: hidden;
            outline: none;
            cursor: auto !important;
        }

        /*密码隐藏显示*/
        .account_pwd_show {
            cursor: pointer;
            font-size: 24px;
            letter-spacing: 1.8px;
            user-select: none;
        }
        .account_pwd_error {
            margin: 0 30px 0 0;
        }
    }

</style>
