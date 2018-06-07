<template>
    <div class="recommend_article" ref="recommendAticle">
        <!--渲染列表-->
        <v-list class="article_list">
            <virtual-collection>
                <v-list-tile
                    slot="cell"
                    slot-scope="props"
                    dark
                    ripple
                    @click=""
                    class="article_li"
                >
                    <!--文章-->
                    <div class="article">
                        <!--文章标题-->
                        <h1 class="article_title">{{props.data.title}}</h1>
                        <!--文章内容-->
                        <div class="article_center">
                            <!--文字-->
                            <div class="center_txt">
                                <p>{{props.data.smallcontent}}</p>
                            </div>
                            <!--图片-->
                            <!--<div class="center_img"></div>-->
                        </div>
                        <!--文章底部-->
                        <div class="article_bottom">
                            <!--左-->
                            <div class="bottom_left">
                                <p>106 赞 · 22 评论</p>
                            </div>
                            <!--右-->
                            <div class="bottom_right">
                                <i class="iconfont icon-more-horiz"></i>
                            </div>
                        </div>
                    </div>
                </v-list-tile>
            </virtual-collection>
        </v-list>
        <!--用于收集每个列表的高度-->
        <!--<div ref="collectArticleList" v-if="articleLiHeight.length !== getArticleData.length">-->
            <!--<li-->
                <!--class="article_li"-->
                <!--v-for="item in getArticleData"-->
            <!--&gt;-->
                <!--&lt;!&ndash;文章&ndash;&gt;-->
                <!--<div class="article">-->
                    <!--&lt;!&ndash;文章标题&ndash;&gt;-->
                    <!--<h1 class="article_title">{{item.title}}</h1>-->
                    <!--&lt;!&ndash;文章内容&ndash;&gt;-->
                    <!--<div class="article_center">-->
                        <!--&lt;!&ndash;文字&ndash;&gt;-->
                        <!--<div class="center_txt">-->
                            <!--<p>{{item.smallcontent}}</p>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;图片&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="center_img"></div>&ndash;&gt;-->
                    <!--</div>-->
                    <!--&lt;!&ndash;文章底部&ndash;&gt;-->
                    <!--<div class="article_bottom">-->
                        <!--&lt;!&ndash;左&ndash;&gt;-->
                        <!--<div class="bottom_left">-->
                            <!--<p>106 赞 · 22 评论</p>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;右&ndash;&gt;-->
                        <!--<div class="bottom_right">-->
                            <!--<i class="iconfont icon-more-horiz"></i>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapState} from 'vuex';
    /* 块渲染无限滚动组件 */
    import VirtualCollection from 'components/VirtualCollection.vue'

    //    let state = {id: 'articleRecommend'};

    //    function setState(store) {
    //        store.dispatch('appShell/asyncAjax/getArticleAjax', state);
    //    }

    let state = {
        appHeaderState: {
            show: false
        }
    };

    function setState (store) {
        store.dispatch ('appShell/appHeader/setAppHeader', state.appHeaderState);
    }

    export default {
//        async asyncData({store, route}) {
//            setState(store);
//        },
        data () {
            return {
                amount: "5",
                line: "1",
                width: 375,
                columnHeight: 0,
                articleLiHeight: []
            }
        },
        computed: {
            /* 获取每个内容列表的高度 */
            _articleLiHeight () {
                this.articleLiHeight = [];
                Array.prototype.slice.call (this.$refs.collectArticleList.children).forEach ((children) => {
                    if (children.className === 'article_li') {
                        this.articleLiHeight.push (children.clientHeight);
                    }
                });

                return this.articleLiHeight;
            },
            ...mapState ('appShell/virtualCollection', [
                /* 获取收集的滚动高度 */
                'scrollTop'
            ]),
            ...mapState ('appShell/asyncAjax', {
                /* 获取对应类型文章 */
                getArticleData: 'articleData'
            })
        },
        mounted () {
            this.recommendAticle = this.$refs.recommendAticle;

            /*初始化块渲染无限滚动组件方法*/
            this.initVirtualCollection ();

            this.setArticleAjax ({id: 'articleRecommend'})
        },
        methods: {
            /* 初始化块渲染无限滚动组件方法 */
            initVirtualCollection () {
                this.cellSizeAndPositionGetterHeight = (this.recommendAticle.clientWidth / 2) - (document.getElementsByClassName ('app-bottom-navigator-wrapper')[0].clientHeight / 2);

                this.$nextTick (() => {
                    this.setCellSizeAndPositionGetter (this.cellSizeAndPositionGetter);
                    this.setWidth (this.recommendAticle.clientWidth);
                    this.setHeight (this.recommendAticle.clientHeight);
                });
            },
            /* 用于计算每一个块显示的大小和显示的位置 */
            cellSizeAndPositionGetter (item, index) {
//                const height = this._articleLiHeight[index];
//
//                const result = {
//                    height,
//                    width: this.recommendAticle.clientWidth,
//                    x: (index % 1) * (this.recommendAticle.clientWidth + 10),
//                    y: this.columnHeight
//                }
//                this.columnHeight += height + 10;
//                console.log(result)
//
//                return result;


                return {
                    width: this.recommendAticle.clientWidth,
                    height:  this.cellSizeAndPositionGetterHeight,
                    x: (index % 1) * (this.recommendAticle.clientWidth + 10),
                    y: parseInt (index / 1) * this.cellSizeAndPositionGetterHeight
                }
            },
            ...mapActions ('appShell/virtualCollection', {
                /* 我们需要一个方法去计算这些块的信息 -> 用于计算每一个块显示的大小和显示的位置 */
                setCellSizeAndPositionGetter: 'cellSizeAndPositionGetter',
                /* 列表数据 */
                setCollection: 'collection',
                /* 收集的宽度 */
                setWidth: 'width',
                /* 收集的高度 */
                setHeight: 'height',
                /* 每一个列表的高度 */
                setListHeight: 'listHeight'
            }),
            ...mapActions ('appShell/asyncAjax', {
                setArticleAjax: 'getArticleAjax'
            }),
        },
        watch: {
            /* 监听文章滚动高度 */
            scrollTop (data) {
                if (data < 0) {
                    this.setHeight (this.recommendAticle.clientHeight);
                }
            },
            /* 监听文章接口返回数据 */
            getArticleData (data) {
                this.setCollection (data);
            }
        },
        components: {
            VirtualCollection
        }
    }
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable';

    .recommend_article {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .article_list {
        background-color: inherit;
    }

    .article_li {
        position: relative;
        margin-bottom: 20px;
        display: inline-block;
        box-shadow: 0 4px 10px rgb(153, 153, 153);
        width: 100%;
    }

    /*文章*/
    .article {
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
        width: 100%
        height: 290px;
        background: $bgArticle;
    }

    /*文章标题*/
    .article_title {
        flex: 0 0 60px;
        margin: 0;
        text-align: left;
        font-size: 32px;
        font-weight: 600;
    }

    /*文章内容*/
    .article_center {
        flex: 1;
        display: flex;
        align-items: center;
        text-align: left;
        font-size: 28px;
        width: 100%;
        height: 100%;
        /*文字*/
        .center_txt {
            flex: 1;
            p {
                margin: 0;
                padding-right: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
        }
        /*图片*/
        .center_img {
            position: relative;
            flex: 0 0 214px;
            border-radius: 8px;
            overflow: hidden;
            background: url("http://s2.music.126.net/style/web2/img/recmd_daily.jpg?210072d4eaa02f9619b4c1db98768256") no-repeat;
            background-size: cover;
            background-position: center;
            height: 100%;
        }
    }

    /*文章底部*/
    .article_bottom {
        flex: 0 0 56px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-size: 28px;
        width: 100%;
        color: $colorArticleBottom
        /*左*/
        .bottom_left {
            p {
                margin: 0;
            }
        }
        /*右*/
        .bottom_right {
            line-height: 40px;
            .iconfont {
                float: right;
                font-size: 50px;
                color: #d5d5d5
            }
        }
    }
</style>
