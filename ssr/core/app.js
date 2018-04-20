/**
 * @file entry
 * @author qq282126990(qq282126990@qq.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';
import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import Vuetify from 'vuetify';
import VueLazyload from 'vue-lazyload';

Vue.use(Meta);

Vue.use(Vuetify);

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'static/img/icons/android-chrome-144x144.png',
    loading: 'static/img/icons/android-chrome-144x144.png',
    attempt: 1
})


Vue.config.productionTip = false;

export function createApp () {
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
