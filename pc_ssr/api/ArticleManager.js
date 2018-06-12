import BaseModule from './BaseModule';
import {baseUrl} from './config';

class ArticleManager extends BaseModule  {
    constructor() {
        super()
    }

    // 查询文章的数据
    getArticleList(param) {
        if (!param) {
            return Promise.reject(new Error(`getArticleList：请输入param`));
        }

        return this.get(`${baseUrl}/getArticleList`,param);
    }
}

export default new ArticleManager();
