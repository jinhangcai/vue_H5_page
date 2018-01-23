<template>
    <div class="index viewport">
        <section id="proMoreInfo">
            <div class="item">
                <div class="tit">项目详情</div>
                <ul class="subitem">
                    <li>
                        <h4 class="subtit">借款人信息</h4>
                        <div id="jsProductDebtorInfo" class="subdes">{{obj.debtorInfo}}</div>
                    </li>
                    <li>
                        <h4 class="subtit">项目描述</h4>
                        <p id="jsProductContent" class="subdes">{{obj.content}}</p>
                    </li>
                    <li>
                        <h4 class="subtit">资金用途</h4>
                        <p id="jsProductFundUsage" class="subdes">{{obj.fundUsage}} </p>
                    </li>
                    <li>
                        <h4 class="subtit">还款来源</h4>
                        <p id="jsProductRepaymentSource" class="subdes">{{obj.repaymentSource}}
                        </p>
                    </li>
                </ul>
            </div>
            <div class="item">
                <div class="tit">风险控制</div>
                <p id="jsProductRiskEvaluation" class="cont">{{obj.riskEvaluation}}</p>
            </div>
            <div class="item info">
                <div class="tit">相关资料</div>
                <div id="jsBorrowUserInfo" class="info_img">
                    <h4>基本信息（<span>{{borrowUserInfo}}</span>）</h4>
                    <ul id="jsFileListBorrowUserInfo">
                        <template v-for="i in obj.borrowFileList">
                            <li v-if="i.fileType == 'borrowUserInfo'"><img :src="i.fileUrl" alt="1514171332886.png" @click="showImg($event)"></li>
                        </template>
                    </ul>
                </div>
                <div id="jsBorrowMortgage" class="info_img">
                    <h4>项目资料（<span>{{borrowMortgage}}</span>）</h4>
                    <ul id="jsFileListBorrowMortgage">
                        <template v-for="i in obj.borrowFileList">
                            <li v-if="i.fileType == 'borrowMortgage'"><img :src="i.fileUrl" alt="1514171332886.png" @click="showImg($event)"></li>
                        </template>
                    </ul>
                </div>
                <div class="info_img">
                    <h4>担保资料（<span>{{borrowVouch}}</span>）</h4>
                    <ul >
                        <template v-for="i in obj.borrowFileList">
                            <li v-if="i.fileType == 'borrowVouch'"><img :src="i.fileUrl" alt="1514171332886.png" @click="showImg($event)"></li>
                        </template>
                    </ul>
                </div>
                <div class="info_img">
                    <h4>经营信息（<span>{{borrowCompanyInfo}}</span>）</h4>
                    <ul >
                        <template v-for="i in obj.borrowFileList">
                            <li v-if="i.fileType == 'borrowCompanyInfo'"><img :src="i.fileUrl" alt="1514171332886.png" @click="showImg($event)"></li>
                        </template>
                    </ul>
                </div>
            </div>
        </section>
        <div class="v-modal" style="z-index: 2000;" v-if="img" @click="cloneImg"></div>
        <div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2001;" v-if="img" @click="cloneImg">
            <div class="mint-msgbox mint-msgimg" style="">

                <img :src="img" />
            </div>
        </div>
    </div>
</template>

<script>
    //    import tabNav from '../tabNav';
//    import { MessageBox } from 'mint-ui';
    export default {
        name: 'product',
        data () {
            return {
                loading:false,
                obj:{},
                borrowUserInfo:'',
                borrowMortgage:'',
                borrowVouch:'',
                borrowCompanyInfo:'',
                img:''
            }
        },
        mounted(){
          this.loadajax();
//            MessageBox({
//                title: '提示',
//                message: '确定执行此操作?',
//                showCancelButton: true
//            });

        },
        methods:{
            loadajax(){
                let _this = this;
                this.$http({
                    method: 'get',
                    url: this.$urls.financialmoreInfo,
                    data:{
                        borrowId:this.$route.query.id
                    }
                }).then( data => {
                    let borrowUserInfo=0,borrowMortgage=0,borrowVouch=0,borrowCompanyInfo=0;
                    this.obj = data.data;
                    data.data.borrowFileList.forEach((item,index,input)=>{
                        if(item.fileType == 'borrowUserInfo'){
                            borrowUserInfo++;
                        }else if(item.fileType == 'borrowMortgage'){
                            borrowMortgage++
                        }else if(item.fileType == 'borrowVouch'){
                            borrowVouch++
                        }else if(item.fileType == 'borrowCompanyInfo'){
                            borrowCompanyInfo++
                        }
                    })
                    this.borrowUserInfo=borrowUserInfo;
                    this.borrowMortgage=borrowMortgage;
                    this.borrowVouch=borrowVouch;
                    this.borrowCompanyInfo=borrowCompanyInfo;
                }).catch( e => {
                })
            },
            loadMore() {
                this.loading = true;
                console.log(1)
            },
            showImg(e){
                let evt = window.event||event;
                let targetObj = evt.target||evt.srcElement;
                this.img = targetObj.src;
                console.log(targetObj.src)
            },
            cloneImg(){
                this.img = '';
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
    }
    .mint-msgimg{
        width:100%;
        img{
            width:100%;
        }
    }
    #proMoreInfo{
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*overflow-y: scroll;*/
        /*height: auto;*/
        /*&::-webkit-scrollbar {  display: none;  }*/
        background-color:#fff;
        .item{
            .tit{
                background-color: #edeef0;
                font-size: .24rem;
                line-height: 2.667;
                padding-left: 4%;
            }
            .subitem{
                li{
                    margin: .3rem 4% 0;
                    padding-bottom: .1rem;
                    border-bottom: solid 1px #edeef0;
                    .subtit{
                        font-size: .28rem;
                        margin: 0;
                        font-weight: normal;
                    }
                    .subdes{
                        font-size: .28rem;
                        text-indent: .3rem;
                        padding: .26rem 0 .1rem;
                        color:#666666;
                    }
                    p{
                        line-height: 1.5;
                    }
                }
            }
        }
        #jsProductRiskEvaluation{
            margin: .38rem 4% 0;
            padding-bottom: .6rem;
            font-size: .28rem;
            text-indent: .3rem;
            color:#666;
        }
        .info{
            padding-bottom:1.4rem;
            .info_img{
                margin: .42rem 4% 0;
                h4{
                    margin: 0;
                    font-size: .28rem;
                    font-weight: normal;
                }
                ul{
                    padding: 0;
                    margin-top: .28rem;
                    font-size: 0;
                    line-height: 0;
                    li{
                        width: 30%;
                        height: .9rem;
                        display: inline-block;
                        margin: 0 2.66% .2rem 0;
                        overflow: hidden;
                        border: solid 1px #000;
                        img{
                            width:100%;
                            min-height: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
