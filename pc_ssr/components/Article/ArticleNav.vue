<template>
    <div class="article_nav">
        <div class="article_nav_txt" v-for="(item, index) in articleNav" :key="index">
            <v-btn class="article_nav_txt_title" flat small
                   :class="{'active': activeArticle=== index}"
                   @click="selectArticle(index,item)"
            >
                {{item}}
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                /*
                 * 激活的文章导航按钮
                 * @type {Number}
                 * */
                activeArticle: 0,
                /*
                 * 文章导航按钮
                 * @type {Array}
                 * */
                articleNav: ['所有文章', '精选文章']
            }
        },
        methods: {
            // 文章内容导航选择
            selectArticle (index,item) {
                this.activeArticle = index;

                this.$emit('selectArticle', item)
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .article_nav {
        margin-top: 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 50px;
        background: #fff
    }

    .article_nav_txt {
        padding-right: 15px;
        user-select: none;
        .article_nav_txt_title {
            margin: 0;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
        }
        .active {
            color: #fff;
            background: #3472E2 !important;
        }
        .btn--small {
            height: auto;
        }
    }
</style>
