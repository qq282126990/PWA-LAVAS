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
            <div class="search_input_wrapper">
                <input class="search_input" type="search"
                       autocomplete="off"
                       spellcheck="false"
                       placeholder="请输入搜索词"
                       autocapitalize="off"/>
                <!--图标-->
                <v-icon class="search_icon">search</v-icon>
            </div>
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

<style lang="scss" scoped>
    @import '../assets/sass/variable';

    .search_wrapper {
        position: relative;
        width: 100%;
        min-height: 45px;
        display: flex;
        padding: 10px;
        font-size: 13px;
        border-radius: 5px;
        background: $search-wrapper;
        /*搜索热门*/
        .search_hot {
            flex: 1;
            display: flex;
            align-items: center;
            color: $search-hot;
        }
        /*标题*/
        .search_hot_title {
            flex: 0 0 70px;
            margin: 0;
            display: inline-table;
        }
        /*内容*/
        .search_hot_content {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            padding-left: 10px;
            list-style: none;
            color: $search-hot-content;
        }
        .search_hot_content__li {
            padding: 0 10px;
        }
        /*搜索输入框*/
        .search_input_wrapper {
            flex: 1;
            position: relative;
            float: right;
        }
        .search_input {
            position: relative;
            padding: 0 20px 0 10px;
            max-width: 150px;
            width: 100%;
            font-size: 12px;
            border-radius: 20px;
            height: 30px;
            color: $search-input-color;
            background: $search-input-bg;
            outline: none;
            transition: all .5s;
            float: right;
            &:focus {
                max-width: 200px;
            }
        }
        /*搜索框图标*/
        .search_icon {
            position: absolute;
            right: 0;
            top: 0;
            padding: 3px 13px 3px 3px;
        }
    }
</style>
