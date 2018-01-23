<template>
    <div class="tenderRecord viewport" :style="{minHeight: minHeight}">
        <div class="header">
            <div class="top-nav">
                <div class="nav" :class="{current: currentIndex === 2}" @click="toggle(2)">待还款</div>
                <div class="nav" :class="{current: currentIndex === 1}" @click="toggle(1)">已还款</div>
            </div>
        </div>
        <div class="record-wrapper"
             v-infinite-scroll="getTenderRecord"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="50">
            <div v-for="item in list" class="record-item" @click="$pageTenderRecordDetail(item.tenderId)" :key="item.tenderId">
                <div class="record-body">
                    <div class="row">
                        <div class="row-label name">
                            {{item.borrowName}}{{item.repaymentType | repaymentType}}
                        </div>
                        <div class="row-content " :class="currentIndex === 2 ? 'highlight' : 'highlight2'">
                            {{item.expireTimeTag}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-label amount">
                            投资本金 {{item.captial}}元
                        </div>
                        <div v-if="currentIndex === 2" class="row-content">
                            待收收益 <span class="highlight strong">{{item.waitInterest}}</span>元
                        </div>
                        <div v-if="currentIndex === 1" class="row-content">
                            收益 <span class="highlight strong">{{item.interest}}</span>元
                        </div>
                    </div>
                </div>
                <div class="record-footer">
                    <div class="row">
                        <div class="row-label">投资时间 {{item.tenderTime | filterMoment('YYYY-MM-DD')}}</div>

                        <div v-if="item.advanceRepayTime" class="row-content">到期时间 {{item.advanceRepayTime | filterMoment('YYYY-MM-DD')}}</div>
                        <div v-else class="row-content">到期时间 {{item.repaymenTime | filterMoment('YYYY-MM-DD')}}</div>
                    </div>
                </div>
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
                currentIndex: 2,
                loading: false,
                list: [],
                currentPage: 1,
                pageSize: 10,
                pages: 1,
                total: 0,
                done: false
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
//            this.getTenderRecord();
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
                this.getTenderRecord();
            },
            getTenderRecord(){

                if(this.currentPage > this.pages){
                    this.done = true;
                    return;
                }

                this.loading = true;

                this.$http({
                    url: this.$urls.tenderRecord,
                    method: 'get',
                    data: {
                        refundStatus: this.currentIndex,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        service: 'myinvest.list'
                    }
                }).then( response => {
                    let data = response.data;
                    this.pages = data.pages;
                    this.total = data.total;
                    this.currentPage++;
                    this.list = this.list.concat(data.list);
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
    .tenderRecord{
        background-color: #f6f6f6;
        padding-top: 1rem;
        box-sizing: border-box;
        .header{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            border-bottom: 1px solid #e6e6e6;
            background-color: #fff;
            text-align: center;
            .top-nav{
                display: flex;
                justify-content: space-around;
                .nav{
                    box-sizing: border-box;
                    width: 1.42rem;
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
        .record-wrapper{
            .record-item{
                background-color: #fff;
                margin-bottom: .2rem;
                padding-left: .3rem;
                border: solid #e6e6e6;
                border-width: 1px 0;
                .record-body{
                    padding: .24rem .3rem .08rem 0;
                }
                .record-footer{
                    padding: .04rem .3rem .16rem 0;
                    border-top: 1px solid #e6e6e6;
                }
                .row{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: .6rem;
                    font-size: .24rem;
                    color: #666;
                }
                .row-label{
                }
                .row-content{
                }
                .name{
                    font-size: .28rem;
                    color: #333;
                }
                .highlight{
                    color: #f27e68;
                }
                .highlight2{
                    color: #4ec399;
                }
                .strong{
                    font-weight: bold;
                }
            }
        }
    }
</style>
