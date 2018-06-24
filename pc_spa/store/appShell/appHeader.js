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
         * 状态标题
         *
         * @type {Object}
         */
        status: {
            name: '',
            title: ''
        },
        /**
         * 返回图标图片
         *
         * @type {String}
         */
        imgSrc: '/p/static/img/icons/apple-touch-icon-152x152.png'
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
