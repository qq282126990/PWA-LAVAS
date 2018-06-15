import express from 'express'
import mongoose from 'mongoose'
import tracer from 'tracer'
import _public from '../controllers/public'
import _article from '../controllers/articles'
import _user from '../controllers/users'
import {UserModel} from '../models/model' // 用户api,构造函数应该是大写开头
const logger = tracer.console();
import {_dbError, _encryptedPWD} from '../functions/function'
const router = express.Router();
/**
 * @desc mongodb options
 * */
const options = {
    db: {native_parser: true},
    server: {
        poolSize: 5, // 线程池是什么鬼
        socketOptions: {
            keepAlive: 30000
        }
    },
    user: 'admin',
    pass: 'lavas'//数据库账号
}
mongoose.connect('mongodb:///lavas', options);//链接
const connect = async function () {
    let db = mongoose.connection;
    if (db) {
        let InitAdministrator = {
            username: 'admin',
            password: 'admin',
            nick: 'admin',
            email: 'admin@lavas.io'
        };
        db.once('connected', async function onceConnect () {
            logger.warn('————————————>db is connected<————————————');
            UserModel
                .find({username: InitAdministrator.username}, function (err, res) {
                    if (err) {
                        _dbError(res, err)
                    }
                    if (res.length === 0) {
                        InitAdministrator.password = _encryptedPWD(InitAdministrator.password);//用户密码加密
                        let adminModel = new UserModel(InitAdministrator);
                        adminModel.save(function (err, res) {
                            if (err) {
                                logger.warn('----------> 初始化admin账号失败 v_v')
                            } else {
                                logger.warn('----------> 初始化admin账号成功 ^_^')
                            }
                        })
                    }else {
                        logger.warn('----------> admin账号已被初始化过 ^_^')
                    }
                })
        })
        //连接失败警告
        db.on('error', logger.warn.bind(logger, '\n*****数据库连接失败*****:\n'));
    }
};
connect();//start Init Admin

/******************Routers************************/

/**
 * @decs 登录模块
 * */
router.post('/login', _public.login);

/**
 * @desc 退出登录模块
 * */
router.post('/logout', _public.logout);

/**
 * @desc 注册模块
 * */
router.post('/register', _public.register);

/**
 * @desc 查询文章的数据
 * */
router.get('/getArticleList', _article.getArticleList);

/**
 * @desc 发表新的文章 ＋编辑文章
 * */
router.post('/publishArticle', _article.publishArticle);

/**
 * @desc 拉取单篇文章
 * */
router.get('/getArticle', _article.getArticle);

/**
 * @desc 删除文章
 * @desc 支持数组形式
 * @todo no dev
 * */
router.post('/deletesArticle', _article.deleteArticle);

/**
 * @desc 获取用户身份信息
 * */
router.get('/getUser', _user.getUser);
export default router
