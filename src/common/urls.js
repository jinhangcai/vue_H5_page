let ajaxUrls = {
    phoneCheck: '/api/h5/v3/user/phoneCheck',
    sendPhoneCode: '/api/h5/v3/user/sendPhoneCode',
    register: '/api/h5/v3/user/register',
    login: '/api/h5/v3/user/login',
    findLoginPwd: '/api/h5/v3/user/findLoginPwd',
    modPasswd: '/api/h5/v3/user/modifyLoginPwd',
    userInfo: '/api/h5/v3/user/userInfo',
    bankCard: '/api/h5/v3/bankCard/getBankCard',
    bindBankCard: '/api/h5/v3/bankCard/bindBankCard',
    financiallist:'/api/h5/v3/financial/list',       //投资产品列表
    financialinfo:'/api/h5/v3/financial/info',      //投资产品详情
    financialmoreInfo:'/api/h5/v3/financial/moreInfo',   //投资产品详情-了解详情
    financialtenderList:'/api/h5/v3/financial/tenderList',   //投资列表
    registeToBankDepository:'/api/h5/v3/user/registeToBankDepository',   //注册/激活存管
    tradeprepare:'/api/h5/v3/trade/prepare',                //投资页接口
    tradepay:'/api/h5/v3/trade/pay',                    //确认支付接口
    userlogout:'/api/h5/v3/user/logout',
    home: '/api/h5/v3/home',
    tenderRecord: '/api/h5/v3/myinvest/list',
    tenderDetail: '/api/h5/v3/myinvest/detail',
    packList: '/api/h5/v3/redpacket/list',
    couponList: '/api/h5/v3/coupon/list',
    userAccount: '/api/h5/v3/asset/collect',
    repaymentPlan: '/api/h5/v3/myinvest/refundPlan',
    balance: '/api/h5/v3/asset/balance',

    //媒体报道 老接口
    mediaList: '/api/common/mediaList.html',
    mediaDetail: '/api/common/mediaDetail.html',

    //外部页面地址
    protocolForHtml: '/wap/trade/protocolForHtml.html',

    appId: '20150720145313251618',
};
// const prefix = '/api';
// function urlPrefix(obj){
//     let keys = Object.keys(obj);
//     keys.forEach((item) => {
//         if(typeof obj[item] === 'string'){
//             obj[item] =  prefix + obj[item];
//         }else{
//             urlPrefix(obj[item])
//         }
//     })
// }
// urlPrefix(ajaxUrls);
export default ajaxUrls;