<template>
    <div v-if="!pageLoading" class="index viewport" :style="{minHeight: minHeight}">
        <div class="banner">
            <mt-swipe v-if="bannerList.length > 0" :auto="5000">
                <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                    <a :href="item.redirectUrl">
                        <img :src="item.imgUrl" :alt="item.title">
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="product-recommend" @click="$pageProduct(product.id)">
            <div class="product">
                <div class="product-title">
                    {{product.name}}
                    <span v-if="product.isDepository" class="tag dep">存管</span>
                    <!--<span v-if="product.brType === 1" class="tag newHand">新手</span>-->
                    <!--<span v-else-if="product.activityFlag" class="tag hot">{{product.activityFlag}}</span>-->
                    <!--<span v-else-if="product.isDepository" class="tag dep">存管</span>-->
                </div>
                <div class="product-info">
                    <div class="product-label">预期年化</div>
                    <div class="product-num">
                        <div class="num-wrapper">
                            {{product.apr}}<span class="unit">%</span>
                        </div>
                        <div v-if="product.extraApr" class="product-extra">+<span class="big">{{product.extraApr}}</span>%</div>
                    </div>
                    <template v-if="product.advanceRepayFlag === 8">
                        <div class="product-limit">期限 <span>{{product.previousBorrowDay}}</span> 天</div>
                    </template>
                    <template v-else>
                        <div v-if="product.isday === 1" class="product-limit">期限 <span>{{product.timeLimit}}</span> 天</div>
                        <div v-else class="product-limit">期限 <span>{{product.timeLimit}}</span> 月</div>
                    </template>
                    <div class="progress">
                        <svgCircle :width="3" :height="3" :progress="product.progress"></svgCircle>
                    </div>
                </div>
                <div class="product-explain">
                    <div class="explain-item">{{product.lowestAccount}}元起投</div>
                    <div class="explain-item">{{product.tenderPersonCount}}人已投</div>
                </div>
            </div>

            <uiButton type="primary" size="large">立即投资</uiButton>
            <div class="tips"><i class="icon icon-security"></i>资金账户专款专用资金绝对安全</div>
        </div>
        <div class="fixed-bar">
            <tabNav></tabNav>
        </div>
    </div>
</template>

<script>
    import tabNav from '../tabNav';
    import svgCircle from '../svgCircle/index';
    import uiButton from '../button/index';
    import { Toast, Swipe, SwipeItem } from 'mint-ui';
    import pageLoad from '../loading/index';

    export default {
        name: 'index',
        mixins: [pageLoad],
        data () {
            return {
                minHeight: 'auto',
                bannerList: [],
                product: {}
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
            this.getHomeData();
        },
        methods:{
            getHomeData(){
                this.$http({
                    url: this.$urls.home,
                    method: 'get',
                    data: {
                        service: 'home'
                    }
                }).then(response => {
                    let data = response.data;
                    this.bannerList = data.bannerList;
                    this.product = data.product;
                    this.product.progress = data.product.accountYes / data.product.account;
                    this.$finish();
                }).catch( e => {

                })
            }
        },
        components: {
            uiButton,
            tabNav,
            svgCircle,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .index{
        box-sizing: border-box;
        padding-bottom: .9rem;
        background-color: #fff;
        .banner{
            height: 3.5rem;
            background-color: #ddd;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .product-recommend{
            padding: .26rem .3rem .16rem;
        }
        .product{
            .product-title{
                position: relative;
                height: .54rem;
                line-height: .54rem;
                text-align: center;
                color: #333;
                font-size: .32rem;
                .tag{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translate(0 ,-50%);
                    height: .3rem;
                    line-height: .3rem;
                    font-size: .22rem;
                    color: #fff;
                    text-align: center;
                    padding: 0 .1rem;
                    background-color: #e3e3e3;
                    border-radius: .04rem;
                    &.newHand{
                        background-color: #3cbdd1;
                    }
                    &.hot{
                        background-color: #f35c3e;
                    }
                    &.dep{
                        background-color: #77adf3;
                    }
                }
            }
            .product-info{
                position: relative;
                margin: .2rem auto .13rem;
                box-sizing: border-box;
                width: 3rem;
                height: 3rem;
                padding-top: .45rem;
                text-align: center;
                .progress{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 3rem;
                    height: 3rem;
                }
                .product-label{
                    font-size: .28rem;
                    color: #666;
                    line-height: .4rem;
                }
                .product-num{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    box-sizing: border-box;
                    color: #f35343;
                    height: 1.33rem;
                    .num-wrapper{
                        font-size: .8rem;
                        line-height: .86rem;
                        text-indent: .3em;
                        height: .86rem;
                    }
                    .unit{
                        font-size: .3rem;
                    }
                    .product-extra{
                        height: .47rem;
                        line-height: .47rem;
                        text-align: center;
                        font-size: .24rem;
                        .big{
                            font-size: .32rem;
                        }
                    }
                }
                .product-limit{
                    font-size: .28rem;
                    color: #666;
                    line-height: .4rem;
                }
            }
            .product-explain{
                display: flex;
                height: .32rem;
                padding: 0 .58rem;
                margin-bottom: .2rem;
                .explain-item{
                    flex: 1;
                    font-size: .28rem;
                    color: #666;
                    text-align: center;
                    & + .explain-item{
                        border-left: 1px solid #cccccc
                    }
                }
            }
        }
        .tips{
            margin-top: .2rem;
            font-size: .24rem;
            color: #999;
            text-align: center;
            .icon{
                font-size: .36rem;
                color: #6eb92b;
            }
        }
    }
</style>
