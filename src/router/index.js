import Vue from 'vue'
import Router from 'vue-router'

import Index from 'components/pages/index'
import Products from 'components/pages/products'
import UserAccount from 'components/pages/userAccount'
import UserInfo from 'components/pages/userInfo'
import product from 'components/pages/product'
import proInvestRecord from 'components/pages/proInvestRecord'
import proMoreInfo from 'components/pages/proMoreInfo'
import proEnsure from 'components/pages/proEnsure'
import proRepaymentExplain from 'components/pages/proRepaymentExplain'
import pageProBuy from 'components/pages/pageProBuy'
import Login from 'components/pages/login'
import FindPasswd from 'components/pages/findPasswd'
import BankCard from 'components/pages/bankCard'
import AccountBalance from 'components/pages/accountBalance'
import TenderRecord from 'components/pages/tenderRecord'
import TenderRecordDetail from 'components/pages/tenderRecordDetail'
import RepaymentPlan from 'components/pages/repaymentPlan'
import CardPack from 'components/pages/cardPack'
import ModPasswd from 'components/pages/modPasswd'
import AboutUs from 'components/pages/aboutUs'
import MediaDetail from 'components/pages/mediaDetail'
import myCenter from 'components/pages/myCenter'
import help from 'components/pages/help'

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/products',
            name: 'products',
            component: Products
        },
        {
            path: '/userAccount',
            name: 'userAccount',
            component: UserAccount
        },
        {
            path: '/userInfo',
            name: 'userInfo',
            component: UserInfo
        },
        {
            path: '/product',
            name: 'product',
            component: product
        },
        {
            path: '/proInvestRecord',
            name: 'proInvestRecord',
            component: proInvestRecord
        },
        {
            path: '/proMoreInfo',
            name: 'proMoreInfo',
            component: proMoreInfo
        },
        {
            path: '/proEnsure',
            name: 'proEnsure',
            component: proEnsure
        },
        {
            path: '/proRepaymentExplain',
            name: 'proRepaymentExplain',
            component: proRepaymentExplain
        },
        {
            path: '/pageProBuy',
            name: 'pageProBuy',
            component: pageProBuy
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/findPasswd',
            name: 'findPasswd',
            component: FindPasswd
        },
        {
            path: '/bankCard',
            name: 'bankCard',
            component: BankCard
        },
        {
            path: '/accountBalance',
            name: 'accountBalance',
            component: AccountBalance
        },
        {
            path: '/tenderRecord',
            name: 'tenderRecord',
            component: TenderRecord
        },
        {
            path: '/tenderRecordDetail',
            name: 'tenderRecordDetail',
            component: TenderRecordDetail
        },
        {
            path: '/repaymentPlan',
            name: 'repaymentPlan',
            component: RepaymentPlan
        },
        {
            path: '/cardPack',
            name: 'cardPack',
            component: CardPack
        },
        {
            path: '/modPasswd',
            name: 'modPasswd',
            component: ModPasswd
        },
        {
            path: '/aboutUs',
            name: 'aboutUs',
            component: AboutUs
        },
        {
            path: '/mediaDetail',
            name: 'mediaDetail',
            component: MediaDetail
        },
        {
            path: '/myCenter',
            name: 'myCenter',
            component: myCenter
        }
        ,
        {
            path: '/help',
            name: 'help',
            component: help
        }

    ],
});
let pageTitle = {
    index: '首页',
    products: '理财产品',
    userAccount: '资产',
    userInfo: '我',
    product: '产品详情',
    proInvestRecord: '投资记录',
    proMoreInfo: '项目详情',
    proEnsure: '帮助中心',
    proRepaymentExplain: '提前还款说明',
    pageProBuy: '投资',
    login: '登录',
    findPasswd: '重置密码',
    bankCard: '我的银行卡',
    accountBalance: '存管账户余额',
    tenderRecord: '投资记录',
    tenderRecordDetail: '投资详情',
    repaymentPlan: '回款计划',
    cardPack: '我的卷包',
    modPasswd: '修改登录密码',
    aboutUs: '关于我们',
    mediaDetail: '钱庄理财',
    myCenter: '个人信息',
    help: '安全保障',
};

router.beforeEach( (to, from, next) => {
    // 更改路由标题
    let pageName = to.name;
    document.title = pageTitle[pageName] || '钱庄理财';
    // 滚动后 下个页面 不在顶部的问题
    document.documentElement.scrollTop = 0;
    next();
});
export default router;
