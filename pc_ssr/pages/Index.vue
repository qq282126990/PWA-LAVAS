<template>
    <div>
        <div class="content">
            <div class="content_bg_one"></div>
            <!--左边内容-->
            <div class="content_left">
                <user-message></user-message>
                <user-attention></user-attention>
            </div>
            <!--右边内容-->
            <div class="content_right">
                <!--搜索框-->
                <search></search>
                <!--精选文章模块-->
                <article-block :articleBlockData="articleBlockData[0]"></article-block>
                <!--普通文章模块-->
                <article-block :articleBlockData="articleBlockData[1]"></article-block>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import UserMessage from 'components/UserMessage'
    import UserAttention from 'components/UserAttention'
    import Search from 'components/Search'
    import ArticleBlock from 'components/ArticleBlock'

    export default {
        name: 'index',
        metaInfo: {
            title: '主页',
            titleTemplate: '%s - Lavas',
            meta: [
                {name: 'keywords', content: 'lavas PWA'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        data () {
          return {
              articleBlockData: ['精选文章', '普通文章']
          }
        },
        mounted () {
        },
        components: {
            UserMessage,
            UserAttention,
            Search,
            ArticleBlock
        }
    };
</script>

<style lang="stylus" scoped>
    .content {
        padding: 77px 10% 0 10%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
    }

    .content_bg_one {
        position: absolute;
        top: 52px;
        left: 0;
        right: 0;
        width: 100%;
        height: 300px;
        background: url('../assets/img/content_bg_one.jpg') no-repeat;
        background-size: cover;
        z-index: 0;
    }

    /*左边内容*/
    .content_left {
        width: 250px;
        height: 100%
        z-index: 1
    }

    .content_right {
        flex: 1;
        padding-left: 20px;
        width: 100%;
        z-index: 1
    }
</style>
