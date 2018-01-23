<template>
    <div class="ispop" v-if="show">
        <div class="popsub" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
            <div class="shade"></div>
            <div class="bonus">{{value}}<div class="shadeone" @click="clone"></div></div>
            <div class="packetboom-cen">
                <div class="usable" >
                    <template v-for="(i,index) in list.cashList">
                        <template v-if="listtype == 'redbom' && HandStatus && money1*0.02 >= i.redPacketAmount">
                            <div class="ticket move    on-cash" @click="redbomclick(index)">
                                <p class="whole">{{i.redpacketName}}</p>
                                <p class="service"><span v-html="i.useCondition"></span></p>
                                <p class="cost"><span class="symbol">¥</span><span class="money">{{i.redPacketAmount}}</span></p>
                                <div class="line"><p></p></div>
                                <!--<div class="data-one">有效期至{{i.validDate | filterMoment('YYYY-MM-DD')}}</div>-->
                                <div class="data-one" >{{i.createDate | filterMoment('YYYY-MM-DD')}}至{{i.validDate | filterMoment('YYYY-MM-DD')}}使用</div>
                                <div class="triangle" v-if="i.isclick"><span><img src="../static/images/icon_white.png"></span></div>
                            </div>
                        </template>
                        <template v-if="listtype == 'redbom' && !HandStatus && money1*0.02 >= i.redPacketAmount && (howtime > 15 || list.New) " >
                            <div class="ticket move    on-cash" @click="redbomclick(index)">
                                <p class="whole">{{i.redpacketName}}</p>
                                <p class="service"><span v-html="i.useCondition"></span></p>
                                <p class="cost"><span class="symbol">¥</span><span class="money">{{i.redPacketAmount}}</span></p>
                                <div class="line"><p></p></div>
                                <!--<div class="data-one">有效期至{{i.validDate | filterMoment('YYYY-MM-DD')}}</div>-->
                                <div class="data-one" >{{i.createDate | filterMoment('YYYY-MM-DD')}}至{{i.validDate | filterMoment('YYYY-MM-DD')}}使用</div>
                                <div class="triangle" v-if="i.isclick"><span><img src="../static/images/icon_white.png"></span></div>
                            </div>
                        </template>
                    </template>
                    <template  v-for="(i,index) in list.deductList">
                        <template v-if="listtype == 'deductionbom' && money1 >= i.leastTenderAmount && howtime >= i.leastTenderDays && i.isok">
                            <div class="ticket move  discount-one" @click="deductionbomclick(index)">
                                <p class="whole">{{i.redpacketName}}</p>
                                <p class="service"><span>{{i.useCondition}}</span></p>
                                <p class="cost"><span class="symbol">¥</span><span class="money">{{i.redPacketAmount}}</span></p>
                                <div class="line"><p></p></div>
                                <div class="data-one" >{{i.createDate | filterMoment('YYYY-MM-DD')}}至{{i.validDate | filterMoment('YYYY-MM-DD')}}使用</div>
                                <div class="triangle" v-if="i.isclick"><span><img src="../static/images/icon_white.png"></span></div>
                            </div>
                        </template>
                    </template>

                    <template v-if="listtype == 'coupon'" v-for="(i,index) in list.couponList">
                        <template v-if="list.sysTime >= i.startDate  && list.sysTime <= i.endDate">
                            <div class="ticket move  coupon" @click="couponListclick(index)">
                                <p class="whole">{{i.name}}</p>
                                <p class="service"><span v-if="i.capital">最高加息本金{{i.capital}}元</span><br><span v-if="i.days">最高加息天数{{i.days}}天</span></p>
                                <p class="cost"><span class="money">+{{i.apr}}%</span></p>
                                <div class="line"><p></p></div>
                                <!--<div class="data-one" v-if="(i.startDate-i.endDate) <= 86400000">仅{{i.startDate | filterMoment('YYYY-MM-DD')}}当天使用</div>-->
                                <!--<div class="data-one" v-else>{i.startDate | filterMoment('YYYY-MM-DD')}}至{{i.endDate | filterMoment('YYYY-MM-DD')}}使用</div>-->
                                <div class="data-one" >{{i.startDate | filterMoment('YYYY-MM-DD')}}至{{i.endDate | filterMoment('YYYY-MM-DD')}}使用</div>
                                <div class="triangle" v-if="i.isclick"><span><img src="../static/images/icon_white.png"></span></div>
                            </div>
                        </template>
                    </template>

                </div>
                <div class="unavailable"><span>不可使用红包</span></div>
                <div class="nousable">
                    <template v-if=" listtype == 'redbom'" v-for="(i,index) in list.cashList">
                        <template v-if=" money1*0.02 < i.redPacketAmount || (howtime <= 15 && !list.new) " >
                            <div class="ticket move    pash-one" >
                                <p class="whole">{{i.redpacketName}}</p>
                                <p class="service"><span>{{i.useCondition}}</span></p>
                                <p class="cost"><span class="symbol">¥</span><span class="money">{{i.redPacketAmount}}</span></p>
                                <div class="line"><p></p></div>
                                <div class="data-one" >{{i.createDate | filterMoment('YYYY-MM-DD')}}至{{i.validDate | filterMoment('YYYY-MM-DD')}}使用</div>
                                <div class="triangle" v-if="i.isclick"><span><img src="../static/images/icon_white.png"></span></div>
                            </div>
                        </template>
                    </template>
                    <template v-if="listtype == 'deductionbom' ">
                        <template  v-for="(i,index) in list.deductList">
                            <template v-if=" money1 < i.leastTenderAmount || howtime < i.leastTenderDays || !i.isok">
                                <div class="ticket move  pash-one" >
                                    <p class="whole">{{i.redpacketName}}</p>
                                    <p class="service"><span>{{i.useCondition}}</span></p>
                                    <p class="cost"><span class="symbol">¥</span><span class="money">{{i.redPacketAmount}}</span></p>
                                    <div class="line"><p></p></div>
                                    <div class="data-one" >{{i.createDate | filterMoment('YYYY-MM-DD')}}至{{i.validDate | filterMoment('YYYY-MM-DD')}}使用</div>
                                    <div class="triangle" v-if="i.isclick"><span><img src="../static/images/icon_white.png"></span></div>
                                </div>
                            </template>
                        </template>
                    </template>
                    <template v-if="listtype == 'coupon' ">
                        <template  v-for="(i,index) in list.couponList">
                            <template v-if="i.startDate > list.sysTime || list.sysTime > i.endDate">
                                <div class="ticket move  pash-one" >
                                    <p class="whole">{{i.name}}</p>
                                    <p class="service"><span>{{i.useCondition}}</span></p>
                                    <p class="cost"><span class="symbol">¥</span><span class="money">{{i.apr}}</span></p>
                                    <div class="line"><p></p></div>
                                    <!--<div class="data-one" v-if="(i.startDate-i.endDate) <= 86400000">仅{{i.startDate | filterMoment('YYYY-MM-DD')}}当天使用</div>-->
                                    <!--<div class="data-one" v-else>{{i.startDate | filterMoment('YYYY-MM-DD')}}至{{i.endDate | filterMoment('YYYY-MM-DD')}}使用</div>-->
                                    <div class="data-one" >{{i.startDate | filterMoment('YYYY-MM-DD')}}至{{i.endDate | filterMoment('YYYY-MM-DD')}}使用</div>
                                    <div class="triangle" v-if="i.isclick"><span><img src="../static/images/icon_white.png"></span></div>
                                </div>
                            </template>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <div class="address" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"  v-if="listtype == 'redbom'">
            <p class="us-moeney">本次可用<span>{{available}}</span>元</p>
            <p class="elect">已选择<span>{{howmoney || 0}}</span>元</p>
            <a class="ensure" @click="submit">确定</a>
        </div>
        <input :value="redboms" type="hidden">
    </div>
</template>
<style scoped lang="scss">
    .ispop{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: scroll;
        height: auto;
        min-height: 100%;
        background-color:#f6f6f6;
        &::-webkit-scrollbar {  display: none;  }
        .popsub{
            padding-bottom:1.2rem;
            width: 100%;
            background: #f8f8f8;
            z-index: 3;
            .shade{
                width: 100%;
                height: .2rem;
                background: #626262;
            }
            .bonus{
                height: .8rem;
                line-height: .8rem;
                text-align: center;
                color: #333;
                font-size: .28rem;
                position: relative;
                border-bottom: 1px solid #ddd;
                .shadeone{
                    width: 5.343749999332031rem;
                    height: .8rem;
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 3;
                    &:before{
                        font-family: 'iconfont' !important;
                        content: '\e604';
                        font-size: .32rem;
                        position: absolute;
                        right: .3rem;
                        top: 0;
                    }
                }
            }
            .packetboom-cen{
                position: relative;
                width: 5.8rem;
                margin: .3rem auto;
                .ticket{
                    overflow: hidden;
                    width: 99.5%;
                    height: 2rem;
                    border-right: 1px solid #e6e6e6;
                    border-bottom: 1px solid #e6e6e6;
                    border-left: 1px solid #e6e6e6;
                    position: relative;
                    background: #fff;
                    border-radius: 0.1rem;
                    .whole{
                        margin: .3rem 0rem 0rem .4rem;
                        font-size: .28rem;
                    }
                    .service{
                        width:4rem;
                        font-size: .22rem;
                        margin: .3rem 0rem 0rem .2rem;
                        span{
                            color: #333 !important;
                            line-height: .2rem;
                        }
                    }
                    .cost{
                        margin-top: -.6rem;
                        margin-right: .25rem;
                        float: right;
                        .symbol{
                            color: #f35c3e;
                            font-size: .28rem;
                        }
                        .money{
                            color: #f35c3e;
                            font-size: .54rem;
                        }
                    }
                    .line{
                        width: 100%;
                        height: .1rem;
                        margin-top: 1.6874999997890625rem;
                        position: absolute !important;
                        bottom: .4rem !important;
                        left: 0;
                        &:before{
                            content: '';
                            width: .25rem;
                            height: .25rem;
                            position: absolute;
                            left: -.15rem;
                            top: -.1rem;
                            color: #f6f6f6;
                            border: 1px solid #ededed;
                            border-radius: 2.24999999971875rem;
                            background: #f6f6f6;
                            z-index: 2;
                        }
                        &:after{
                            content: '';
                            width: .25rem;
                            height:.25rem;
                            position: absolute;
                            right: -.15rem;
                            top: -.1rem;
                            color: #f6f6f6;
                            border: 1px solid #ededed;
                            border-radius: 2.24999999971875rem;
                            background: #f6f6f6;
                            z-index: 2;
                        }
                        p{
                            width: 100%;
                            height: 2px;
                            border-top: 1px dashed #ccc;
                            position: absolute;
                            left: 0;
                            top: 50%;
                        }
                    }
                    .data-one{
                        font-size: .22rem;
                        right: .3rem;
                        bottom: 0.1rem;
                        color: #999999;
                        position: absolute;
                    }
                }
                .move{
                    margin-top: .2rem;
                }
                .on-cash,.discount-one,.coupon{
                    border-top: 2px solid #f35c3e;
                    .whole{
                        color: #f35c3e;
                    }
                    .triangle{
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 0;
                        height: 0;
                        border-top: .65rem solid #f00;
                        border-left: .65rem solid transparent;
                        color: #fff;
                        span{
                            font-size: 1.124999999859375rem;
                            color: #fff;
                            display: block;
                            position: absolute;
                            right: .1rem;
                            top: -.7rem;
                            width: .21rem;
                            transform: rotate(45deg);
                            -webkit-transform: rotate(45deg);
                            text-align: center;
                            height: .61rem;
                            img{
                                transform: rotate(-43deg);
                                -webkit-transform: rotate(-43deg);
                                width: .25rem;
                                height: .21rem;
                                margin-top: .15rem;
                                display: block;
                            }
                        }
                    }
                }
                .discount-one{
                    .triangle{
                        border-top: .65rem solid #ab8ff1;
                    }
                }
                .pash-one{
                    border-top: 2px solid #ccc;
                    .whole,.service{
                        color: #ccc;
                        span{
                            color: #ccc !important;
                        }
                    }
                    .cost{
                        .symbol,.money{
                            color: #ccc;
                        }
                    }
                    .data-one{
                        color: #ccc;
                    }
                }
                .discount-one{
                    border-top: 2px solid #c1adf5;
                    .whole{
                        color: #ab8ff1;
                    }
                    .cost{
                        .symbol,.money{
                            color: #ab8ff1;
                        }
                    }
                }

                .coupon{
                    border-top: 2px solid #77adf3;
                    .whole{
                        color: #77adf3;
                    }
                    .cost{
                        .symbol,.money{
                            color: #77adf3;
                        }
                    }
                }
                .coupon{
                    .triangle{
                        border-top: .65rem solid #77adf3    ;
                    }
                }
                .unavailable{
                    position: relative;
                    font-size: .24rem;
                    line-height: .8rem;
                    height: .8rem;
                    text-align: center;
                    width: 2.6rem;
                    margin: .2rem auto 0;
                    &:before{
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        width: 100%;
                        height:1px;
                        background-color: #ccc;
                    }
                    span{
                        position: relative;
                        z-index: 2;
                        padding: 0 .1rem;
                        background-color: #f6f6f6;
                        color: #999;
                    }
                }
            }
        }
        .address{
            width: 100%;
            height: 1.2rem;
            line-height: 1.2rem;
            position: fixed;
            left: 0;
            bottom: 0;
            background: #fff;
            z-index: 1111;
            border-top: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;

            .us-moeney{
                margin-top: .3rem;
                margin-left: .2rem;
                color: #999;
                font-size: .22rem;
                height: .4rem;
                line-height: .4rem;
            }
            .elect{
                margin-left: .2rem;
                color: #333;
                font-size: .28rem;
                height: .3rem;
                line-height: .3rem;
                span{
                    font-size: .36rem;
                    color: #f35c3e;
                    padding-left: .1rem;
                    padding-right: .1rem;
                }
            }
            .ensure{
                width: 1.8rem;
                height: 1.2rem;
                text-align: center;
                line-height: 1.2rem;
                font-size: .32rem;
                color: #fff;
                position: absolute;
                right: 0;
                top: 0;
                background: #f35c3e;
                display: block;
            }
        }
    }
</style>
<script>
    import { Toast  } from 'mint-ui';
    export default{
        props: ['isshow','type','data','money','time','redbom','newHandStatus'],
        data(){
            return {
                keytype:'',
                listtype:'',
                howmoney:0,
            }
        },
        computed: {
            show(){
                return this.isshow
            },
            list(){
                return this.data
            },
            money1(){
                return this.money
            },
            howtime(){
                return this.time
            },
            available(){
                return this.$parent.money *0.02
            },
            redboms(){
                if(this.redbom == ''){
                    this.howmoney = 0;
                }
            },
            HandStatus(){
                return this.newHandStatus;
            },
            value(){
                return this.$parent.value ? '选择加息券' :  '选择红包'
            }
        },
        updated(){
            if(this.type != '' && this.keytype != this.type){
                this.keytype = this.type;
                this.listtype = this.type;
                this.howmoney = 0;
            }

        },
        mounted(){

        },
        methods: {
            clone(){
                this.$parent.isshow = false;
            },
            redbomclick(index){
                //现金红包
                let _this = this;
                this.data.cashList[index].isclick = !this.data.cashList[index].isclick;
                _this.howmoney =  0;
                _this.$parent.redids=[];
                this.data.cashList.forEach((item,index,input)=>{
                    if(item.isclick){
                        _this.$parent.redids.push(item.redpacketId);
                        _this.howmoney = (parseInt(_this.howmoney) + parseInt(item.redPacketAmount));
                    }
                })
            },
            deductionbomclick(index){
                //抵扣红包
                this.data.deductList[index].isclick = !this.data.deductList[index].isclick;
                if(this.data.deductList[index].isclick ){
                    this.$parent.deduids=this.data.deductList[index].redpacketId;
                    this.$parent.deductionbom = this.data.deductList[index].redPacketAmount
                }else{
                    this.$parent.deduids='';
                    this.$parent.deductionbom = ''
                }
                this.data.deductList.forEach((item,index1,input)=>{
                    if(index != index1){
                        item.isclick = false;
                    }
                });
//                this.$parent.deduids = this.data.deductList[index].redpacketId;
                this.$parent.isshow = false;
                this.$parent.calculate();
            },
            couponListclick(index){
                //加息券
                this.data.couponList[index].isclick = !this.data.couponList[index].isclick;
                if(this.data.couponList[index].isclick ){
                    this.$parent.coupon = this.data.couponList[index].apr;
                    this.$parent.couponId =this.data.couponList[index].couponId;
                }else{
                    this.$parent.couponId ='';
                    this.$parent.coupon = false;
                }
                this.data.couponList.forEach((item,index1,input)=>{
                    if(index != index1){
                        item.isclick = false;
                    }
                });
                let time  ='';
                if(this.data.couponList[index].days > Number(this.$parent.leftdays)){
                     time =  Number(this.$parent.leftdays)
                }else{
                    if(this.data.couponList[index].days <= 0){
                        time =  Number(this.$parent.leftdays)
                    }else{
                        time = this.data.couponList[index].days;
                    }
                }
//                let time =  this.data.couponList[index].days > Number(this.$parent.leftdays)? Number(this.$parent.leftdays) : this.data.couponList[index].days;
                this.$parent.howtime = time;
                if(this.data.couponList[index].capital >= this.$parent.money){
                    this.$parent.howtimemoney = (this.$parent.money * (this.data.couponList[index].apr *0.01) * time / 365).toFixed(2);
                }else{
                    if(this.data.couponList[index].capital){
                        this.$parent.howtimemoney = (this.data.couponList[index].capital * (this.data.couponList[index].apr *0.01) *time / 365).toFixed(2);
                    }else{
                        this.$parent.howtimemoney = (this.$parent.money * (this.data.couponList[index].apr *0.01) * time / 365).toFixed(2);
                    }
                }
                this.$parent.isshow = false;
                this.$parent.calculate();
            },
            submit(){
              if(this.howmoney > this.available){
                  Toast({
                      message: '选择红包大于可用金额',
                      position: 'middle',
                      duration: 2000
                  });
              }else{
                  this.$parent.ids =[];
                  this.data.cashList.forEach((item,index,input)=>{
                      if(item.isclick){
                          this.$parent.ids.push(item.redpacketId);
                      }
                  });
                  this.$parent.data.cashList = this.data.cashList;
                  this.$parent.redbom = Number(this.howmoney) == 0 ?  '' : Number(this.howmoney);
                  this.$parent.isshow = false;
                  this.$parent.calculate();
              }
            }
        },
        components: {
            Toast
        }
    }
</script>