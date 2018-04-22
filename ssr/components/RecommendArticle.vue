<template>
    <div class="recommend_article">
        <!--文章内容列表-->
        <transition name="fade">
            <v-list class="article_list" ref="articleList" v-show="getArticleData.article && getArticleData.article.length > 0">
                <v-list-tile
                    dark
                    ripple
                    class="article_li"
                    v-for="(item, index) in getArticleData.article"
                    @click="select($event,index)"
                    :key="index"
                    ref="articleLi"
                >
                    <!--文章-->
                    <div class="article">
                        <!--文章标题-->
                        <h1 class="article_title">{{item.title}}</h1>
                        <!--文章内容-->
                        <div class="article_center">
                            <!--内容-->
                            <div class="center_txt">
                                <!--文字-->
                                <p>{{item.smallcontent}}</p>
                            </div>
                            <!--图片-->
                            <div class="center_img" v-lazy:background-image="item.img" v-show="item.img">
                                <!--<img v-lazy="item.img" v-show="item.img"/>-->
                            </div>
                        </div>
                        <!--文章底部-->
                        <div class="article_bottom">
                            <!--左-->
                            <div class="bottom_left">
                                <p>{{item.praise}} 赞 · {{item.comment}} 评论</p>
                            </div>
                            <!--右-->
                            <div class="bottom_right">
                                <!--发布人-->
                                <p class="right_txt">{{item.publisher}}</p>
                                <i class="right_i" v-show="item.flowerName">·</i>
                                <p class="right_txt">{{item.flowerName}}</p>
                                <!--<i class="iconfont icon-more-horiz"></i>-->
                            </div>
                        </div>
                    </div>
                </v-list-tile>
            </v-list>
        </transition>
        <!--loading组件-->
        <loading v-show="!getArticleData.article" :style="scrollDirection === 'up' ? 'paddingTop: 50%' : 'paddingTop: 30%'"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapState} from 'vuex';
    /* loading组件 */
    import Loading from 'base/loading.vue'

    export default {
        props: {
            /*
             * 文章内容列表
             * @type Array
             * */
            articleList: {
                type: null,
                default: {}
            },
            /*
             * 设置滚动组件滚动方向
             * @type {String}
             * */
            scrollDirection: {
                type: String,
                default: 'down'
            }
        },
        computed: {
            ...mapState('appShell/asyncAjax', {
                /*
                 * 获取对应类型文章
                 * @data {Array}
                 * */
                getArticleData: 'articleData'
            })
        },
        methods: {
            /**
             * 文章点击事件
             *
             * @param {Object} e 当前点击的元素节点
             * @param {Object} index 文章的下标
             */
            select (e, index) {
                // 获取节点
                let cellContainer = this.$refs.articleLi[index].$el.getElementsByTagName('a')[0];

                // 点击出现水波纹效果
                this.show(e, cellContainer);

                // 隐藏水波纹效果
                this.hide(cellContainer);
            },
            /**
             * 点击出现水波纹效果
             *
             * @param {Object} e 当前点击的元素节点
             * @param {Object} el 需要添加的节点
             */
            show (e, el) {
                let RippleDataAttribute = 'data-ripple';
                let _ref$value = true;

                let value = _ref$value === undefined ? {} : _ref$value;

                // 判断是否有节点
                if (el.getAttribute(RippleDataAttribute) !== 'true') {
                    return;
                }

                // 创建水波纹节点
                let container = document.createElement('span');
                let animation = document.createElement('span');

                // 插入节点
                container.appendChild(animation);
                container.className = 'ripple__container';

                if (value.class) {
                    container.className += ' ' + value.class;
                }

                // 为节点添加相关样式
                let size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
                animation.className = 'ripple__animation';
                animation.style.width = size * (value.center ? 1 : 2) + 'px';
                animation.style.height = animation.style.width;

                el.appendChild(container);
                let computed = window.getComputedStyle(el);
                if (computed.position !== 'absolute' && computed.position !== 'fixed') el.style.position = 'relative';

                let offset = el.getBoundingClientRect();
                let x = value.center ? '50%' : e.clientX - offset.left + 'px';
                let y = value.center ? '50%' : e.clientY - offset.top + 'px';

                animation.classList.add('ripple__animation--enter');
                animation.classList.add('ripple__animation--visible');
                style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ') scale3d(0.01,0.01,0.01)');
                animation.dataset.activated = Date.now();

                setTimeout(function () {
                    animation.classList.remove('ripple__animation--enter');
                    style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ')  scale3d(0.99,0.99,0.99)');
                }, 0);

                // 添加样式兼容
                function style (el, value) {
                    ['transform', 'webkitTransform'].forEach(function (i) {
                        el.style[i] = value;
                    });
                }
            },
            /**
             * 隐藏水波纹效果
             *
             * @param {Object} el 需要删除的节点
             */
            hide (el) {
                let RippleDataAttribute = 'data-ripple';

                // 判断是否有节点
                if (el.getAttribute(RippleDataAttribute) !== 'true') {
                    return;
                }

                // 获取要删除的节点
                let ripples = el.getElementsByClassName('ripple__animation');

                if (ripples.length === 0) return;
                let animation = ripples[ripples.length - 1];
                let diff = Date.now() - Number(animation.dataset.activated);
                let delay = 400 - diff;

                delay = delay < 0 ? 0 : delay;

                // 延迟 delay 秒后删除
                setTimeout(function () {
                    animation.classList.remove('ripple__animation--visible');

                    setTimeout(function () {
                        try {
                            if (ripples.length < 1) el.style.position = null;
                            animation.parentNode && el.removeChild(animation.parentNode);
                        } catch (e) {
                        }
                    }, 300);
                }, delay);
            }
        },
        activated() {
          console.log('111')
        },
        components: {
            Loading
        }
    }
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable';

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

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

    .article_li:first-child {
        margin-top: 20px;
    }

    /*文章*/
    .article {
        display: flex;
        flex-direction: column;
        padding: 20px 30px;
        /*height: 290px;*/
        background: $bgArticle;
        width: 100%;
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
        align-items: self-end;
        text-align: left;
        font-size: 28px;
        width: 100%;
        height: 100%;
        /*文字*/
        .center_txt {
            flex: 1;
            padding: 20px 0;
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
            width: 214px;
            height: 160px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            img {
                width: 100%;
                height: 100%
            }
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
            /*line-height: 40px;*/
            font-size: 24px;
            .right_txt {
                display: inline-block;
                margin: 0;
                color: #d5d5d5;
            }
            .right_txt:first-child {
                color: $colorArticleBottomTxt;
            }
            .right_i {
                padding: 0 10px;
                color: $colorArticleBottomTxt;
            }
            .iconfont {
                float: right;
                font-size: 50px;
            }
        }
    }
</style>
