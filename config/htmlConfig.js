const resolve = require('path').resolve;

let pageTitle = '钱庄理财';

let htmlConfig = [
    {
        name: 'index',
        title: pageTitle,
        entrySrc: resolve(__dirname, '../src/main.js')
    }
];
module.exports = htmlConfig;