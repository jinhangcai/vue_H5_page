<template>
    <div class="index viewport">
       <section id="pageProList">
            <div class="banner">
                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qz.qian&ckey=CK1304356609522">
                    <img src="../../static/images/banner.jpg"></a>
            </div>
           <div class="proList">
                <ul
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="30">
                    <template v-for="list in arr">
                        <li>
                            <a href="javascript:;" @click="$router.push({ name: 'product',query:{id:list.id}})">
                                <div class="cen">
                                    <div class="tit">
                                        <span class="name">{{list.name}}</span>
                                       <span class="icon" v-if="list.isDepository">存管</span>
                                        <template v-if="list.newProductStatus == 1">
                                            <span class="icon standard" >新手专享</span>
                                        </template>
                                        <template v-if="list.newProductStatus == 4">
                                            <span class="icon standard" >预告</span>
                                        </template>
                                        <template v-else-if="list.activityFlag">
                                            <span class="icon standard active" >{{list.activityFlag}}</span>
                                        </template>
                                        <!--<span class="icon standard" v-if="list.productType">{{list.productType}}</span>-->
                                       <!--<span class="icon standard activity" v-if="list.activityFlag">{{list.activityFlag}}</span>-->
                                    </div>
                                    <div class="cont">
                                        <span class="tits">预期年化</span>
                                        <span class="conts">{{list.apr}}%<span v-if="list.extraApr">+{{list.extraApr}}%</span></span>
                                        <div class="info">
                                            <span>{{list.timeLimit}}</span>天期限<i class="divider"></i><span>{{list.lowestAccount}}</span>元起投<i class="divider"></i><span>{{list.tenderPersonCount}}</span>人已投
                                        </div>
                                    </div>
                                    <template v-if="list.newProductStatus == 2 || list.newProductStatus == 1 || list.newProductStatus == 3">
                                        <div class="progressbar">
                                            <div class="progressbar_res">
                                                <div class="circleProgress_wrapper">
                                                    <div class="wrapper right">
                                                        <template v-if="list.accountYes/list.account >= 0.5">
                                                            <div class="circleProgress rightcircle" style="-webkit-transform: rotate(45deg);transform: rotate(45deg);"></div>
                                                        </template>
                                                        <template v-else>
                                                            <div class="circleProgress rightcircle" :style="'-webkit-transform: rotate('+(list.accountYes/list.account*100*3.6-135)+'deg);transform: rotate('+(list.accountYes/list.account*100*3.6-135)+'deg);'"></div>
                                                        </template>
                                                    </div>
                                                    <div class="wrapper left">
                                                        <template v-if="list.accountYes/list.account >= 1">
                                                            <div class="circleProgress leftcircle" style="-webkit-transform: rotate(225deg);transform: rotate(225deg);"></div>
                                                        </template>
                                                        <template v-else-if="list.accountYes/list.account > 0.5">
                                                            <div class="circleProgress leftcircle" :style="'-webkit-transform: rotate('+((list.accountYes/list.account*100-50)*3.6+45)+'deg);transform: rotate('+((list.accountYes/list.account*100-50)*3.6+45)+'deg);'"></div>
                                                        </template>
                                                        <template v-else>
                                                            <div class="circleProgress leftcircle" style="-webkit-transform: rotate(45deg);transform: rotate(45deg);"></div>
                                                        </template>
                                                        <!--<div class="circleProgress leftcircle"></div>-->
                                                    </div>

                                                    <div class="progress">
                                                        {{list.accountYes/list.account | states}}<small>%</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="list.newProductStatus == 5 ">
                                        <div class="progressbar gone">
                                            <div class="progressbar_res">
                                                <div class="circleProgress_wrapper">
                                                    <div class="progress gones">
                                                        抢光
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="list.newProductStatus == 4">
                                        <div class="progressbar Tomorrow">
                                            <div class="progressbar_res">
                                                <div class="circleProgress_wrapper">
                                                    <div class="progress day">
                                                       <!--{{list.preSaleTimeDes | systime}}-->
                                                        {{list.preSaleTimeDes}}
                                                    </div>
                                                    <!--<div class="progress time">-->
                                                        <!--{{list.preSaleTimeDes | days}}-->
                                                    <!--</div>-->
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </a>
                        </li>
                    </template>
                </ul>
           </div>
       </section>
        <div class="fixed-bar">
            <tabNav></tabNav>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import tabNav from '../tabNav';
    import { InfiniteScroll } from 'mint-ui';
    import Cookies from 'js-cookie';
    Vue.use(InfiniteScroll);
    export default {
        name: 'products',
        filters: {
            states (value) {
//                return Math.round(value*100);
                return parseInt(value*100)
            },
        },
        data () {
            return {
                loading:true,
                obj:{
                    currentPage:1,
                    pernum:10,
                    queryType:0,
                    service:'list',
                },
                arr:[],
                serviceTime:Cookies.get('serviceTime'),
                year:'',
                getMonth:'',
                day:''
            }
        },
        mounted(){
            this.ajaxload();
        },
        methods:{
            ajaxload(){
                let _this = this;
                this.$http({
                    method: 'get',
                    url: this.$urls.financiallist,
                    data: this.obj
                }).then( data => {
                    data.data.list.forEach((item,index,input)=>{
                        _this.arr.push(item);
                    })
                    this.obj.queryType = data.data.nextQueryType;
                    this.obj.currentPage+=1;
                    if(data.data.pages >= data.data.total){
                        this.loading = true;
                    }else{
                        this.loading = false;
                    }
                }).catch( e => {

                })
            },
            loadMore() {
//                this.loading = true;
                console.log(1)
                this.ajaxload();
            }
        },
        components: {
            tabNav
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#pageProList{
    /*height: 10.37rem;*/
    /*overflow: hidden;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*overflow-y: scroll;*/
    /*&::-webkit-scrollbar {  display: none;  }*/
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    .banner{
        width:100%;
        border-bottom:1px solid #ccc;
        img{
            width:100%;
        }
    }
    .proList{
        /*position: relative;*/
        /*top: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*overflow-y: scroll;*/
        padding-bottom:.4rem;
        ul{
            li{
                position: relative;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: .36rem 0 0 1.7rem;
                height: 1.88rem;
                border-bottom: 1px solid #eee;
                width:6.1rem;
                a{
                    display: block;
                    color: inherit;
                }
                .cen{
                    width:4.4rem;
                }
                .tit{
                    .name{
                        font-size: .28rem;
                        color:#333;
                    }

                    .icon{
                        text-align: center;
                        background:#77adf3;
                        color:#fff;
                        border-radius:.04rem;
                        float: right;
                        margin-left:.05rem;
                        display: inline-block;
                        height: .3rem;
                        line-height: .3rem;
                        font-size: .22rem;
                        padding:0 .1rem;
                    }
                    .standard{
                        background:#3cbdd1;
                    }
                    .active{
                        background:#f35c3e;
                    }
                }
                .cont{
                    .tits{
                        color:#999;
                        font-size:.22rem;
                        padding-right:.18rem;
                    }
                    .conts{
                        display:inline-block;
                        color:#f35343;
                        font-size:.36rem;
                        padding-top:.1rem;
                    }
                    .info{
                        color:#999;
                        margin-top:.17rem;
                        font-size:.2rem;
                        span{
                            color:#333;
                        }
                        .divider{
                            display: inline-block;
                            width: 1px;
                            height: 0.2rem;
                            background-color: #ccc;
                            vertical-align: bottom;
                            margin: 0 0.1rem;
                        }
                    }
                }
                .progressbar{
                    position: absolute;
                    left: .3rem;
                    top: .36rem;
                    width: 1.17rem;
                    height: 1.17rem;
                    background: no-repeat center center;
                    .progress{
                        font-size:.45rem;
                        color:#ff5f5f;
                        text-align: center;
                        line-height:1.17rem;
                        small{
                            font-size:.21rem;
                        }
                    }
                    .progressbar_res{
                        position:relative;
                        width: 1.17rem;
                        height: 1.17rem;
                        .circleProgress_wrapper{
                            width: 1.17rem;
                            height: 1.24rem;
                            /*margin: 50px auto;*/
                            position: relative;
                        }
                        .wrapper{
                            width: 0.585rem;
                            height: 1.24rem;
                            position: absolute;
                            top:0;
                            overflow: hidden;
                        }
                        .right{
                            right:0;
                        }
                        .left{
                            left:0;
                        }
                        .circleProgress{
                            width: 1.12rem;
                            height: 1.12rem;
                            border:0.03rem solid #feccd1;
                            border-radius: 50%;
                            position: absolute;
                            top:0;
                            -webkit-transform: rotate(45deg);
                        }
                        .rightcircle{
                            border-top:0.03rem solid green;
                            border-right:0.03rem solid green;
                            right:0;
                            border-top:0.03rem solid #ED1A1A;
                            border-right:0.03rem solid #ED1A1A;
                            -webkit-transform: rotate(-135deg);
                            transform: rotate(-135deg);
                        }
                        .leftcircle{
                            left:0;
                            border-top:0.03rem solid #ED1A1A;
                            border-right:0.03rem solid #ED1A1A;
                            -webkit-transform: rotate(45deg);
                            transform: rotate(45deg);
                        }
                    }

                }
                .Tomorrow{
                    .circleProgress_wrapper{
                        border: 0.03rem solid #feccd1;
                        border-radius: 50%;
                    }
                    .day{
                        font-size:.24rem;
                        line-height:0.5rem;
                        padding-top:0.2rem;
                    }
                    .time{
                        font-size:.32rem;
                        line-height:0.2rem;
                    }
                }
                .gone{
                    .circleProgress_wrapper{
                        border: 0.05rem solid #eeeeee;
                        border-radius: 50%;
                    }
                    .gones{
                        font-size: .4rem;
                        color:#999;
                    }
                }
            }
        }

    }




}
</style>
