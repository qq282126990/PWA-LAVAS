/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const ACTIVATE_APP_BOTTOM_NAV = 'ACTIVATE_APP_BOTTOM_NAV';
export const SET_APP_BOTTOM_NAV = 'SET_APP_BOTTOM_NAV';

export const state = () => {
    return {
        /**
         * 是否展示底部导航栏
         *
         * @type {boolean}
         */
        show: true,

        /**
         * 导航按钮列表
         *
         * @type {Array.<Object>}
         */
        navs: [
            {
                // 按钮的名字
                name: 'home',

                // 显示的 icon
                icon: 'icon-home',

                // 激活显示的icon
                active_icon: 'icon-home-active',

                // 显示的文字
                text: '主页',

                // 是否是当前激活的
                active: true,

                // 路由
                route: '/'
            },
            {
                // 按钮的名字
                name: 'personal',

                // 显示的 icon
                icon: 'icon-my',

                // 激活显示的icon
                active_icon: 'icon-my-active',

                // 显示的文字
                text: '我的',

                // 路由信息
                route: ''
            }
        ]
    };
};

export const mutations = {
    [ACTIVATE_APP_BOTTOM_NAV](state, name) {
        state.navs = state.navs.map(nav => {
            if (nav.name === name) {
                nav.active = true;
            }
            else {
                nav.active = false;
            }
            return nav;
        });
    },
    [SET_APP_BOTTOM_NAV](state, appBottomNavigator) {
        state = Object.assign(state, appBottomNavigator);
    }
};

export const actions = {

    /**
     * 隐藏底部导航
     *
     * @param {Function} commit commit
     */
    hideBottomNav({commit}) {
        commit(SET_APP_BOTTOM_NAV, {show: false});
    },

    /**
     * 显示底部导航
     *
     * @param {Function} commit commit
     */
    showBottomNav({commit}) {
        commit(SET_APP_BOTTOM_NAV, {show: true});
    },

    /**
     * 激活底部导航
     *
     * @param {Function} commit commit
     * @param {string} name name
     */
    activateBottomNav({commit}, name) {
        commit(ACTIVATE_APP_BOTTOM_NAV, name);
    }
};
