<template>
    <div class="recommend_article" ref="recommendAticle">
        <v-list class="article_list" ref="articleList">
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
                        <h1 class="article_title">Mac小白看过来，满满干货～</h1>
                        <!--文章内容-->
                        <div class="article_center">
                            <!--文字-->
                            <div class="center_txt">
                                <p>
                                    周三，埋头工作之时，给大家放一个大招。本文可以让你，少走20年弯路。 本篇是原创首发，你能看到是幸运的，预计接下来会被大量转发，你也是在见证历史和未来。 2003年毕业不久，我进入了上海，到了2006年…
                                </p>
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
    </div>
</template>

<script type="text/ecmascript-6">
    // vuex
    import {mapActions, mapState} from 'vuex';
    // 块渲染无限滚动组件
    import VirtualCollection from 'components/VirtualCollection.vue'

    export default {
        data () {
            return {
                items: new Array (1000).fill (0).map ((_, index) => ({data: '#' + index}))
            }
        },
        computed: {
            ...mapState ('appShell/virtualCollection', [
                // 获取收集的滚动高度
                'scrollTop'
            ])
        },
        mounted () {
            this.recommendAticle = this.$refs.recommendAticle;

            // 初始化块渲染无限滚动组件方法
            this.initVirtualCollection ();
        },
        methods: {
            // 初始化块渲染无限滚动组件方法
            initVirtualCollection () {
                this.cellSizeAndPositionGetterHeight = (this.recommendAticle.clientWidth / 2) - (document.getElementsByClassName ('app-bottom-navigator-wrapper')[0].clientHeight / 2);

                this.$nextTick (() => {
                    this.setCellSizeAndPositionGetter (this.cellSizeAndPositionGetter);
                    this.setCollection (this.items);
                    this.setWidth (this.recommendAticle.clientWidth);
                    this.setHeight (this.recommendAticle.clientHeight);
                });
            },
            // 用于计算每一个块显示的大小和显示的位置
            cellSizeAndPositionGetter (item, index) {
                return {
                    width: this.recommendAticle.clientWidth,
                    height: this.cellSizeAndPositionGetterHeight,
                    x: (index % 1) * (this.recommendAticle.clientWidth + 10),
                    y: parseInt (index / 1) * this.cellSizeAndPositionGetterHeight
                }
            },
            ...mapActions ('appShell/virtualCollection', {
                // 我们需要一个方法去计算这些块的信息 -> 用于计算每一个块显示的大小和显示的位置
                setCellSizeAndPositionGetter: 'cellSizeAndPositionGetter',
                // 列表数据
                setCollection: 'collection',
                // 收集的宽度
                setWidth: 'width',
                // 收集的高度
                setHeight: 'height',
                // 每一个列表的高度
                setListHeight: 'listHeight'
            })
        },
        watch: {
            scrollTop () {
                this.setHeight (this.recommendAticle.clientHeight);
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
        margin: 20px 0;
        display: inline-block;
        box-shadow: 0 4px 10px rgb(153, 153, 153);
    }

    /*文章*/
    .article {
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
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
