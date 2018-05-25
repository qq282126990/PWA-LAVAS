<template>
    <div class="choice_article">
        <!--头部标题-->
        <div class="choice_article_header">
            <h1 class="choice_article_header__title">精选文章</h1>
            <!--更多按钮-->
            <div class="choice_article_header__more__wrapper">
                <p class="choice_article_header__more">更多</p>
                <v-icon class="choice_article_header__more___icon">chevron_right</v-icon>
            </div>
        </div>
        <!--内容-->
        <div class="choice_article_content">
            <ul class="choice_article_content_ul">
                <li class="choice_article_content_li">
                    <img class="content_li_img" src="https://cn.vuejs.org/images/logo.png"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .choice_article {
        margin: 15px 0;
        padding: 20px;
        border-radius: 5px;
        width: 100%;
        height: 400px;
        background: $ChoiceArticleBg
    }

    /*头部标题*/
    .choice_article_header {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 30px;
        border-bottom: 4px solid #ebebeb;
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 80px;
            height: 0;
            border-bottom: 4px solid #3472e2;
        }
    }

    .choice_article_header__title {
        margin: 0;
        line-height: 15px;
        font-size: 20px;
    }

    /*更多按钮*/
    .choice_article_header__more__wrapper {
        display: flex;
        user-select: none;
        line-height: 15px;
        &:hover .choice_article_header__more___icon {
            animation: translate 0.8s infinite alternate;
        }
    }

    .choice_article_header__more {
        margin: 0;
        font-size: 12px;
        color: #999;
        cursor: pointer;
    }

    .choice_article_header__more___icon {
        line-height: 15px;
        font-size: 18px;
        color: #999;
        cursor: pointer;
    }

    /*内容*/
    .choice_article_content {
        display: flex;
        padding-top: 10px;
        .choice_article_content_ul {
            list-style: none;
            width: 100%;
            height: 50px;
            background: #000;
            display: flex
        }
        .choice_article_content_li {
            display: flex;
        }
        .content_li_img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: #d3d7d8;
        }
    }

    @keyframes translate {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(5px, 0, 0);
        }
    }

</style>
