/**
 * @file entry
 * @author jianzhongmin(282126990@qq.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import Vuetify from 'vuetify';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(Meta);

Vue.use(Vuetify);

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/static/img/icons/apple-touch-icon-152x152.png',
    loading: '/static/img/icons/apple-touch-icon-152x152.png',
    attempt: 1
})

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
