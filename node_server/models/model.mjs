import mongoose from 'mongoose'

let Schema = mongoose.Schema;
/**
 * @desc 用户model
 * */
let userSchema = {
    id: String,//id 内置id
    username: String,//用户名
    password: String,//密码
    nick: String,//昵称
    email: String,//email
    phone: Number,//手机
    avatar: String,//头像
    github: String,//github 账号
    bio: String,//签名
    level: Number,// 等级
    popularity: Number,//声望
    badge: Array,//勋章类型[1,2,3,4] 对应不同的icon 类型
};

/**
 * @desc 文章模型
 * */
/***********************************************
 * @desc 文章
 * */
let articleSchema = new Schema({
    comments_status: String, // 评论的开关状态 open closed
    post_author: String, // 作者
    post_date: String, // 发表的时间
    post_content: String, // 文章内容
    post_title: String, // 文章标题
    post_abstract: String, // 文章摘要，默认摘录200字
    post_password: String, // 文章如果加密的话
    post_modified: String, // 修改的时间
    post_url: String, // 生成的url 地址
    copyright_type: String, // original 原创、reprint 转载
    reprint_url: String, // 如果是转载的话，前端就有一个转载的url
    original_date: String, // 原始发表的时间，
    editor_number: Number, // 被编辑过的次数
    type: Number,// 0 普通类型文章、1 精选文章
});

let UserModel = mongoose.model('users', userSchema);
let ArticleModel = mongoose.model('articles', articleSchema);
export {UserModel, ArticleModel}
