<template>
    <div class="user_attention">
        <!--标题-->
        <div class="user_attention_header">
            <h1 class="user_attention_header__txt">{{userAttentionHeaderTxt}}</h1>
        </div>
        <!--关注的人-->
        <div class="user_attention_content" :class="{'no_login_wrapper':!getlogin }">
            <div class="no_login">
                <p>请先登录后查看</p>
            </div>
            <div class="user_attention_content__list" v-show="getlogin">
                <!--头像-->
                <img class="list_img" v-lazy="'https://bc2.21cd.com.cn:3232/static//assets/img/man.jpg'"/>
                <!--文字-->
                <div class="list_text" v-show="userAttentionHeaderTxt !== '推荐订阅'">
                    <p class="list_text_name">Grand Thedf Autp</p>
                    <p class="list_text_level">等级: 94</p>
                </div>
                <!--推荐关注样式-->
                <div class="recommended_follow_text" v-show="userAttentionHeaderTxt === '推荐订阅'">
                    <p class="recommended_follow_text_name">爱奇艺的频道</p>
                    <v-btn outline color="indigo" class="recommended_follow_btn">订阅</v-btn>
                </div>
            </div>
            <!--忽略更多-->
            <div class="ignore_more" v-show="getlogin">
                <v-icon class="ignore_more_icon">more_horiz</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from  'vuex';
    export default {
        props: {
            userAttentionHeaderTxt: {
                type: String,
                default: ''
            }
        },
        computed: {
            ...mapState('appStore/appGlobal', {
                /*
                 * 登录状态
                 * @type {Boolean}
                 * */
                getlogin: 'login'
            })
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'
    .user_attention {
        position: relative;
        margin-top: 15px;
    }
    /*标题*/
    .user_attention_header {
        position: relative;
        width: 100%;
        height: 35px;
        border-bottom: 3px solid #ebebeb;
        background: $user-attention-header;
        &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 35%;
            height: 0;
            border-bottom: 3px solid $user-attention-header-after;
        }
        .user_attention_header__txt {
            margin: 0;
            padding: 0 15px;
            font-size: 14px;
            line-height: 35px;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    /*内容*/
    .user_attention_content {
        padding: 0 15px 0 15px;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 275px;
        background: #fff;
        .user_attention_content__list {
            display: flex;
            padding-top: 15px;
        }
        /*头像*/
        .list_img {
            flex: 0 0 45px;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            background: $content-list-img-bg;
        }
        /*文字*/
        .list_text {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            padding-left: 15px;
        }
        .list_text_name {
            color: $list-text-name;
        }
        .list_text_level {
            color: #999;
            font-size: 12px;
        }
        /*推荐订阅*/
        .recommended_follow_text {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            text-align: left;
            padding-left: 15px;
            font-size: 12px;
        }
        .recommended_follow_text_name {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: #000;
        }
        .recommended_follow_btn {
            margin: 2px 0 0 0 !important;
            border: none;
            font-size: 12px;
            width: 0;
            min-width: 80px !important;
            height: 23px;
            color: #fff !important;
            background: $user-attention-header-after !important;
        }
        p {
            margin: 0;
        }
        /*忽略更多*/
        .ignore_more {
            display: block;
            line-height: 35px;
            width: 100%;
            height: 35px;
            user-select: none;
        }
        .ignore_more_icon {
            color: #999;
        }
    }
    /*没有登录时的class*/
    .no_login_wrapper {
        padding: 0;
        align-items: center;
        flex-direction: inherit;
    }
    .no_login {
        padding: 0 20px;
        display: flex;
        height: 275px;
        width: 100%;
        align-items: center;
        background: rgba(0, 0, 0, .2);
        p {
            position: relative;
            margin-top: 30px;
            border-radius: 20px;
            text-align: center;
            line-height: 25px;
            width: 100%;
            height: 25px;
            background: $experience-prompt;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
        }
    }
</style>
