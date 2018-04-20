<template>
    <div class="overall_search_wrapper">
        <div class="overall_search">
            <!--搜索框-->
            <div class="search_warpper">
                <input type="text" placeholder="搜索文章内容、用户" class="search_input" disabled title="搜索文章内容、用户"/>
                <i class="iconfont icon-search"></i>
            </div>
            <!--其他综合-->
            <div class="other_wrapper">
                <div class="other_item"
                     v-for="item in other_item"
                     @click="handleNavClick(item.route)"
                >
                    <i class="iconfont item_icon" :class="item.icon"></i>
                    <p class="item_name" :title="item.name" role="presentation">{{item.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                /**
                 * 其他综合按钮列表
                 *
                 * @type {Array.<Object>}
                 */
                other_item: [
                    {
                        // 按钮的名字
                        name: '写心得',

                        // 显示的 icon
                        icon: 'icon-modify',

                        // 路由
                        route: '/'
                    },
                    {
                        // 按钮的名字
                        name: '问答',

                        // 显示的 icon
                        icon: 'icon-question',

                        // 路由
                        route: '/'
                    },
                    {
                        // 按钮的名字
                        name: '发现好友',

                        // 显示的 icon
                        icon: 'icon-courier',

                        // 路由
                        route: '/'
                    },
                    {
                        // 按钮的名字
                        name: '我的主页',

                        // 显示的 icon
                        icon: 'icon-my-home',

                        // 路由
                        route: '/'
                    }
                ]
            }
        },
        methods: {
            /**
             * 处理其他综合按钮的点击行为，跳转到新页面
             *
             * @param {Object} route route
             */
            handleNavClick (route) {
                if (route) {
                    this.$router.replace (route);
                }
            }

        }
    }
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .overall_search_wrapper {
        position: fixed;
        top: 200px;
        padding: 0 20px;
        width: 100%;
        height: 270px;
        transition :all .2s;
        .overall_search {
            display: flex;
            flex-direction: column;
            padding: 0 60px;
            box-shadow: 0 4px 10px rgb(153, 153, 153);
            width: 100%;
            height: 100%;
            background: $bgOverallSearch;
        }
    }

    /*搜索框*/
    .search_warpper {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 168px;
        color: $colorOverallSearch;
        .search_input {
            flex: 1;
            height: 100%;
            border-bottom: 2px solid rgba(149, 149, 149, .5);
        }
        .search_input::-webkit-input-placeholder {
            color: $colorOverallSearch;
        }
        .icon-search {
            position: absolute;
            right: 60px;
            font-size: 50px;
        }
    }

    /*其他综合*/
    .other_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        .other_item {
            flex-basis: 25%
            .item_icon {
                padding: 20px;
                border-radius: 50%;
                font-size: 40px;
                color: $colorOtherItemIcon;
                background: $bgOtherItemIcon;
            }
            .item_name {
                position: relative;
                top: 20px;
                font-size : 28px;
                font-weight: 600;
            }
            p {
                margin-bottom: 0;
            }
        }
    }
</style>
