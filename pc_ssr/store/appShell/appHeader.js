/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_APP_HEADER = 'SET_APP_HEADER';

export const state = () => {
    return {
        /**
         * 是否展示顶部导航栏
         *
         * @type {boolean}
         */
        show: true,
        /**
         * 状态
         *
         * @type {String}
         */
        status: ''
    };
};

export const mutations = {
    [SET_APP_HEADER](state, appHeader) {
        state = Object.assign(state, appHeader);
    }
};

export const actions = {
    /**
     * 设置顶部导航条
     *
     * @param {Function} commit commit
     * @param {Object} appHeader appHeader
     */
    setAppHeader({commit}, appHeader) {
        commit(SET_APP_HEADER, appHeader);
    }
};
