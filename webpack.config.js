/// <reference path="typings/index.d.ts" />

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
        alltypes: path.join(__dirname, 'js/alltypes.js'),
        createnewone: path.join(__dirname, 'js/createnewone.js')
    },
    output: {
        path: path.join(__dirname, 'dist/'),
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
        enforceExtension: false
    },

    plugins: [
        new CopyFilesPlugin([
            //{ from: 'img', to: path.resolve(__dirname, 'dist/img') },
            { from: 'html/index.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/login.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/alltypes.html', to: path.resolve(__dirname, 'dist/') },
            { from: 'html/createnewone.html', to: path.resolve(__dirname, 'dist/') }

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