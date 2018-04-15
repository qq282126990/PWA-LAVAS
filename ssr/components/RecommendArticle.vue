<template>
    <div class="recommend_article">
        <!--文章-->
        <div class="article">
            <!--文章标题-->
            <h1 class="article_title">Mac小白看过来，满满干货～</h1>
            <!--文章内容-->
            <div class="article_center">
                <p>
                    周三，埋头工作之时，给大家放一个大招。本文可以让你，少走20年弯路。 本篇是原创首发，你能看到是幸运的，预计接下来会被大量转发，你也是在见证历史和未来。 2003年毕业不久，我进入了上海，到了2006年…</p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .recommend_article {
        padding: 20px 0;
        width: 100%;
        height: 100%;
        /*文章*/
        .article {
            display: flex;
            flex-direction: column;
            padding: 20px 30px;
            height: 260px;
            background: $bgArticle;
        }
        /*文章标题*/
        .article_title {
            margin: 0;
            height: 60px;
            text-align: left;
            font-size: 32px;
            font-weight: 600;
        }
        /*文章内容*/
        .article_center {
            flex: 1;
            text-align: left;
            font-size: 28px;
            width: 100%;
            height: 100%;
            p {
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
    }
</style>
