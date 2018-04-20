<template>
    <div>
        <!--综合搜索-->
        <overall-search ref="overallSearch"
                        :style="{opacity: overallSearchPercent,
                                transform: `translate3d(0, ${overallSearchTranslateY}px,0)`}">

        </overall-search>
        <!--文章内容-->
        <div class="content_wrapper" ref="contentWrapper">
            <div class="wrapper" ref="wrapper" :style="{marginTop: `${contentMarginTop}px`}">
                <!--横向滑动导航-->
                <div class="content_header_scroll" ref="contentHeaderScroll">
                    <horizontal-scroll :newData="contentHeaderItem">
                        <div class="horizontal_item"
                             v-for="(item, index) in contentHeaderItem"
                             :key="index"
                             ref="horizontalItem">
                            <!--按钮-->
                            <v-btn flat
                                   :class="{'active': horizontalActive === index}"
                                   @click.native="selectHorizontal(index, item.id)">
                                <h1 class="item_name" :class="{'active': horizontalActive === index}">{{item.name}}</h1>
                            </v-btn>
                            <!--dot-->
                            <div class="horizontal_slider_dots">
                                <p class="slider_dots" :style="{transform: `translate3d(${sliderDotsWidth}px, 0, 0)`}">
                                    <span class="dots"></span>
                                </p>
                            </div>
                        </div>
                    </horizontal-scroll>
                </div>
                <!--文章内容-->
                <div class="content" ref="content">
                    <vertical-scroll :listenScroll="listenScroll"
                                     :probeType="probeType"
                                     @scroll="verticalScroll"
                                     ref="verticalScroll">
                        <recommend-article :articleList="saveArticleList[horizontalActive]"></recommend-article>
                    </vertical-scroll>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex';
    /* 综合查找组件 */
    import overallSearch from 'components/OverallSearch.vue';
    /* 横向滚动组件 */
    import horizontalScroll from 'base/HorizontalScroll.vue';
    /* 推荐页文章 */
    import RecommendArticle from 'components/RecommendArticle.vue';
    /* 垂直滚动组件 */
    import VerticalScroll from 'base/VerticalScroll.vue'

    export default {
        name: 'index',
        metaInfo: {
            title: '主页',
            titleTemplate: '%s',
            meta: [
                {name: 'keywords', content: 'PWA社区'},
                {name: 'description', content: 'PWA社区用于解决、交流各种 PWA 问题解决方案，帮助开发者解决的各种问题'}
            ]
        },
        async asyncData ({store, route}) {
            /* 请求文章接口默认推荐 */
            await  store.dispatch ('appShell/asyncAjax/getArticleAjax', {id: 'articleRecommend'})
        },
        data () {
            return {
                /*
                 * 设置内容头部导航数据
                 * @type {Number}
                 * */
                contentHeaderItem: [{id: 'articleRecommend', name: '推荐'},
                    {id: 'articleFind', name: '发现'},
                    {id: 'articleHot', name: '热榜'},
                    {id: '', name: '文档'},
                    {id: '', name: '提问'},
                    {id: '', name: '书店'}],
                /*
                 * 开启滚动组件监听滚动事件
                 * @type {Boolean}
                 * */
                listenScroll: true,
                /*
                 * 开启滚动组件滚动类型
                 * @type {Boolean}
                 * */
                probeType: 2,
                /*
                 * 设置内容头部导航那个激活了
                 * @type {Number}
                 * */
                horizontalActive: 0,
                /*
                 * 内容头部 dot 滑动位置
                 * @type {Number}
                 * */
                sliderDotsWidth: 0,
                /*
                 * 垂直滚动数值
                 * @type {Number}
                 * */
                verticalScrollY: 0,
                /*
                 * 内容偏移位置
                 * @type {Number}
                 * */
                contentMarginTop: null,
                /*
                 * 综合搜索透明度
                 * @type {Number}
                 * */
                overallSearchPercent: 1,
                /*
                 * 综合搜索偏移位置
                 * @type {Number}
                 * */
                overallSearchTranslateY: 0,
                /*
                 * 设置滚动组件滚动方向
                 * @type {String}
                 * */
                scrollDirection: '',
                /*
                 * 保存获取过的文章内容组用于防止重复请求
                 * @type {Array}
                 * */
                saveArticleList: [],
                /*
                 * 获取文章内容列表
                 * @type {Array}
                 * */
                articleList: []
            }
        },
        computed: {
            ...mapState ('appShell/asyncAjax', {
                /* 获取对应类型文章 */
                getArticleData: 'articleData'
            })
        },
        created () {
            /* 创建文章内容类型的数据组 */
            this._initArticleGroup (this.contentHeaderItem);
        },
        mounted () {
            let overallSearch = this.$refs.overallSearch.$el;

            // 内容最大偏移位置
            this.maxContentMarginTop = (overallSearch.children[0].clientHeight + ((this.$refs.contentHeaderScroll.clientHeight / 5) * 6));
            // 设置内容偏移位置
            this.contentMarginTop = this.maxContentMarginTop;
            // 综合搜索需要偏移到的最终位置
            this.overallSearchTranslateYEnd = -(overallSearch.offsetTop - this.$refs.contentWrapper.offsetTop);
        },
        methods: {
            /* 选择内容头部横向导航 */
            selectHorizontal (index, id) {
                // 需要激活的导航
                this.horizontalActive = index;

                // 内容头部 dot 滑动位置
                this.sliderDotsWidth = index * this.$refs.horizontalItem[0].clientWidth;

                // 判断是否已经请求过歌曲列表了
                if (this.saveArticleList[index] && this.saveArticleList[index].length > 0) {
                    this.articleList = this.saveArticleList[index];
                    return;
                }

                // 初始化文章列表
                this.articleList = [];

                // 请求文章内容接口
                this.setArticleAjax ({id: id});
            },
            /* 创建文章内容类型的数据组 */
            _initArticleGroup (list) {
                let ret = [];
                let items = [];

                list.forEach (() => {
                    ret.push (items);
                });

                // 初始化文章内容组用于防止重复请求
                this.saveArticleList = ret;
            },
            /* 垂直滚动 */
            verticalScroll (pos) {
                this.verticalScrollY = pos.y;
            },
            ...mapActions ('appShell/asyncAjax', {
                setArticleAjax: 'getArticleAjax'
            })
        },
        watch: {
            /* 监听垂直滚动数值 */
            verticalScrollY (scrollY) {
                // 判断内容滚动
                if (scrollY < 0 && scrollY < -5 && this.scrollDirection !== 'up') {
                    this.scrollDirection = 'up';
                }
                else if (scrollY >= 0) {
                    this.scrollDirection = 'down';
                }
            },
            /* 监听滚动方向 */
            scrollDirection (direction) {
                if (direction === 'up') {
                    // 内容偏移位置
                    this.contentMarginTop = 0;
                    // 综合搜索偏移位置
                    this.overallSearchTranslateY = this.overallSearchTranslateYEnd;
                    // 综合搜索透明度
                    this.overallSearchPercent = 0;

                    // 禁用滚动
                    this.$refs.verticalScroll.disable ();
                    setTimeout (() => {
                        // 刷新滚动
                        this.$refs.verticalScroll.refresh ();
                        // 重新开启滚动
                        this.$refs.verticalScroll.enable ();
                    }, 300);
                }

                if (direction === 'down') {
                    // 内容偏移位置
                    this.contentMarginTop = this.maxContentMarginTop;
                    // 综合搜索偏移位置
                    this.overallSearchTranslateY = 0;
                    // 综合搜索透明度
                    this.overallSearchPercent = 1;

                    // 禁用滚动
                    this.$refs.verticalScroll.disable ();
                    setTimeout (() => {
                        // 刷新滚动
                        this.$refs.verticalScroll.refresh ();
                        // 重新开启滚动
                        this.$refs.verticalScroll.enable ();
                    }, 300);
                }

            },
            /* 监听文章接口返回数据 */
            getArticleData (data) {
                console.log(data)
                // 保存获取过的文章内容组用于防止重复请求
                this.saveArticleList[data.type] = data.article;
            }
        },
        components: {
            overallSearch,
            horizontalScroll,
            RecommendArticle,
            VerticalScroll
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .content_wrapper {
        position: fixed;
        top: 100px;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        .wrapper {
            position: relative;
            overflow: hidden;
            margin-top: 390px;
            height: 100%;
            transition: all .3s cubic-bezier(0, 0, 0.2, 1)
        }
    }

    /*内容导航*/
    .content_header_scroll {
        overflow: hidden;
        width: 100%;
        height: 100px;
        background: $bgContentHeaderScroll;
    }

    /*横向滚动数据*/
    .horizontal_item {
        flex: 0 0 136px;
        line-height: 100px;
        height: 100%
        .item_name {
            margin: 0;
            font-size: 32px;
            /*font-weight: bold;*/
            color: $colorContentHeaderItem;
            &.active {
                font-weight: 600;
                color: $colorContentHeaderItemActive;
            }
        }
        .btn {
            margin: 0;
            height: 100%;
            min-width: 100%;
        }
        .btn__content {
            margin: 0 auto;
        }
    }

    /*横向滚动 dots*/
    .horizontal_slider_dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 10px;
        text-align: center;
        height: 6px;
        .slider_dots {
            position: absolute;
            left: 0;
            margin: 0;
            width: 136px;
            height: 6px;
            transition: all .5s;
            .dots {
                display: block;
                margin: 0 25px;
                height: 6px;
                background: $colorContentHeaderItemActive;
            }
        }
    }

    /*文章内容*/
    .content {
        position: absolute;
        top: 100px;
        bottom: 120px;
        flex: 1;
        overflow: hidden;
        width: 100%;
        background: #EBEBEB;
    }
</style>
