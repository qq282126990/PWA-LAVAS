<template>
    <transition
        name="slide-down">
        <header class="header_wrapper" v-show="show">
            <div class="header_middle" v-cloak>
                <!--logo-->
                <img class="header_middle_img" src="../assets/img/header-logo.png"/>
                <!--icon-->
                <v-icon class="header_middle_icon">dehaze</v-icon>
                <!--文本-->
                <div class="header_middle_txt">
                    <p class="txt">登录</p>
                    <p class="txt">注册</p>
                </div>
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
            ...mapState('appShell/appHeader', [
                'show'
            ]),
            ...mapState('appShell/common', [
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
            handleClick(source, {actionIdx, route} = {}) {

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
                this.$emit(`click-${source}`, eventData);

                // 发送全局事件，便于非父子关系的路由组件监听
                EventBus.$emit(`app-header:click-${source}`, eventData);

                // 如果传递了路由对象，进入路由
                if (route) {
                    this.$router.push(route);
                }
            }
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .header_wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 52px;
        background: $header-wrapper-bg;
        color: $header-wrapper-cl;
        padding: 0;
        user-select: none;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px rgba(0, 0, 0, .14), 0 1px 10px rgba(0, 0, 0, .12);
        transition: transform 0.3s ease-out;
        &.slide-down-enter,
        &.slide-down-leave-to {
            transform: translate(0, -100%);
        }
        & > div {
            display: flex;
            align-items: center;
        }
        .header_middle {
            padding: 0 10%;
            flex: 1;
            font-size: 1.2em;
        }
        .header_middle_icon {
            margin: 0 auto;
            cursor: n-resize;
            color: $header-wrapper-cl
        }
        .header_middle_img {
            width: 35px;
            height: 35px;
        }
        .header_middle_txt {
            position: relative;
            display: flex;
            text-align: right;
            .txt {
                padding-right: 20px;
                margin: 0;
                font-size: 16px;
            }
            &::after {
                content: '';
                position: absolute;
                top: 5px;
                right:0;
                width:4px;
                height: 14px;
                border-radius: 20px;
                background: #000;
            }
        }
    }
</style>
