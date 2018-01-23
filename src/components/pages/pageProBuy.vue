<template>
    <div class="index viewport">
        <section id="pageProBuy">
                <div class="box invest-box">
                    <div class="tit">
                        <p class="invest-mold">{{loadobj.borrowName}}</p>
                        <p class="tismoney">可投资金额 <span class="investment">{{loadobj.availableMoney}}</span>元</p>
                        <p class="tismoney">剩余投资天数：<span class="investment">{{loadobj.leftDays}}</span>天</p>
                    </div>
                    <div class="cont">
                        <div class="tits">我要投资</div>
                        <div class="conts">
                            <input id="investAmount" type="text" pattern="[0-9]*"   v-model="money" :placeholder="loadobj.lowestAccount+'元起投'" data-activate-check="true" @input="changes">
                            <span class="unit">元</span></div></div>
                    <div class="info">预估收益 <span id="earnings">{{howmoney}}</span> 元</div>
                </div>
                <div class="box info-box">
                    <div class="tit"><span></span><i>支付信息</i></div>
                    <div class="cont">
                        <div class="row btn-deduction">
                            <div class="tits font-color-gray-neutral">使用加息券<span>(不可与红包同时使用)</span></div>
                            <mt-switch v-model="value" @change="isswitch"></mt-switch>
                        </div>
                        <div class="row btn-deduction" v-if="value && !iscoupon">
                            <div class="tits font-color-gray-neutral">加息券(无)</div>
                        </div>
                        <div class="row gift on-dis"  @click="gored('coupon')" v-if="value && iscoupon">
                            <div class="tits clsbtn" id="redPacketLimit2">加息券</div>
                            <div class="conts">
                                <span class="font-color-gray-neutral font-color-gray-neutrall"><span v-if="coupon">{{howtime}}天{{coupon}}% 可得收益{{howtimemoney}}元</span></span>
                                <span class="iconf icon-arrow-right font-color-gray-neutral"></span>
                            </div>
                        </div>
                        <div class="row btn-cash" v-if="!value && !isred">
                            <div class="tits font-color-gray-neutral">现金红包(无)</div>
                        </div>
                        <div class="row gift on-flow" id="envelopeBtn" v-if="!value && isred" @click="gored('redbom')">
                            <div class="tits" id="redPacketLimit">现金红包</div>
                            <div class="conts">
                                <span class="font-color-gray-neutral  font-color-gray-neutrall">{{redbom}}</span>
                                <span class="iconf icon-arrow-right font-color-gray-neutral"></span>
                            </div>
                        </div>
                        <div class="row btn-deduction" v-if="!value && !deduction">
                            <div class="tits font-color-gray-neutral">抵扣红包(无)</div>
                        </div>
                        <div class="row gift on-dis" v-if="!value  && deduction"  @click="gored('deductionbom')">
                            <div class="tits clsbtn" id="redPacketLimit1">抵扣红包</div>
                            <div class="conts" >
                                <span class="font-color-gray-neutral font-color-gray-neutrall">{{deductionbom}}</span>
                                <span class="iconf icon-arrow-right font-color-gray-neutral"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="tits">存管账户余额(<span id="balance">{{loadobj.availableBalance}}</span>元)</div>
                            <div class="conts"><span id="buyAmount">{{balance}}</span>元</div>
                        </div>
                        <div class="row limitreturn">
                            <div class="tits">{{loadobj.bankName}}(尾号<span id="hiddenCardNo">{{loadobj.hiddenCardNo}}</span>)</div>
                            <div class="conts"><span id="bankBuy">{{cardmoney}}</span>元</div>
                            <div class="limit">本次支付金额上限<span>{{loadobj.singleLimit}}</span> 元</div>
                        </div>
                        <!--<template v-else>-->
                            <!--<div class="row" >-->
                                <!--<div class="tits">银行卡</div>-->
                                <!--<div class="conts">-->
                                    <!--<select name="bindBank" id="bindBank" class="needsclick">-->
                                        <!--<option value="">请选择</option>-->
                                        <!--<template v-for="i in loadobj.allBankCardList">-->
                                            <!--<option :value="i.bankCode">{{i.bankShortName}}</option>-->
                                        <!--</template>-->
                                    <!--</select>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="row import-bankcard " id="bankCard">-->
                                <!--<input id="bankCardNo" type="text" placeholder="请输入与实名信息一致的银行卡号" pattern="[0-9]*" maxlength="20" data-activate-check="true" value="">-->
                            <!--</div>-->
                        <!--</template>-->
                    </div>
                </div>

                <div class="operation-box">
                    <a href="javascript:;" class="disabled js-submit red ui-btn" v-if='money > 0' data-activate-submit="true" disabled="true" @click="submit">确定去支付</a>
                    <a href="javascript:;" class="disabled js-submit disblad ui-btn"  v-else data-activate-submit="true" disabled="true">确定去支付</a>
                    <p class="info">到期本金收益自动归还至账户余额</p>
                </div>
        </section>
       <redenvelope :isshow="isshow" :type="type" :data="data" :money="money" :time="time" :redbom="redbom" :newHandStatus="newHandStatus"></redenvelope>

    </div>
</template>

<script>
    import redenvelope from '../redenvelope.vue';
    import { Switch,Toast,MessageBox  } from 'mint-ui';

    export default {
        name: 'pageProBuy',
        data () {
            return {
                loadobj:{
                    lowestAccount:500
                },
                data:'',                  //传给组件的数据
                mostAccount:36257,       //本次支付金额 银行卡上限
                redbom:'',            //现金红包
                deductionbom:'',     //抵扣红包
                coupon:'',          //加息券
                balance:0,          //余额
                cardmoney:0,        //银行卡上需要支付的钱
                howmoney:'0',       //预估收益
                money:'',           //投资金额
                value:false,        //switch开关
                deduction:true,     //是否有抵扣红包
                isred:true,         //是否有现金红包
                iscoupon:true,      //是否有加息券
                isshow:false,       //组件是否显示
                type:'',             //组件显示红包类型
                redids:[],           //用于存放现金红包的id
                deduids:'',          //用于存放抵扣红包的id
                howtime:'',          //加息券时间
                howtimemoney:'',     //加息券获得收益
                couponId:'',            //加息券id
                time:'',              //标的时间
                storage:'',              //存储data数据
                newHandStatus:this.$route.query.newHandStatus,         //存储是否为新手
                leftdays:''             //剩余投资天数
            }
        },
        mounted(){
          this.time = this.$route.query.day;
          this.loadajax();
        },
        methods:{
            loadMore() {
                this.loading = true;
            },
            loadajax(sis,value){
                let _this = this;
                if(sis){
                    this.redload(this.storage,value);
                    return;
                }
                this.$http({
                    method: 'get',
                    url: this.$urls.tradeprepare,
                    data:{
                        borrowId:this.$route.query.id,
                        service:'prepare'
                    }
                }).then( data => {
//                    if(sis){
//                        this.redload(data,value)
//                    }else{
//                        this.loadobj = data.data;
//                        this.loadobj.lowestAccount = this.$route.query.lowestAccount;
//                    }
                        this.storage = data;
                        this.loadobj = data.data;
                        this.isred = data.data.cashList != false;
                        this.deduction = data.data.deductList != false;
                        this.iscoupon = data.data.couponList != false;
                        this.loadobj.lowestAccount = this.$route.query.lowestAccount;
                        this.leftdays = data.data.leftDays;
                }).catch( e => {
                })
            },
            redload(data,value){
                let _this = this;
                if((value == 'redbom' && this.redbom && this.data) || (value == 'deductionbom' && this.deductionbom && this.data) || (value == 'coupon' && this.coupon && this.data)){
                }else{
                    this.data = data.data;
                    let cashList=[],couponList=[],deductList=[];
                    data.data.cashList.forEach((item,index,input)=>{
                        //现金红包
                        let obj = item;
                        obj.isclick = false;
                        cashList.push(obj)
                    });
                    this.data.cashList = cashList;
                    data.data.couponList.forEach((item,index,input)=>{
                        //加息券
                        let obj = item;
                        obj.isclick = false;
                        couponList.push(obj)
                    });
                    this.data.couponList = couponList;
                    data.data.deductList.forEach((item,index,input)=>{
                        //抵扣红包
                        let obj = item;
                        obj.isclick = false;
                        if(obj.productTypeLimit == '' || obj.productTypeLimit.split(',').length ==3){
                            obj.isok = true;
                        }else{
                            let type = _this.loadobj.borrowName.substr(0,3);
                            for(let i=0;i<obj.productTypeLimit.split(',').length;i++){
                                obj.isok = false;
                                if(type == obj.productTypeLimit.split(',')[i]){
                                    obj.isok = true;
                                    break;
                                }
                            }
                        }
                        deductList.push(obj)
                    });
                    this.data.deductList = deductList;
                }
            },
            changes(){
                let reg = /^[1-9]\d*$/;
                if(!reg.test(this.money)){
                    this.money = this.money.substr(0,this.money.length-1)
                }
                if(this.money > this.loadobj.availableMoney){
                    this.money = this.loadobj.availableMoney;
                }
                this.coupon = '';
                this.redbom='';
                this.deductionbom = '';
                this.redids=[];
                this.deduids='';
                this.couponId ='';
                this.howmoney = ( this.money * (((Number(this.$route.query.apr)+Number(this.$route.query.extraApr)))*0.01) / 365 * this.loadobj.leftDays).toFixed(2)
                this.calculate()
            },
            calculate(){
                //使用现金红包和抵扣红包
                // 投资金额 -抵扣红包 -现金红包 < 余额
                if((this.money - this.redbom - this.deductionbom) < this.loadobj.availableBalance){
                    this.balance =  this.money - this.redbom - this.deductionbom > 0 ? this.money - this.redbom - this.deductionbom : 0
                    this.cardmoney =0;
                }else{
                    this.balance = parseInt(this.loadobj.availableBalance) > 0 ? parseInt(this.loadobj.availableBalance) : 0;
                    this.cardmoney = this.money - parseInt(this.balance) - this.redbom - this.deductionbom > 0 ? this.money - parseInt(this.balance) - this.redbom - this.deductionbom: 0;
                }

            },
            isswitch(){
                this.coupon = ''
                this.redbom='';
                this.deductionbom = '';
                this.redids=[];
                this.deduids='';
                this.couponId ='';
                this.calculate();
            },
            gored(value){
                if(!this.money){
                    Toast({
                        message: '请输入投资金额',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }
                this.loadajax('ok',value);
                this.isshow = true;
                this.type = value;
            },
            submit(){
                if(this.loadobj.availableMoney > this.$route.query.lowestAccount){
                    if(Number(this.money) < Number(this.loadobj.lowestAccount)){
                        Toast({
                            message: '投资金额不能小于' + this.loadobj.lowestAccount,
                            position: 'middle',
                            duration: 2000
                        });
                        return;
                    }
                }

                if(this.cardmoney > this.loadobj.singleLimit){
                    Toast({
                        message: '投资金额超过银行卡本次支付金额上限',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }
                if(!this.loadobj.bankName){
                    Toast({
                        message: '请先绑定银行卡',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                }
                let buyType ='';
                if(Number(this.balance) > 0 ){
                    buyType = 0
                }
                if(Number(this.cardmoney) > 0 ){
                    buyType = 1
                }
                if(Number(this.balance) > 0 && Number(this.cardmoney) > 0){
                    buyType = 2
                }
                let redpacketIds=[];
                this.redids.forEach(item=>{
                    if(item){
                        redpacketIds.push(item)
                    }
                });
                if(this.deduids){
                    redpacketIds.push(this.deduids)
                }
                this.$http({
                    method: 'post',
                    url: this.$urls.tradepay,
                    data:{
                        bankCode:this.loadobj.bankCode,
                        bankMoney:this.cardmoney ?  this.cardmoney : 0,
                        borrowId:this.$route.query.id,
                        buyType:buyType,
                        couponId:this.couponId,
                        money:this.money,
                        redpacketIds:redpacketIds.join(','),
                        redpacketSum:this.redbom+this.deductionbom,
                        service:'pay',
                        systemType:31,
                        useMoney:this.money-this.redbom-this.deductionbom
                    }
                }).then( data => {
                    let url = data.data.postUrl,
                        formData = data.data.reqDataPackage;
                    this.$formPost(url, formData);
                }).catch( e => {
                    MessageBox('提示', e.msg);
                })
            }
        },
        components: {
            [Switch.name]:Switch,
            redenvelope,
            Toast,
            MessageBox
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .viewport{
        position:static;
    }
    .mint-switch{
        float: right;
        margin-right: .3rem;
        height: 100%;
    }
    .mint-switch-core{
        border-color: red;
        background-color: red;
    }
    #pageProBuy{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: scroll;
        height: auto;
        &::-webkit-scrollbar {  display: none;  }
        .invest-box{
            .tit{
                padding: 0 .3rem;
                font-size: .24rem;
                color: #666;
                .invest-mold{
                    font-size: .26rem;
                    color: #333;
                    height: .3rem;
                    line-height: .3rem;
                    margin-top: .4rem;
                }
                .tismoney{
                    padding-top:.1rem;
                }
                .investment{
                    color: #f35c3e;
                }
            }
            .cont{
                position: relative;
                height: .96rem;
                border: solid #ddd;
                border-width: 1px 0;
                background-color: #fff;
                margin-top:.4rem;
                .tits{
                    left: .3rem;
                    color: #333;
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    font-size: .28rem;
                }
                .conts{
                    right: .3rem;
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    font-size: .28rem;
                }
                input{
                    border: 0 none;
                    font-size: .28rem;
                    text-align: right;
                    width: 2.3rem;
                }
            }
            .info{
                margin: 0.25rem 0.25rem 0rem 0rem;
                text-align: right;
                font-size: .26rem;
                color: #666;
                span{
                    color:#f35c3e;
                }
            }
        }
        .info-box{
            .tit{
                line-height: .96rem;
                padding: 0rem .3rem;
                font-size: .26rem;
                color: #666;
                position: relative;
                height: .96rem;
                border: solid #ddd;
                border-width: 1px 0;
                margin-top: .4rem;
                background-color: #fff;
                span{
                    display: block;
                    width: .1rem;
                    height: .1rem;
                    border-radius: 50px;
                    background: #77adf3;
                    position: absolute;
                    top: 45%;
                }
                i{
                    padding-left: .25rem;
                    font-style: inherit;
                }
            }


            .font-color-gray-neutral{
                span{
                    color:#999;
                    padding-left:.1rem;
                }
            }
            .cont{
                .row{
                    position: relative;
                    height: .96rem;
                    border: solid #ddd;
                    border-width: 1px 0;
                    margin-top: -1px;
                    background-color: #fff;
                    .tits{
                        left: .3rem;
                        color: #333;
                        position: absolute;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        font-size: .26rem;
                    }
                    .conts{
                        right:.3rem;
                        position: absolute;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        font-size: .26rem;
                    }
                }
                .font-color-gray-neutral{
                    color: #f35c3e;
                    font-size: .28rem;
                }
                .icon-arrow-right{
                    color: #999;
                }
                .limitreturn{
                    height: 1.4rem;
                    .tits{
                        position: absolute;
                        top: 35%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        font-size: .26rem;
                    }
                    .limit{
                        position: absolute;
                        left: .3rem;
                        top: .8rem;
                        font-size: .26rem;
                        color: #999;
                    }
                }
                select{
                    height: .6rem;
                    width: 2.5rem;
                }
                .import-bankcard{
                    padding: 0rem .3rem;
                }
            }
            #bankCard{
                input{
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    width: 5rem;
                    border: 0 none;
                    font-size: .24rem;
                }
            }
        }
        .operation-box{
            margin-top: .6rem;
            padding: 0rem .3rem;
            .js-submit{
                width: 100%;
                line-height: .8rem;
                font-size: .32rem;
                display: inline-block;
                border-radius: .1rem;
                text-align: center;
            }
            .red{

                background-color: #f35c3e;
                border-color: #f35c3e;
                color: #fff;
            }
            .disblad{
                background-color: #fcc6c8;
                border-color: #fcc6c8;
                color: #fff8f8;
                cursor: not-allowed;
                pointer-events: none;
            }
            .info{
                margin-top: .22rem;
                text-align: center;
                font-size: .24rem;
                color: #ccc;
                padding-bottom:.2rem;
            }
        }
    }
</style>
