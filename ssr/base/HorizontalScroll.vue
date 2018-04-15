<template>
    <div class="horizontal_wrapper"  ref="horizontalWrapper">
        <div class="horizontal" :style="{width: horizontalWidth}" ref="horizontal">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    // 滚动插件
    import BScroll from 'better-scroll';

    export default {
        props: {
            /*
             * 头部数据
             * @type {Array}
             * */
            newData: {
                type: null,
                default: null
            }
        },
        data() {
            return {
                /*
                 * 设置横向滚动的宽度
                 * @type {String}
                 * */
                horizontalWidth: null
            }
        },
        mounted() {
            // 设置滑动的宽度
            this.$nextTick(() => {
                // 设置头部导航滑动的宽度
                this._setHeaderScroll();
            });
        },
        methods: {
            // 设置头部导航滑动的宽度
            _setHeaderScroll() {
                if (this.newData && this.newData.length) {
                    // 获取所有内容标签
                    this.children = this.$refs.horizontal.children;

                    // 初始化宽度
                    let width = 0;

                    // 循环选项
                    for (let i = 0; i < this.children.length; i++) {
                        // 获取每个 childList 宽度
                        let childList = this.children[i].clientWidth;

                        // 设置每个轮播图的宽度
                        width += childList;
                    }

                    // 设置整个头部的宽度
                    this.horizontalWidth = width + 'px';

                    this.$nextTick(() => {
                        if (!this.horizontalScroll) {
                            this.horizontalScroll = new BScroll(this.$refs.horizontalWrapper, {
                                // 设置X轴滚动
                                scrollX: true,
                                // 当设置 eventPassthrough 为 'vertical' 的时候 ScrollY无效
                                eventPassthrough: 'vertical'
                            });
                        }
                        else {
                            // 刷新头部滚动
                            this.horizontalScroll.refresh();
                        }
                    });
                }
            }
        },
        watch: {
            newData() {
                // 设置滑动的宽度
                this.$nextTick(() => {
                    // 设置头部导航滑动的宽度
                    this._setHeaderScroll();
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>

    .horizontal_wrapper{
        /*margin: 0 20px;*/
        overflow: hidden;
        height: 100%;
    }
    .horizontal {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 100%;
    }
</style>
