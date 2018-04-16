<template>
    <div>
        <overall-search ref="overallSearch"
                        :style="{opacity: overallSearchPercent, top: `${overallSearchTop}px`}"></overall-search>
        <div class="content_wrapper" ref="contentWrapper">
            <div class="wrapper" ref="wrapper" :style="{marginTop: `${contentMarginTop}px`}">
                <!--横向滑动导航-->
                <div class="content_header_scroll" ref="contentHeaderScroll">
                    <horizontal-scroll :newData="contentHeaderItem">
                        <div class="horizontal_item" v-for="(item, index) in contentHeaderItem" ref="horizontalItem">
                            <v-btn flat
                                   :class="{'active': horizontalActive === index}"
                                   @click.native="selectHorizontal(index)">
                                <h1 class="item_name" :class="{'active': horizontalActive === index}">{{item}}</h1>
                            </v-btn>
                            <div class="horizontal_slider_dots">
                                <p class="slider_dots" :style="{transform: `translate3d(${sliderDotsWidth}px, 0, 0)`}">
                                    <span class="dots"></span>
                                </p>
                            </div>
                        </div>
                    </horizontal-scroll>
                </div>
                <!--文章内容-->
                <div class="content">
                    <vertical-scroll :listenScroll="listenScroll"
                                     :probeType="3"
                                     :bounce="false"
                                     @scroll="verticalScroll"
                                     ref="verticalScroll">
                        <recommend-article></recommend-article>
                    </vertical-scroll>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // vuex
    import {mapActions} from 'vuex';
    // 综合查找组件
    import overallSearch from 'components/OverallSearch.vue';
    // 横向滚动组件
    import horizontalScroll from 'base/HorizontalScroll.vue';
    // 推荐页文章
    import RecommendArticle from 'components/RecommendArticle.vue';
    // 垂直滚动组件
    import VerticalScroll from 'base/VerticalScroll.vue'

    function setState (store) {
        store.dispatch('appShell/appHeader/setAppHeader', {
            show: true,
            title: 'Lavas',
            showDownArrow: true,
            showMenu: false,
            showBack: false,
            showLogo: false,
            actions: [
                {
                    icon: 'icon-liuyan',
                    route: '/'
                }
            ]
        });
    }

    export default {
        name: 'index',
        metaInfo: {
            title: 'Home',
            titleTemplate: '%s',
            meta: [
                {name: 'keywords', content: 'lavas PWA'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        async asyncData ({store, route}) {
            setState(store);
        },
        data () {
            return {
                /*
                 * 设置内容头部导航数据
                 * @type {Number}
                 * */
                contentHeaderItem: ['推荐', '关注', '热榜', '文档', '提问', '书店'],
                /*
                 * 开启滚动组件监听滚动事件
                 * */
                listenScroll: true,
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
                contentMarginTop: 0,
                /*
                 * 综合搜索透明度
                 * @type {Number}
                 * */
                overallSearchPercent: 1,
                /*
                 * 综合搜索偏移位置
                 * @type {Number}
                 * */
                overallSearchTop: null
            }
        },
        mounted () {
            let overallSearch = this.$refs.overallSearch.$el
            this.maxContentMarginTop = -(overallSearch.children[0].clientHeight + ((this.$refs.contentHeaderScroll.clientHeight / 5) * 6));
            // 初始化内容偏移位置
            this.contentMarginTop = Math.abs(this.maxContentMarginTop);

            this.overallSearchOffsetTop = overallSearch.offsetTop;
        },
        methods: {
            // 选择内容头部横向导航
            selectHorizontal (index) {
                // 需要激活的导航
                this.horizontalActive = index;

                // 内容头部 dot 滑动位置
                this.sliderDotsWidth = index * this.$refs.horizontalItem[0].clientWidth;
            },
            // 垂直滚动
            verticalScroll (pos) {
                this.verticalScrollY = pos.y;
            }
        },
        activated () {
            setState(this.$store);
        },
        watch: {
            // 监听垂直滚动数值
            verticalScrollY (scrollY) {
                let newScrollY = Math.abs(Math.min(0, this.maxContentMarginTop - scrollY));

                // 透明度
                const percent = Math.max(0, 1 - Math.abs(scrollY / Math.abs(this.maxContentMarginTop)));
                this.overallSearchPercent = percent;

                this.off = this.overallSearchOffsetTop;

                if (scrollY < this.maxContentMarginTop) {
                    this.contentMarginTop = 0;
                    this.$refs.verticalScroll.refresh();
                }
                else {
                    this.contentMarginTop = newScrollY;

                    if (this.overallSearchOffsetTop >= this.$refs.contentWrapper.offsetTop) {
                        this.overallSearchTop = this.off--
                    }
                    console.log(this.overallSearchTop)
                }

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
            height: 100%;
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
        bottom: 125px;
        flex: 1;
        overflow: hidden;
        width: 100%;
        background: #EBEBEB;
    }
</style>
