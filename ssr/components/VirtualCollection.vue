<template>
    <div class="vue-virtual-collection" :style="outerStyle" ref="outer">
        <vertical-scroll :listenScroll="true"
                         :probeType="3"
                         :bounce="false"
                         ref="verticalScroll"
                         @scroll="verticalScroll">
            <div class="vue-virtual-collection-container" :style="containerStyle" ref="cellContainer">
                <div class="cell-container"
                     v-for="(item, index) in displayItems"
                     :key="item.index"
                     :style="getComputedStyle(item, index)"
                     @click="select($event,index)"
                     >
                    <slot name="cell" :data="item"></slot>
                </div>
            </div>
        </vertical-scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapActions} from 'vuex';
    import SectionManager from "common/js/SectionManager";
    import VerticalScroll from "../base/VerticalScroll";

    export default {
        props: {
            // （可选）覆盖Collection的单元格分割成的部分的大小。 这是一个高级选项，应该仅用于性能调整目的。
            sectionSize: {
                type: Number,
                default: 300
            }
        },
        data () {
            return {
                displayItems: [],
                totalHeight: 0,
                totalWidth: 0
            }
        },
        mounted () {
            this.init ();
        },
        computed: {
            // 容器样式
            containerStyle () {
                return {
                    height: this.totalHeight + "px",
                    width: this.totalWidth + "px"
                }
            },
            // 外部容器样式
            outerStyle () {
                return {
                    width: this.width + "px",
                    height: this.height + "px"
                }
            },
            ...mapState ('appShell/virtualCollection', [
                // 我们需要一个方法去计算这些块的信息 -> 用于计算每一个块显示的大小和显示的位置
                'cellSizeAndPositionGetter',
                // 列表数据
                'collection',
                // 收集的宽度
                'width',
                // 收集的高度
                'height'
            ]),
        },
        methods: {
            // 初始化
            init () {
                // 获取块的管理
                this._sectionManager = new SectionManager (this.sectionSize);
                // 注册块和块的管理
                this.registerCellsToSectionManager ();
                // 设置当前视图我们中应该显示那些块
                this.flushDisplayItems (0, 0);
            },
            // 注册块和块的管理
            registerCellsToSectionManager () {
                // 如果_sectionManager中没有数据就创建一个
                if (!this._sectionManager) {
                    this._sectionManager = new SectionManager (this.sectionSize);
                }
                let totalHeight = 0;
                let totalWidth = 0;

                // 我们需要去遍历去注册它,为每一个块都设置一个对应的信息方便用于查找他
                this.collection.forEach ((item, index) => {
                    // 注册单元格大小和位置关系
                    const cellMetadatum = this.cellSizeAndPositionGetter (item, index);

                    // 注册块 -> 为每一个块都设置一个对应的信息
                    this._sectionManager.registerCell ({
                        index,
                        cellMetadatum
                    });

                    // 计算总高度和总宽度 -> 单元格大小和位置关系
                    const {x, y, width, height} = cellMetadatum;
                    const bottom = y + height;
                    const right = x + width;
                    if (bottom > totalHeight) {
                        totalHeight = bottom;
                    }

                    if (right > totalWidth) {
                        totalWidth = right;
                    }
                    this.totalHeight = totalHeight;
                    this.totalWidth = totalWidth;
                })
            },
            // 获取到视图应该渲染那些块之外我们还需要设置这些块所应该在的位置
            getComputedStyle (displayItem) {
                if (!displayItem) {
                    return;
                }

                const {width, height, x, y} = this._sectionManager.getCellMetadata (displayItem.index);

                return {
                    transform: `translate3d(${x}px, ${y}px, 0)`,
                    width: `${width}px`,
                    height: `${height}px`
                }
            },
            // 设置当前视图我们中应该显示那些块
            flushDisplayItems (x, y) {
                let scrollLeft = x;
                let scrollTop = Math.abs (y);

                // 然后这里我们需要去设置当前视图中应该渲染那些块
                // 于是我们要在 SectionManager类中定义一个方法去获取需要渲染的那个块的索引
                let indices = this._sectionManager.getCellIndices ({
                    height: this.height,
                    width: this.width,
                    x: scrollLeft,
                    y: scrollTop
                });

                // 到这里我们已经获取到了索引了,然后我们就可以去渲染该视图所对应的块了
                const displayItems = [];

                indices.forEach (index => {
                    displayItems.push ({
                        index,
                        ...this.collection[index]
                    })
                });

                // 重新渲染数据
                this.displayItems = displayItems;

                this.$forceUpdate();

                this.$refs.verticalScroll.refresh()

                // 收集的滚动高度
                this.setScrollTop (-scrollTop);
            },
            // 垂直滚动
            verticalScroll (pos) {
                this.flushDisplayItems (pos.x, pos.y)
            },
            // 点击事件
            select (e, index) {
                let cellContainer = this.$refs.cellContainer.childNodes[index].getElementsByTagName ('a')[0];

                // 点击出现水波纹效果
                this.show (e, cellContainer);

                // 隐藏水波纹效果
                this.hide(cellContainer);
            },
            // 点击出现水波纹效果
            show (e, el) {
                let RippleDataAttribute = 'data-ripple';
                let _ref$value = true;

                let value = _ref$value === undefined ? {} : _ref$value;

                // 判断是否有节点
                if (el.getAttribute (RippleDataAttribute) !== 'true') {
                    return;
                }

                // 创建水波纹节点
                let container = document.createElement ('span');
                let animation = document.createElement ('span');

                // 插入节点
                container.appendChild (animation);
                container.className = 'ripple__container';

                if (value.class) {
                    container.className += ' ' + value.class;
                }

                // 为节点添加相关样式
                let size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
                animation.className = 'ripple__animation';
                animation.style.width = size * (value.center ? 1 : 2) + 'px';
                animation.style.height = animation.style.width;

                el.appendChild (container);
                let computed = window.getComputedStyle (el);
                if (computed.position !== 'absolute' && computed.position !== 'fixed') el.style.position = 'relative';

                let offset = el.getBoundingClientRect ();
                let x = value.center ? '50%' : e.clientX - offset.left + 'px';
                let y = value.center ? '50%' : e.clientY - offset.top + 'px';

                animation.classList.add ('ripple__animation--enter');
                animation.classList.add ('ripple__animation--visible');
                style (animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ') scale3d(0.01,0.01,0.01)');
                animation.dataset.activated = Date.now ();

                setTimeout (function () {
                    animation.classList.remove ('ripple__animation--enter');
                    style (animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ')  scale3d(0.99,0.99,0.99)');
                }, 0);

                // 添加样式兼容
                function style (el, value) {
                    ['transform', 'webkitTransform'].forEach (function (i) {
                        el.style[i] = value;
                    });
                }
            },
            // 隐藏水波纹效果
            hide (el) {
                let RippleDataAttribute = 'data-ripple';

                // 判断是否有节点
                if (el.getAttribute (RippleDataAttribute) !== 'true') {
                    return;
                }

                // 获取要删除的节点
                let ripples = el.getElementsByClassName ('ripple__animation');

                if (ripples.length === 0) return;
                let animation = ripples[ripples.length - 1];
                let diff = Date.now () - Number (animation.dataset.activated);
                let delay = 400 - diff;

                delay = delay < 0 ? 0 : delay;

                // 延迟 delay 秒后删除
                setTimeout (function () {
                    animation.classList.remove ('ripple__animation--visible');

                    setTimeout (function () {
                        // Need to figure out a new way to do this
                        try {
                            if (ripples.length < 1) el.style.position = null;
                            animation.parentNode && el.removeChild (animation.parentNode);
                        } catch (e) {
                        }
                    }, 300);
                }, delay);
            },
            ...mapActions ('appShell/virtualCollection', {
                /**
                 * 收集的滚动高度
                 *
                 * @type {Number}
                 */
                setScrollTop: 'scrollTop'
            })
        },
        watch: {
            collection () {
                this.init ();
            }
        },
        components: {
            VerticalScroll
        }
    }
</script>

<style lang="stylus">

    .vue-virtual-collection {
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        width: 100%
    }

    .vue-virtual-collection-container {
        position: relative;
        overflow: hidden;
    }

    .cell-container {
        position: absolute;
        top: 0;
        overflow: hidden;
    }

</style>
