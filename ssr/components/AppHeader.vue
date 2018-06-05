<template>
    <transition
        name="slide-down">
        <header class="app-header-wrapper" v-show="show">
            <div class="app-header-left">
                <!--下选-->
                <div class="down_select" v-if="showDownArrow">
                    <p class="down_text">社区</p>
                    <i class="iconfont icon-down-arrow"></i>
                </div>
                <!--菜单-->
                <v-btn
                    icon
                    v-if="showMenu"
                    @click.native="handleClick('menu')">
                    <v-icon color="white" class="app-header-icon">menu</v-icon>
                </v-btn>
                <!--返回-->
                <v-btn
                    icon
                    v-if="showBack"
                    @click.native="handleClick('back')">
                    <v-icon color="white" class="app-header-icon">arrow_back</v-icon>
                </v-btn>
                <div v-if="showLogo" @click="handleClick('logo')">
                    <slot name="logo">
                        <img v-if="logoIcon.src" :src="logoIcon.src" :alt="logoIcon.alt" class="app-header-icon" />
                    </slot>
                </div>
            </div>
            <div class="app-header-middle" v-cloak>
                <slot name="title">
                    <!--{{ title }}-->
                </slot>
            </div>
            <div class="app-header-right">
                <slot name="actions"
                      v-for="(action, actionIdx) in actions"
                      :icon="action.icon"
                      :route="action.route">
                    <v-btn
                        icon="icon"
                        @click.native="handleClick('action', {actionIdx, route: action.route})">
                        <i color="white" v-if="action.icon" class="iconfont app-header-icon-right"
                           :class="action.icon"></i>
                    </v-btn>
                </slot>
            </div>
        </header>
    </transition>
</template>

<script>
    import {mapState} from 'vuex';
    import EventBus from '@/core/event-bus';

    export default {
        name: 'appHeader',
        computed: {
            ...mapState ('appShell/appHeader', [
                'show',
                'showDownArrow',
                'showMenu',
                'showBack',
                'showLogo',
                'logoIcon',
                'title',
                'actions'
            ]),
            ...mapState ('appShell/common', [
                'isPageSwitching'
            ])
        },
        methods: {
            /**
             * 处理按钮点击事件
             *
             * @param {string} source 点击事件源名称 menu/logo/action
             * @param {Object} data 随点击事件附带的数据对象
             */
            handleClick (source, {actionIdx, route} = {}) {

                // 页面正在切换中，不允许操作，防止滑动效果进行中切换
                if (this.isPageSwitching) {
                    return;
                }
                let eventData = {};

                // 点击右侧动作按钮，事件对象中附加序号
                if (source === 'action') {
                    eventData.actionIdx = actionIdx;
                }

                // 发送给父组件，内部处理
                this.$emit (`click-${source}`, eventData);

                // 发送全局事件，便于非父子关系的路由组件监听
                EventBus.$emit (`app-header:click-${source}`, eventData);

                // 如果传递了路由对象，进入路由
                if (route) {
                    this.$router.push (route);
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .app-header-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100vw;
        height: $app-header-height;
        background: url("../assets/img/AppHeader/app-header-bg.jpg") no-repeat;
        background-size: cover;
        background-position: 50%;
        color: $app-header-btn-color;
        padding: 0;
        // box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px rgba(0, 0, 0, .14), 0 1px 10px rgba(0, 0, 0, .12);
        transition: transform 0.3s ease-out;

        &.slide-down-enter,
        &.slide-down-leave-to {
            transform: translate(0, -100%);
        }

        & > div {
            display: flex;
            align-items: center;
        }

        .app-header-middle {
            flex: 1;
            font-size: 1.2em;
        }

        /*改变 icon 大小*/
        .app-header-icon {
            color: $app-header-btn-color;
            width: 40px;
            height: 50px;
        }

        /*改变右边icon大小*/
        .app-header-icon-right {
            color: $app-header-btn-color;
            font-size: 45px;
        }

        .btn--icon {
            height: 72px;
            width: 72px;
        }
        .btn {
            margin: 12px 16px;
        }

        .down_select{
            padding: 20px;
            .down_text{
                display: inline-block;
                margin-bottom: 0;
                font-size: 28px;
                color:$app-header-btn-color;
            }
            .icon-down-arrow{
                display: inline-block;
                font-size: 32px;
                color:$app-header-btn-color;
            }
        }

    }
</style>
