import Vue from 'vue'
import Cookies from 'js-cookie'
import http from 'common/http'
import urls from 'common/urls'
import {MessageBox} from 'mint-ui'
import {isApp, nativePage, webPage, nativeLogin, nativeProductList, nativeUserAccount, nativePageHistory} from 'common/nativeUtils'

function httpPlugin(router){

    // 页面跳转
    function pageLogin(redirectURL){
        if(isApp){
            nativeLogin()
        }else{
            if(redirectURL){
                Cookies.set('redirectURL', redirectURL)
            }
            router.replace({name: 'login'})
        }
    }
    let plugin = {};
    plugin.install = (Vue, options) => {
        Vue.prototype.$http = (opt) => {
            return http(opt).then(response => {
                if(opt.notCheckError){
                    return Promise.resolve(response)
                }
                if(response.code === 'success' || response.resultCode === 1){
                    return Promise.resolve(response)
                }else if(response.code === 'oauthToken_is_null' || response.code === 'login_expired'){
                    MessageBox.alert('登录已过期，请重新登录').then(action => {
                        pageLogin(location.href);
                    });

                    return Promise.reject(response);
                }else{
                    // MessageBox.alert(response.msg).then(action => {});
                    return Promise.reject(response)
                }
            })
        };
        Vue.prototype.$urls = urls;
    };

    Vue.use(plugin);
}

export default httpPlugin;
