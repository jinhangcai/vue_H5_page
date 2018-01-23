<template>
    <div v-if="!pageLoading" class="repaymentPlan viewport" :style="{minHeight: minHeight}">
        <div class="total">共回款本金{{capital}}元，收益{{interest}}元</div>
        <div class="step-wrapper" v-if="list.length > 0">
            <div class="step-item done">
                <div class="step-label"><i class="iconfont icon-tick-solid"></i></div>
                <div class="step-title">{{investTime | filterMoment('YYYY-MM-DD')}}</div>
                <div class="step-description">开始计息</div>
            </div>
            <div v-for="item in list" class="step-item" :class="{'done': item.isRepaid === 1}">
                <div class="step-label"><i class="iconfont icon-tick-solid"></i></div>
                <div class="step-title">{{item.repayDate | filterMoment('YYYY-MM-DD')}}第{{item.period}}期回款</div>
                <div class="step-description">本金{{item.capital}}元，收益{{item.interest}}元</div>
            </div>
        </div>
        <div class="explain">
            <p>*如遇还款当月无对应还款日，则还款日为当月最后1日 <br>
                *若投资当天非项目发布日，会扣除投资日与项目发布日之间产生的收益，使得第1期还款金额略有不同</p>
        </div>
    </div>
</template>

<script>
    import pageLoading from '../loading/index';
    import {Toast, MessageBox } from 'mint-ui';

    export default {
        name: 'repaymentPlan',
        mixins: [pageLoading],
        data () {
            return {
                id: '',
                capital: 0,
                interest: 0,
                investTime: '',
                list: [],
                minHeight: 'auto',
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
            this.id = this.$route.query.id;
            this.investTime = Number(this.$route.query.investTime);
            this.getRepaymentPlanData();
        },
        methods: {
            getRepaymentPlanData(){
                this.$http({
                    url: this.$urls.repaymentPlan,
                    method: 'get',
                    data: {
                        service: 'myinvest.refund.plan',
                        tenderId: this.id
                    }
                }).then( response => {
                    this.list = response.data;
                    this.computerTotal();
                    this.$finish();

                }).catch( e => {
                    MessageBox.alert(e.resultMsg);
                    this.$finish();
                });
            },
            computerTotal(){
                let capital = 0,
                    interest = 0;

                this.list.forEach( item => {
                    capital += item.capital;
                    interest += item.interest;
                });
                this.capital = capital.toFixed(2);
                this.interest = interest.toFixed(2);
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .repaymentPlan{
        background-color: #f6f6f6;
        .total{
            height: .86rem;
            line-height: .86rem;
            font-size: .28rem;
            color: #666;
            padding-left: .3rem;
        }
        .step-wrapper{
            background-color: #fff;
            padding: 0 .3rem .42rem;
            border: solid #e6e6e6;
            border-width: 1px 0;
        }
        .step-item{
            position: relative;
            padding: .46rem 0 .14rem .66rem;
            &:first-child{
                .step-label{
                    &::before{
                        top: 50%;
                        height: 50%;
                    }
                }
            }
            &:last-child{
                .step-label{
                    &::before{
                        top: 0;
                        height: 50%;
                    }
                }
            }
            &.done{
                .step-label{
                    .iconfont{
                        color: #4ec399;
                    }
                    &::before{
                        background-color: #4ec399;
                    }
                }
            }
        }
        .step-label{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            .iconfont{
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate(0 ,-50%);
                z-index: 2;
                font-size: .4rem;
                color: #bbb;
                background-color: #fff;
            }
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: .18rem;
                height: 100%;
                width: .04rem;
                background-color: #bbb;
            }
        }
        .step-title{
            font-size: .28rem;
            color: #333;
            line-height: .34rem;
        }
        .step-description{
            font-size: .24rem;
            color: #999;
            line-height: .3rem;
        }
        .explain{
            padding: .3rem;
            font-size: .22rem;
            color: #999;
            line-height: .38rem;
        }
    }
</style>
