<template>
    <div class="registered_content_input">
        <!--账号输入-->
        <div class="account_input_wrapper">
            <input class="account_input"
                   type="text"
                   spellcheck="false"
                   :placeholder="noRegisteredEmail ? '' : '请输入注册邮箱'"
                   @blur="blurInput($event,'registeredEmail')"
                   v-model="registeredEmail"
                   ref="registeredEmail"
            />
            <!--没有输入时的提示-->
            <transition name="fade">
                <p class="account_input_title"
                   @click="blurInput($event,'registeredEmailClick')"
                   v-show="noRegisteredEmail"
                >
                    请输入注册邮箱
                </p>
            </transition>
        </div>
        <!--邮箱验证码-->
        <div class="account_pwd_input_wrapper">
            <input class="account_pwd_input"
                   type="text"
                   spellcheck="false"
                   :placeholder="noRegisteredEmailCode ? '' : '请输入邮箱验证码'"
                   @blur="blurInput($event,'registeredEmailCode')"
                   v-model="registeredEmailCode"
                   ref="registeredEmailCode"
            />
            <!--没有输入时的提示-->
            <transition name="fade">
                <p class="account_pwd_title"
                   @click="blurInput($event,'registeredEmailCodeClick')"
                   v-show="noRegisteredEmailCode"
                >
                    请输入邮箱验证码
                </p>
            </transition>
            <!--获取邮箱验证码-->
            <p class="account_get_email_code" @click="getRegisteredEmailCode">获取邮箱验证码</p>
        </div>
        <!--注册输入密码-->
        <div v-if="showRegisteredInputPwd">
            <!--第一次输入密码-->
            <div class="account_pwd_input_wrapper">
                <input class="account_pwd_input"
                       spellcheck="false"
                       :placeholder="noRegisteredPwd ? '' : '请输入密码'"
                       :class="{'account_pwd_show' : !showRegisteredPwd && (registeredPwd.length > 0)}"
                       :type="showRegisteredPwd ? 'text' : 'password'"
                       @blur="blurInput($event,'registeredPwd')"
                       v-model="registeredPwd"
                       ref="registeredPwd"
                />
                <!--密码隐藏显示-->
                <v-icon class="account_pwd_show" @click="clickShowPwd('registeredPwd')">
                    {{showRegisteredPwd ? 'visibility' : 'visibility_off' }}
                </v-icon>
                <!--没有输入密码时的提示-->
                <transition name="fade">
                    <p class="account_pwd_title"
                       @click="blurInput($event,'registeredPwdClick')"
                       v-show="noRegisteredPwd"
                    >
                        请输入密码
                    </p>
                </transition>
            </div>
            <!--再次输入密码-->
            <div class="account_pwd_input_wrapper">
                <input class="account_pwd_input"
                       spellcheck="false"
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
</template>

<script>
    export default {
        data () {
            return {
                /*
                 * 注册没有输入邮箱
                 * @type {Boolean}
                 * */
                noRegisteredEmail: false,
                /*
                 * 注册没有输入验证码邮箱
                 * @type {Boolean}
                 * */
                noRegisteredEmailCode: false,
                /*
                 * 注册没有输入密码邮箱
                 * @type {Boolean}
                 * */
                noRegisteredPwd: false,
                /*
                 * 点击获取邮箱验证码显示注册输入密码
                 * @type {Boolean}
                 * */
                showRegisteredInputPwd: false,
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
                registeredAgainPwd: ''
            }
        },
        methods: {
            // 输入框失去焦点
            blurInput (event, data) {
                // 注册邮箱输入判断
                if (this.registeredEmail.length === 0 && data === 'registeredEmail') {
                    this.noRegisteredEmail = true;
                }
                else if (data === 'registeredEmailClick') {
                    this.$refs.registeredEmail.focus();
                    this.noRegisteredEmail = false;
                }

                // 注册邮箱验证码输入判断
                if (this.registeredEmailCode.length === 0 && data === 'registeredEmailCode') {
                    this.noRegisteredEmailCode = true;
                }
                else if (data === 'registeredEmailCodeClick') {
                    this.$refs.registeredEmailCode.focus();
                    this.noRegisteredEmailCode = false;
                }

                // 注册密码输入判断
                if (this.registeredPwd.length === 0 && data === 'registeredPwd') {
                    this.noRegisteredPwd = true;
                }
                else if (data === 'registeredPwdClick') {
                    this.$refs.registeredPwd.focus();
                    this.noRegisteredPwd = false;
                }
            },
            // 获取注册邮箱验证码
            getRegisteredEmailCode () {
                this.showRegisteredInputPwd = true;
            },
            // 显示隐藏密码
            clickShowPwd(data) {
                if (data === 'registeredPwd') {
                    this.showRegisteredPwd = !this.showRegisteredPwd;
                }
                else if (data === 'registeredAgainPwd') {
                    this.showRegisteredAgainPwd = !this.showRegisteredAgainPwd;
                }
            }
        },
        watch: {
            // 发送注册邮箱输入事件
            registeredEmail (data) {
                this.$emit('registeredEmail', data)
            },
            // 发送注册邮箱验证码输入事件
            registeredEmailCode (data) {
                this.$emit('registeredEmailCode', data)
            },
            // 发送注册密码输入事件
            registeredPwd () {
                this.$emit('registeredPwd', data)
            },
            // 发送注册密码再次输入事件
            registeredAgainPwd () {
                this.$emit('registeredAgainPwd', data)
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
    .registered_content_input {
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
        .account_pwd_title {
            position: absolute;
            top: 0;
            padding-right: 130px;
            display: flex;
            align-items: center;
            margin: 0;
            font-size: inherit;
            width: 100%;
            height: 48px;
            color: $account-input-title-cl;
        }

        /*密码隐藏显示*/
        .account_pwd_show {
            position: relative;
            cursor: pointer;
            font-size: 24px;
            letter-spacing: 1.8px;
            user-select: none;
            z-index: 100;
        }
        .account_pwd_error {
            margin: 0 30px 0 0;
        }
        /*获取短信验证码*/
        .account_get_email_code {
            position: relative;
            padding-left: 15px;
            display: flex;
            align-items: center;
            margin: 0;
            height: 100%;
            cursor: pointer;
            &::after {
                content: '';
                position: absolute;
                left: 0;
                width: 2px;
                height: 15px;
                background: #3472e2;
            }
        }
    }

</style>
