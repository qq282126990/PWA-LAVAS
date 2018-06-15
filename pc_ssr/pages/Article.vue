<template>
    <div>
        <div class="article_wrapper">
            <!--文章-->
            <div class="article">
                <!--文章标题图片-->
                <div class="article_img"
                     style="background-image:url(https://pic1.zhimg.com/v2-70b464fca99448b3fbd4404c35cc6454_r.jpg)"></div>
                <div class="article_content">
                    <!--文章标题-->
                    <h1 class="article_title">坚果 3 是锤子对小米发动的一次自杀式袭击</h1>
                    <!--文章发起人-->
                    <div class="article_user">
                        <!--文章发起人头像-->
                        <img class="article_user_img" src="https://cn.vuejs.org/images/logo.png"/>
                        <!--文章用户信息-->
                        <div class="article_user_msg">
                            <p class="txt name">By Joseph Medley</p>
                            <p class="txt">Technical Writer</p>
                        </div>
                        <!--关注按钮-->
                        <v-btn class="article_attention" depressed color="primary">
                            <v-icon class="article_attention_icon">add</v-icon>
                            关注
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let state = {
        appHeaderState: {
            show: true
        },
        appFooterState: {
            show: false
        },
        appRightMenu: {
            show: true
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
        store.dispatch('appShell/appFooter/setAppFooter', state.appFooterState);
        store.dispatch('appShell/appRightMenu/setAppRightMenu', state.appRightMenu);
    }

    export default {
        async asyncData({store, route}) {
            setState(store);
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .article_wrapper {
        padding: 77px 15% 0;
        display: flex;
        box-sizing: border-box;
        min-height: 100vh;
        background: #e8e8e8
    }

    /*文章 */
    .article {
        width: 100%;
        min-height: 100vh;
        background: #fff;
    }

    .article_content {
        padding: 0 20px;
    }

    /*文章标题图片*/
    .article_img {
        width: 100%;
        padding-bottom: 33.3%;
        background-size: cover;
        background-position: top;
        margin-top: 0;
    }

    /*文章标题*/
    .article_title {
        margin: 25px 0;
        text-align: left;
        font-size: 24px;
    }

    /*文章用户发起人 */
    .article_user {
        display: flex;
        align-items: center;
        text-align: left;
        width: 100%;
        height: 40px;
        .article_user_img {
            width: 40px;
            border-radius: 50%;
            background: $user-avatar;
        }
        .article_user_msg {
            flex: 1;
            margin-left: 16px;
            display: flex;
            flex-direction: column;
            .name {
                font-weight: 700;
            }
        }
        .txt {
            margin: 0;
        }
        .article_attention {
            margin: 0;
            height: 30px;
        }
        .article_attention_icon{
            padding-right: 10px;
            font-size :20px;
        }
    }
</style>
