// 生成压缩打包生产文件。
var baseWebpackConfig = require('./webpack.base.conf');
var merge = require('webpack-merge');
var CleanPlugin = require('clean-webpack-plugin'); //删除插件
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制插件
var path = require('path');
var webpack = require('webpack');
var config = require('../config/index.js');
var metadata = {
    build_env: 'build',
    apiHost: config.build.apiHost
};
module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../dist/'), //打包后的文件存放的地方
        publicPath: '/dist/'
    },
    plugins: [

        new CleanPlugin(['dist'], { //要删除的文件夹和文件数组 地址相对于 root。
            root: process.cwd(), //根目录 表示输入命令的位置
        }),
        new webpack.DefinePlugin({
            metadata: JSON.stringify(metadata)
        }),
        new CopyWebpackPlugin([{
            from: './app/js/lib', //复制lib里面的文件
            to: './js/lib' //拷贝到 lib文件夹
        }]),
    ]

})