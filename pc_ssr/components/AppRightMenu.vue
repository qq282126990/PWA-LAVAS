<template>
    <transition name="fade">
        <div class="app_right_menu" v-show="showMenu">
            <!--回到最上-->
            <div class="app_right_menu_list">
                <v-icon class="app_right_menu_list__icon">publish</v-icon>
            </div>
            <!--帮助-->
            <div class="app_right_menu_list">
                <v-icon class="app_right_menu_list__icon">help</v-icon>
            </div>
            <!--写文章-->
            <div class="app_right_menu_list">
                <v-icon class="app_right_menu_list__icon">edit</v-icon>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                /*
                * 是否显示菜单
                * @type {Boolean}
                * */
                showMenu: false
            }
        },
        mounted () {
            // 监听浏览器滚动
            window.addEventListener ('scroll', this.scroll);

        },
        destroyed () {
            // 销毁监听滚动
            window.removeEventListener ('scroll', this.scroll);
        },
        methods: {
            scroll () {
                let scrollTop;

                // 获取滚动条
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                }
                else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }

                if (scrollTop > 100) {
                    this.showMenu = true;
                }
                else {
                    this.showMenu = false;
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .app_right_menu {
        position: fixed;
        right: 0;
        bottom: 15px;
        display: flex;
        flex-direction: column-reverse;
        align-items: flex-end;
        padding: 0 2.5%;
        width: 10%;
    }

    .app_right_menu_list {
        margin-top: 5px;
        max-width: 60px;
    }

    .app_right_menu_list__icon {
        padding: 13px 10px;
        border-radius: 5px;
        font-size: 30px;
        user-select: none;
        cursor: pointer;
        color: $app-right-menu-list-icon-color;
        background: $app-right-menu-list-icon-bg;
        &:hover {
            color: #fff;
            background: #dddddd;
        }
    }

    @media screen and (max-width: 800px) {
        .app_right_menu {
            display: none;
        }
    }
</style>
