<template>
    <transition
        name="slide-down">
        <header class="header_wrapper" :class="{'markdown_header': status.name === 'markdown'}" v-show="show">
            <div class="header_middle" v-cloak>
                <!--logo-->
                <img class="header_middle_img" :src="imgSrc" @click="goHome"/>
                <!--icon-->
                <v-icon class="header_middle_icon" v-show="!status.name">dehaze</v-icon>
                <!--txt-->
                <p class="header_middle_title" v-show="status.name === 'markdown'">{{status.title}}</p>
                <!--文本-->
                <div class="header_middle_txt" v-show="!status.name">
                    <p class="txt" @click="login">登录</p>
                    <p class="txt">注册</p>
                </div>
                <!--按钮-->
                <v-btn class="header_middle_btn"
                       outline
                       color="primary"
                       :disabled="true"
                       style="background-color: transparent !important;"
                       v-show="status.name === 'markdown'"
                       @click="_sendInput()">
                    发布文章
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-btn>
            </div>
        </header>
    </transition>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import EventBus from '@/core/event-bus';
    export default {
        name: 'appHeader',
        mounted () {
            if (!this.status) {
                // 监听浏览器滚动
                window.addEventListener('scroll', this.scroll);
            }
        },
        destroyed () {
            if (!this.status) {
                // 销毁监听滚动
                window.removeEventListener('scroll', this.scroll);
            }
        },
        computed: {
            ...mapState('appShell/appHeader', [
                'show',
                'status',
                'title',
                'imgSrc'
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
            },
            /*
             * 滚动方法
             * */
            scroll () {
                let scrollTop;
                let documentElement = document.documentElement
                // 获取滚动条
                if (documentElement && documentElement.scrollTop) {
                    scrollTop = documentElement.scrollTop;
                }
                else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                if (scrollTop > 52) {
                    this.setAppHeader({show: false});
                }
                else {
                    this.setAppHeader({show: true});
                }
            },
            /*
             * 登录跳转
             * */
            login () {
                this.$router.push({
                    path: '/p/login'
                })
            },
            /*
             * 回到主页
             * */
            goHome() {
                this.$router.replace({
                    path: '/'
                })
            },
            ...mapActions('appShell/appHeader', {
                setAppHeader: 'setAppHeader'
            })
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
        box-shadow: 0 2px 4px -1px rgba(153, 153, 153, .2), 0 4px 5px rgba(153, 153, 153, .14), 0 1px 10px rgba(153, 153, 153, .12);
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
        /*图标*/
        .header_middle_icon {
            margin: 0 auto;
            cursor: n-resize;
            color: $header-wrapper-cl
        }
        /*标题*/
        .header_middle_title {
            margin: 0;
            padding: 0 4%;
            width: 100%
            text-align: left;
            color: $header-wrapper-cl
        }
        /*图片*/
        .header_middle_img {
            width: 30px;
            height: 30px;
            cursor: pointer;
            &:hover {
                animation: Img 2s infinite;
            }
        }
        /*文字*/
        .header_middle_txt {
            position: relative;
            display: flex;
            text-align: right;

            .txt {
                position: relative;
                margin: 0 20px 0 0;
                font-size: 13px;
                width: 30px;
                text-align: center;
                cursor: pointer;
                &:hover::after {
                    width: 30px;
                }
                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -5px;
                    width: 0;
                    transition: all .3s;
                    border-bottom: 2px solid $header-middle-txt;
                }
            }
            &::after {
                content: '';
                position: absolute;
                top: 3px;
                right: 0;
                width: 4px;
                height: 14px;
                border-radius: 20px;
                background: $header-middle-txt;
            }
        }
        /*按钮*/
        .header_middle_btn {
            position: relative;
            display: flex;
            align-items: center;
            text-align: right;
            margin: 0;
            border-radius: 5px;
            height: 30px;
            line-height: 0;
        }
    }

        .markdown_header{
            box-shadow: none;
            border-bottom: 1px solid #ddd;
        }

    @keyframes Img {
        from {
            opacity: 1;
            transform: scale(1, 1);
        }
        to {
            transform: scale(1.5, 1.5);
            opacity: 0;
        }
    }

</style>
