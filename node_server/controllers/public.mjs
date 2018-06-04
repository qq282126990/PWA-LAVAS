import {UserModel} from "../models/model";
import {_dbError,_dbSuccess,_encryptedPWD} from "../functions/function";
const _public={
    /**
     * @desc login
     * */
    login:async(req,res,next)=>{

    },

    /**
     * @desc logout
     * @todo 后续可能会记录并追踪一些异常的退出登录行为
     * */
    logout:async(req,res,next)=>{
        req.session.isAuth=null;
        return _dbSuccess(res,'退出成功')
    },
    /**
     * @desc register
     * @todo 2018年6月3日18:27:36 测试阶段，不建议直接开放注册功能
     * */
    register:async(req,res,next)=>{
        if (req.session.isAuth) {
            return _dbSuccess(res, '你可以注册啦！(该功能尚未开放)')
        } else {
            return _dbError(res, '你丫没人权！(该功能尚未开放)')
        }
    }
}

export  default _public
