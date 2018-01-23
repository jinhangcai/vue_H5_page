<template>
    <div class="index viewport">
        <section id="product">
            <div class="top-card">
                <div class="proList">
                    <div class="main">
                        <div class="pro-name">
                            {{obj.name}}
                            <div class="icons">
                                <!--<span class="icon" v-if="obj.isDepository">存管</span>-->
                                <template v-if="obj.newProductStatus == 1">
                                    <span class="icon standard" >新手专享</span>
                                </template>
                                <template v-else-if="obj.activityFlag">
                                    <span class="icon standard active" >{{obj.activityFlag}}</span>
                                </template>
                            <!--<span class="icon standard" v-if="obj.productType">{{obj.productType}}</span>-->
                            <!--<span class="icon standard activity" v-if="obj.activityFlag">{{obj.activityFlag}}</span>-->
                        </div>
                        </div>
                        <div class="rate">
                            <div class="tit">预期年化</div>
                            <div class="cont">{{obj.apr}}<small>%<span v-if="obj.extraApr">+ <span>{{obj.extraApr}}</span>%</span> </small></div>
                        </div>
                        <div class="rule">期限{{obj.timeLimit}}天<span class="divide"></span>{{obj.lowestAccount}}元起投</div>
                    </div>
                    <div class="tag"><a href="javascript:;" data-title="提前还款说明" @click="$router.push({ name: 'proRepaymentExplain',query:{id:id,lastRepayTime:obj.lastRepayTime}})">支持提前还款, 点击查看说明</a></div>
                    <div class="other ing">
                        <p class="t-t">进度{{progress}}</p>
                        <div class="info clearfix">
                            <div class="f_l">总金额 <b>{{obj.account}}</b>元</div><div class="f_r">剩余可投 <b class="font-color-red">{{obj.account-obj.accoutYes}}</b>元</div>
                        </div>
                        <div class="progress"><em><i :style="'width:'+(obj.accoutYes/obj.account*100)+'%'"></i></em></div>
                    </div>

                </div>
            </div>
            <div class="income-con">
                <div class="explain">
                    <ul>
                        <li>{{obj.style | styles}}<i class="iconfont green"></i></li>
                    </ul>
                </div>
            </div>
            <div class="info-con">
                <div class="box " v-if="obj.extraApr">
                    <a href="javascript:;">
                        <div class="tit">平台奖励</div>
                        <div class="cont">
                            <p>平台奖励 <b>{{obj.extraApr}}%</b> 收益</p>
                        </div>
                    </a>
                </div>
                <div class="box nolink">
                    <a href="javascript:">
                        <div class="tit">额外奖励</div>
                        <div class="cont">
                            <p>新用户注册就送188元红包</p>
                        </div>
                    </a>
                </div>
                <div class="box nolink" v-if="obj.perDealMost || obj.mostAccount">
                    <a href="javascript:">
                        <div class="tit" v-if="obj.perDealMost">单笔限额</div>
                        <div class="tit" v-else-if="obj.mostAccount">单人限额</div>
                        <div class="cont">
                            <p v-if="obj.perDealMost">{{obj.perDealMost}}元</p>
                            <p v-else-if="obj.mostAccount">{{obj.mostAccount}}元</p>
                        </div>
                    </a>
                </div>
                <div class="box arrow">
                    <a href="javascript:;" @click="$router.push({ name: 'proInvestRecord',query:{id:id}})">
                        <div class="tit">投资记录</div>
                        <div class="cont">
                            已经有<b>{{obj.regularTenderCount}}</b>笔投资，最高投<b>{{obj.largestTender || 0}}</b>元
                        </div>
                    </a>
                </div>
                <div class="box arrow">
                    <a href="javascript:;"  @click="$router.push({ name: 'proMoreInfo',query:{id:id}})">
                        <div class="tit">了解项目</div>
                        <!--<div class="cont">-->
                            <!--某***汽车租赁有限公司主要经营汽车租赁业务，现因扩大企业经营、进行车辆采购经营新能源汽车租赁业务的需要，将车架号为LSA*****1000...-->
                        <!--</div>-->
                    </a>
                </div>
                <div class="box arrow">
                    <a href="javascript:;"  @click="$router.push({ name: 'help'})">
                        <div class="tit">安全保障</div>
                        <div class="cont">
                            <p>银行级专业团队把控</p>
                            <p>资金账户专款专用</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
        <article class="float-buy-con">
            <a class="ui-btn blue" href="javascript:;"  v-if="obj.productStatus == 0">{{obj.preSaleTimeDes}}开售</a>
            <a class="ui-btn gray" href="javascript:;"  v-else-if='obj.productStatus == 2' >已抢光</a>
            <a class="ui-btn gray" href="javascript:;" v-else-if='obj.productStatus == 3'>还款中</a>
            <a class="ui-btn gray" href="javascript:;"  v-else-if='obj.productStatus == 4'>已还款</a>
            <a class="ui-btn red" href="javascript:;" v-else-if="!isLogin" @click="gotologin">请先登录</a>
            <a class="ui-btn red" href="javascript:;" v-else-if="userInfo.bankDepositoryType == 0" @click="depository">请先开通存管</a>
            <a class="ui-btn red" href="javascript:;" v-else-if="userInfo.bankDepositoryType == 2" @click="depository">请先激活存管</a>
            <a class="ui-btn red" href="javascript:;" v-else-if="userInfo.xwBankStatus != 1" @click="pageBankCard">请绑卡</a>
            <a class="ui-btn red" href="javascript:;" v-else-if="obj.brType == 1 && !userInfo.newHandStatus"  @click="novice">仅限新手投资</a>
            <a class="ui-btn red" href="javascript:;" v-else @click="$router.push({ name: 'pageProBuy',query:{id:id,day:obj.timeLimit,lowestAccount:obj.lowestAccount,apr:obj.apr,newHandStatus:userInfo.newHandStatus,extraApr:obj.extraApr}})">立即投资</a>
        </article>
        <!--<div class="fixed-bar">-->
            <!---->
            <!--&lt;!&ndash;<tabNav></tabNav>&ndash;&gt;-->
        <!--</div>-->
    </div>
</template>

<script>
//    import tabNav from '../tabNav';
import { Toast  } from 'mint-ui';
    export default {
        name: 'product',
        filters: {
            styles (value) {
                switch(value){
                   case '1':
                       return '投资日计息，等额本息';
                       break;
                   case '2':
                       return '投资日计息，到期还本付息';
                       break;
                   case '3':
                       return'投资日计息，按月付息到期还本';
                       break;
               }
            },
        },
        data () {
            return {
                isLogin:false,
                loading:false,
                id:'',
                obj:{

                },
                userInfo:{

                }
            }
        },
        computed:{
            progress(){
//                return Math.round(this.obj.accoutYes/this.obj.account*100)+'%';
                return parseInt(this.obj.accoutYes/this.obj.account*100)+'%';
//                return parseInt(((this.obj.accoutYes)/this.obj.account*100))+'%';
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.ajaxload();
        },
        methods:{
            ajaxload(){
                let _this = this;
                this.$http({
                    method: 'get',
                    url: this.$urls.userInfo,
                    data:{
                        service:'userInfo'
                    },
                    notCheckError:true,
                }).then( data => {
                    this.userInfo = data.data || {};
                    if(data.success){
                        this.isLogin = true;
                    }
                }).catch( e => {
                    this.isLogin = false;
                });
                this.$http({
                    method: 'get',
                    url: this.$urls.financialinfo,
                    data:{
                        borrowId:this.$route.query.id
                    }
                }).then( data => {
                    this.obj = data.data;
                  console.log(data)
                }).catch( e => {

                })

            },
            loadMore() {
                this.loading = true;
            },
            gotologin(){
                // 跳转登录
                this.$pageLogin(location.href)
            },
            pageBankCard(){
                //绑卡
                this.$http({
                    method: 'post',
                    url: this.$urls.bindBankCard,
                    data:{
                        service:'bindBankCard'
                    }
                }).then( data => {
                    let url = data.data.postUrl,
                        formData = data.data.reqDataPackage;

                    this.$formPost(url, formData);
                }).catch( e => {

                });
            },
            novice(){
                Toast({
                    message: '仅限新手投资',
                    position: 'middle',
                    duration: 2000
                });
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
                }).catch( e => {

                })
            }

        },
        components: {
            Toast
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .viewport{
        position:static;
    }
    #product{
        /*height: 10.37rem;*/
        /*overflow: hidden;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*overflow-y: scroll;*/
        /*&::-webkit-scrollbar {  display: none;  }*/
        /*-webkit-overflow-scrolling: touch;*/
        /*overflow-scrolling: touch;*/
        .top-card{
            position: relative;
            text-align: center;
            background-color: #fff;
            overflow: hidden;
            .main{
                margin-top: .4rem;
                line-height: 1;
                .pro-name{
                    font-size: .36rem;
                    color: #333;
                    width:6.2rem;
                    position:relative;
                    margin:0 auto;
                    .icons{
                        position:absolute;
                        right:0;
                        top:0.05rem;
                        .icon{
                            text-align: center;
                            background:#77adf3;
                            color:#fff;
                            border-radius:.04rem;
                            float: right;
                            display: inline-block;
                            height: .3rem;
                            line-height: .3rem;
                            font-size: .22rem;
                            padding:0 .15rem;
                        }
                        .standard{
                            margin-right:.05rem;
                            background:#3cbdd1;
                        }
                        .active{
                            background:#f35c3e;
                        }
                    }
                }
                .rate{
                    padding-top:.43rem;
                    .tit{
                        font-size: .24rem;
                        color: #999;
                    }
                    .cont{
                        margin-top: .37rem;
                        font-size: 1rem;
                        color: #f35c3e;
                        small{
                            font-size:.4rem;
                            span{
                                font-size:.6rem;
                            }
                        }
                    }
                }
                .rule{
                    margin-top: .43rem;
                    font-size: .24rem;
                    line-height: 1;
                    color: #999;
                    .divide{
                        display: inline-block;
                        height: .3rem;
                        width: 1px;
                        background-color: #ccc;
                        margin: 0 .23rem;
                    }
                }
            }
            .tag{
                margin: .3rem auto 0;
                display: block;
                color: #77adf3;
                font-size: .24rem;
                width: 55%;
                text-align: center;
                border-radius: .25rem;
                border: 1px solid #77adf3;
                line-height: .5rem;
            }
            .other.ing{
                margin-top: .42rem;
                background-color: transparent;
                .t-t{
                    font-size: .22rem;
                    text-align: left;
                    padding: 0 0 .1rem .3rem;
                    color:#999;
                }
                .info{
                    font-size:.22rem;
                    color:#999;
                    width: 5.8rem;
                    margin: 0 auto;
                    height: .95rem;
                    line-height: .95rem;
                }
                .f_l{
                    float:left;
                    b{
                        color:#999;
                    }
                }
                .f_r{
                    float:right;
                    b{
                        color: #f35c3e !important;
                        font-weight:bold;
                    }
                }
                .progress{
                    position: absolute;
                    margin-top: -1rem;
                    width: 100%;
                    text-align: center;
                    display: block;
                    font-size: 0;
                    em{
                        position: relative;
                        display: inline-block;
                        width: 5.8rem;
                        height: 3px;
                        background-color: #ececec;
                        i{
                            position: absolute;
                            left: 0;
                            top: 50%;
                            display: inline-block;
                            width: 50%;
                            height: 6px;
                            background-color: #f35c3e;
                            border-radius: 0.5624999999296875rem;
                            -webkit-transform: translate(0,-50%);
                            transform: translate(0,-50%);
                        }
                    }
                }
            }
        }
        .income-con{
            line-height: 1;
            background-color: #f6f6f6;
            padding: 0.2rem 0rem;
            font-size:.24rem;
            color: #999;
            .explain{
                padding: 0.3rem 0rem;
                li{
                    position: relative;
                    padding-left: .8rem;
                    height: .5rem;
                    line-height: .5rem;
                    .iconfont{
                        position: absolute;
                        left: .3rem;
                        top: 50%;
                        -webkit-transform: translate(0,-50%);
                        transform: translate(0,-50%);
                        display: inline-block;
                        font-size: .4rem;
                        line-height: .3rem;
                        color: #fff;
                        font-style: normal;
                        text-align: center;
                        border-radius: .15rem;
                    }
                    .green{
                        color: #6eb92b;
                    }
                }
            }
        }
        .info-con{
            width: 100%;
            background-color: #fff;
            padding-bottom: 1rem;
            overflow:hidden;
            .box{
                padding: .33rem 0rem;
                margin: 0rem .33rem;
                border-bottom: 1px solid #ccc;
                text-align: justify;
                text-justify: inter-word;
                display: block;
                position: relative;
                overflow:hidden;
                a{
                    display: block;
                    .tit{
                        margin-top: 0.05rem;
                        font-size: .28rem;
                        color: #333;
                    }
                    .cont{
                        margin-top: .34rem;
                        font-size: .24rem;
                        color: #999;
                        line-height: 1.4;
                        b{
                            color: #f35c3e;
                            padding: 0rem 0.1rem;
                        }
                    }
                }
                &.arrow:after{
                    right: 0;
                    bottom: 0;
                    display: inline-block;
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border: .1rem solid #f35c3e;
                    border-top-color: transparent;
                    border-left-color: transparent;
                    margin-top: -.1rem;
                    margin-left: -.1rem;
                }
            }
        }
    }
    .float-buy-con{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        a{
            width: 100%;
            border-radius: 0;
            line-height: .98rem;
            font-size: .32rem;
            text-align: center;
            display:block;
            .icon-nav-list{
                color: #ffb819;
                &:before{
                    content: "\e626";
                }
            }
            .icon{
                margin-right: 0.01rem;
                font-size: .35rem;
                font-weight: bold;
            }
        }
        .ui-btn.red{
            background-color: #f35c3e;
            border-color: #f35c3e;
            color: #fff;
        }
        .ui-btn.blue{
            background-color: #77adf3;
            border-color: #f35c3e;
            color: #fff;
        }
        .ui-btn.gray{
            background-color: #bbb;
            border-color: #f35c3e;
            color: #fff;
        }
    }
</style>
