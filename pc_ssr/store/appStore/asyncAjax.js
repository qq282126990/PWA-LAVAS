import {ERR_OK} from 'api/config';

// 获取对应文章类型接口
import ArticleManager from 'api/ArticleManager';


export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';

export const state = () => {
    return {
        /*
         * 获取文章列表
         * @type {Array}
         * */
        articleList: []
    };
};

export const mutations = {
    [SET_ARTICLE_LIST](state, articleList) {
        state.articleList = articleList;
    }
};

export const actions = {
    /**
     * 获取对应文章类型接口
     * @param {Function} commit
     */
    async getArticleList ({commit}, param) {
        let res = await ArticleManager.getArticleList(param);

        if (res.data.errorCode === ERR_OK) {
            commit(SET_ARTICLE_LIST, res.data.data);
        }
        else {
            /* 错误处理 */
            console.log(res.data)
        }
    }
};
