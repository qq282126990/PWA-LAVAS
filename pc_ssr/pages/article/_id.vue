<template>
    <div>
        <div class="article_wrapper">
            <!--文章头部-->
            <div class="article_header">
                <!--文章标题图片-->
                <div class="article_img"
                     style="background-image:url(https://pic1.zhimg.com/v2-6631184c1e67c93bf5f85d07d96ce45d_1200x500.jpg)"></div>
                <div class="article_header_content">
                    <!--文章标题-->
                    <h1 class="article_title">坚果 3 是锤子对小米发动的一次自杀式袭击</h1>
                    <!--文章发起人-->
                    <div class="article_user">
                        <!--文章发起人头像-->
                        <img class="article_user_img" src="https://cn.vuejs.org/images/logo.png"/>
                        <!--文章用户信息-->
                        <div class="article_user_msg">
                            <p class="txt name">By Joseph Medley</p>
                            <p class="txt">Technical Writer</p>
                        </div>
                        <!--获赞数-->
                        <div class="article_start_number">
                            <p>200 个人赞了</p>
                        </div>
                        <!--关注按钮-->
                        <v-btn class="article_attention" depressed color="primary">
                            <v-icon class="article_attention_icon">add</v-icon>
                            关注
                        </v-btn>
                    </div>
                </div>
            </div>
            <!--文章内容-->
            <div class="article_content">
                <p>GET和POST是HTTP请求的两种基本方法，要说它们的区别，接触过WEB开发的人都能说出一二。</p>
                <p>最直观的区别就是GET把参数包含在URL中，POST通过request body传递参数。</p>
                <p>你可能自己写过无数个GET和POST请求，或者已经看过很多权威网站总结出的他们的区别，你非常清楚知道什么时候该用什么。</p>
                <p>当你在面试中被问到这个问题，你的内心充满了自信和喜悦。</p>
                <figure>
                    <noscript><img src="https://pic2.zhimg.com/v2-c768679564b029e1df3423cdfbb0de76_b.jpg"
                                   data-caption="" data-size="normal" data-rawwidth="200" data-rawheight="200"
                                   class="content_image" width="200"></noscript>
                    <img src="https://pic2.zhimg.com/80/v2-c768679564b029e1df3423cdfbb0de76_hd.jpg" data-caption=""
                         data-size="normal" data-rawwidth="200" data-rawheight="200" class="content_image lazy"
                         width="200"
                         data-actualsrc="https://pic2.zhimg.com/v2-c768679564b029e1df3423cdfbb0de76_b.jpg"></figure>
                <p>你轻轻松松的给出了一个“标准答案”：</p>
                <ul>
                    <li>GET在浏览器回退时是无害的，而POST会再次提交请求。<br></li>
                    <li>GET产生的URL地址可以被Bookmark，而POST不可以。<br></li>
                    <li>GET请求会被浏览器主动cache，而POST不会，除非手动设置。<br></li>
                    <li>GET请求只能进行url编码，而POST支持多种编码方式。<br></li>
                    <li>GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。<br></li>
                    <li>GET请求在URL中传送的参数是有长度限制的，而POST么有。<br></li>
                    <li>对参数的数据类型，GET只接受ASCII字符，而POST没有限制。<br></li>
                    <li>GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。<br></li>
                    <li>GET参数通过URL传递，POST放在Request body中。</li>
                </ul>
                <p>（本标准答案参考自w3schools）</p>
                <p>“很遗憾，这不是我们要的回答！”</p>
                <figure>
                    <noscript><img src="https://pic4.zhimg.com/v2-29f9635a2247c105334b5b53af681247_b.jpg"
                                   data-caption="" data-size="normal" data-rawwidth="300" data-rawheight="300"
                                   class="content_image" width="300"></noscript>
                    <img src="https://pic4.zhimg.com/80/v2-29f9635a2247c105334b5b53af681247_hd.jpg" data-caption=""
                         data-size="normal" data-rawwidth="300" data-rawheight="300" class="content_image lazy"
                         width="300"
                         data-actualsrc="https://pic4.zhimg.com/v2-29f9635a2247c105334b5b53af681247_b.jpg"></figure>
                <p>请告诉我真相。。。</p>
                <p>如果我告诉你GET和POST本质上没有区别你信吗？ <br>让我们扒下GET和POST的外衣，坦诚相见吧！</p>
                <figure>
                    <noscript><img src="https://pic2.zhimg.com/v2-5aef7f121c8a123fe6acb835dd84430d_b.jpg"
                                   data-caption="" data-size="normal" data-rawwidth="265" data-rawheight="238"
                                   class="content_image" width="265"></noscript>
                    <img src="https://pic2.zhimg.com/80/v2-5aef7f121c8a123fe6acb835dd84430d_hd.jpg" data-caption=""
                         data-size="normal" data-rawwidth="265" data-rawheight="238" class="content_image lazy"
                         width="265"
                         data-actualsrc="https://pic2.zhimg.com/v2-5aef7f121c8a123fe6acb835dd84430d_b.jpg"></figure>
                <p>GET和POST是什么？HTTP协议中的两种发送请求的方法。</p>
                <p>HTTP是什么？HTTP是基于TCP/IP的关于数据如何在万维网中如何通信的协议。</p>
                <p>
                    HTTP的底层是TCP/IP。所以GET和POST的底层也是TCP/IP，也就是说，GET/POST都是TCP链接。GET和POST能做的事情是一样一样的。你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。 </p>
                <p>那么，“标准答案”里的那些区别是怎么回事？</p>
                <figure>
                    <noscript><img src="https://pic3.zhimg.com/v2-bd293852e3836762e7a7cf1af9407ece_b.jpg"
                                   data-caption="" data-size="normal" data-rawwidth="200" data-rawheight="200"
                                   class="content_image" width="200"></noscript>
                    <img src="https://pic3.zhimg.com/80/v2-bd293852e3836762e7a7cf1af9407ece_hd.jpg" data-caption=""
                         data-size="normal" data-rawwidth="200" data-rawheight="200" class="content_image lazy"
                         width="200"
                         data-actualsrc="https://pic3.zhimg.com/v2-bd293852e3836762e7a7cf1af9407ece_b.jpg"></figure>
                <p>
                    在我大万维网世界中，TCP就像汽车，我们用TCP来运输数据，它很可靠，从来不会发生丢件少件的现象。但是如果路上跑的全是看起来一模一样的汽车，那这个世界看起来是一团混乱，送急件的汽车可能被前面满载货物的汽车拦堵在路上，整个交通系统一定会瘫痪。为了避免这种情况发生，交通规则HTTP诞生了。HTTP给汽车运输设定了好几个服务类别，有GET, POST, PUT, DELETE等等，HTTP规定，当执行GET请求的时候，要给汽车贴上GET的标签（设置method为GET），而且要求把传送的数据放在车顶上（url中）以方便记录。如果是POST请求，就要在车上贴上POST的标签，并把货物放在车厢里。当然，你也可以在GET的时候往车厢内偷偷藏点货物，但是这是很不光彩；也可以在POST的时候在车顶上也放一些数据，让人觉得傻乎乎的。HTTP只是个行为准则，而TCP才是GET和POST怎么实现的基本。</p>
                <p>但是，我们只看到HTTP对GET和POST参数的传送渠道（url还是requrest body）提出了要求。“标准答案”里关于参数大小的限制又是从哪来的呢？</p>
                <figure>
                    <noscript><img src="https://pic1.zhimg.com/v2-8709204a4b102314e1b13d6884e9576e_b.jpg"
                                   data-caption="" data-size="normal" data-rawwidth="580" data-rawheight="175"
                                   class="origin_image zh-lightbox-thumb" width="580"
                                   data-original="https://pic1.zhimg.com/v2-8709204a4b102314e1b13d6884e9576e_r.jpg">
                    </noscript>
                    <img src="https://pic1.zhimg.com/80/v2-8709204a4b102314e1b13d6884e9576e_hd.jpg" data-caption=""
                         data-size="normal" data-rawwidth="580" data-rawheight="175"
                         class="origin_image zh-lightbox-thumb lazy" width="580"
                         data-original="https://pic1.zhimg.com/v2-8709204a4b102314e1b13d6884e9576e_r.jpg"
                         data-actualsrc="https://pic1.zhimg.com/v2-8709204a4b102314e1b13d6884e9576e_b.jpg"></figure>
                <p>
                    在我大万维网世界中，还有另一个重要的角色：运输公司。不同的浏览器（发起http请求）和服务器（接受http请求）就是不同的运输公司。 虽然理论上，你可以在车顶上无限的堆货物（url中无限加参数）。但是运输公司可不傻，装货和卸货也是有很大成本的，他们会限制单次运输量来控制风险，数据量太大对浏览器和服务器都是很大负担。业界不成文的规定是，（大多数）浏览器通常都会限制url长度在2K个字节，而（大多数）服务器最多处理64K大小的url。超过的部分，恕不处理。如果你用GET服务，在request body偷偷藏了数据，不同服务器的处理方式也是不同的，有些服务器会帮你卸货，读出数据，有些服务器直接忽略，所以，虽然GET可以带request body，也不能保证一定能被接收到哦。</p>
                <p>好了，现在你知道，GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。 </p>
                <p>你以为本文就这么结束了？</p>
                <figure>
                    <noscript><img src="https://pic4.zhimg.com/v2-e6b9b51ca9e24be0d260a3045bea5efc_b.jpg"
                                   data-caption="" data-size="normal" data-rawwidth="297" data-rawheight="216"
                                   class="content_image" width="297"></noscript>
                    <img src="https://pic4.zhimg.com/80/v2-e6b9b51ca9e24be0d260a3045bea5efc_hd.jpg" data-caption=""
                         data-size="normal" data-rawwidth="297" data-rawheight="216" class="content_image lazy"
                         width="297"
                         data-actualsrc="https://pic4.zhimg.com/v2-e6b9b51ca9e24be0d260a3045bea5efc_b.jpg"></figure>
                <p>我们的大BOSS还等着出场呢。。。</p>
                <p>这位BOSS有多神秘？当你试图在网上找“GET和POST的区别”的时候，那些你会看到的搜索结果里，从没有提到他。他究竟是什么呢。。。</p>
                <p>GET和POST还有一个重大区别，简单的说：</p>
                <p>GET产生一个TCP数据包；POST产生两个TCP数据包。</p>
                <p>长的说：</p>
                <p>对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；</p>
                <p>而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。</p>
                <p>也就是说，GET只需要汽车跑一趟就把货送到了，而POST得跑两趟，第一趟，先去和服务器打个招呼“嗨，我等下要送一批货来，你们打开门迎接我”，然后再回头把货送过去。</p>
                <p>因为POST需要两步，时间上消耗的要多一点，看起来GET比POST更有效。因此Yahoo团队有推荐用GET替换POST来优化网站性能。但这是一个坑！跳入需谨慎。为什么？</p>
                <p>1. GET与POST都有自己的语义，不能随便混用。</p>
                <p>2. 据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点。</p>
                <p>3. 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。</p>
                <p>现在，当面试官再问你“GET与POST的区别”的时候，你的内心是不是这样的？</p>
                <figure>
                    <noscript><img src="https://pic1.zhimg.com/v2-59347bc245e429407a9c3f831a9dbc07_b.jpg"
                                   data-caption="" data-size="normal" data-rawwidth="350" data-rawheight="350"
                                   class="content_image" width="350"></noscript>
                    <img src="https://pic1.zhimg.com/80/v2-59347bc245e429407a9c3f831a9dbc07_hd.jpg" data-caption=""
                         data-size="normal" data-rawwidth="350" data-rawheight="350" class="content_image lazy"
                         width="350"
                         data-actualsrc="https://pic1.zhimg.com/v2-59347bc245e429407a9c3f831a9dbc07_b.jpg"></figure>
                <h2>转自：<a
                    href="https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s%3F__biz%3DMzI3NzIzMzg3Mw%3D%3D%26mid%3D100000054%26idx%3D1%26sn%3D71f6c214f3833d9ca20b9f7dcd9d33e4"
                    class=" wrap external" target="_blank" rel="nofollow noreferrer" data-za-detail-view-id="1043">99%的人都理解错了HTTP中GET与POST的区别</a>
                </h2>
            </div>
            <!--文章底部内容-->
            <div class="article_footer">
                <v-btn class="article_footer_btn" depressed color="blue">
                    <v-icon class="article_footer_btn_icon">thumb_up_alt</v-icon>
                    100 点赞
                </v-btn>
                <v-btn class="article_footer_btn" depressed color="blue">
                    <v-icon class="article_footer_btn_icon">whatshot</v-icon>
                    20 条评论
                </v-btn>
                <v-btn class="article_footer_btn" depressed color="blue">
                    <v-icon class="article_footer_btn_icon">star_border</v-icon>
                    收藏
                </v-btn>
                <v-btn class="article_footer_btn" depressed color="blue">
                    <v-icon class="article_footer_btn_icon">near_me</v-icon>
                    分享
                </v-btn>
                <v-btn class="article_footer_btn security" depressed color="blue">
                    <v-icon class="article_footer_btn_icon">security</v-icon>
                    举报
                </v-btn>
            </div>
            <!--文章评论-->
            <div class="article_comment">
                <!--评论输入-->
                <input-comment></input-comment>
                <!--评论内容-->
                <div class="article_comment_content">
                    <article-user-comment></article-user-comment>
                    <article-user-comment></article-user-comment>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleManager from  'api/ArticleManager';
    import {ERR_OK} from  'api/config';
    import InputComment from  'components/Input/InputComment';
    import ArticleUserComment from  'components/Article/ArticleUserComment';

    let state = {
        appHeaderState: {
            show: true
        },
        appFooterState: {
            show: false
        },
        appRightMenu: {
            show: true,
            scroll: false
        }
    };
    function setState(store) {
        store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
        store.dispatch('appShell/appFooter/setAppFooter', state.appFooterState);
        store.dispatch('appShell/appRightMenu/setAppRightMenu', state.appRightMenu);
    }

    // 获取文章信息接口
    function getArticle(id) {
        return ArticleManager.getArticle({id: id});
    }

    export default {
        name: 'article-id',
        metaInfo: {
            title: '文章',
            titleTemplate: '%s - 阅读中',
            meta: [
                {name: 'keywords', content: 'lavas PWA'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        async asyncData({store, route}) {
            setState(store);
        },
        data () {
            return {
                /*
                 * 文章数据
                 * @type {Object}
                 * */
                articleData: {},
                /*
                 * 评论输入
                 * @type {String}
                 * */
                commentInputData: '',
            }
        },
        created () {
            // 获取文章信息接口
//            getArticle(this.$route.params.id)
//                .then((res) => {
//                    if (res.data.errorCode === ERR_OK) {
//                        console.log(res.data)
//                        this.articleData = res.data.data;
//                    }
//                })
        },
        mounted() {
            setState(this.$store);
        },
        components: {
            InputComment,
            ArticleUserComment
        }
    };
</script>

<style lang="stylus" scoped>
    @require '~@/assets/stylus/variable'

    .article_wrapper {
        padding: 77px 15% 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        min-height: 100vh;
        background: $article-wrapper
    }

    /*文章头部 */
    .article_header {
        width: 100%;
        background: $article;
    }

    .article_header_content {
        padding: 0 20px;
    }

    /*文章标题图片*/
    .article_img {
        width: 100%;
        padding-bottom: 33.3%;
        background-size: cover;
        background-position: top;
        margin-top: 0;
    }

    /*文章标题*/
    .article_title {
        margin: 25px 0;
        text-align: left;
        font-size: 24px;
    }

    /*文章用户发起人 */
    .article_user {
        display: flex;
        align-items: center;
        text-align: left;
        width: 100%;
        height: 40px;
        .article_user_img {
            width: 40px;
            border-radius: 50%;
            background: $user-avatar;
        }
        .article_user_msg {
            margin-left: 16px;
            display: flex;
            flex-direction: column;
            .name {
                font-weight: 700;
            }
        }
        .txt {
            margin: 0;
        }
        .article_attention {
            margin: 0;
            border-radius: 100px;
            overflow: hidden;
            height: 30px;
        }
        .article_attention_icon {
            padding-right: 10px;
            font-size: 20px;
        }
    }

    /*获赞数*/
    .article_start_number {
        padding: 0 20px;
        flex: 1;
        display: flex;
        align-items: center;
        text-align: left;
        width: 100%;
        height: 40px;
        color: $article-start-number
        p {
            margin: 0;
        }
    }

    /*文章内容*/
    .article_content {
        padding: 20px 20px;
        text-align: left;
        line-height: 1.5;
        width: 100%;
        min-height: 100vh;
        background: $article-content;
        p {
            margin: 15px 0;
        }
        ul {
            margin-left: 20px;
        }
        figure {
            margin: 0;
            text-align: center;
        }
        a {
            color: #000;
        }
    }

    /*文章底部内容*/
    .article_footer {
        padding: 10px 20px;
        text-align: left;
        width: 100%;
        user-select: none;
        background: $article-content;
        .article_footer_btn {
            margin: 0 10px 0 0;
            border-radius: 100px;
            overflow: hidden;
            color: $article-content;
        }
        .article_footer_btn_icon {
            margin-right: 10px;
            font-size: 20px;
            width 20px;
        }
        .security {
            float: right;
            margin: 0;
        }
    }

    /*文章评论*/
    .article_comment {
        padding-bottom: 20px;
        width: 100%;
        background: $article-content;
        /*评论内容*/
        .article_comment_content {
            padding: 0 30px;
            width: 100%;
        }
    }

    @media screen and (max-width: 900px) {
        .article_wrapper {
            padding: 77px 14% 0;
        }
    }
</style>
