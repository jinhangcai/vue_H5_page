const path = require('path');
const rm = require('rimraf');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

rm(path.resolve(__dirname, '../dist'), err => {
    if(err) throw err;
    console.log('remove dist done.');
    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        console.log('start..........................................');

        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
                chunks: false,
                chunkModules: false
            }) + '\n\n');

        console.log('end..........................................');

        if (stats.hasErrors()) {
            process.exit(1)
        }
    });
});