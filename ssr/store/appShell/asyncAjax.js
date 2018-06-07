import {ERR_OK} from 'api/config';

// 获取对应文章类型接口
import {getArticleAjax} from 'api/article';


export const SET_ARTICLE_DATA = 'SET_ARTICLE_DATA';

export const state = () => {
    return {
        /*
         * 获取对应类型文章
         * @type {Array}
         * */
        articleData: []
    };
};

export const mutations = {
    [SET_ARTICLE_DATA](state, articleData) {
        state.articleData = articleData;
    }
};

export const actions = {
    /**
     * 获取对应文章类型接口
     * @param {Function} commit
     */
    async getArticleAjax ({commit}, param) {
        let res = await getArticleAjax(param);
        if (res.code === ERR_OK) {
            commit(SET_ARTICLE_DATA, res.data);
        }
        else {
            /* 错误处理 */
            commit(SET_ARTICLE_DATA, []);
        }
    },
    /**
     * 获取文章内容列表
     *
     * @param {Function}
     */
    articleList ({commit}, articleList) {
        commit (SET_ARTICLE_DATA, articleList);
    }
};
