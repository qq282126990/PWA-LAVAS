/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_APP_FOOTER = 'SET_APP_FOOTER';

export const state = () => {
    return {
        /**
         * 是否展示顶部导航栏
         *
         * @type {boolean}
         */
        show: true
    };
};

export const mutations = {
    [SET_APP_FOOTER](state, appfooter) {
        state = Object.assign(state, appfooter);
    }
};

export const actions = {
    /**
     * 设置底部
     *
     * @param {Function} commit commit
     * @param {Object} appfooter appfooter
     */
    setAppFooter({commit}, appfooter) {
        commit(SET_APP_FOOTER, appfooter);
    }
};
