<template>
    <div class="markdown">
        <div class="markdown_content">
            <!--markdowm语法-->
            <div class="content_left">
                <!--文章标题图片-->
                <div class="article_img hover">
                    <input type="file" class="file_img" accept=".jpeg, .jpg, .png">
                    <v-icon class="article_img_icon">camera_alt</v-icon>
                </div>
            </div>
            <!--渲染后-->
            <div class="content_right">
                <!--文章标题图片-->
                <div class="article_img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let state = {
        appHeaderState: {
            show: true,
            status: 'markdown'
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
    }

    export default {
        async asyncData({store, route}) {
            setState(store);
        }
    };
</script>

<style lang="stylus" >
    @require '~@/assets/stylus/variable'

    html{
        overflow-y: hidden;
    }

    .markdown {
        padding: 52px 0 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-height: 100vh;
        background: $article-wrapper;
    }

    .markdown_content {
        display: flex;
        width: 100%;
        height: 100vh;
        background: #fff;
        .content_left, .content_right {
            flex: 1;
            border-left: .5px solid #ddd;
            /*overflow-y: scroll;*/
        }
    }

    /*文章标题图片*/
    .article_img {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 240px;
        user-select: none;
        background: #f7f8f9;
        .file_img {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
        }
        .article_img_icon {
            font-size: 30px;
            display: flex;
            color: #999
        }
    }

    .hover::after {
        content: "文章标题图片";
        color: #b3b3b3;
        position: absolute;
        top: 0;
        bottom: 0;
        margin-top: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        text-align: center;
    }
</style>
