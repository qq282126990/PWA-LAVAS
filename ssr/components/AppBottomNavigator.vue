<template>
    <transition
        name="slide-up">
        <footer class="app-bottom-navigator-wrapper" v-show="show && navs.length">
            <slot name="navs">
                <v-bottom-nav
                    :value="show"
                    :active="activeNav"
                    absolute
                    class="transparent primary">
                    <v-btn
                        v-for="nav in navs"
                        :key="nav.name"
                        :value="nav.name"
                        @click.native="handleNavClick(nav.route, nav.name)"
                        flat color="pink">
                        <span class="btn-text">{{ nav.text }}</span>
                        <icon v-if="nav.svg" :name="nav.svg" class="app-header-icon"></icon>
                        <!--<v-icon v-else-if="nav.icon" class="app-header-icon">{{ nav.icon }}</v-icon>-->
                        <i v-else-if="nav.icon"
                           class="app-header-icon iconfont"
                           :class="activeNav === nav.name ? nav.active_icon : nav.icon"></i>
                    </v-btn>
                </v-bottom-nav>
            </slot>
        </footer>
    </transition>
</template>

<script>
    import {mapState} from 'vuex';
    import EventBus from '@/core/event-bus';

    export default {
        name: 'app-bottom-navigator',
        computed: {
            ...mapState ('appShell/appBottomNavigator', [
                'show',
                'navs'
            ]),
            activeNav () {
                return this.navs.find (nav => nav.active).name;
            }
        },
        methods: {

            /**
             * 处理底部导航栏的点击行为，跳转到新页面
             *
             * @param {Object} route route
             * @param {string} name 触发的底部导航栏的 name
             */
            handleNavClick (route, name) {
                let eventData = {name};

                // 发送给父组件，内部处理
                this.$emit ('click-nav', eventData);

                // 发送全局事件，便于非父子关系的路由组件监听
                EventBus.$emit ('app-bottom-navigator:click-nav', eventData);
                if (route) {
                    this.$router.replace (route);
                }
            }

        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .app-bottom-navigator-wrapper {
        height: $app-footer-height;
        transition: transform 0.3s ease-out;
        &.slide-up-enter,
        &.slide-up-leave-to {
            transform: translate(0, 100%);
        }
    }

    .primary {
        background: white !important;
        border-color: none !important;
    }

    /*底部高度*/
    .bottom-nav {
        height: $app-footer-height;
        .btn {
            max-width: 100%;
            min-width: auto;
            padding: 10px 0;
        }

    }

    /*icon*/
    .iconfont {
        font-size: 45px;
    }

    .btn-text {
        font-size: 28px;
    }
</style>
