/*
* 设置登录状态 setLoginData
* 获取登录状态 getLoginData
* */
import {setLoginData, getLoginData} from 'common/cache'

const SET_LOGIN = 'setLogin';

export const state = () => {
    return {
        /*
        * 登录状态
        * @type {Boolean}
        * */
        login: getLoginData()
    };
};

export const mutations = {
    [SET_LOGIN](state, login) {
        state.login = login;
    }
};

export const actions = {
    // 保持登录状态
    setLogin({commit}, login) {
        console.log(login)
        commit(SET_LOGIN, setLoginData(login));
    },
    // 该方法主要供服务端接口验证使用
    async validLogin({commit}) {
        // 可以给服务端发请求，验证用户的登录状态，此处模拟未登录
        let login = await new Promise( resolve => {
            setTimeout(() => {
                resolve(false);
            }, 3000);
        });

        // 并设置 store 中的登录状态
        commit(SET_LOGIN, setLoginData(login));
    }
};
