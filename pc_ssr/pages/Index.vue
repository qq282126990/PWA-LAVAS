<template>
    <div>
        <div class="index_content">
            <div class="index_content_bg_one"></div>
            <div class="index_content_bg_two"></div>
            <!--左边内容-->
            <div class="index_content_left">
                <user-message></user-message>
                <user-attention v-for="(item, index) in contentLeftTitle" :userAttentionHeaderTxt="item" :key="index"></user-attention>
            </div>
            <!--中间内容-->
            <div class="index_content_middle">
                <!--搜索框-->
                <search></search>
                <!--文章模块导航-->
                <article-nav @selectArticle="selectArticle"></article-nav>
                <!--文章模块-->
                <article-block :articleNavTitle="articleNavTitle"
                               :articleBlockData="articleListData"
                ></article-block>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import UserMessage from 'components/User/UserMessage'
    import UserAttention from 'components/User/UserAttention'
    import Search from 'components/Search'
    import ArticleBlock from 'components/Article/ArticleBlock'
    import ArticleNav from 'components/Article/ArticleNav'

    let state = {
        appHeaderState: {
            show: true,
            status: {
                name: '',
                title: ''
            }
        },
        appFooterState: {
            show: true
        },
        appRightMenu: {
            show: true,
            scroll: true
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
        store.dispatch('appShell/appFooter/setAppFooter', state.appFooterState);
        store.dispatch('appShell/appRightMenu/setAppRightMenu', state.appRightMenu);
    }

    export default {
        name: 'index',
        metaInfo: {
            title: '主页',
            titleTemplate: '',
            meta: [
                {name: 'keywords', content: 'lavas PWA'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        async asyncData({store, route}) {
            setState(store);
            // 获取文章列表接口
           await store.dispatch('appStore/asyncAjax/getArticleList', {});
        },
        data () {
          return {
              /*
              * 文章激活导航标题
              * @type {Array}
              * */
              articleNavTitle: '所有文章',
              /*
              * 左边内容标题
              * @type {Array}
              * */
              contentLeftTitle: ['我关注的人', '推荐订阅'],
              /*
               * 文章列表数据
               * @type {Array}
               * */
              articleListData: []
          }
        },
        computed: {
            ...mapState('appStore/asyncAjax',{
                /*
                * 文章列表数据
                * @type {Array}
                * */
                articleList: 'articleList'
            })
        },
        mounted () {
            this.articleListData = this.articleList
        },
        methods: {
            // 选择的文章列表
            selectArticle (articleNavTitle) {
                this.articleNavTitle = articleNavTitle
            }
        },
        watch: {
            // 监听文章列表数据
            articleList (data) {
                this.articleListData = data
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

<style lang="scss">
    @import '../assets/sass/variable';

    html{
        overflow-y: scroll ;
    }

    .index_content {
        padding: 77px 10% ;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
    }

    .index_content_bg_one {
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

        .index_content_bg_two{
            position: absolute;
            top: 352px;
            left: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            background: url('/static/img/content_bg_two.jpg');
            background-size: contain;
            z-index: 0;
        }

    /*左边内容*/
    .index_content_left {
        width: 250px;
        height: 100%;
        z-index: 1
    }

    .index_content_middle {
        flex: 1;
        padding-left: 20px;
        width: 100%;
        z-index: 1
    }

</style>
