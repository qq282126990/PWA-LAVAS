import axios from 'axios';
import {urlHeader} from './config';

// 获取对应文章类型接口
export function getArticleAjax (param) {
    const url = `${urlHeader}/serverPwaLavas/getArticle`;

    const data = Object.assign({}, param, {
        method: 'article'
    });

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data);
    });
}
