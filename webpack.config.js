const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const url = require('url');
const publicPath = '/accountBorrow/';

module.exports = {
    // devtool: "#inline-source-map",
    // devtool: 'source-map',
    entry: {
        accountBorrow: './src/entry/accountBorrow.js',
        'accountBorrow/login': './src/entry/accountBorrow/login.js',
        'accountBorrow/forgot': './src/entry/accountBorrow/forgot.js',
        vendor: './src/entry/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'views/static/accountBorrow/build'),
        filename: 'js/[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: publicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[hash:8].[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style/styles.css"),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    ],
    resolve: {
        alias: {
            components: path.resolve(__dirname, './src/components'),
            common: path.resolve(__dirname, './src/common'),
            image: path.resolve(__dirname, './src/image'),
            plugins: path.resolve(__dirname, './src/plugins'),
            style: path.resolve(__dirname, './src/style')
        }
    },
    // devServer: {
    //     host: '127.0.0.1',
    //     port: 3000,
    //     contentBase: '/dist',
    //     public: 'auth.web.local.91fuqian.com:3000',
    //     // public: 'auth.web.local.qian360.com:3000',
    //     proxy: {
    //         "/api/auth": {
    //             target: "http://auth.test.91fuqian.com",
    //             // target: "http://auth.test.qian360.com",
    //             changeOrigin: true,
    //             // target: "http://127.0.0.1:3001",
    //             pathRewrite: {"^/api" : ""}
    //         },
    //         "/api/mgr": {
    //             // target: "http://10.0.0.3:7777/mockjsdata/29",
    //             target: "http://test.91fuqian.com",
    //             changeOrigin: true
    //         }
    //     }
    // }
};