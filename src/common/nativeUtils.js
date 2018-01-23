import hybridProtocol from 'common/native-calls';
import urlQuery from 'common/urlQuery'

// 是否来自 APP
let isApp = urlQuery.get('native_view');
let curPageUrl = location.href;

//跳转app原生页面
function nativePage (type, url){
    hybridProtocol({
        tagName: 'openNativePage',
        data: {
            type:type,
            url:url
        }
    });
}
// app中跳转非原生页面
function webPage(url, title){
    hybridProtocol({
        tagName: 'openWebPage',
        data: {
            title: title,
            url: url
        }
    });
}
//登陆
function nativeLogin(){
    nativePage('login', curPageUrl);
}
//产品列表
function nativeProductList(){
    nativePage('productList', curPageUrl);
}
//我的资产
function nativeUserAccount(){
    nativePage('userAccount', curPageUrl);
}
//页面记录
function nativePageHistory(num){
    hybridProtocol({
        tagName: 'history',
        data:{
            go:-(num || 1)
        },
        success: function (data) {},
        error: function (data) {}
    })
}

export {
    nativePage,
    webPage,
    nativeLogin,
    nativeProductList,
    nativeUserAccount,
    nativePageHistory,
    isApp,
}