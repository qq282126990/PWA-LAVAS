import axios from 'axios';
import qs from 'query-string';

function isEmptyObject(obj) {
    return !obj || !Object.keys(obj).length;
}

// 清理headers中不需要的属性
function clearUpHeaders(headers) {
    [
        'common',
        'get',
        'post',
        'put',
        'delete',
        'patch',
        'options',
        'head'
    ].forEach(prop => headers[prop] && delete headers[prop]);
    return headers;
}

// 组合请求方法的headers
// headers = default <= common <= method <= extra
function resolveHeaders(method, defaults = {}, extras = {}) {
    method = method && method.toLowerCase();
    // check method参数的合法性
    if (!/^(get|post|put|delete|patch|options|head)$/.test(method)) {
        throw new Error(`method:${method}不是合法的请求方法`);
    }

    const headers = {...defaults}
    const commonHeaders = headers.common || {}
    const headersForMethod = headers[method] || {}

    return {
        ...headers,
        ...commonHeaders,
        ...headersForMethod,
        ...extras
    }
}

// 组合请求方法的config
// config = default <= extra
function resolveConfig(method, defaults = {}, extras = {}) {
    if (isEmptyObject(defaults) && isEmptyObject(extras)) {
        return {};
    }

    return {
        ...defaults,
        ...extras,
        ...resolveHeaders(method, defaults.headers, extras.headers)
    }
}

class HttpClientModule {
    constructor(options = {}, baseUrl) {
        const defaultHeaders = options.headers || {}
        if (options.headers) {
            delete options.headers;
        }

        const defaultOptions = {
            baseUrl: baseUrl,
            transformRequest: [function (data, headers) {
                if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                    // 针对application/x-www-form-urlencoded对data进行序列化
                    return qs.stringify(data);
                } else {
                    return data;
                }
            }]
        }

        this.defaultConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...defaultHeaders
            }
        }

        this.$http = axios.create({...defaultOptions, ...options})
    }

    get(url, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.get(url, resolveConfig(
                'get', this.defaultConfig, {params: config})));
        })
    }

    post(url, data = undefined, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.post(url, data, resolveConfig(
                'post', this.defaultConfig, config)));
        })
    }

    put(url, data = undefined, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.put(url, data, resolveConfig(
                'put', this.defaultConfig, config)));
        })
    }

    delete(url, config = {}) {
        return new Promise((resolve) => {
            resolve(this.$http.delete(url, resolveConfig(
                'delete', this.defaultConfig, config)));
        })
    }
}

// 导出工厂方法
export function createHttpClient(options, defaults, baseUrl) {
    return new HttpClientModule(options, defaults, baseUrl);
}

// 默认导出模块对象
export default HttpClientModule  // import
