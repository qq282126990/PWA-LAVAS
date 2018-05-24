/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';

export const state = () => {
    return {
        /**
         * 文章内容列表
         *
         * @type {Array}
         */
        articleList: []
    };
};

export const mutations = {
    [SET_ARTICLE_LIST] (state, articleList) {
        state.articleList = articleList
    }
};

export const actions = {
    /**
     * 获取文章内容列表
     *
     * @param {Function}
     */
    articleList ({commit}, articleList) {
        commit (SET_ARTICLE_LIST, articleList);
    }
};
