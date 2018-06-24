<template>
    <div class="article">
        <!--头部标题-->
        <div class="article_block_header">
            <h1 class="article_block_header__title">{{articleNavTitle}}</h1>
            <!--更多按钮-->
            <div class="article_block_header__more__wrapper">
                <p class="article_block_header__more">更多</p>
                <v-icon class="article_block_header__more___icon">chevron_right</v-icon>
            </div>
        </div>
        <!--内容-->
        <div class="article_block_content">
            <!--内容列表-->
            <div class="article_block_content_list_wrapper" v-for="item in articleBlockData" :key="item._id">
                <div class="article_block_content_list">
                    <!--图片-->
                    <img class="content_list_img"
                         src="https://puui.qpic.cn/vcover_vt_pic/0/vvso3ob61erhxwa1525917878/260"/>
                    <!--文字-->
                    <div class="content_list_text" @click="readAll(item._id)">
                        <!--标题-->
                        <h1 class="content_list_text__title">{{item.post_title}}</h1>
                        <!--文章内容-->
                        <div class="content_list_text__content">
                            <p>{{item.post_abstract}}…</p>
                            <!--查看全部按钮-->
                            <span class="content_look_all">阅读全文</span>
                        </div>
                    </div>
                    <!--发文时间-->
                    <div class="send_content_time">
                        <!--icon-->
                        <v-icon class="send_content_time_icon">schedule</v-icon>
                        <!--text-->
                        <p class="send_content_time_txt">{{_initData(item.post_date)}}</p>
                    </div>
                </div>
                <!--<div class="content_list_text__img">-->
                <!--<img src="https://puui.qpic.cn/vcover_vt_pic/0/vvso3ob61erhxwa1525917878/260"/>-->
                <!--</div>-->
            </div>
        </div>
        <!--more按钮-->
        <!--<div class="article_block_more_btn" v-show="articleBlockData === '普通文章'">-->
        <!--<v-btn flat color="secondary" class="more_btn">更多</v-btn>-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {formatDate, diffTime} from 'common/date';

    export default {
        props: {
            articleNavTitle: {
                type: String,
                default: ''
            },
            articleBlockData: {
                type: Array,
                default: []
            }
        },
        methods: {
            // 获取时间
            _initData(time) {
                let _date = new Date(parseInt(time));
                let _formatDate = formatDate(_date, 'yyyy-MM-dd hh:mm');
                let _diffTime = diffTime(_formatDate);

                // 年
                if (0 < _diffTime.yearDiff) {
                    return `${_diffTime.yearDiff}年前`;
                }
                // 月
                else if (_diffTime.yearDiff === 0 && 0 < _diffTime.monthDiff && _diffTime.monthDiff <= 12) {
                    return `${_diffTime.monthDiff}个月前`;
                }
                // 日
                else if (_diffTime.monthDiff === 0 && 0 < _diffTime.dayDiff <= 7) {
                    return `${_diffTime.dayDiff}天前`;
                }
                // 时
                else if (_diffTime.dayDiff === 0 && _diffTime.hoursDiff > 0) {
                    return `${_diffTime.hoursDiff}小时前`;
                }
                // 分
                else if (_diffTime.dayDiff === 0 && _diffTime.hoursDiff === 0 && _diffTime.minutesDiff > 0) {
                    return `${_diffTime.minutesDiff}分前`;
                }
                else {
                    return `${_diffTime.secondsDiff}秒前`;
                }
            },
            // 跳转到当前文章
            readAll (id) {
                let {href} = this.$router.resolve({
                    path: `/article/${id}`
                })

                window.open(href)

//                this.$router.push({
//                    path: `/article/${id}`
//                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/sass/variable';

    .article {
        margin: 15px 0;
        padding: 20px 20px 0 20px;
        border-radius: 5px;
        width: 100%;
        background: $choice-articleBg
    }

    /*头部标题*/
    .article_block_header {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 30px;
        border-bottom: 4px solid $choice-article-header-border;
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 80px;
            height: 0;
            border-bottom: 4px solid $choice-article-header-border-after;
        }
    }

    .article_block_header__title {
        margin: 0;
        line-height: 15px;
        font-size: 17px;
    }

    /*更多按钮*/
    .article_block_header__more__wrapper {
        display: flex;
        align-items: flex-start;
        user-select: none;
        line-height: 15px;
        &:hover .article_block_header__more___icon {
            animation: translate 0.8s infinite alternate;
        }
    }

    .article_block_header__more {
        margin: 0;
        font-size: 12px;
        color: $choice-article-header-more;
        cursor: pointer;
    }

    .article_block_header__more___icon {
        line-height: 15px;
        font-size: 18px;
        color: $choice-article-header-more;
        cursor: pointer;
    }

    /*内容*/
    .article_block_content {
        display: flex;
        flex-direction: column;
        .article_block_content_list_wrapper {
            display: flex;
            flex-direction: column;
            border-bottom: 2px solid $choice-article-content-list;
            &:last-child {
                border-bottom: none;
            }
        }
        .article_block_content_list {
            padding: 15px 0;
            width: 100%;
            display: flex
        }
        /*图片*/
        .content_list_img {
            flex: 0 0 150px;
            border-radius: 5px;
            height: 100px;
            background: $content-list-img-bg;
        }
        /*文字*/
        .content_list_text {
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: left;
            padding-left: 20px;
            min-height: 60px;
        }
        /*文章标题*/
        .content_list_text__title {
            margin: 0;
            padding-bottom: 5px;
            font-size: 16px;
        }
        /*文章内容*/
        .content_list_text__content {
            margin: 0;
            line-height: 20px;
            font-size: 13px;
            overflow: hidden;
            p {
                margin: 0;
                cursor: pointer;
            }
        }
        /*查看全部按钮*/
        .content_look_all {
            cursor: pointer;
            color: $choice-article-header-border-after;
        }
        /*文章图片*/
        .content_list_text__img {
            margin: 0 0 15px 80px;
            display: flex;
            img {
                flex: 0 0 100px;
                height: 150px;
            }
        }
        /*发文时间*/
        .send_content_time {
            display: flex;
            align-items: center;
            padding: 20px 0 0 35px;
        }
        .send_content_time_icon {
            font-size: 18px;
        }
        .send_content_time_txt {
            margin: 0;
            padding-left: 8px;
            font-size: 12px;
            color: #999;
        }
    }

    /*more按钮*/
    .article_block_more_btn {
        padding: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 2px solid $choice-article-content-list;
        .more_btn {
            margin: 0 !important;
            border: 1px solid #999;
            min-width: 80px;
            height: 30px;
        }
    }

    @keyframes translate {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(5px, 0, 0);
        }
    }

</style>
