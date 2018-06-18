/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_APP_RIGHT_MENU = 'SET_APP_RIGHT_MENU';

export const state = () => {
    return {
        /**
         * 是否展示侧边栏
         *
         * @type {boolean}
         */
        show: false,
        /**
         * 侧边栏样式
         *
         * @type {boolean}
         */
        menuClass: '',
        /**
         * 设置侧边栏监听滚动
         *
         * @type {boolean}
         */
        scroll: false
    };
};

export const mutations = {
    [SET_APP_RIGHT_MENU](state, appRightMenu) {
        state = Object.assign(state, appRightMenu);
    }
};

export const actions = {
    /**
     * 设置右边侧边栏
     *
     * @param {Function} commit commit
     * @param {Object} appRightMenu appRightMenu
     */
    setAppRightMenu({commit}, appRightMenu) {
        commit(SET_APP_RIGHT_MENU, appRightMenu);
    }
};
