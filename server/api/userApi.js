const models = require ('../db');
const express = require ('express');
const router = express.Router ();
const mysql = require ('mysql');
const uuid = require ('node-uuid');
const sql = require ('../sqlMap.js');

// 链接数据库
// 使用createConnection创建链接
const conn = mysql.createConnection (models.mysql);

// 获取用户uid
router.post ('/getArticle', (req, res) => {
    // 查找用户名
    const params = req.body;

    if (params.method !== 'article' || !params) {
        res.send ({
            code: "-300",
            msg: "参数错误",
            data: []
        });
        return;
    }

    conn.query ('select * from ??', [`${params.id}`], function (err, result) {
        if (err) {
            console.log (err);
        }
        if (result[0] === undefined) {
            res.send ({
                code: "-100",
                msg: "查询失败没有查询到对应ID的文章库",
                data: []
            });
        }
        else {
            res.send ({
                code: 0,
                data: {
                    article: result
                }
            });
        }
    })
});

module.exports = router;
