const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const publicPath = '/';

let env = process.env.NODE_ENV || 'prod';

const devWebpackConfig = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: publicPath
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NormalModuleReplacementPlugin(/(.*)hosts\.js$/, './hosts.'+env+'.js')
    ]
});

module.exports = devWebpackConfig;