const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        contentBase: '/dist',
        public: 'h5.ceshi.qian360.com:3000',
        // public: 'auth.web.local.qian360.com:3000',
        proxy: {
            // "/api/auth": {
            //     target: "http://auth.test.91fuqian.com",
            //     // target: "http://auth.test.qian360.com",
            //     changeOrigin: true,
            //     // target: "http://127.0.0.1:3001",
            //     pathRewrite: {"^/api" : ""}
            // },
            "/api/h5/v3": {
                // target: "http://10.0.0.3:7777/mockjsdata/29",
                target: "http://test.qian360.com",
                changeOrigin: true
            },
            "/api/common": {
                // target: "http://10.0.0.3:7777/mockjsdata/29",
                target: "http://test.qian360.com",
                changeOrigin: true
            }
        }
    }
});

module.exports = devWebpackConfig;