import {UserModel} from "../models/model"
import tracer from 'tracer'
import {_dbError, _dbSuccess, _encryptedPWD} from "../functions/function";
const logger = tracer.console();
const _public = {
    /**
     * @desc login
     * */
    login: async (req, res, next) => {
        logger.warn('login??');
        let findUser = await UserModel.find({username: req.body.username}).exec();
        let checkPwd = findUser[0] ? findUser[0].password : '';
        let inputPwd = await _encryptedPWD(req.body.password);
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
                // req.session.userInfo = {
                //     id: findUser[0]._id,
                //     username: findUser[0].username, // 用户名
                //     nick: findUser[0].nick || null, // 用户名
                //     email: findUser[0].email || null, // 用户名
                //     isLogin: true
                // };
                // req.session.isAuth = true;
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
    }
};

export default _public
