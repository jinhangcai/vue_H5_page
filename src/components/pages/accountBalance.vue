<template>
    <div v-if="!loading"  class="accountBalance viewport" :style="{minHeight: minHeight}">
        <div class="header">
            <div class="label">可用余额(元)</div>
            <div class="balance__spc">{{canUserAmount | k2d}}</div>
            <div class="info-item">投资冻结金额:{{investFreezeAmount | k2d}}元 <i class="iconfont icon-query" @click="openTips"></i></div>
            <div class="info-item">提现中金额:{{withdrawAmount | k2d}}元</div>
        </div>
        <div class="content">
            <h2 class="title"><i class="iconfont icon-purse"></i>手续费</h2>
            <p>您充值过后没有用于投资的金额，提现时平台将收取0.25%的转账手续费</p>
            <p>手续费=(提现金额-可免费提现额度)*0.25%，最低1元，包含小数点则四舍五入</p>
        </div>
        <div class="fixed-bar">
            <div class="operator-bar" @click="$pageTo('http://a.app.qq.com/o/simple.jsp?pkgname=com.qz.qian&ckey=CK1304356609522')">去钱庄理财APP提现</div>
            <!--<div v-if="canUserAmount" class="operator-bar" @click="$pageTo('http://a.app.qq.com/o/simple.jsp?pkgname=com.qz.qian&ckey=CK1304356609522')">去钱庄理财APP提现</div>-->
            <!--<div v-else class="operator-bar disabled">提现</div>-->
        </div>
    </div>
</template>

<script>
    import {Toast, MessageBox, Indicator } from 'mint-ui';
    export default {
        name: 'accountBalance',
        data () {
            return {
                loading: true,
                minHeight: 'auto',
                canUserAmount: 0,
                investFreezeAmount: 0,
                withdrawAmount: 0,
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
            Indicator.open();
            this.getAccountBalanceData();
        },
        methods: {
            getAccountBalanceData(){
                this.$http({
                    url: this.$urls.balance,
                    method: 'get',
                    data: {
                        service: 'asset.balance'
                    }
                }).then( response => {
                    let data = response.data;
                    this.canUserAmount = data.canUserAmount;
                    this.investFreezeAmount = data.investFreezeAmount;
                    this.withdrawAmount = data.withdrawAmount;
                    this.finish();
                }).catch( e => {
                    MessageBox.alert(e.resultMsg);
                });
            },
            finish(){
                this.loading = false;
                Indicator.close();
            },
            openTips(){
                MessageBox.alert('投资处理成功前，所投金额处于冻结状态。')
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .accountBalance{
        box-sizing: border-box;
        background-color: #f2f2f2;
        padding-bottom: 1rem;
        .header{
            background-color: #f35343;
            padding: .3rem;
            color: #fff;
            .label{
                font-size: .28rem;
                line-height: .44rem;
            }
            .balance__spc{
                font-size: .9rem;
                line-height: 1rem;
            }
            .info-item{
                font-size: .24rem;
                line-height: .36rem;
                color: #ffb8b1;
            }
        }
        .content{
            padding: .3rem;
            .title{
                font-size: .28rem;
                color: #666;
                line-height: .54rem;
                margin-bottom: .1rem;
            }
            p{
                font-size: .24rem;
                line-height: .34rem;
                color: #999;
                margin-bottom: .34rem;
            }
        }
        .fixed-bar{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
        }
        .operator-bar{
            background-color: #f35343;
            font-size: .36rem;
            line-height: 1rem;
            height: 1rem;
            text-align: center;
            color: #fff;
            &.disabled{
                opacity: .3;
            }
        }
    }
</style>
