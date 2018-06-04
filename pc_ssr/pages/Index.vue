<template>
    <div>
        <div class="content">
            <div class="content_bg_one"></div>
            <!--左边内容-->
            <div class="content_left">
                <user-message></user-message>
                <user-attention v-for="(item, index) in contentLeftTitle" :userAttentionHeaderTxt="item" :key="index"></user-attention>
            </div>
            <!--中间内容-->
            <div class="content_middle">
                <!--搜索框-->
                <search></search>
                <!--精选文章模块-->
                <article-block :articleBlockData="contentRightTitle[0]"></article-block>
                <!--普通文章模块-->
                <article-block :articleBlockData="contentRightTitle[1]"></article-block>
            </div>
            <!--右边内容-->
            <app-right-menu></app-right-menu>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import UserMessage from 'components/UserMessage'
    import UserAttention from 'components/UserAttention'
    import Search from 'components/Search'
    import ArticleBlock from 'components/ArticleBlock'
    import AppRightMenu from 'components/AppRightMenu'

    let state = {
        appHeaderState: {
            show: true
        },
        appFooterState: {
            show: true
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
        store.dispatch('appShell/appFooter/setAppFooter', state.appFooterState);
    }

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
        async asyncData({store, route}) {
            setState(store);
        },
        data () {
          return {
              /*
              * 右边内容标题
              * @type {Array}
              * */
              contentRightTitle: ['精选文章', '普通文章'],
              /*
              * 左边内容标题
              * @type {Array}
              * */
              contentLeftTitle: ['我关注的人', '推荐订阅']
          }
        },
        components: {
            UserMessage,
            UserAttention,
            Search,
            ArticleBlock,
            AppRightMenu
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
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 352px;
        background: url('/static/img/content_bg_one.jpg') no-repeat;
        background-size: cover;
        z-index: 0;
    }

    /*左边内容*/
    .content_left {
        width: 250px;
        height: 100%
        z-index: 1
    }

    .content_middle {
        flex: 1;
        padding-left: 20px;
        width: 100%;
        z-index: 1
    }
</style>
