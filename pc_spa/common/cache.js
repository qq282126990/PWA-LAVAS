import storage from 'good-storage';

// key
const LOGIN_DATA = '__loginData__';

// 设置登录状态
export function setLoginData (start) {
    return storage.set(LOGIN_DATA, start);
}

// 获取登录信息
export function getLoginData () {
    return storage.get(LOGIN_DATA, '');
}
