<template>
    <div class="markdown">
        <!--markdowm快捷按钮-->
        <div class="markdown-header-wrapper" @click.stop.prevent>
            <!--展开按钮-->
            <v-btn fab
                   dark
                   small
                   color="primary"
                   class="show-btn"
                   :class="{'show-btn-active': showHeaderBtn}"
                   @click="_showHeaderBtn">
                <v-icon dark>keyboard_arrow_left</v-icon>
            </v-btn>
            <!--按钮-->
            <transition name="btn-group-wrapper">
                <div class="btn-group-wrapper"
                     v-show="showHeaderBtn"
                >
                    <div class="btn-group-scroll">
                        <div class="btn-group"
                             v-for="(item,index) in markdownHeaderBtnGroup"
                             :key="index"
                        >
                            <v-btn large
                                   class="white"
                                   v-for="icon in item"
                                   :key="icon.name">
                                <v-icon>{{icon.name}}</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!--内容-->
        <div class="markdown-content">
            <!--markdowm语法-->
            <div class="content-left">
                <!--文章标题图片-->
                <div class="article-img hover">
                    <input type="file" class="file-img" accept=".jpeg, .jpg, .png">
                    <v-icon class="article-img-icon">camera-alt</v-icon>
                </div>
                <!--markdown输入-->
                <div class="input-content"
                     contenteditable="plaintext-only"
                     spellcheck="false"
                     ref="inputMarkdown"
                     @input="_inputMarkdown($event)"
                >
                    <div data-contents="true" data-block="true">
                        <span><br data-text="true"></span>
                    </div>
                </div>
            </div>
            <!--渲染后-->
            <div class="content-right">
                <!--文章标题图片-->
                <div class="article-img">
                </div>
                <!--渲染markdown语法-->
                <div class="rendering-content" v-html="compiledMarkdown"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-light.css';

    let state = {
        appHeaderState: {
            show: true,
            status: {
                name: 'markdown',
                title: 'LAVAS社区Markdown编辑器'
            }
        }
    };

    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
    }

    export default {
        async asyncData ({store, route}) {
            setState(store);
        },
        metaInfo: {
            title: 'markdown编辑器',
            titleTemplate: '',
            meta: [
                {name: 'keywords', content: 'lavas PWA'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        data () {
            return {
                /*
                 * 编译markdown
                 *
                 * @tyep {String}
                 * */
                compiledMarkdown: '',
                /*
                 * 头部按钮组
                 *
                 * @type {Array}
                 * */
                markdownHeaderBtnGroup: [
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
                ],
                /*
                 * 是否显示头部按钮
                 *
                 * @type {Boolean}
                 * */
                showHeaderBtn: false
            }
        },
        mounted () {
            // 初始化数据
            this._initData();
        },
        methods: {
            // 初始化数据
            _initData() {
                marked.setOptions({
                    highlight (code) {
                        return hljs ? hljs.highlightAuto(code).value : code;
                    },
                    pedantic: false,
                    gfm: true,
                    tables: true,
                    breaks: true,
                    sanitize: false,
                    smartLists: true,
                    smartypants: false,
                    xhtml: false
                });
            },
            // 输入markdown语法
            _inputMarkdown (event) {

                this.compiledMarkdown = marked(event.target.innerText);
            },
            // 显示头部按钮
            _showHeaderBtn () {
                this.showHeaderBtn = !this.showHeaderBtn
            }
        }
    };
</script>

<style lang="scss">
    @import '../assets/sass/variable';

    .btn-group-wrapper-enter-active, .btn-group-wrapper-leave-active {
        transition: all .5s;
    }

    .btn-group-wrapper-enter, .btn-group-wrapper-leave-to {
        transform: translate3d(50%, 0, 0);
        opacity: 0;
    }

    html {
        overflow-y: hidden;
    }

    .markdown {
        padding: 52px 0 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-height: 100vh;
        background: $article-wrapper;
    }

    /*头部*/
    .markdown-header-wrapper {
        position: fixed;
        top: 65px;
        right: 0;
        bottom: 65px;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        width: 54px;
        z-index: 200;
        .btn__content {
            padding: 0;
            margin-bottom: 5px;
        }
        /*显示按钮组按钮*/
        .show-btn {
            float: right;
            margin: 5px;
            min-height: 40px;
            transition: all .3s;
        }
        /*显示按钮组按钮激活*/
        .show-btn-active {
            transform: rotate(-90deg);
        }
        /*按钮组*/
        .btn-group-wrapper {
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
    }

    /*内容*/
    .markdown-content {
        display: flex;
        width: 100%;
        height: 100vh;
        background: #fff;
        .content-left, .content-right {
            flex: 1;
            border-left: .5px solid #ddd;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                width: 6px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                outline: none;
                background-color: #ccc;
            }
        }
        .content-right {
            background: #fff;
        }
        .input-content {
            padding: 20px 30px;
            outline: none;
            text-align: left;
            min-height: 100%;
            -webkit-user-modify: read-write-plaintext-only;
            background: $article-wrapper;
        }
        .rendering-content {
            padding: 20px 30px;
            outline: none;
            text-align: left;
            min-height: 100%;
        }
        p {
            margin: 16px 0;
            font-size: 16px;
            line-height: 28px;
            display: block;
        }
        ul, ol {
            padding-left: 16px;
        }
        h4 {
            font-size: 16px;
        }
        blockquote {
            margin: 16px 0;
            border-left: 4px solid #ddd;
            font-size: 0px;
            padding: 0 16px;
            color: #666;
        }
        code {
            font-family: Menlo, Monaco, Consolas, Courier New, monospace;
            font-size: 12px;
            padding: 3px 5px;
            color: #000;
            background-color: #f8f8f8;
            border-radius: 2px;
            box-shadow: none;
        }
        table {
            font-size: 12px;
            max-width: 100%;
            overflow: auto;
            border: 1px solid #f6f6f6;
            border-collapse: collapse;
            border-spacing: 0;
        }
        thead {
            background: #f6f6f6;
            color: #000;
            text-align: left;
        }
        th {
            padding: 10px 6px;
            line-height: 20px;
        }
        td {
            min-width: 100px;
            padding: 10px 6px;
            line-height: 20px;
        }
    }

    /*文章标题图片*/
    .article-img {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 240px;
        user-select: none;
        background: #f7f8f9;
        .file-img {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
        }
        .article-img-icon {
            font-size: 30px;
            display: flex;
            color: #999
        }
    }

    .hover::after {
        content: "文章标题图片";
        color: #b3b3b3;
        position: absolute;
        top: 0;
        bottom: 0;
        margin-top: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        text-align: center;
    }
</style>
