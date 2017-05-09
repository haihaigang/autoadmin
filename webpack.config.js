var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('./package.json');

var __DEV__ = process.env.NODE_ENV !== 'production';

var config = {
    context: path.resolve(__dirname, "src/"),
    entry: {
        app: ["./app.jsx"],
        commons: ["react", "antd", "react-router", "flux"]
    },
    output: {
        path: path.join(__dirname, "build/assets"),
        filename: __DEV__ ? "[name].js" : "[name].[hash].js",
        publicPath: "/assets/",
        chunkFilename: "[id].[hash].js",
        pathinfo: true
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: [
                        ['import', {
                            libraryName: "antd"
                        }],
                        'add-module-exports',
                        'transform-decorators-legacy'
                    ]
                }
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.s(a|c)ss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: "file-loader"
        }, {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 60000
                }
            }]
        }]
    },
    resolve: {
        
        extensions: ['.js', '.jsx', '.sass', '.less', '.png', '.jpg', '.gif', '.eot', '.woff', '.svg', '.ttf']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['commons'],
            filename: __DEV__ ? "base/[name].js" : "base/[name].[hash].js",
            minChunks: 3,
        }),
        new ExtractTextPlugin({
            filename: __DEV__ ? "[name].css" : "[name].[hash].css",
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development'),
            "process.env.abc": 1
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: '后台管理系统v' + package.version,
            template: './index.ejs',
            filename: '../index.html',
            name: package.name,
            description: package.description,
            version: package.version,
            // hash: hash,
            author: package.author,
            time: getDate()
        })
    ]
}


function getDate() {
    var date = new Date();
    return date.getFullYear() + '-' + getFullNum(date.getMonth() + 1) + '-' + getFullNum(date.getDate()) + ' ' + getFullNum(date.getHours()) + ':' + getFullNum(date.getMinutes()) + ':' + getFullNum(date.getSeconds());
}

function getFullNum(n) {
    return n < 10 ? '0' + n : n;
}

if (!__DEV__) {
    // 压缩 js, css
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 50})
    );
}

module.exports = config;
