<template>
    <div v-if="!pageLoading" class="tenderRecordDetail viewport" :style="{minHeight: minHeight}">
        <div class="row row__spc" :class="[repaymentStatus ? 'status-done' : 'status-pending']" @click="$pageProduct(detail.borrowId)">
            <div class="row-label">
                产品名称
            </div>
            <div class="row-content">
                {{detail.borrowName}}{{detail.repaymentType | repaymentType}} <i class="iconfont icon-arrow-right"></i>
            </div>
        </div>
        <div class="row-wrapper">
            <div class="row">
                <div class="row-label">
                    投资金额（元）
                </div>
                <div class="row-content">
                    {{detail.captial}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    待收收益（元）
                </div>
                <div class="row-content highlight">
                    {{detail.waitInterest}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    奖励收益（元）
                </div>
                <div class="row-content highlight">
                    {{award(detail.extraAward, detail.couponAward)}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    回款时间
                </div>
                <div class="row-content">
                    {{detail.repaymentTime | filterMoment('YYYY-MM-DD')}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    到期自动还款至
                </div>
                <div class="row-content">
                    {{detail.backPlace}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    付款方式
                </div>
                <div class="row-content">
                    {{detail.payType}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    订单编号
                </div>
                <div class="row-content">
                    {{detail.orderNo}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    投资时间
                </div>
                <div class="row-content">
                    {{detail.investTime | filterMoment('YYYY-MM-DD HH:mm')}}
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    回款计划
                </div>
                <div class="row-content">
                    <uiButton type="link" size="middle" @click="pageRepaymentPlan">查看</uiButton>
                </div>
            </div>
            <div class="row">
                <div class="row-label">
                    相关协议
                </div>
                <div class="row-content">
                    <uiButton type="link" size="middle" @click="pageProtocol">查看</uiButton>
                </div>
            </div>
        </div>
        <div v-if="repaymentStatus" class="detail-status status-done">
            <i class="iconfont icon-tick-solid"></i>
            {{detail.expireTimeTag}}
        </div>
        <div v-else class="detail-status status-pending">
            <i class="iconfont icon-clock-solid"></i>
            {{detail.expireTimeTag}}
        </div>
    </div>
</template>

<script>
    import pageLoading from '../loading/index';
    import {Toast, MessageBox } from 'mint-ui';
    import uiButton from '../button/index';
    import hosts from 'common/hosts';
    import qs from 'qs';
    import Cookie from 'js-cookie';
    export default {
        name: 'tenderRecordDetail',
        mixins: [pageLoading],
        data () {
            return {
                minHeight: 'auto',
                tenderId: '',
                repaymentStatus: false,
                detail: {}
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
            this.tenderId = this.$route.query.id;
            this.getInvestDetail();
        },
        filters: {
            repaymentType(val){
                let text = '';
                switch (val){
                    case 1:
                        text = '-等额本息';
                        break;
                    case 3:
                        text = '-按月付息';
                        break;
                    default:
                        text = '';
                }
                return text;
            }
        },
        methods: {
            award(extraAward, couponAward){
                return (extraAward + couponAward).toFixed(2);
            },
            pageRepaymentPlan(){
                this.$pageRepaymentPlan({
                    id: this.detail.tenderId,
                    investTime: this.detail.investTime
                })
            },
            pageProtocol(){
                let url = hosts.pc + this.$urls.protocolForHtml;
                let query = qs.stringify({
                    appId: this.$urls.appId,
                    borrowId: this.detail.borrowId,
                    oauthToken: Cookie.get('qz_h5_oauthToken'),
                    service: 'protocolForHtml',
                    tenderId: this.detail.tenderId
                });
                this.$pageTo(`${url}?${query}`)
            },
            getInvestDetail(){
                this.$http({
                    url: this.$urls.tenderDetail,
                    method: 'get',
                    data: {
                        service: 'myinvest.detail',
                        tenderId: this.tenderId
                    }
                }).then( response => {
                    this.detail = response.data;
                    this.repaymentStatus = this.detail.collectYes === this.detail.collectAll;
                    this.$finish();
                }).catch( e => {
                    MessageBox.alert(e.msg);
                    this.$finish();
                });
            }
        },
        components: {
            uiButton
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .tenderRecordDetail{
        background-color: #f6f6f6;
        padding-bottom: 1rem;
        box-sizing: border-box;
        .row-wrapper{
            background-color: #fff;
        }
        .detail-status{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            background-color: #fff;
            font-size: .34rem;
            &.status-done{
                color: #62cbaf
            }
            &.status-pending{
                color: #fdad46
            }
        }
        .row{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: .88rem;
            font-size: .28rem;
            color: #999;
            margin-left: .3rem;
            padding-right: .3rem;
            & + .row{
                border-top: 1px solid #ccc;
            }
            &.row__spc{
                margin-left: 0;
                padding-left: .3rem;
                color: #fff;
                .row-content{
                    color: #fff;
                }
                &.status-done{
                    background-color: #62cbaf
                }
                &.status-pending{
                    background-color: #fdad46
                }
            }
        }
        .row-label{
        }
        .row-content{
            color: #333;
        }
        .highlight{
            color: #f35343;
        }
    }
</style>
