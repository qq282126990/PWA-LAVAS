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
                icon: 'home',

                // 显示的文字
                text: '主页',

                // 是否是当前激活的
                active: true,

                // 路由
                route: '/home'
            },
            {
                // 按钮的名字
                name: 'user',

                // 显示的 icon
                icon: 'person',

                // 显示的文字
                text: '发现',

                // 路由信息
                route: '/home/find'
            },
            {
                // 按钮的名字
                name: 'user',

                // 显示的 icon
                icon: 'person',

                // 显示的文字
                text: '个人中心',

                // 路由信息
                route: '/home/user'
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
