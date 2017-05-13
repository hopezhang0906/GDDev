var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var CopyFilesPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('webpack-uglify-js-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: path.join(__dirname, 'js/index.js'),
        login: path.join(__dirname, 'js/login.js'),
        createnewone: path.join(__dirname, 'js/createnewone.js'),
        projectDetail: path.join(__dirname, 'js/projectDetail.js'),
        profile: path.join(__dirname, 'js/profile.js')
        //Server
        //database: path.join(__dirname, 'js/server/database.js'),
        //server: path.join(__dirname, 'js/server/server.js')
    },
    output: {
        path: path.join(__dirname, 'dist/public/'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.(jpeg|jpg|png|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.es6', 'json: false', 'ts', 'less'],
        alias: {
         'vue$': 'vue/dist/vue.common.js'
        },
        enforceExtension: false
    },

    plugins: [
        new CopyFilesPlugin([
            { from: 'img', to: path.resolve(__dirname, 'dist/public/img') },
            { from: 'html/index.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/login.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/createnewone.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/projectDetail.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'js/server', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/profile.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/editProject.html', to: path.resolve(__dirname, 'dist/') }

        ], {
            ignore: [
                '*.gitignore',
                '.*',
            ],
            copyUnmodified: true,
            debug: 'warning'
        }),
        new UglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, 'public/chached_uglify'),
            debug: true,
            minimize: false,
            sourceMap: true,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false
        })
    ]
}