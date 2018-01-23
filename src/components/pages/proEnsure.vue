<template>
    <div class="index viewport">
        <section id="help">
            <ul class="main viewport">
                <li @click="submit($event,294)">
                    <p class="tit"><i class="triangle-right"></i>1、快速联系我们？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>客服QQ群：236613404</p>
                        <p>客服电话：400-0455-360</p>
                        <p>服务时间：工作日9:00-18:00</p>
                        <p>欢迎您在客服群提出您在使用过程中的疑问，专业的理财顾问会第一时间为您解答</p>
                        <p>同时，如果您是杭州的用户，欢迎您拜访我们钱庄网来一次更亲密的接触！:）</p>
                        <p>我们的地址：杭州市西湖区华星路96号互联网金融大厦9楼</p>
                    </div>
                </li>
                <li @click="submit($event,114)">
                    <p class="tit"><i class="triangle-right"></i>2、什么是新手专享？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>新手专享项目是钱庄网推出的只有新手才能投资的项目，新手指的是从未投资过钱庄网项目的用户</p>
                    </div>
                </li>
                <li @click="submit($event,144)">
                    <p class="tit"><i class="triangle-right"></i>3、什么是投资资金的同卡进出？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>资金同卡进出指的是投资回款一一对应，投资时使用什么银行卡支付，到期后自动归还的本金和收益也只能归还至该银行卡中，真正解决了资金流向上的安全问题</p>
                    </div>
                </li>
                <li @click="submit($event,114)">
                    <p class="tit"><i class="triangle-right"></i>4、投资项目到期后本金及收益如何获得？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>您投资的项目到期后，本金和收益将会在到期日当天早上9:00-10:30回到账户余额(用户可提现使用)</p>
                    </div>
                </li>
                <li @click="submit($event,114)">
                    <p class="tit"><i class="triangle-right"></i>5、如何更换手机号码？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>请去APP“我” → 个人头像→ 修改手机号码（若旧手机号无法接受短信，请联系客服办理更换手机号业务 400-0455-360）</p>
                    </div>
                </li>
                <li @click="submit($event,204)">
                    <p class="tit"><i class="triangle-right"></i>6、投资中支付失败的可能原因？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>1.支付银行卡余额不足</p>
                        <p>2.银行卡与账户实名认证信息不符</p>
                        <p>3.填写的银行卡预留手机号错误</p>
                        <p>4.相关银行卡不满足支付条件</p>
                        <p>新支持的所有银行卡列表及相应规则看<a href="http://bbs.qian360.com/posts/list/568.page">http://bbs.qian360.com/posts/list/568.page</a></p>
                    </div>
                </li>
                <li @click="submit($event,114)">
                    <p class="tit"><i class="triangle-right"></i>7、如何绑定银行卡？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>1.可在投资项目时选择银行卡进行支付，支付成功后该卡即已绑定</p>
                        <p>2.去我的银行卡-添加银行卡完成绑定</p>
                    </div>
                </li>
                <li @click="submit($event,114)">
                    <p class="tit"><i class="triangle-right"></i>8、如何解绑银行卡？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>请去APP“我” → 个人头像→ 银行卡 → 更换可解绑银行卡。（解绑银行卡审核过程中，银行卡账户将被冻结，不可进行提现和投资）</p>
                    </div>
                </li>
                <li @click="submit($event,54)">
                    <p class="tit"><i class="triangle-right"></i>9、到期日回款具体时间点是什么时候？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>到期日当天早上9:00-10:30回到账户余额</p>
                    </div>
                </li>
                <li @click="submit($event,54)">
                    <p class="tit"><i class="triangle-right"></i>10、利息的计算方法？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>利息=(投资的金额*预期年化)/365*实际投资天数</p>
                    </div>
                </li>
                <li @click="submit($event,1120)">
                    <p class="tit"><i class="triangle-right"></i>11、各大银行认证支付支持限额是多少？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <ul class="limitMoney">
                            <li class="head"><span>银行</span><span>单笔限额</span><span>单日限额</span><span>单月限额</span></li>
                            <li><span>农业银行</span><span>20万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>浦发银行</span><span>5万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>邮储银行</span><span>1万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>广发银行</span><span>50万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>民生银行</span><span>50万</span><span>100万</span><span>3000万</span></li>
                            <li><span>平安银行</span><span>50万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>中国银行</span><span>20万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>建设银行</span><span>50万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>光大银行</span><span>50万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>兴业银行</span><span>5万</span><span>5万</span><span>150万</span></li>
                            <li><span>中信银行</span><span>50万</span><span>无限额</span><span>无限额</span></li>
                            <li><span>华夏银行</span><span>50万</span><span>无限额</span><span>无限额</span></li>
                            <li class="diffrent"><span><i>交通银行</i><i>50万</i><i>500万</i><i>无限额</i></span><span class="notice">部分商户有配置交行</span></li>
                            <li class="diffrent"><span><i>工商银行</i><i>5万</i><i>5万</i><i>150万</i></span><span class="notice">大额支付有失败和调单的情况</span></li>
                            <li class="diffrent"><span><i>招商银行</i><i>30万</i><i>无限额</i><i>无限额</i></span><span class="notice">大额支付通道我司已经关闭，目前是单笔5000，单日单月50000的支付额度恢复时间待定</span></li>
                        </ul>
                    </div>
                </li>
                <li @click="submit($event,174)">
                    <p class="tit"><i class="triangle-right"></i>12、账户余额提现到账时间？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>15:00之前发起提现，当天到账</p>
                        <p>15:00之后发起提现，第二天到账</p>
                        <p>周末及节假日除工行、招行、建行、农行、中行的提现正常到账，其余银行的提现均在节假日后第一个工作日统一到账</p>
                    </div>
                </li>
                <li @click="submit($event,54)">
                    <p class="tit"><i class="triangle-right"></i>13、信用卡可以充值吗？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>暂不支持信用卡充值(充值需去PC端操作)</p>
                    </div>
                </li>
                <li @click="submit($event,144)">
                    <p class="tit"><i class="triangle-right"></i>14、投资提现如何收取手续费？</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>您充值过后没有用于投资的金额，提现时平台将收取0.25%的转账手续费。手续费=(提现金额-可免费提现额度)*0.25%，最低1元，包含小数点则四舍五入</p>
                    </div>
                </li>
                <li @click="submit($event,1216)">
                    <p class="tit"><i class="triangle-right"></i>15、关于债权转让</p>
                    <div class="cont" style="height:0px;overflow:hidden;">
                        <p>一、什么是债权转让？</p>
                        <p>债权转让是指不改变合同内容的合同转让，债权人通过与第三人订立合同将债权的全部或部分转移于第三人，第三人取代原债权人成为原合同关系的新的债权人。</p>
                        <p>平台债权转让功能是指投资人申购产品未到合同规定回款期限，因个人原因急需资金，而将手中所持有产品剩余债权进行转让。</p>
                        <p style="margin-top: .1rem;">二、债权转让条件？</p>
                        <p>支持债权转让的项目必须满足以下条件：</p>
                        <p>1、转让的项目持有时间需超过15天；</p>
                        <p>2、转让的项目距离回款时间需超过15天；</p>
                        <p>3、用户投资中的本金需大于等于15万；</p>
                        <p>4、单笔转让金额需在5万元及以上；</p>
                        <p style="margin-top: .1rem;">三、债权转让费用如何收取？</p>
                        <p>平台将收取每笔转让金额0.3%的手续费，手续费在转让成功以后直接从本金里扣除；</p>
                        <p style="margin-top: .1rem;">四、转让流程是什么？</p>
                        <p>用户发起转让申请→平台审核→线上募集，满标结束→资金转入申请人余额</p>
                        <p style="margin-top: .1rem;">五、债权转让利率如何规定？</p>
                        <p>转让利率可在原债权基础上自主设定上下浮动利率（最多小数点后两位）,但是所设定的年化收益不能低于7%或高于15%；转让成功之后，浮动利率在所获得的利息中扣除，利息不够直接从本金中扣；</p>
                        <p style="margin-top: .1rem;">六、转让成功原债权人本息如何计算？</p>
                        <p>项目转让成功后，扣除手续费（如浮动利率高于所得利息还将扣除部分浮动利率）后剩余本金会回到账户余额中，按申购产品到转让成功日期计息，所得利息（扣除浮动利率后剩余）将会在该项目最终回款日回到账户余额。该项目最终还款的本息和平台的奖励等属于新的债权人，与原债权人无关；</p>
                        <p style="margin-top: .1rem;">七、转让注意事项</p>
                        <p>1、用户一旦申请转让，无法撤销；</p>
                        <p>2、转让中的项目，如该项目提前还款，转让会在还款前一天自动截标；已转让部分按照正常转让核算本息、手续费。</p>
                        <p>3、用户申请转让时系统会自动生成一份债权转让协议；</p>
                        <p>4、用户发起的转让项目7天内未满标，该项目自动截标，已转让部分按照正常转让核算本息、手续费。</p>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'help',
        data () {
            return {
                loading:false,
                time:32,
                isLogin:true,
                username:'xxx',
                realStatus:false,
            }
        },
        mounted(){

        },
        methods:{
            submit(e,value){
                let evt = window.event||event;
                let targetObj = evt.target||evt.srcElement;
//                console.log(value,e)
//                console.log(e.path[1].children[1].innerHTML,e.path[1].children[1].innerHTML.length)
//               console.log( e.path[1].children[1])
                if(parseInt(targetObj.parentNode.childNodes[2].style.height) > 0){
                    targetObj.parentNode.childNodes[2].style.height='0px';
                    targetObj.getElementsByTagName('i')[0].style.transform='rotate(0deg)';
                    targetObj.getElementsByTagName('i')[0].style.webkitTransform = 'rotate(0deg)';
                }else{
//                    targetObj.parentNode.childNodes[2].style.height=value+'px';
//                    targetObj.getElementsByTagName('i')[0].style.transform='rotate(90deg)';
//                    targetObj.getElementsByTagName('i')[0].style.webkitTransform = 'rotate(90deg)';
//                    targetObj.getElementsByTagName('i')[0].style.transform='rotate(90deg);';
//
//                    targetObj.getElementsByTagName('i')[0].style.webkitTransform='rotate(90deg);';

//                    alert( targetObj.getElementsByTagName('i')[0].style.webkitTransform)
//                    document.querySelectorAll('li .cont').forEach((item,index,input)=>{
//                        item.style.height ='0px';
//                    });
                        for(let i=0;i<document.getElementsByTagName('li').length;i++){
                            if(document.getElementsByTagName('li')[i].getElementsByTagName('div')[0]){
                                document.getElementsByTagName('li')[i].getElementsByTagName('div')[0].style.height ='0px';
                            }
                        }
                        for(let i=0;i<document.getElementsByClassName('triangle-right').length;i++){
                            document.getElementsByClassName('triangle-right')[i].style.transform='rotate(0deg)';
                            document.getElementsByClassName('triangle-right')[i].style.webkitTransform='rotate(0deg)';

                        }
                        targetObj.parentNode.childNodes[2].style.height=value+'px';
                        targetObj.getElementsByTagName('i')[0].style.transform='rotate(90deg)';
                        targetObj.getElementsByTagName('i')[0].style.webkitTransform = 'rotate(90deg)';
//                    document.querySelectorAll('#help li .tit .triangle-right').forEach((item,index,input)=>{
//                        item.style.transform='rotate(0deg)'
//                    });
//                    targetObj.parentNode.childNodes[2].style.height=value+'px';
//                    targetObj.childNodes[0].style.transform='rotate(90deg)'
                }
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .viewport{
        position:static;
        background:#fff;
    }
    #help{
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: scroll;
        &::-webkit-scrollbar {  display: none;  }
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        a{
            display:block;
        }
        .main{
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding-bottom: 2.8rem;
            li{
                margin: 0 .27rem;
                border-bottom: 1px solid #eee;
                -webkit-tap-highlight-color: transparent;

                .tit{
                    padding: .3rem 0;
                    font-size: .28rem;
                    color: #494949;
                    cursor: pointer;
                    .triangle-right{
                        display: inline-block;
                        width: 0;
                        height: 0;
                        overflow: hidden;
                        line-height: 0;
                        font-size: 0;
                        vertical-align: middle;
                        border-left: 6px solid #c9c9c9;
                        border-right: 0 none;
                        border-top: 5px solid transparent;
                        border-bottom: 5px solid transparent;
                        _color: #FF3FFF;
                        _filter: chroma(color=#FF3FFF);
                        -webkit-transition: -webkit-transform .3s ease;
                        -o-transition: -o-transform .3s ease;
                        transition: transform .3s ease;
                        margin-right: .3rem;
                    }
                }
                .cont{
                    padding: 0 .2rem;
                    font-size: 1.46250rem;
                    color: #aaa;
                    line-height: 2.5rem;
                    -webkit-transition: height .3s ease;
                    -o-transition: height .3s ease;
                    transition: height .3s ease;
                    .limitMoney{
                        margin-bottom: .2rem;
                        border: solid 1px #ccc;
                        li{
                            line-height: .8rem;
                            height:.8rem;
                            color: #666;
                            border-bottom: solid 1px #eee;
                            overflow:hidden;
                            margin:0;
                            span{
                                display: block;
                                float:left;
                                width: 25%;
                                text-align: center;
                                line-height:  .8rem;
                                height:.8rem;
                                margin-bottom: 0!important;
                                font-size:.24rem;
                            }
                        }
                        .head{
                            overflow:hidden;
                            background: #f3f3f3;
                            color: #333;
                            margin:0
                        }
                        .diffrent{
                            display: block;
                            width: 100%;
                            margin-bottom: 0!important;
                            overflow: hidden;
                            height:auto;
                            span{
                                display: block;
                                width: 100%;
                                line-height: .8rem;
                                height:.8rem;
                                text-align: left;
                                i{
                                    display: block;
                                    width: 25%;
                                    float:left;
                                    font-style: normal;
                                    margin-bottom: 0!important;
                                    text-align: center;
                                    line-height: .8rem;
                                }
                            }
                            .notice{
                                margin-left: 1.5rem;
                                line-height: .8rem;
                                width: 67%;
                                border-top: dashed 1px #e0e0e0;
                                padding: .15rem 0 .15rem;
                            }
                        }
                    }
                    p{
                        font-size:.24rem;
                        line-height:.3rem;
                        display: block;
                        padding-bottom:.2rem;
                        letter-spacing: 0.01rem;

                    }
                }
            }
        }
    }
</style>
