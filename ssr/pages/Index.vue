<template>
    <div>
        <overall-search></overall-search>
        <div class="content">
            <div>
                <h2>LAVAS</h2>
                <h4>[ˈlɑ:vəz]</h4>
            </div>
        </div>
    </div>
</template>

<script>
    // vuex
    import {mapActions} from 'vuex';
    // 综合查找组件
    import overallSearch from '@/components/overall-search.vue';

    function setState (store) {
        store.dispatch ('appShell/appHeader/setAppHeader', {
            show: true,
            title: 'Lavas',
            showMenu: false,
            showBack: false,
            showLogo: false,
            actions: [
                {
                    icon: 'icon-liuyan',
                    route: '/'
                }
            ]
        });
    }

    export default {
        name: 'index',
        metaInfo: {
            title: 'Home',
            titleTemplate: '%s',
            meta: [
                {name: 'keywords', content: 'lavas PWA'},
                {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
            ]
        },
        async asyncData ({store, route}) {
            setState (store);
        },
        data () {
            return {
                options: [2013, 2014, 2015, 2016, 2017, 2018],
                value: 2016
            }
        },
        activated () {
            setState (this.$store);
        },
        components: {
            overallSearch
        }
    };
</script>

<style lang="stylus" scoped>
    .content
        display flex
        align-items center
        justify-content center
        height 100%
        flex-wrap wrap
        h2
            font-size 46px
            font-weight 500
</style>
