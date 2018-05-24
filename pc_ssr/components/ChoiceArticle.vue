<template>
    <div class="choice_article">
        <!--头部标题-->
        <div class="choice_article_header">
            <h1 class="choice_article_header__title">精选文章</h1>
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
        display: flex;
        justify-content: space-between;
        height: 30px;
        border-bottom: 4px solid #ebebeb;
    }

    .choice_article_header__title {
        margin: 0;
        line-height: 15px;
        font-size: 20px;
    }
</style>
