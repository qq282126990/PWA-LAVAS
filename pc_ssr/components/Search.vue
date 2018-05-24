<template>
    <div class="search_wrapper">
        <!--搜索热门-->
        <div class="search_hot">
            <!--标题-->
            <p class="search_hot_title">热门搜索：</p>
            <!--内容-->
            <ul class="search_hot_content">
                <li class="search_hot_content__li"
                    v-for="(item, index) in searchHotContent"
                    :key="index"
                >{{item.text}}
                </li>
            </ul>
            <!--搜索框-->
            <input class="search_input" type="search" autocomplete="off" spellcheck="false" placeholder="请输入搜索词"
                   autocapitalize="off"/>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            /*
             * 热门搜索内容
             * @type {Array}
             * */
            searchHotContent: {
                type: Array,
                default: function () {
                    return [{text: '小米8'}, {text: '锤子TNT'}, {text: 'nine percent 抄袭'}]
                }
            }
        },
        data () {
            return {}
        }
    }
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .search_wrapper {
        position: relative;
        width: 100%;
        min-height: 45px;
        display: flex;
        padding: 10px;
        background: $searchWrapper;
        /*搜索热门*/
        .search_hot {
            flex: 1;
            display: flex;
            align-items: center;
            color: $searchHot;
        }
        /*标题*/
        .search_hot_title {
            flex: 1;
            margin: 0;
            display: inline-table;
        }
        /*内容*/
        .search_hot_content {
            display: flex;
            flex-wrap: wrap;
            padding-left: 10px;
            list-style: none;
            color: $searchHotContent;
        }
        .search_hot_content__li {
            padding: 0 10px;
        }
        /*搜索输入框*/
        .search_input {
            flex: 0 0 40%;
            width: 100%;
            border-radius: 20px;
            height: 30px;
            color: $searchInputColor;
            background: $searchInputBg;
            outline: none
        }
    }
</style>
