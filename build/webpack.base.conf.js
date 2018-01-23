const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const url = require('url');
const publicPath = '/';


const htmlConfig = require('../config/htmlConfig.js');

let entrys = {vendor: './src/vendor.js'};
let htmlPlugins = [];
htmlConfig.forEach((page) => {
    entrys[page.name] = page.entrySrc;
    htmlPlugins.push(new HtmlWebpackPlugin({
        template: page.template || './src/index.html',
        title: page.title || '钱庄理财',
        filename: page.filename || page.name + '.html',
        chunks: ['vendor', 'manifest', page.name]
    }))
});
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: entrys,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        publicPath: publicPath
    },
    module: {
        rules: [
            {
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
                        limit: 10000
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.[chunkhash].css"),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    ].concat(htmlPlugins),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            components: path.resolve(__dirname, '../src/components'),
            common: path.resolve(__dirname, '../src/common'),
            plugins: path.resolve(__dirname, './src/plugins'),
            image: path.resolve(__dirname, '../src/static/image'),
            font: path.resolve(__dirname, '../src/static/font'),
            style: path.resolve(__dirname, '../src/static/style')
        }
    },

};