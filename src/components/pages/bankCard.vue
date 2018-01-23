<template>
    <div v-if="!loading" class="bankCard viewport" :style="{minHeight: minHeight}">
        <div class="bankCard-wrapper">
            <div v-if="xwBankStatus === 0" class="card-box card-box__default" @click="bindCard">
                <div class="plus"></div>
                <div class="text">添加银行卡</div>
            </div>
            <div v-if="xwBankStatus === 1" class="card-box card-box__bank">
                <div class="title">
                    <div class="pic bank-icon" :class="[cardInfo.logoCss]"></div>
                    {{cardInfo.bankName}}
                </div>
                <div class="num">
                    **** **** **** {{cardInfo.cardNum | secretCardNum}}
                </div>
            </div>
            <div class="warning">资金为同卡进出，只能使用一张卡</div>
        </div>
        <div class="notification" v-if="cardInfo.bankCardChannelStatus === 0">银行维护中，维护时间：{{cardInfo.maintenanceStart}}至{{cardInfo.maintenanceEnd}}</div>
        <div class="info">
            <div class="info-item">
                <div class="label">单笔限额</div>
                <div class="content">{{cardInfo.singleLimit | milliFormat}}元</div>
            </div>
            <div class="info-item">
                <div class="label">单日限额</div>
                <div class="content">{{cardInfo.dailyLimit | milliFormat}}元</div>
            </div>
        </div>
        <div class="tips">钱庄理财APP客户端支持更换银行卡</div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import uiButton from '../button/index';
    import field from '../field/index';
    import countDownBtn from '../countDownBtn/index';
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    import encryptedPwd from 'common/encryptPwd';

    export default {
        name: 'bankCard',
        data () {
            return {
                minHeight: 'auto',
                loading: true,
                xwBankStatus: 0,
                cardInfo: {
                    bankCardChannelStatus: null,
                    bankName: "",
                    cardNum: "",
                    dailyLimit: 0,
                    logoCss: "",
                    singleLimit: 0,
                    maintenanceStart: '',
                    maintenanceEnd: ''
                }
            }
        },
        mounted(){
            Indicator.open();
            this.minHeight = document.documentElement.clientHeight + 'px';
            this.$getUserInfo().then(response => {
                if(response.code === 'success' || response.resultCode === 1){
                    let data = response.data;
                    this.xwBankStatus = data.xwBankStatus;
                    if(this.xwBankStatus === 1){
                        this.getBankCardInfo();
                    }else{
                        this.finish();
                    }
                }else{
                    Indicator.close();
                    MessageBox.alert(response.msg).then(action => {});
                }
            }).catch(e => {
                MessageBox.alert(e.msg || '系统错误，请稍后再试').then(action => {});
            });
        },
        filters: {
            secretCardNum(val){
                return val.substr(val.length - 4)
            }
        },
        methods:{
            bindCard(){
                Indicator.open();
                this.$http({
                    url: this.$urls.bindBankCard,
                    method: 'post',
                    data: {
                        service: 'bindBankCard'
                    }
                }).then( response => {
                    let data = response.data,
                        url = data.postUrl,
                        formData = data.reqDataPackage;
                    this.$formPost(url, formData);
                }).catch( e => {
                    if(e.code === 'user_not_register_bank_depository'){
                        this.depository();
                    }else{
                        Indicator.close();
                        MessageBox.alert(e.msg);
                    }
                });
            },
            getBankCardInfo(){
                this.$http({
                    url: this.$urls.bankCard,
                    method: 'get',
                    data: {
                        service: 'getBankCard'
                    }
                }).then( response => {
                    this.cardInfo = response.data;
                    this.finish();
                }).catch( e => {
                    MessageBox.alert(e.msg);
                });
            },
            finish(){
                this.loading = false;
                Indicator.close();
            },
            depository(){
                //开通存管
                this.$http({
                    method: 'post',
                    url: this.$urls.registeToBankDepository,
                    data:{
                        service:'registeToBankDepository'
                    }
                }).then( data => {
                    let url = data.data.postUrl,
                        formData = data.data.reqDataPackage;

                    this.$formPost(url, formData);

                    Indicator.close();
                }).catch( e => {
                    MessageBox.alert(e.msg);
                })
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .bankCard{
        position: relative;
        background-color: #f6f6f6;

        .bankCard-wrapper{
            padding: .4rem .3rem 0;
        }
        .card-box{
            height: 2.8rem;
            border-radius: .12rem;
        }
        .card-box__default{
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #fff;
            box-shadow: 0 0 1px 1px #e6e6e6;
            color: #77adf3;
            text-align: center;
            .plus{
                position: relative;
                height: .7rem;
                margin-bottom: .2rem;
                &::before{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    content: ' ';
                    width: .7rem;
                    height: .02rem;
                    background-color: #77adf3;
                }
                &::after{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    content: ' ';
                    height: .7rem;
                    width: .02rem;
                    background-color: #77adf3;
                }
            }
            .text{
                font-size: .28rem;
            }
        }
        .card-box__bank{
            box-sizing: border-box;
            padding: .4rem;
            background-color: #f35c3e;
            .title{
                display: flex;
                height: .7rem;
                font-size: .36rem;
                line-height: .7rem;
                color: #fff;
                font-weight: bold;
                margin-bottom: .26rem;
                .pic{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: .7rem;
                    height: .7rem;
                    background-color: #fff;
                    background-repeat: no-repeat;
                    /*background-position: center center;*/
                    background-size: 105%;
                    border-radius: .35rem;
                    margin-right: .22rem;
                }
            }
            .num{
                font-size: .55rem;
                color: #fff;
                line-height: .68rem;
            }
        }
        .warning{
            height: 1rem;
            line-height: 1rem;
            font-size: .24rem;
            color: #999;
        }
        .notification{
            text-indent: .3rem;
            height: .6rem;
            line-height: .6rem;
            font-size: .22rem;
            color: #77adf3;
            background-color: #e3f5ff;
        }
        .info{
            background-color: #fff;
            border: solid #e6e6e6;
            border-width: 1px 0;
            .info-item{
                margin-left: .3rem;
                padding-right: .3rem;
                height: .96rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: .24rem;
                color: #333;
                & + .info-item{
                    border-top: 1px solid #e6e6e6;
                }
            }
            .label{

            }
            .content{

            }
        }
        .tips{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1rem;
            font-size: .24rem;
            color: #999;
            line-height: 1rem;
            text-align: center;
        }

    }
</style>
