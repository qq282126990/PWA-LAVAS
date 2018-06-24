const path = require ('path');
const express = require ('express');
const app = express();
const historyMiddleware = require('connect-history-api-fallback');
const LavasCore = require('lavas-core-vue');
const port = 8080; // 对外端口

function registerSPA(url, dirPath) {
    if (url.endsWith('/')) {
        url = url.substring(0, url.length - 1);
    }

    // fix trailing slash (/user -> /user/)
    app.use('/', function (req, res, next) {
        let requestUrl = req.url.replace(/\?.+?$/, '');

        if (requestUrl === url) {
            req.url = url + '/';
        }

        next();
    });

    app.use(url, historyMiddleware({
        htmlAcceptHeaders: ['text/html'],
        disableDotRule: false // ignore paths with dot inside
    }));


    app.use(url, express.static(dirPath));
}


// SPA
registerSPA('/p/', 'pc_spa/dist');

// NOT required when SSR is enabled
// app.listen(port, () => {
//     console.log('server started at localhost:' + port);
// });

// SSR
let core = new LavasCore(path.resolve(__dirname, 'pc_ssr/dist'));

core.init('production')
    .then(() => core.runAfterBuild())
    .then(() => {
        app.use(core.expressMiddleware());
        app.listen(port, () => {
            console.log('server started at localhost:' + port);
        });
    }).catch(err => {
    console.log(err);
});

// catch promise error
process.on('unhandledRejection', (err, promise) => {
    console.log('in unhandledRejection');
    console.log(err);
    // cannot redirect without ctx!
});
