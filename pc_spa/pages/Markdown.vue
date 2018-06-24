<template>
    <div class="markdown">
        <!--内容-->
        <div class="markdown-content">
            <!--markdowm语法-->
            <!--<div class="content-left">-->
            <!--文章标题图片-->
            <div class="article-img">
                <input type="file" class="file-img" accept=".jpeg, .jpg, .png">
                <v-icon class="article-img-icon">camera_alt</v-icon>
            </div>
            <!--markdowm快捷按钮-->
            <markdown-header @clickBtnGroup="clickBtnGroup"></markdown-header>
            <!--输入文章标题-->
            <textarea placeholder="输入标题..."
                      spellcheck="false"
                      maxlength="80"
                      rows="1"
                      class="article-title"></textarea>

            <!--markdown输入-->
            <!--<textarea class="input-content"-->
            <!--ref="inputMarkdown"-->
            <!--v-model="markdownValue"-->
            <!--@input="_inputMarkdown(markdownValue)"-->
            <!--&gt;</textarea>-->
            <div class="article-input"
                 contenteditable="true"
                 spellcheck="false"
                 :data-placeholder="compiledMarkdown.length > 0 ? '' : '输入正文...'"
                 role="textbox"
                 @input="_inputMarkdown($event)"
                 ref="inputMarkdown"
            >
                <p><br></p>
            </div>

            <!--<div class="article-input"-->
            <!--contenteditable="plaintext-only"-->
            <!--spellcheck="false"-->
            <!--ref="inputMarkdown"-->
            <!--@input="_inputMarkdown($event)"-->
            <!--&gt;-->
            <!--<div data-contents="true" data-block="true">-->
            <!--<span><br data-text="true"></span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--渲染后-->
            <!--<div class="content-right">-->
            <!--&lt;!&ndash;文章标题图片&ndash;&gt;-->
            <!--<div class="article-img">-->
            <!--</div>-->
            <!--&lt;!&ndash;渲染markdown语法&ndash;&gt;-->
            <!--<div  id="aaaa" class="rendering-content" v-html="compiledMarkdown"></div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import marked from 'marked';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/atom-one-light.css';
    /*
     * addStrong 添加粗体
     * addItalic 添加斜体
     * addHeading 添加标题
     * */
    import {addStrong, addItalic, addHeading} from 'common/markdown';

    import MarkdownHeader from 'components/Markdown/MarkdownHeader';

    const WINDOW_SELECTION = window.getSelection();
    const DOM_SELECTION = document.selection;

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

                this.inputMarkdown = this.$refs.inputMarkdown

                // 输入框获取焦点
                this.inputMarkdown.focus();
            },
            // 输入markdown语法
            _inputMarkdown (event) {
                if (event.target) {
                    this.compiledMarkdown = marked(event.target.innerText);
                }
                else {
                    this.compiledMarkdown = marked(event);
                }
            },
            // markdown快捷按钮点击
            clickBtnGroup (name) {
                console.log(name)
                // 输入框内容
                let inputValue = this.inputMarkdown.innerText;
                let input = this.inputMarkdown;
                // 需要渲染的文本
                let replaceSelectText;
                // 判断文本框是否获取焦点
                let hasFocus = document.hasFocus() && document.activeElement === input;


                // 添加粗体
                if (name === 'format_bold') {
                    replaceSelectText = addStrong(inputValue, this.inputMarkdown);
                }
                else if (name === 'format_italic') {
                    replaceSelectText = addItalic(inputValue);
                }
                else if (name === 'title') {
                    replaceSelectText = addHeading(inputValue);
                }


                // 更新markdown输入框数据
                this.updateInputText(replaceSelectText);

                // 设置光标焦点到最后
                let range = document.createRange();
                let getSelection = window.getSelection();
                range.selectNodeContents(this.inputMarkdown);
                range.collapse(false);
                getSelection.removeAllRanges();
                getSelection.addRange(range);
            },
            // 更新markdown输入框数据
            updateInputText(text) {
                // 输出文本
                this.inputMarkdown.innerText = text;

                // 更新markdown编译
                this._inputMarkdown(text);
            },
            getSelectText() {
                // 用户选择的文本
                let userSelection;
                // 输出文本
                let text;

                //现代浏览器
                if (WINDOW_SELECTION) {
                    userSelection = WINDOW_SELECTION;
                }
                //IE浏览器 考虑到Opera，应该放在后面
                else if (DOM_SELECTION) {
                    userSelection = DOM_SELECTION.createRange();
                }

                if (!(text = userSelection.text)) {
                    text = userSelection;
                }

                // 选择的起点
                let start = text.anchorOffset;
                // 选择的终点
                let end = text.focusOffset;

                return {
                    start: start,
                    end: end,
                    length: end - start,
                    text: text.toString(),
                    anchorOffset: userSelection.anchorOffset,
                    focusOffset: userSelection.focusOffset
                }
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
        flex: 1;
        flex-direction: column;
        background: #fff;
        padding: 30px calc(50% - 27.834rem) 50vh;
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            outline: none;
            background-color: #ccc;
        }
        /*.content-left, .content-right {*/
        /*flex: 1;*/
        /*overflow-y: scroll;*/
        /*overflow-x: hidden;*/
        /*&::-webkit-scrollbar {*/
        /*width: 6px;*/
        /*}*/
        /*&::-webkit-scrollbar-thumb {*/
        /*border-radius: 10px;*/
        /*outline: none;*/
        /*background-color: #ccc;*/
        /*}*/
        /*}*/
        /*.content-left{*/
        /*padding: 30px calc(50% - 27.834rem) 50vh;*/
        /*}*/
        .content-right {
            background: #fff;
        }
        .article-input {
            position: relative;
            padding: 35px calc(50% - 27.834rem) 50vh;
            text-align: left;
            font-size: 16px;
            line-height: 1.6;
            -webkit-user-modify: read-write-plaintext-only;
            word-break: break-word;
            outline: none;
            &::before {
                content: attr(data-placeholder);
                position: absolute;
                float: left;
                color: #b3b3b1;
                cursor: text;
            }
            P:first-child {
                margin-top: 0;
            }
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
        &::after {
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
    }

    /*文章标题*/
    .article-title {
        margin-top: 30px;
        font-size: 32px;
        font-weight: 700;
        color: #000;
        outline: none;
        resize: none;
        overflow: hidden;
    }
</style>
