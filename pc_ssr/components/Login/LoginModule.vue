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
                   ref="loginEmail"
                   v-model="userEmail"
            />
            <!--错误提示-->
            <transition name="fade">
                <p class="account_input_error" v-show="loginEmailError">请输入正确的邮箱</p>
            </transition>
            <!--没有输入时的提示-->
            <transition name="fade">
                <p class="account_input_title"
                   @click="blurInput($event,'loginEmailClick')"
                   v-show="nologinEmail"
                >
                    请输入邮箱
                </p>
            </transition>
        </div>
        <!--账号密码输入-->
        <div class="account_pwd_input_wrapper">
            <input class="account_pwd_input"
                   spellcheck="false"
                   :placeholder="showPwd.length > 0 ? '' : '请输入密码'"
                   :class="{'account_pwd_show' : !showPwd && (userPwd.length > 0)}"
                   :type="showPwd ? 'text' : 'password'"
                   @blur="blurInput($event,'loginPwd')"
                   @focus="focusInput($event,'loginPwd')"
                   ref="loginPwd"
                   v-model="userPwd"
            />
            <!--密码隐藏显示-->
            <v-icon class="account_pwd_show" @click="clickShowPwd('loginPwd')">
                {{showPwd ? 'visibility' : 'visibility_off' }}
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
    export default {};
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    /*输入框*/
    .login_content_input {
        font-size: 14px;
        input:
        :-webkit-outer-spin-button, input::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
            margin: 0;
        }
    }
</style>
