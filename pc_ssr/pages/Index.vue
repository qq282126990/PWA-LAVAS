<template>
    <div>
        <div class="content">
            <div class="content_bg_one"></div>
            <div class="content_left">
                <user-message></user-message>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import UserMessage from 'components/UserMessage.vue'

    export default {
        name: 'index',
        metaInfo: {
            title: 'Home',
            titleTemplate: '%s - Lavas',
            meta: [
                {name: 'keywords', content: 'lavas PWA'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        mounted () {
        },
        components: {
            UserMessage
        }
    };
</script>

<style lang="stylus" scoped>
    .content {
        padding: 25px 10% 0 10%;
        display: flex;
        height: 100%;
        flex-wrap: wrap;
    }

    .content_bg_one {
        position: fixed;
        top: 52px;
        left: 0;
        right: 0;
        width: 100%;
        height: 300px;
        background: url('../assets/img/content_bg_one.jpg') no-repeat;
        background-size: cover;
        z-index: 0;
    }

    /*左边内容*/
    .content_left {
        width: 250px;
        height: 100%
    }
</style>
