<template>
    <div class="markdown">
        <!--markdowm快捷按钮-->
        <markdown-header @clickBtnGroup="clickBtnGroup"></markdown-header>
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

    import {markdownFastBtn} from 'common/markdownFastBtn';
    import MarkdownHeader from 'components/Markdown/MarkdownHeader';

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
                compiledMarkdown: ''
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
            // markdown快捷按钮点击
            clickBtnGroup (name) {
                console.log(name)
            }
        },
        components: {
            MarkdownHeader
        }
    };
</script>

<style lang="scss">
    @import '../assets/sass/variable';


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
