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
                <!--文章模块导航-->
                <article-nav @selectArticle="selectArticle"></article-nav>
                <!--文章模块-->
                <article-block :articleBlockData="articleNavTitle"></article-block>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import UserMessage from 'components/User/UserMessage'
    import UserAttention from 'components/User/UserAttention'
    import Search from 'components/Search'
    import ArticleBlock from 'components/Article/ArticleBlock'
    import ArticleNav from 'components/Article/ArticleNav'

    let state = {
        appHeaderState: {
            show: true
        },
        appFooterState: {
            show: true
        },
        appRightMenu: {
            show: false
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
        store.dispatch('appShell/appFooter/setAppFooter', state.appFooterState);
        store.dispatch('appShell/appRightMenu/setAppRightMenu', state.appRightMenu);

        store.dispatch('appStore/asyncAjax/getArticleList', {name: '标题1', page:'1'});
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
              * 文章激活导航标题
              * @type {Array}
              * */
              articleNavTitle: '精选文章',
              /*
              * 左边内容标题
              * @type {Array}
              * */
              contentLeftTitle: ['我关注的人', '推荐订阅']
          }
        },
        methods: {
            selectArticle (articleNavTitle) {
                this.articleNavTitle = articleNavTitle
            }
        },
        components: {
            UserMessage,
            UserAttention,
            Search,
            ArticleBlock,
            ArticleNav
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
