<template>
    <div class="vue-virtual-collection" :style="outerStyle" @scroll.passive="onScroll" ref="outer">
        <div class="vue-virtual-collection-container" :style="containerStyle">
            <div class="cell-container" v-for="(item, index) in displayItems"
                 :key="item.index"
                 :style="getComputedStyle(item, index)" ref="cellContainer">
                <slot name="cell" :data="item"></slot>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState, mapActions} from 'vuex';
    import SectionManager from "common/js/SectionManager";

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
            init () {
                document.addEventListener ('touchmove', function (e) {
                    e.preventDefault ();
                });
                // 获取块的管理
                this._sectionManager = new SectionManager (this.sectionSize);
                // 注册块和块的管理
                this.registerCellsToSectionManager ();
                // 设置当前视图我们中应该显示那些块
                this.flushDisplayItems ();
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
            onScroll (e) {
                // 设置当前视图我们中应该显示那些块
                this.flushDisplayItems ()
            },
            // 设置当前视图我们中应该显示那些块
            flushDisplayItems () {
                let scrollTop = 0;
                let scrollLeft = 0;

                // 设置可以滚动的高度和宽度
                if (this.$refs.outer) {
                    scrollTop = this.$refs.outer.scrollTop;
                    scrollLeft = this.$refs.outer.scrollLeft;
                }

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

                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame (() => {
                        this.displayItems = displayItems;

                        // 强制更新当前组件（以及 Slot 里面的組件，但不包含全部子組件 )
                        this.$forceUpdate ();
                    })
                }
                else {
                    this.displayItems = displayItems;

                    // 强制更新当前组件（以及 Slot 里面的組件，但不包含全部子組件 )
                    this.$forceUpdate ();
                }

                // 收集的滚动高度
                this.setScrollTop (-scrollTop);
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
    }
</script>

<style lang="stylus">

    .vue-virtual-collection {
        overflow-y: scroll;
        overflow-x: hidden;
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
