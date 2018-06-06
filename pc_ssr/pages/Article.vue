<template>
    <div>
        <div class="article_wrapper">
            <!--文章-->
            <div class="article">
                <!--文章标题图片-->
                <div class="article_img"
                     style="background-image:url(https://pic1.zhimg.com/v2-70b464fca99448b3fbd4404c35cc6454_r.jpg)"></div>
                <!--文章标题-->
                <h1 class="article_title">坚果 3 是锤子对小米发动的一次自杀式袭击</h1>
                <!--文章发起人-->
                <div class="article_user">
                    <img class="article_user_img" src="https://cn.vuejs.org/images/logo.png"/>
                    <div class="article_user_msg">
                        <p class="txt">By Joseph Medley</p>
                        <p class="txt">Technical Writer</p>
                    </div>
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

    .article_wrapper {
        padding: 77px 10% 0;
        display: flex;
        box-sizing: border-box;
        min-height: 100vh;
        background: #fff
    }

    /*文章 */
    .article {
        width: 100%;
        min-height: 100vh;
    }

    /*文章标题图片*/
    .article_img {
        width: 100%;
        padding-bottom: 33.3%;
        background-size: cover;
        background-position: 50%;
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
        text-align: left;
        width: 100%;
        height: 40px;
        background: red;
        .article_user_img {
            width: 40px;
            border-radius: 50%;
            background: $user-avatar;
        }
        .article_user_msg {
            margin-left: 16px;
            display: flex;
            flex-direction: column;
        }
        .txt {
            margin: 0;
        }
    }
</style>
