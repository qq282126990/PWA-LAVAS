<template>
    <div id="app">
        <v-app>
            <app-header
                class="app-shell-header">
            </app-header>
            <transition
                :name="pageTransitionEffect"
                @before-enter="handleBeforeEnter"
                @after-enter="handleAfterEnter"
                @before-leave="handleBeforeLeave">
                <keep-alive
                    :include="[...keepAlivePages]">
                    <router-view
                        :key="routerViewKey"
                        :class="['app-view', pageTransitionClass]"
                        :data-page-id="$route.fullPath">
                    </router-view>
                </keep-alive>
            </transition>
            <update-toast></update-toast>
        </v-app>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapState, mapActions} from 'vuex';
    import UpdateToast from 'commonComponents/UpdateToast';
    import AppHeader from 'commonComponents/AppHeader';
    import {keepAlivePages} from '@/.lavas/router';

    const ENABLE_SCROLL_CLASS = 'app-view-scroll-enabled';

    export default {
        name: 'app',
        components: {
            UpdateToast,
            AppHeader
        },
        computed: {
            ...mapState('pageTransition', {
                pageTransitionType: state => state.type,
                pageTransitionEffect: state => state.effect
            }),

            ...mapState('scrollBehavior', {
                scrollPostionMap: state => state.scrollPostionMap
            }),

            pageTransitionClass() {
                return `transition-${this.pageTransitionType}`;
            },

            // https://github.com/lavas-project/lavas/issues/119
            routerViewKey() {
                let {name, params} = this.$route;
                let paramKeys = Object.keys(params);
                if (paramKeys.length) {
                    return name + paramKeys.reduce((prev, cur) => prev + params[cur], '');
                }
                return null;
            }
        },
        data() {
            return {
                // https://github.com/lavas-project/lavas/issues/112
                keepAlivePages
            };
        },
        methods: {
            ...mapActions('scrollBehavior', [
                'savePageScrollPosition'
            ]),

            /**
             * make current page container scrollable,
             * and restore its scroll position.
             */
            restoreContainerScrollPosition(containerEl, scrollTop) {
                containerEl.classList.add(ENABLE_SCROLL_CLASS);
                containerEl.scrollTop = scrollTop;
            },

            /**
             * make body scrollable,
             * and restore its scroll position.
             */
            restoreBodyScrollPosition(containerEl, scrollTop) {
                containerEl.classList.remove(ENABLE_SCROLL_CLASS);
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
            },

            handleBeforeEnter(el) {
                let pageId = el.dataset.pageId;
                let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {};
                Vue.nextTick(() => {
                    this.restoreContainerScrollPosition(el, scrollTop);
                });
            },

            handleAfterEnter(el) {
                let pageId = el.dataset.pageId;
                let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {};
                this.restoreBodyScrollPosition(el, scrollTop);
            },

            handleBeforeLeave(el) {
                let pageId = el.dataset.pageId;
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                this.restoreContainerScrollPosition(el, scrollTop);
                // save current scroll position in a map
                this.savePageScrollPosition({
                    pageId,
                    scrollPosition: {y: scrollTop}
                });
            }
        }
    };
</script>

<style lang="scss">
    @import '../assets/sass/variable';

    $page-transition-duration : 0.35 s;

    #app {
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #000;
        min-width: 850px;
        height: 100%;

        .application--wrap {
            /*height 100%*/
            /*min-height 100%*/
        }
        .app-shell-header {
            position: fixed;
            right: 0;
            left: 0;
            z-index: 140;
            min-width: 850px;
        }
        .app-view {
            position: relative;
            top: 0;
            right: 0;
            left: 0;
            -webkit-overflow-scrolling :touch;
            background: #fff;
            box-sizing: content-box;
            &::-webkit-scrollbar {
                width: 0;
                background: transparent;
            }
            /*&.transition-slide
                transition transform $page-transition-duration cubic-bezier(0, 0, 0.2, 1)

                &.slide-left-enter
                    transform translate(100%, 0)

                &.slide-left-enter-active
                    box-shadow 0 0 16px 2px rgba(0, 0, 0, 0.3)

                &.slide-right-enter
                    transform translate(-30%, 0)
                    transition-timing-function linear

                &.slide-right-leave-active
                    transform translate(100%, 0)
                    box-shadow 0 0 16px 2px rgba(0, 0, 0, 0.3)
                    z-index 99

                &.slide-left-leave-active
                    transform translate(-30%, 0)
                    transition-timing-function linear

                &.app-view-scroll-enabled,
                &.slide-left-enter-active,
                &.slide-left-leave-active,
                &.slide-right-enter-active,
                &.slide-right-leave-active
                    overflow-y auto

            */
            &.transition-fade {
                opacity: 1;
                transition: opacity 1s ease;

                &.fade-enter {
                    opacity: 0;
                }
                &.fade-leave-active {
                    opacity: 0;
                }
            }
        }
        .alert__icon {
            margin: 0;
        }
    }

    html {
        overflow-y: scroll;
    }
</style>
