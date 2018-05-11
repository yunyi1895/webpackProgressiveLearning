//webpack.dev.conf.js 配置开发环境的webpack。主要用来起服务器的。
var baseWebpackConfig = require('./webpack.base.conf');
var merge = require('webpack-merge'); // 配置合并插件
var config = require('../config/index.js');
var webpack = require('webpack');
var metadata = {
    build_env: 'dev',
    apiHost: config.dev.apiHost
};
module.exports = merge(baseWebpackConfig, {
    output: {
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        port: 9000,
        proxy: {
            '/egg': { //拦截本地的访问地址中有 '/evcard-rest-api' 的时候进行转发
                //target: 'http://api-dev.evcard.vip:8088/',
                target: 'http://localhost:7001', //转发的目标服务器
                secure: false, //接受HTTPS服务器
                pathRewrite: { //路径重写 拦截本地的 /evcard-rest-api 重写为 '/evcard-rest-api' 再向目标服务器请求数据
                    '^/egg': ''
                }
            }

        }
    },
    plugins: [
        new webpack.DefinePlugin({
            metadata: JSON.stringify(metadata)
        })
    ]
})