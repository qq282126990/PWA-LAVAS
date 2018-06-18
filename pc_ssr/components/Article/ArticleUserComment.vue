<template>
    <div class="article_user_comment">
        <!--用户信息-->
        <div class="article_user_comment_content">
            <!--用户头像-->
            <img class="user_img"
                 src="https://cn.vuejs.org/images/logo.png"/>
            <!--用户名称-->
            <p class="user_name">zhangwang</p>
            <!--发布时间-->
            <p class="user_send_time">1小时前</p>
        </div>
        <!--用户评论-->
        <div class="article_user_comment_content">
            <p class="user_comment_content">写的很好</p>
        </div>
        <!--按钮-->
        <div class="article_user_comment_content">
            <!--用户评论点赞-->
            <p class="user" @click="clickUserLike">
                <v-icon class="user_like_icon"
                        :class="{'user_like_active': userLike,'user_like_over': userLikeOver}">
                    thumb_up_alt
                </v-icon>
                16
            </p>
            <!--回复-->
            <p class="user" @click="userReply">
                <v-icon class="user_reply_icon">
                    swap_horizontal_circle
                </v-icon>
                回复
            </p>
            <!--举报-->
            <p class="user">
                <v-icon class="user_report_icon">
                    assistant_photo
                </v-icon>
                举报
            </p>
        </div>
        <!--回复评论-->
        <div class="article_user_comment_content">
            <input-comment :status="'exit'"
                           :propsExit="propsExit"
                           @sendInput="_sendInputComment"
                           @exitInput="_exitInputComment"
                           ref="inputComment"
            ></input-comment>
        </div>
    </div>
</template>

<script>
    import InputComment from  'components/Input/InputComment';

    export default {
        data () {
            return {
                /*
                 * 点赞用户评论
                 * @type {Boolean}
                 * */
                userLike: false,
                userLikeOver: false,
                /*
                 * 评论输入框初始显示状态
                 * @type {Boolean}
                 * */
                propsExit: true,
                userReplySwitch: false
            }
        },
        methods: {
            // 点赞用户评论
            clickUserLike () {
                this.userLike = true;
                setTimeout(() => {
                    this.userLike = false;
                }, 1000);

                this.userLikeOver = true
            },
            // 用户回复
            userReply() {
                // 显示输入框
                this.$refs.inputComment._show();
            },
            // 发送评论
            _sendInputComment (data) {
            },
            // 取消评论
            _exitInputComment () {
                // 隐藏输入框
                this.$refs.inputComment._hidden();
            }
        },
        components: {
            InputComment
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .article_user_comment {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            border-bottom: 1px solid rgba(0, 0, 0, 0);
        }
    }

    .article_user_comment_content {
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden
        /*用户头像*/
        .user_img {
            margin-right: 15px;
            width: 30px;
            height: 30px;
            border-radius: 50px;
            background: #d3d7d8;
        }
        /*用户名称*/
        .user_name {
            flex: 1
            margin: 0;
            text-align: left;
            font-size: 16px;
            font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        }
        /*发布时间*/
        .user_send_time {
            margin: 0;
            float: right;
            font-size: 14px;
            color: $user-send-time;
        }
        /*用户评论内容*/
        .user_comment_content {
            margin: 10px 0;
            font-size: 16px;
        }
        .user_like_active {
            animation: userLike .5s infinite alternate;
            color: $user-like-active;
        }
        /*已经点赞过了*/
        .user_like_over {
            color: $user-like-active;
        }
        /*用户点赞*/
        .user_like_icon {
            width: 14px;
            font-size: 14px;
        }
        /*用户回复*/
        .user_reply_icon {
            width: 24px;
            font-size: 24px;
        }
        /*举报*/
        .user_report_icon {
            width: 17px;
            font-size: 17px;
        }
        .user {
            overflow: hidden;
            user-select: none;
            cursor: pointer;
            color: $user-send-time;
            margin-right: 20px;
        }
        .input_comment {
            padding: 10px 0;
        }
        p {
            margin: 0;
        }
        /*用户评论*/
        .user_reply_comment {
            margin: 10px 0;
            width: 100%;
        }
    }

    @keyframes userLike {
        from {
            transform: rotate3d(0, 0, 1, 10deg) scale3d(1, 1, 1);
        }
        to {
            transform: rotate3d(0, 0, 1, -10deg) scale3d(1.3, 1.3, 1.3);
        }
    }

</style>
