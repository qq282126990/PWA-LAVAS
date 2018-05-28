<template>
    <div class="user_attention">
        <!--标题-->
        <div class="user_attention_header">
            <h1 class="user_attention_header__txt">我关注的人</h1>
        </div>
        <!--关注的人-->
        <div class="user_attention_content">
            <div class="user_attention_content__list">
                <!--头像-->
                <img class="list_img" src="https://bc2.21cd.com.cn:3232/static//assets/img/man.jpg"/>
                <!--文字-->
                <!--<div class="list_text">-->
                    <!--<p class="list_text_name">Grand Thedf Autp</p>-->
                    <!--<p class="list_text_level">等级: 94</p>-->
                <!--</div>-->
                <!--推荐关注样式-->
                <div class="recommended_follow_text">
                    <p class="recommended_follow_text_name">ASSASSIN</p>
                    <p class="recommended_follow_text_level">等级: 94</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {};
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
        padding: 0 15px 15px 15px;
        display: flex;
        flex-direction: column;
        width: 100%;
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
        .recommended_follow_text{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            padding-left: 15px;
        }
        .recommended_follow_text_name{
            color: #000;
        }
        p {
            margin: 0;
        }
    }
</style>
