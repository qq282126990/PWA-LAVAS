<template>
    <div class="footer_wrapper" v-show="show">
        <!--源码地址-->
        <a class="code_url" target="_blank">源码地址</a>
        <div class="footer_text">
            <p class="footer_text_title">加入我们</p>
            <img class="footer_text_img"
                 src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1aa9f99b2b3fb80e18dc698557b8444b/34fae6cd7b899e5114f3cfbe48a7d933c8950d1e.jpg"/>
            <!--hover内容-->
            <div class="footer_text_txt">加入我们让我们的团队更加强大！</div>
        </div>
        <div class="footer_text">
            <!--标题-->
            <p class="footer_text_title">赞助我们</p>
            <!--图片-->
            <img class="footer_text_img"
                 src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=37a542f55ada81cb5aeb8b9f330fbb73/d6ca7bcb0a46f21f24c2f452fd246b600c33ae39.jpg"/>
            <!--hover内容-->
            <div class="footer_text_txt">所有赞助我们都将用于该网站的运营，您的支持是我们继续的动力！</div>
        </div>
        <p class="bottom_txt">声明：内容均来自于网络，如有侵权行为请发送邮件至282126990@qq.com,我们将在第一时间删除</p>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'appFooter',
        computed: {
            ...mapState('appShell/appFooter', [
                'show'
            ])
        },
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .footer_wrapper {
        position: relative;
        display: flex;
        text-align: left;
        padding: 30px 10% 50px 10%;
        width: 100%;
        min-height: 150px;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 1), 0 4px 6px rgba(0, 0, 0, .8), 0 1px 11px rgba(0, 0, 0, .8);
        color: $footer-wrapper-color;
        background: $footer-wrapper-bg;
        z-index: 10;
    }

    .footer_text {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 120px;
        margin-right: 50px;
        p {
            margin: 0;
        }
        /*标题*/
        .footer_text_title {
            padding-left: 20px;
            border-left: 3px solid #fff;
        }
        /*hover内容*/
        .footer_text_txt {
            position: absolute;
            top: -65px;
            left: -24px;
            font-size: 14px;
            padding: 5px 8px;
            border-radius: 2px;
            color: #fff;
            background: #616161;
            width: auto;
            min-height: 100px;
            transition: .15s cubic-bezier(.25, .8, .5, 1);
            opacity: 0;
            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
            &::after {
                content: "";
                position: absolute;
                bottom: -10px;
                left: 40%;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid #616161;
            }
        }
        /*图片*/
        .footer_text_img {
            margin-top: 30px;
            border-radius: 10px;
            overflow: hidden;
            width: 100px;
            height: 100px;
        }
        .footer_text_img:hover + .footer_text_txt {
            opacity: 1;
            transition: all .5s;
        }
    }

    .code_url {
        display: table;
        border-left: 3px solid #fff;
        padding: 0 50px 0 20px;
        color: $footer-wrapper-color;
    }

    .bottom_txt {
        position: absolute;
        bottom: 0;
        padding: 5px 0;
        margin: 0;
        text-align: center;
        width: 80%;
        border-top: 1px dashed $footer-bottom-txt;
        color: $footer-bottom-txt;
    }
</style>
