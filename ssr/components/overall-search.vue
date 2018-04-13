<template>
    <div class="overall_search_wrapper">
        <div class="overall_search">
            <!--搜索框-->
            <div class="search_warpper">
                <input type="text" placeholder="搜索内容、用户" class="search_input"/>
            </div>
            <!--其他综合-->
            <div class="other_wrapper">

            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .overall_search_wrapper {
        position: fixed;
        top: 200px;
        padding: 0 20px;
        width: 100%;
        height: 270px;
        .overall_search {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background: $overall-search-warpper;
        }
    }

    /*搜索框*/
    .search_warpper {
        padding: 0 80px;
        width: 100%
        height: 96px;
        .search_input {
            width: 100%;
            height: 100%;
            border-bottom: 2px solid rgba(149,149,149,.5);
        }
        .search_input::-webkit-input-placeholder {
            color: #999999;
        }
    }

    /*其他综合*/
    .other_wrapper {
        width: 100%;
        height: 100%
    }
</style>
