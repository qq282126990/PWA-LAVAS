/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_APP_RIGHT_MENU = 'SET_APP_RIGHT_MENU';

export const state = () => {
    return {
        /**
         * 是否展示顶部导航栏
         *
         * @type {boolean}
         */
        show: false
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
