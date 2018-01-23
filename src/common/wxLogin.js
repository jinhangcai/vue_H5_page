import Cookie from 'js-cookie';
import hosts from 'common/hosts';

// 在微信中未登录下自动登陆
// 未经过wxLogin 登陆过
export default function () {
    let isWx = (function(){
        let ua = navigator.userAgent.toLowerCase();
        return isWx = ua.match(/MicroMessenger/i) == "micromessenger";
    })();
    let isLoginPage = /login/ig.test(location.href);
    function isLogin(){
        return Cookie.get('qz_h5_phone') && Cookie.get('qz_h5_oauthToken')
    }
    if (isWx && !isLoginPage && !Cookie.get('wxLogin') && !isLogin()){
        location.replace(hosts.pc + '/activity/monthlyActivity/index.html?returnUrl=wxbind/interlayer&wxLogin=true&redirect='+encodeURIComponent(location.href))
    }else{
        return true;
    }
}