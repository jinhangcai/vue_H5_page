import Vue from 'vue'
import App from './App'

import router from './router'
import httpPlugin from './plugins/httpPlugin';
import utilsPlugin from './plugins/utilsPlugin';

httpPlugin(router);
utilsPlugin(router);

import 'style/common.scss';
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
