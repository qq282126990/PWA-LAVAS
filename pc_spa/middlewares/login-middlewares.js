export default function ({isClient,isServer,store, redirect, route,req}) {
    /*
    * 参数说明
    * isClient|isServer 当前中间件运行环境，是客户端还是服务端。
    *
    * route vue-router 中的路由对象。
    *
    * store vuex 中的 store
    *
    * redirect 重定向函数。接受唯一的一个参数对象，其中包含如下属性：
      status HTTP 状态码，默认为 302
      path 重定向地址路径
      query 附带参数

    * req req 对象 仅限服务端。
    * */

    // 如果是服务端，store 中都是初始化的状态
    // 需要先去通过接口向服务器去验证用户是否登录，并设置 store 中的登录状态，再进行检测
    let isLogin
    if (isClient) {
        // 查看 store 中的登录状态，前端路由跳转不会重置 store 中的值
        isLogin = store.state.common.login || false;

        // 如果未登录且当前路由不是到登录页，则重定向到登录页
        // 通过 route.path 判断路由
        if (!isLogin && route.path !== '/login') {
            return redirect({
                path: '/login'
            });
        }
    }
    else if(isServer) {
        // 如果是服务端，store 中都是初始化的状态
        // 需要先去通过接口向服务器去验证用户是否登录，并设置 store 中的登录状态，再进行检测
        async function validLogin() {
            // 可以给服务端发请求，验证用户的登录状态，此处模拟未登录
            await store.dispatch('common/validLogin');
        }
        validLogin();

        isLogin = store.state.common.login || false;

        // 如果未登录且当前路由不是到登录页，则重定向到登录页
        // 通过 req.path 判断路由
        if (!isLogin && req.path !== '/login') {
            return redirect({
                path: '/login'
            });
        }
    }
}
