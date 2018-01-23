import Vue from 'vue'
import Cookies from 'js-cookie'
import http from 'common/http'
import urls from 'common/urls'
import * as filters from 'common/filters'
import {Indicator, MessageBox } from 'mint-ui';
import {isApp, nativePage, webPage, nativeLogin, nativeProductList, nativeUserAccount, nativePageHistory} from 'common/nativeUtils'
function utilsPlugin(router){
    let plugin = {};
    plugin.install = (Vue, options) => {
        // 3. 注入组件
        Vue.mixin({
            beforeDestroy(){
                this.$nextTick(() => {
                    Indicator.close();
                    MessageBox.close();
                });
            },
            methods: {
                $formPost(url, data, cb, target){
                    let form = document.createElement('form');
                    form.setAttribute('method', 'post');
                    target && form.setAttribute('target', target);
                    form.setAttribute('action', url);

                    for(let key in data){
                        let ipt = document.createElement('input');
                        ipt.setAttribute('type', 'hidden');
                        ipt.setAttribute('name', key);
                        ipt.value = data[key];
                        form.appendChild(ipt);
                    }

                    document.body.appendChild(form);
                    form.submit();
                    document.body.removeChild(form);
                    setTimeout(function(){
                        //ios中通过后退按钮返回页面是不刷新的 所以弹出遮罩进行手动刷新
                        MessageBox({
                            title: '提示',
                            message: '是否操作成功?',
                            showCancelButton: true,
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                        }).then(action => {
                            location.reload()
                        });
                    }, 3000);
                    if(cb){
                        setTimeout(cb, 200)
                    }
                },
                $checkLogin(){
                    return Cookies.get('qz_h5_phone') && Cookies.get('qz_h5_oauthToken')
                },
                // 获取用户数据
                $getUserInfo(){
                    return http({
                        url: urls.userInfo,
                        method: 'get',
                        data: {
                            service: 'userInfo'
                        }
                    })
                },
                // 页面跳转
                $pageLogin(redirectURL){
                    if(isApp){
                        nativeLogin()
                    }else{
                        if(redirectURL){
                            Cookies.set('redirectURL', redirectURL)
                        }
                        router.replace({name: 'login'})
                    }
                },
                $pageTo(url, title){
                    if(isApp){
                        webPage(url, title)
                    }else{
                        location.href = url
                    }
                },
                $pageProduct(id){
                    router.push({name: 'product', query: {id: id}})
                },
                $pageBankCard(){
                    router.push({name: 'bankCard'})
                },
                $pageAccountBalance(){
                    router.push({name: 'accountBalance'})
                },
                $pageTenderRecord(){
                    router.push({name: 'tenderRecord'})
                },
                $pageTenderRecordDetail(id){
                    router.push({name: 'tenderRecordDetail', query: {id: id}})
                },
                $pageRepaymentPlan(query){
                    router.push({name: 'repaymentPlan', query: query})
                },
                $pageCardPack(){
                    router.push({name: 'cardPack'})
                },
                $pageMediaDetail(id){
                    router.push({name: 'mediaDetail', query: {id: id}})
                },
            },
            filters: filters
        })
    };

    Vue.use(plugin);
}

export default utilsPlugin;
