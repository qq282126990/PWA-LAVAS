## 服务器目录
## 启动
```nodemon
    npm run dev
```
### 服务器状态码以及格式
### 接口文档
列表
| methods   |      api                  |  params | query | auth |   描述      |
|---|---|---|---|---|---|
| GET       |  /api/getArticleList      |   待定  | name、page  | n|查询文章的数据
| POST      |  /api/publishArticle      |   待定  |   | y|发表新的文章 ＋编辑文章
| GET       |  /api/getArticle          |   待定  | id  | n|拉取单篇文章
| GET       |  /api/getUser             |   待定  |   | y|获取用户身份信息
| POST      |  /api/login               |   待定  |   | y|登录模块
| POST      |  /api/logout              |   待定  |   | n|退出登录模块
| POST      |  /api/register            |   待定  |   | n|注册模块

- 登录-auth
    
| methods   |api|username| password  |   描述      |
|---|---|---|---|---|
| POST      |  /api/login      |   y  | y  | 登录

- 发表文章-auth
/api/publishArticle

|参数|是否必填|描述|
|---|---|---|
|post_title|是|标题|
|post_content|是|内容|
|type|否|0-普通,1精选|

- 获取文章列表
/api/getArticleList 

|参数|是否必填|描述|
|---|---|---|
|type|否|0-普通,1精选，数字类型|
|post_title|否|标题，模糊搜索|
|post_author|否|作者，模糊搜索|



### 一些后端接口规范
- 时间戳 毫秒级 
- 
