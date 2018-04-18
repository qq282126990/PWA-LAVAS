import {ERR_OK} from 'api/config';

// 获取对应文章类型接口
import {getArticle} from 'api/article';


export const SET_ARTICLE = 'SET_ARTICLE';

export const state = () => {
    return {
        /*
         * 获取对应类型文章
         * @type {Array}
         * */
        article: []
    };
};

export const mutations = {
    [SET_ARTICLE](state, article) {
        state.article = article;
    }
};

export const actions = {
    /**
     * 获取对应文章类型接口
     * @param {Function} commit
     */
    async getArticle ({commit}, param) {
        let res = await getArticle(param);
        if (res.code === ERR_OK) {
            commit(SET_ARTICLE, res.data.article);
        }
        else {
            // 错误处理
        }
    }
};
