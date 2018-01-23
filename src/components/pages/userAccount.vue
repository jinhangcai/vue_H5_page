<template>
    <div v-if="!pageLoading" class="userAccount viewport" :style="{minHeight: minHeight}">
        <div class="header">
            <div class="top">
                <div class="label">总资产(元)</div>
                <div class="content content__spc">{{detail.totalAssets | k2d}}</div>
                <div class="label">已到账收益(元)</div>
                <div class="content">{{detail.incomeEarnings | k2d}}</div>
            </div>
            <div class="bottom">
                <div class="row-item">
                    <div class="label">在投本金(元)</div>
                    <div class="content">{{detail.investingCapital | k2d}}</div>
                </div>
                <div class="row-item">
                    <div class="label">待收收益(元)</div>
                    <div class="content">{{detail.waitInterest | k2d}}</div>
                </div>
            </div>
        </div>
        <div class="account-list">
            <div class="account-item" @click="$pageTenderRecord">
                <i class="item-label iconfont icon-invest-list"></i>
                <div class="content">
                    <span>投资记录</span>
                    <span class="text-right">{{detail.waitFefundCount}}笔待还款</span>
                    <i class="iconfont  icon-arrow-right"></i>
                </div>
            </div>
            <div class="account-item" @click="$pageAccountBalance">
                <i class="item-label iconfont icon-wing"></i>
                <div class="content">
                    <span>存管账户余额</span>
                    <span class="text-right">{{detail.canUserBalance | k2d}}元</span>
                    <i class="iconfont  icon-arrow-right"></i>
                </div>
            </div>
            <div class="account-item" @click="$pageCardPack">
                <i class="item-label iconfont icon-envelope"></i>
                <div class="content">
                    <span>我的劵包</span>
                    <i class="iconfont  icon-arrow-right"></i>
                </div>
            </div>
            <div class="account-item" @click="$pageBankCard">
                <i class="item-label iconfont icon-bankCard"></i>
                <div class="content">
                    <span>存管账户银行卡</span>
                    <span v-if="!detail.bindBankCard" class="text-right">未绑卡</span>
                    <i class="iconfont  icon-arrow-right"></i>
                </div>
            </div>
        </div>
        <div class="fixed-bar">
            <tabNav></tabNav>
        </div>
    </div>
</template>

<script>
    import pageLoading from '../loading/index';
    import tabNav from '../tabNav';
    import {Toast, MessageBox } from 'mint-ui';
    export default {
        name: 'userAccount',
        mixins: [pageLoading],
        data () {
            return {
                minHeight: 'auto',
                detail: {}
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
            if(!this.$checkLogin()){
                this.$pageLogin(location.href);
            }else{
                this.getAccountData();
            }
        },
        methods: {
            getAccountData(){
                this.$http({
                    url: this.$urls.userAccount,
                    method: 'get',
                    data: {
                        service: 'asset.collect'
                    }
                }).then( response => {
                    this.detail = response.data;
                    this.$finish();

                }).catch( e => {
                    MessageBox.alert(e.msg || '系统错误，请稍后再试');
//                    this.$finish();
                });
            }
        },
        components: {
            tabNav
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .userAccount{
        background-color: #f6f6f6;
        padding-bottom: .9rem;
        box-sizing: border-box;
        .header{
            background-color: #f05f3e;
            text-align: center;
            .label{
                height: .36rem;
                font-size: .24rem;
                color: #fff;
                line-height: .36rem;
            }
            .content{
                height: .46rem;
                font-size: .38rem;
                line-height: .46rem;
                color: #fff;
            }
            .content__spc{
                font-size: .9rem;
                height: .95rem;
                line-height: .95rem;
                margin-bottom: .2rem;
            }
            .top{
                box-sizing: border-box;
                height: 3.16rem;
                padding-top: .64rem;
                border-bottom: 1px solid #f96e5f;
            }
            .bottom{
                display: flex;
                align-items: center;
                padding: .4rem 0 .24rem;
                .row-item{
                    flex: 1 1 auto;
                    .content{
                        height: .5rem;
                        line-height: .5rem;
                    }
                }
            }
        }
        .account-list{
            margin: .2rem 0;
            background-color: #fff;
            .account-item{
                & + .account-item{
                    border-top: 1px solid #d5d5d5;
                }
                position: relative;
                margin-left: 1rem;
                height: .95rem;
                .item-label{
                    position: absolute;
                    top: 50%;
                    left: -.7rem;
                    transform: translate(0, -50%);
                    font-size: .4rem;
                    color: #f35343;
                }
                .content{
                    display: flex;
                    padding-right: .3rem;
                    height: 100%;
                    align-items: center;
                    font-size: .28rem;
                    color: #333;
                    span{
                        flex: 1;
                    }
                    .text-right{
                        flex: 0 0 auto;
                        text-align: right;
                    }
                    .iconfont{
                        flex: 0 0 auto;
                        color: #bbb;
                        margin-left: .28rem;
                    }
                }
            }
        }
    }
</style>
