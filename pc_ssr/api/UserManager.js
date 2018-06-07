import BaseModule from './BaseModule';
import {baseUrl} from './config';

class UserManager extends BaseModule  {
    constructor() {
        super()
    }

    // 获取用户身份信息
    getUser(id) {
        if (!id) {
            return Promise.reject(new Error(`getUser：id(${id})无效`));
        }

        return this.get(`/getUser?${id}`);
    }

    // 用户登录
    usertLogin(data = {}) {
        if (!data || !Object.keys(data).length) {
            return Promise.reject(new Error('login：登录数据无效'));
        }

        return this.post(`${baseUrl}/login`, data);
    }
}

export default new UserManager();
