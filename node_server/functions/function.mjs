import tracer from 'tracer'
const logger = tracer.console()
import cryPto from 'crypto'

/**
 * @desc 返回json操作失败提示
 * @return JSON
 * @param res response
 * @param msg 提示语
 * @param data 返回的结果
 * @param errorCode 1 失败
 * */
async function _dbError(res,msg,data,errorCode) {
    return res.json({
        msg:msg||'操作失败',
        data:data||[],
        errorCode:errorCode||0
    })
}
/**
 * @desc 返回json操作成功提示
 * @return JSON
 * @param res response
 * @param msg 提示语
 * @param data 返回的结果
 * @param errorCode 正常 0
 * */
async  function _dbSuccess(res,msg,data,errorCode) {
    return res.json({
        msg:msg||'操作成功',
        data:data||[],
        errorCode:errorCode||0
    })
}

/**
 * @desc 判断是否授权
 * */

async function _isAuth(res,session) {
    if(session){
        return true
    }else {
        return await _dbError(res,'尚未登录无法获取',4003)
    }
}

/**
 * @desc 分页函数
 * @param res
 * @param data
 * @param errorCode
 * @param msg
 * @param total 总长度
 * @param pages 总页数
 * @param pageCurrent 当前分页
 * */
async function _flipPage(res,data,errorCode,msg,{total,pages,pageCurrent}) {
    return res.json({
        errorCode:errorCode||0,
        data:data||[],
        msg:msg||'操作成功',
        total:total||1,
        pages:pages,
        pagesCurrent:pageCurrent
    })
}

/**
 * @desc 密码加密模块
 * @desc 加盐'beike'，十六进制,加密算法sha256
 * */
function _encryptedPWD (password) {
    return cryPto.createHmac('sha256', password)
        .update('lavas')
        .digest('hex')
}
export {_dbError,_dbSuccess,_isAuth,_flipPage,_encryptedPWD}
