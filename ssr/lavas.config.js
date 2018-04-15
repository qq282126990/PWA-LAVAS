/**
 * @file lavas config
 * @author qq282126990(qq282126990@qq.com)
 */

'use strict';

const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const TransformModulesPlugin = require('webpack-transform-modules-plugin');

module.exports = {
    build: {
        ssr: true,
        cssExtract: false,
        path: BUILD_PATH,
        publicPath: '/',
        ssrCopy: isDev ? [] : [
            {
                src: 'server.prod.js'
            },
            {
                src: 'package.json'
            }
        ],
        /**
         * alias for webpack
         *
         * @type {Object.<string, Object>}
         */
        alias: {
            base: {
                'commonComponents': path.resolve(__dirname, '../common_components'),
                'components': '@/components',
                'base': '@/base'
            },
            server: {
                'iscroll/build/iscroll-lite$': path.join(__dirname, 'core/iscroll-ssr.js')
            }
        },
        plugins: {
            base: [
                new TransformModulesPlugin()
            ],
        },
        /**
         * node externals
         *
         * @type {Array.<string|RegExp>}
         */
        nodeExternalsWhitelist: [
            /iscroll/
        ]
    },
    router: {
        mode: 'history',
        base: '/',
        pageTransition: {
            type: 'slide',
            transitionClass: 'slide'
        }
    },
    serviceWorker: {
        swSrc: path.join(__dirname, 'core/service-worker-ssr.js'),
        swDest: path.join(BUILD_PATH, 'service-worker-ssr.js'),
        // swPath: '/custom_path/', // specify custom serveice worker file's path, default is publicPath
        globDirectory: BUILD_PATH,
        globPatterns: [
            '**/*.{html,js,css,eot,svg,ttf,woff}'
        ],
        globIgnores: [
            'sw-register.js',
            '**/*.map'
        ],
        appshellUrl: '/appshell',
        dontCacheBustUrlsMatching: /\.\w{8}\./
    }
};
