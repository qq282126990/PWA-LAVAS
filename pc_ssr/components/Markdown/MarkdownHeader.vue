<template>
    <div class="markdown-header">
        <!--展开按钮-->
        <v-btn fab
               dark
               small
               color="primary"
               class="show-btn"
               :class="{'show-btn-active': show}"
               @click="showHeaderBtn">
            <v-icon dark>keyboard_arrow_left</v-icon>
        </v-btn>
        <!--按钮-->
        <transition name="markdown-header-btn">
            <div class="markdown-header-btn"
                 v-show="show"
            >
                <div class="btn-group-scroll">
                    <div class="btn-group"
                         v-for="(item,index) in headerBtnGroup"
                         :key="index"
                    >
                        <v-btn large
                               class="white"
                               v-for="icon in item"
                               :key="icon.name"
                               @click="clickBtnGroup(icon.name)"
                        >
                            <v-icon>{{icon.name}}</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                /*
                 * 是否显示头部按钮
                 *
                 * @type {Boolean}
                 * */
                show: false,
                /*
                 * 头部按钮组
                 *
                 * @type {Array}
                 * */
                headerBtnGroup: [
                    [
                        {name: 'format_bold'},
                        {name: 'format_italic'},
                        {name: 'title'},
                        {name: 'strikethrough_s'}
                    ],
                    [
                        {name: 'format_list_bulleted'},
                        {name: 'format_list_numbered'},
                        {name: 'border_all'},
                    ],
                    [
                        {name: 'insert_link'},
                        {name: 'insert_photo'},
                    ],
                    [
                        {name: 'code'},
                        {name: 'format_quote'},
                    ],
                    [
                        {name: 'visibility_off'},
                    ]
                ]
            }
        },
        methods: {
            // 显示头部按钮
            showHeaderBtn () {
                this.show = !this.show
            },
            // 点击按钮
            clickBtnGroup (name) {
                this.$emit('clickBtnGroup', name)
            }
        }
    }
</script>

<style  lang="scss">
    @import '../../assets/sass/variable';


    .markdown-header-btn-enter-active, .markdown-header-btn-leave-active {
        transition: all .5s;
    }

    .markdown-header-btn-enter, .markdown-header-btn-leave-to {
        transform: translate3d(50%, 0, 0);
        opacity: 0;
    }

    /*头部*/
    .markdown-header {
        position: fixed;
        top: 65px;
        right: 0;
        bottom: 65px;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        width: 54px;
        z-index: 200;
        /*显示按钮组按钮*/
        .show-btn {
            float: right;
            margin: 5px;
            min-height: 40px;
            transition: all .3s;
        }
        .btn__content {
            padding: 0;
            margin-bottom: 5px !important;
        }
        /*显示按钮组按钮激活*/
        .show-btn-active {
            transform: rotate(-90deg);
        }
    }

    /*按钮组*/
    .markdown-header-btn {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        padding: 5px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: $markdown-header-bg;
        width: 100%;
        .btn-group-scroll{
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .btn-group {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-bottom: 10px;
            border-radius: 2.5px;
            border: 1px solid #ccc;
            height: 100%;
            &:last-child {
                margin: 0;
            }
            .btn__content {
                margin: 0;
            }
            .white {
                height: 40px;
                min-height: 40px;
            }
        }
        .btn {
            margin: 0;
            min-width: 40px;
            width: 40px;
            height: 100%;
        }

    }
</style>
