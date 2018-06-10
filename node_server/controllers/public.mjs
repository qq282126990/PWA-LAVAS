import tracer from 'tracer'
import date from 'date-fns' // 时间格式工具
import {UserModel} from "../models/model"
import {_dbError, _dbSuccess, _encryptedPWD} from "../functions/function";
const logger = tracer.console();
const format=date.format
const _public = {
    /**
     * @desc login
     * @desc 可以拿到req.session 一级req.sessionId
     * */
    login: async (req, res, next) => {
        logger.warn(
            '\n-------检测到用户【'+req.body.username+'】在登录-----' +
            '\n-------当前登录ip为【'+req.ip+'】------' +
            '\n-------'+format(new Date(), 'YYYY-MM-DD HH:mm:ss')+'-----');
        //console.log("headers = " + JSON.stringify(req.headers));// 包含了各种header，包括x-forwarded-for(如果被代理过的话)
        //console.log("x-forwarded-for = " + req.header('x-forwarded-for'));// 各阶段ip的CSV, 最左侧的是原始ip
        ///console.log("ips = " + JSON.stringify(req.ips));// 相当于(req.header('x-forwarded-for') || '').split(',')
        //console.log("remoteAddress = " + req.connection.remoteAddress);// 未发生代理时，请求的ip
        //console.log("ip = " + req.ip);// 同req.connection.remoteAddress, 但是格式要好一些
        let findUser = await UserModel.find({username: req.body.username}).exec();
        let checkPwd = findUser[0] ? findUser[0].password : '';
        let inputPwd = await _encryptedPWD(req.body.password);//todo 后期需要加密后传参到后端
        logger.warn(req.session)
        if (findUser.length === 0) {
            // TODO 频繁的操作
            return res.json({
                errorCode: 1,
                msg: '该用户尚未注册'
            })
        } else {
            // 密码正确
            if (checkPwd === inputPwd) {
                // // TODO 配置用户的到session
                req.session.userInfo = {
                    id: findUser[0]._id,
                    username: findUser[0].username, // 用户名
                    nick: findUser[0].nick || null, // 用户名
                    email: findUser[0].email || null, // 用户名
                    isLogin: true
                };
                req.session.isAuth = true;
                // 逻辑尚未处理
                return _dbSuccess(res, '登录成功')
            } else {
                return _dbError(res, '登录失败，密码错误')
            }
        }
    },

    /**
     * @desc logout
     * @todo 后续可能会记录并追踪一些异常的退出登录行为
     * */
    logout: async (req, res, next) => {
        req.session.isAuth = null;
        return _dbSuccess(res, '退出成功')
    },
    /**
     * @desc register
     * @todo 2018年6月3日18:27:36 测试阶段，不建议直接开放注册功能
     * */
    register: async (req, res, next) => {
        if (req.session.isAuth) {
            return _dbSuccess(res, '你可以注册啦！(该功能尚未开放)')
        } else {
            return _dbError(res, '你丫没人权！(该功能尚未开放)')
        }
    },

};

export default _public
