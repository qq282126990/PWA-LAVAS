<template>
    <transition name="fade">
        <div class="app_right_menu" :class="menuClass" v-show="show">
            <!--回到最上-->
            <div class="app_right_menu_list" @click="scrollTop(400)">
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
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'appRightMenu',
        data () {
            return {
                /*
                 * 是否显示菜单
                 * @type {Boolean}
                 * */
                showMenu: false,
                /*
                 * 是否设置菜单样式
                 * @type {Boolean}
                 * */
                setMenuClass: false
            }
        },
        mounted () {
            this._initData()

            if (this.scroll) {
                // 监听浏览器滚动
                window.addEventListener('scroll', this._scroll);
            }
        },
        destroyed () {
            if (this.scroll) {
                // 销毁监听滚动
                window.removeEventListener('scroll', this._scroll);
            }
        },
        computed: {
            ...mapState('appShell/appRightMenu', [
                'show',
                'scroll',
                'menuClass'
            ])
        },
        methods: {
            _initData() {
                this.scrollTop(400);

                // 初始化样式
                this.setAppRightMenu({menuClass: ''});
            },
            _scroll () {
                let scrollTop;
                let documentElement = document.documentElement
                // 获取滚动条
                if (documentElement && documentElement.scrollTop) {
                    scrollTop = documentElement.scrollTop;
                }
                else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                // 是否滚动到底部
                if ((documentElement.scrollHeight - scrollTop) < documentElement.clientHeight + 150) {
                    this.setAppRightMenu({menuClass: 'app_right_menu_hidden'});
                }
                else {
                    this.setAppRightMenu({menuClass: ''});
                }
                if (scrollTop > 100) {
                    this.setAppRightMenu({show: true});
                }
                else {
                    this.setAppRightMenu({show: false, menuClass: ''});
                }
            },
            // 滚动到顶部
            scrollTop (scrollDuration) {
                let scrollStep = -window.scrollY / (scrollDuration / 15);

                let scrollInterval = setInterval(() => {
                    if (window.scrollY != 0) {
                        window.scrollBy(0, scrollStep);
                    }
                    else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            },
            ...mapActions('appShell/appRightMenu', {
                setAppRightMenu: 'setAppRightMenu'
            })
        },
        watch: {
            scroll (data) {
                this._initData();

                if (!data) {
                    // 销毁监听滚动
                    window.removeEventListener('scroll', this._scroll);
                }
                else {
                    // 监听浏览器滚动
                    window.addEventListener('scroll', this._scroll);
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
        align-items: flex-start;
        padding: 0 2.5%;
        width: 10%;
        transition: all .5s;
        z-index: 100;
    }

    .app_right_menu_hidden {
        bottom: 245px;
        z-index: 100;
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
