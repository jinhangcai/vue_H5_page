<template>
    <div class="index viewport">
        <section id="myCenter">
            <div class="my-info">
                <ul class="info-box">
                    <li><span>账户</span>{{tel || '--'}}</li>
                    <li><span>姓名</span>{{realName || '--'}}</li>
                    <li><span>身份证</span>{{cardId || '--'}}</li>
                </ul>
                <div class="my-img" v-if="realStatus && bankDepositoryType "></div>
                <div class="my-title" v-else @click="certification">开通存管账户</div>
            </div>
            <div class="operate" @click="Modify">
                <a href="javascript:;">修改登录密码<i class="icon-arrow-right"></i></a>
            </div>
            <a id="safetyQuit" class="quit" href="javascript:;" @click="exit">退出</a>
        </section>
    </div>
</template>

<script>
    import tabNav from '../tabNav';
    export default {
        name: 'myCenter',
        data () {
            return {
                loading:false,
                phone:'',
                realName:'',
                cardId:'',
                xwBankStatus:false,
                bankDepositoryType:'',
                realStatus:'',
            }
        },
        computed:{
          tel(){
              return this.phone.substr(0,3)+'****'+this.phone.substr(this.phone.length-4,4)
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
                    url: this.$urls.userInfo,
                    data:{
                        service:'userInfo'
                    }
                }).then( data => {
                    console.log(data)
                    this.isLogin = true;
                    this.phone = data.data.phone;
                    this.realName = data.data.realName;
                    this.xwBankStatus = data.data.xwBankStatus;
                    this.cardId = data.data.cardId;
                    this.bankDepositoryType = data.data.bankDepositoryType;
                    this.realStatus = data.data.realStatus;
                }).catch( e => {
                    this.isLogin = false;
                })
            },
            submit(){
                if(!this.isLogin){
                    //未登录
                }else if(!this.realStatus){
                    //未实名
                }else {
                    //跳转个人信息
                }
            },
            certification(){
                //去认证
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
//                if(!this.bankDepositoryType  && !this.realStatus){
//                    this.$http({
//                        method: 'post',
//                        url: this.$urls.registeToBankDepository,
//                        data:{
//                            service:'registeToBankDepository'
//                        }
//                    }).then( data => {
//
//                        let url = data.data.postUrl,
//                            formData = data.data.reqDataPackage;
//
//                        this.$formPost(url, formData);
//
//
//                    }).catch( e => {
//                    })
//                }
//                if(!this.bankDepositoryType && this.realStatus) {
//                    this.$http({
//                        method: 'post',
//                        url: this.$urls.bindBankCard,
//                        data:{
//                            service:'bindBankCard'
//                        }
//                    }).then( data => {
//                        let url = data.data.postUrl,
//                            formData = data.data.reqDataPackage;
//
//                        this.$formPost(url, formData);
//
//                    }).catch( e => {
//                    })
//                }
            },
            Modify(){
                this.$router.push({ name: 'modPasswd'})
                //修改登录密码
            },
            exit(){
                //退出
                this.$http({
                    method: 'post',
                    url: this.$urls.userlogout,
                    data:{
                        service:'logout'
                    }
                }).then( data => {
                    this.$router.push({ name: 'userInfo'})
                }).catch( e => {
                })

            }
        },
        components: {
            tabNav
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .viewport{
        position:static;
    }
    #myCenter{
        height: 10.37rem;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: scroll;
        &::-webkit-scrollbar {  display: none;  }
        a{
            display:block;
        }
       .my-info{
           margin-top: .2rem;
           border: solid #ddd;
           border-width: 1px 0;
           background: #fff ;
           background-size: 12.599999998425rem auto;
           position:relative;
           .info-box{
               padding: .35rem .3rem;
               width: 100%;
               -webkit-box-sizing: border-box;
               -moz-box-sizing: border-box;
               box-sizing: border-box;
               li{
                   font-size: .28rem;
                   color: #666;
                   line-height: .56rem;
                   span{
                       color: #999;
                       display: inline-block;
                       width: 1.02rem;
                   }
               }
           }
           .my-img{
               background-image: url("../../static/images/certification.png");
               background-size:100%;
               width: 2.16rem;
               height:1.78rem;
               position:absolute;
               right:0;
               bottom:0;
           }
           .my-title{
               text-align: right;
               color:#0000FF;
               font-size:.32rem;
               margin-right:.3rem;
               position:absolute;
               right:0;
               bottom:.5rem;
           }
       }
        .operate{
            margin-top: .2rem;
            border: solid #ddd;
            border-width: 1px 0;
            background-color: #fff;
            a{
                height: .98rem;
                display: block;
                line-height: .98rem;
                margin-left: .3rem;
                font-size: .28rem;
                color: #333;
                position: relative;
                .icon-arrow-right{
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    color: #bbb;
                    right: .3rem;
                }
            }
        }
        .quit{
            margin-top: .2rem;
            border: solid #ddd;
            border-width: 1px 0;
            background-color: #fff;
            text-align: center;
            height: .98rem;
            line-height: .98rem;
            font-size: .28rem;
            color: #333;
        }
    }
</style>
