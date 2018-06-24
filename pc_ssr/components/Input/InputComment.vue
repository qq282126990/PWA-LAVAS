<template>
    <transition name="input-comment">
        <div class="input_comment" v-show="!exit">
            <div class="input_comment_content">
                <!--输入框-->
                <div class="input"
                     contenteditable="plaintext-only"
                     spellcheck="false"
                     ref="inputComment"
                     :class="{'blur': blur}"
                     @focus="_focus()"
                     @blur="_blur()"
                     @input="_input($event)"
                >
                    <div data-contents="true" data-block="true">
                        <span><br data-text="true"></span>
                    </div>
                </div>
                <!--placeholder-->
                <span class="input_placeholder"
                      v-show="inputData.length === 0 || inputData.length === 1"
                      @click="_clickPlaceholder">请输入评论</span>
            </div>
            <!--取消-->
            <v-btn class="input_exit"
                   depressed
                   col  or="primary"
                   v-show="status === 'exit'"
                   @click="_exitInput()"
            >取消
            </v-btn>
            <!--发送-->
            <v-btn  depressed color="primary"
                   :disabled="(inputData.length === 0 || inputData.length === 1)"
                   @click="_sendInput()">发送评论
            </v-btn>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            status: {
                type: String,
                default: ''
            },
            propsExit: {
                type: Boolean,
                default: null
            }
        },
        data () {
            return {
                /*
                 * 失去焦点
                 * @type {Boolean}
                 * */
                blur: true,
                /*
                 * 输入
                 * @type {String}
                 * */
                inputData: '',
                /*
                 * 取消
                 * @type {Boolean}
                 * */
                exit: true
            }
        },
        mounted () {
            // 初始化显示状态
            this.exit = this.propsExit;
        },
        methods: {
            // 获取焦点
            _focus () {
                this.blur = false;
            },
            // 失去焦点
            _blur () {
                this.blur = true;
            },
            // 输入
            _input (event) {
                this.inputData = event.target.innerText;
            },
            // 点击 placeholder
            _clickPlaceholder () {
                this.$refs.inputComment.focus();
            },
            // 发送评论
            _sendInput () {
                this.$emit('sendInput', this.$refs.inputComment.innerText);
            },
            // 取消评论
            _exitInput() {
                this.$refs.inputComment.innerText = '';
                this.inputData = ''
                this.$emit('exitInput');
            },
            // 隐藏
            _hidden () {
                this.exit = true;
            },
            // 显示
            _show (){
                this.exit = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/variable';

    .input-comment-enter-active, .input-comment-leave-active {
        transition: all .5s;
    }

    .input-comment-enter, .input-comment-leave-to {
        transform: translate3d(0, -100%, 0);
    }

    .input_comment {
        padding: 20px;
        display: flex;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        .btn {
            margin: 2.5px 0 2.5px 15px;
            border-radius: 5px;
            height: 30px;
        }
        /*取消*/
        .input_exit {
            min-width: 60px;
            color: rgba(0, 0, 0, .26) !important;
            background-color: rgba(0, 0, 0, .12) !important;
        }
    }

    .input_comment_content {
        position: relative;
        flex: 1;
        overflow: hidden;
        .input {
            display: flex;
            align-items: flex-start;
            padding: 5px 10px;
            text-align: left;
            overflow-y: scroll;
            width: 100%;
            height: auto;
            min-height: 35px;
            max-height: 500px;
            border: 1px solid #8590a6;
            border-radius: 5px;
            word-break: break-word;
            outline: none;
            color: #000;
            -webkit-user-modify: read-write-plaintext-only;
            transition: all .8s;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        /*失去焦点*/
        .blur {
            display: flex;
            align-items: flex-start;
            text-overflow: ellipsis;
            overflow: hidden;
            max-height: 35px;
            border: 1px solid #fff;
            color: $article-comment-input-blur-cl;
            background: $article-comment-input-blur-bg;
        }
        /*placeholder*/
        .input_placeholder {
            position: absolute;
            top: 0;
            left: 10px;
            padding: 5px 0;
            display: flex;
            align-items: center;
            height: 100%;
            z-index: 0;
            color: rgba(0, 0, 0, .26);
        }
    }
</style>
