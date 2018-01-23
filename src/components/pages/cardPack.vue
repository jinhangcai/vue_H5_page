<template>
    <div class="cardPack viewport" :style="{minHeight: minHeight}">
        <div class="header">
            <div class="top-nav">
                <div class="nav" :class="{current: currentIndex === 1}" @click="toggle(1)">红包
                    <template v-if="redpackNum">({{redpackNum}})</template>

                </div>
                <div class="nav" :class="{current: currentIndex === 2}" @click="toggle(2)">加息劵
                    <template v-if="couponNum">({{couponNum}})</template>
                </div>
            </div>
        </div>
        <div class="tips">
            <a href="packet.html"><i class="iconfont icon-query"></i> 使用说明</a>
        </div>
        <div class="card-wrapper"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="50">
            <div v-if="currentIndex === 1" v-for="(item, index) in list" class="card-item" :class="item.overdueFlag || item.useFlag ? '' : (item.redpacketType === 1 ? 'deductible' : 'red')" :key="index">
                <div class="card-body">
                    <div class="row">
                        <div class="row-label">
                            <div class="card-name">{{item.redpacketName}}</div>
                            <div class="card-rule">{{item.useCondition}}</div>
                        </div>
                        <div class="row-content">
                            <span class="unit">¥</span>{{item.redPacketAmount}}
                        </div>
                    </div>
                </div>
                <div class="record-footer">
                    <div class="footer-content">
                        <template v-if="isSameDay(item.createDate, item.validDate)">
                            仅 {{item.validDate | filterMoment('YYYY-MM-DD')}} 当天使用
                        </template>
                        <template v-else>
                            {{item.createDate | filterMoment('YYYY-MM-DD')}} 至 {{item.validDate | filterMoment('YYYY-MM-DD')}} 使用
                        </template>
                    </div>
                    <div class="footer-more"></div>
                </div>
                <div v-if="item.overdueFlag" class="triangle"><span>过期</span></div>
                <div v-else-if="item.useFlag" class="triangle"><span>已用</span></div>
            </div>
            <div v-if="currentIndex === 2" v-for="(item, index) in list" class="card-item" :class="item.flag===2 || item.flag===3 || item.flag===4 ? '' : 'raise'" :key="index">
                <div class="card-body">
                    <div class="row">
                        <div class="row-label">
                            <div class="card-name">{{item.couponName}}</div>
                            <div class="card-rule">
                                <div v-if="item.capital">
                                    最高加息本金{{item.capital}}元
                                </div>
                                <div v-if="item.days">
                                    最高加息天数{{item.days}}天
                                </div>
                            </div>
                        </div>
                        <div class="row-content coupon">
                            +{{item.amount}}<span class="unit">%</span>
                        </div>
                    </div>
                </div>
                <div class="record-footer">
                    <div class="footer-content">
                        <template v-if="isSameDay(item.startDate, item.endDate)">
                            仅 {{item.endDate | filterMoment('YYYY-MM-DD')}} 当天使用
                        </template>
                        <template v-else>
                            {{item.startDate | filterMoment('YYYY-MM-DD')}} 至 {{item.endDate | filterMoment('YYYY-MM-DD')}} 使用
                        </template>
                    </div>
                    <div class="footer-more"></div>
                </div>
                <div v-if="item.flag === 2" class="triangle"><span>无效</span></div>
                <div v-else-if="item.flag === 3" class="triangle"><span>过期</span></div>
                <div v-else-if="item.flag === 4" class="triangle"><span>已用</span></div>
            </div>
            <div v-if="loading" class="load-row">
                加载中...
            </div>
            <div v-else-if="list.length === 0" class="load-row">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast, MessageBox, InfiniteScroll } from 'mint-ui';
    export default {
        name: 'tenderRecord',
        data () {
            return {
                minHeight: 'auto',
                currentIndex: 1,
                loading: false,
                list: [],
                currentPage: 1,
                pageSize: 10,
                pages: 1,
                total: 0,
                done: false,
                redpackNum: 0,
                couponNum: 0,
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
            this.getTotal();
        },
        methods: {
            isSameDay(time1, time2){
                let dateObj1 = new Date(time1),
                    year1 = dateObj1.getFullYear(),
                    month1 = dateObj1.getMonth(),
                    date1 = dateObj1.getDate(),
                    dateObj2 = new Date(time2),
                    year2 = dateObj2.getFullYear(),
                    month2 = dateObj2.getMonth(),
                    date2 = dateObj2.getDate();

                return (year1 === year2 && month1 === month2 && date1 === date2)
            },
            toggle(index){
                if(this.currentIndex === index){
                    return;
                }
                this.currentIndex = index;
                this.reset();
            },
            reset(){
                this.currentPage = 1;
                this.pages = 1;
                this.total = 0;
                this.loading = false;
                this.done = false;
                this.list = [];
                this.loadMore();
            },
            loadMore(){
                if(this.currentIndex === 1){
                    this.getPackList();
                }else{
                    this.getCouponList()
                }
            },
            getTotal(){
                this.$http({
                    url: this.$urls.couponList,
                    method: 'get',
                    data: {
                        refundStatus: this.currentIndex,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        service: 'coupon.list'
                    }
                }).then( response => {
                    let data = response.data;
                    this.couponNum = data.currentCanUseCount;
                }).catch( e => {
                    MessageBox.alert(e.msg);
                });
            },
            getPackList(){

                if(this.currentPage > this.pages){
                    this.done = true;
                    return;
                }

                this.loading = true;

                this.$http({
                    url: this.$urls.packList,
                    method: 'get',
                    data: {
                        refundStatus: this.currentIndex,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        service: 'redpacket.list'
                    }
                }).then( response => {
                    let data = response.data;
                    this.pages = data.pageData.pages;
                    this.total = data.pageData.total;
                    this.currentPage++;
                    this.redpackNum = data.currentCanUseCount;
                    this.list = this.list.concat(data.pageData.list);
                    this.loading = false;
                }).catch( e => {
                    MessageBox.alert(e.msg);
                });
            },
            getCouponList(){

                if(this.currentPage > this.pages){
                    this.done = true;
                    return;
                }

                this.loading = true;

                this.$http({
                    url: this.$urls.couponList,
                    method: 'get',
                    data: {
                        refundStatus: this.currentIndex,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        service: 'coupon.list'
                    }
                }).then( response => {
                    let data = response.data;
                    this.pages = data.pageData.pages;
                    this.total = data.pageData.total;
                    this.currentPage++;
                    this.list = this.list.concat(data.pageData.list);
                    this.loading = false;
                }).catch( e => {
                    MessageBox.alert(e.msg);
                });
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .cardPack{
        background-color: #f9f9f9;
        padding-top: .8rem;
        box-sizing: border-box;
        .header{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 3;
            border-bottom: 1px solid #e6e6e6;
            background-color: #fff;
            text-align: center;
            .top-nav{
                display: flex;
                justify-content: space-around;
                .nav{
                    box-sizing: border-box;
                    width: 1.6rem;
                    height: .8rem;
                    font-size: .28rem;
                    line-height: .8rem;
                    color: #666;
                    &.current{
                        position: relative;
                        color: #f35c3e;
                        &::after{
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            content: '';
                            width: 100%;
                            height: .04rem;
                            background-color: #f35c3e;
                        }
                    }
                }
            }
        }
        .tips{
            font-size: .24rem;
            color: #666;
            height: .7rem;
            line-height: .7rem;
            text-align: right;
            padding: 0 .3rem;
        }
        .card-wrapper{
            .card-item{
                position: relative;
                width: 5.8rem;
                background-color: #fff;
                margin:0 auto .2rem;
                border:1px solid #e6e6e6;
                border-top: 2px solid #ccc;
                color: #999;
                border-radius: .06rem;
                &.deductible{
                    border-top: 2px solid #ab8ff1;
                    .card-name{
                        color: #ab8ff1;
                    }
                    .row-content{
                        color: #ab8ff1;
                    }
                }
                &.red{
                    border-top: 2px solid #f35c3e;
                    .card-name{
                        color: #f35c3e;
                    }
                    .row-content{
                        color: #f35c3e;
                    }
                }
                &.raise{
                    border-top: 2px solid #77adf3;
                    .card-name{
                        color: #77adf3;
                    }
                    .row-content{
                        color: #77adf3;
                    }
                }
                &::before,
                &::after{
                    content: '';
                    width: .3rem;
                    height: .3rem;
                    position: absolute;
                    top: 1.3rem;
                    border: 1px solid #e6e6e6;
                    border-color: #e6e6e6 transparent transparent #e6e6e6;
                    border-radius: .15rem;
                    background: #f9f9f9;
                    z-index: 2;
                }
                &::before{
                    left: -.15rem;
                    transform: rotate(135deg);

                }
                &::after {
                    right: -.15rem;
                    transform: rotate(-45deg);
                }
                .card-body{
                    padding: .2rem .3rem .12rem;
                }
                .card-name{
                    line-height: .63rem;
                    font-size: .28rem;
                }
                .card-rule{
                    font-size: .22rem;
                    line-height: .26rem;
                    height: .52rem;
                }
                .record-footer{
                    border-top: 1px dashed #e6e6e6;
                    font-size: .2rem;
                    text-align: right;
                    .footer-content{
                        padding: 0 .3rem;
                        line-height: .5rem;
                    }
                    .footer-more{
                        padding: 0 .3rem;
                        line-height: .44rem;
                        background-color: #f6f6f6;
                        border-radius: 0 0 .06rem .06rem;
                    }
                }
                .row{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .row-label{
                    flex: 1;
                }
                .row-content{
                    &.coupon{
                        flex: 1;
                    }
                    flex: 0 0 auto;
                    width: 1.4rem;
                    text-align: right;
                    font-size: .54rem;
                    .unit{
                        font-size: .28rem;
                    }
                }
                .triangle {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 0;
                    height: 0;
                    border-top: .65rem solid #ccc;
                    border-left: .7rem solid transparent;
                    color: #fff;
                    span{
                        font-size: .18rem;
                        color: #fff;
                        display: block;
                        position: absolute;
                        right: -.12rem;
                        top: -.5rem;
                        width: .65rem;
                        transform: rotate(45deg);
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
