const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var helpers = require('../config/helpers.js');
var getEntry = helpers.getEntry;
const { VueLoaderPlugin } = require('vue-loader');
var path = require('path')
var entries = getEntry(['./app/module/**/*.js']); // 获得入口js文件
console.log(entries);
module.exports = {
    devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
    entry: {
        main: "./app/main.js",
        ...entries
        //test: './app/module/test/test.js'
    },
    output: {

        filename: "js/[name].[hash].js", //打包后输出文件的文件名
        //   publicPath: "/", //资源的顶级目录 相对于服务器地址 开发环境是 "/" 服务器则应该是"/dist/"  和path里面最后一个目录
    },
    resolve: { //解析
        alias: {
            'vue': 'vue/dist/vue.min.js',
            "@": path.join(__dirname, '..', 'app')
        }
    },
    module: {
        rules: [
            { test: /\.(png|jpg)$/, loader: "url-loader?limit=10000&name=./img/[name].[ext]" },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            { test: /\.(woff|woff2|eot|ttf|svg|otf|ttc)(\?.*$|$)/, loader: 'file-loader?importLoaders=1&limit=1000&name=./fonts/[name].[ext]' },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader!autoprefixer-loader?{browsers:['last 2 version', 'Firefox 15','Chrome 20' ,'Explorer 8']}"
                })
            },
        ]
    },

    plugins: [
        new ExtractTextPlugin("css/[name].[hash].css"), //生成css文件的 生成的位置相对于 path的目录
        new VueLoaderPlugin(), //相应的插件使用VUE-loader

        new HtmlWebpackPlugin({
            filename: './index.html', //生成的html存放路径，相对于 path
            template: './app/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true,
            chunks: ['main']
        }),
        // new HtmlWebpackPlugin({
        //     filename: './test.html', //生成的html存放路径，相对于 path
        //     template: './app/module/test/test.html', //html模板路径
        //     inject: true, //允许插件修改哪些内容，包括head与body
        //     hash: true,
        //     chunks: ['test'], //对应入口里面的 js entry
        //     excludeChunks: [] ////在生成的html引入不包括某个js 外的所有js文件
        // })

    ].concat(concatHtmlWebpackPlugin())

}

function concatHtmlWebpackPlugin() {
    var entriesHtml = getEntry(['./app/module/**/*.html']);
    var res = [];
    for (var i in entriesHtml) {
        var html = entriesHtml[i];
        console.log(i);
        console.log(html);
        console.log('.' + html.substring(html.lastIndexOf('/')))
        var obj = new HtmlWebpackPlugin({
            filename: '.' + html.substring(html.lastIndexOf('/')),
            template: html, //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true,
            chunks: [i]
        })
        res.push(obj)
    }
    return res
}