<template>
    <div>
        <div class="user_message_wrapper">
            <!--用户头像、名称、等级、声望-->
            <div class="user_message">
                <!--头像-->
                <div class="user_avatar_wrapper">
                    <div class="user_avatar">
                        <img class="user_avatar_img" src="https://cn.vuejs.org/images/logo.png"/>
                    </div>
                    <!--用户经验-->
                    <v-progress-circular
                        class="experience"
                        :size="100"
                        :width="10"
                        :rotate="-90"
                        :value="50"
                        :fill="indeterminate "
                        color="green"
                    >
                    </v-progress-circular>
                </div>

                <!--用户名称等级-->
                <div class="user_name_level">
                    <p class="txt">Luck Man</p>
                    <p class="txt">等级：55</p>
                    <p class="txt">声望：250</p>
                </div>
                <!--退出按钮-->
                <div class="exit_user">
                    <p class="txt" @click="signOut">[退出]</p>
                </div>
            </div>
            <!--经验提示-->
            <div class="experience_prompt">
                距离升级还有<p class="experience_prompt_highlight">0</p>经验
            </div>
        </div>
        <!--徽章-->
        <div class="badge">
            <div class="badge_img">
                <img src="../static/img/徽章.png" title="爱心大使"/>
                <v-icon class="badge_icon">favorite</v-icon>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data () {
            return {
                indeterminate: 'none'
            }
        },
        methods: {
            // 退出登录按钮
            signOut () {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .user_message_wrapper {
        position: relative;
        padding: 15px 15px 20px 15px;
        font-size: 13px;
        width: 100%;
        /*height: 200px;*/
        background: $user-message-wrapper;
        z-index: 1;
        box-sizing: border-box;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        .user_message {
            display: flex;
        }
        .user_avatar_wrapper {
            position: relative
        }
        /*头像*/
        .user_avatar {
            flex: 0 0 80px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            background: $user-avatar;
        }
        /*头像图片*/
        .user_avatar_img {
            width: 100%;
            height: 100%;
        }
        /*用户经验*/
        .experience {
            position: absolute;
            top: -10px;
            left: -10px;
        }
        /*头像名称等级声望 退出按钮*/
        .user_name_level, .exit_user {
            flex: 1;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: left;
            display: flex;
            overflow: hidden;
            color: $user-name-level;
        }
        .txt {
            flex: 1;
            margin: 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        /*退出按钮*/
        .exit_user {
            flex: initial;
            .txt{
                flex: initial;
                display :inline-block;
                cursor: pointer;
            }
        }
        /*用户经验提示*/
        .experience_prompt {
            position: relative;
            margin-top: 30px;
            border-radius: 20px;
            text-align: center;
            line-height: 25px;
            width: 100%;
            height: 25px;
            background: $experience-prompt;
            &::after {
                content: '';
                position: absolute;
                top: -10px;
                left: 30px;
                width: 0px;
                height: 0px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid $experience-prompt;
            }
            .experience_prompt_highlight {
                position: relative;
                display: inline-block;
                margin: 0;
                padding: 0 10px;
                color: $experience-prompt-highlight;
            }
        }
    }

    /*徽章*/
    .badge {
        padding: 0 5px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        background: $user-name-level;
        z-index: 100
        .badge_img {
            position: relative;
            padding: 10px 5px;
            width: 30px;
            height: 30px;
            box-sizing: content-box;
            /*图片*/
            img {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
            img:hover + .badge_icon {
                opacity: 1;
            }
            /*icon*/
            .badge_icon {
                position: absolute;
                top: -15px;
                left: 9px;
                opacity: 0;
                transition: all .5s;
                color: pink;
                cursor: pointer;
            }
        }
    }
</style>
