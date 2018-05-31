/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_LOGIN = 'SET_LOGIN';

export const state = () => {
    return {
        /**
         * 登录状态
         * @type {boolean}
         */
        login: false
    };
};

export const mutations = {
    [SET_LOGIN](state, login) {
        state.login = login
    }
};

export const actions = {
    /**
     * 设置登录状态
     *
     * @param {Function} commit commit
     * @param {Object} appHeader appHeader
     */
    setLogin({commit}, setLogin) {
        commit(SET_LOGIN, setLogin);
    }
};
