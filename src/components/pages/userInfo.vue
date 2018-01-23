<template>
    <div class="index viewport">
        <section id="userInfo">
            <a href="javascript:;" id="loginBtn" @click="submit">
                <div class="business-card-con">
                    <div class="main">
                        <template v-if="!isLogin">
                            <div class="tit">马上登录</div>
                            <div class="cont">投资优质理财产品</div>
                        </template>
                        <template v-else-if="realStatus">
                            <div class="tit">{{username}}</div>
                            <div class="cont" v-if="realStatus"><i class="icon icon-tick-solid"></i>已实名认证</div>
                            <div class="cont" v-else>未实名认证</div>
                        </template>
                        <template v-else>
                            <div class="tit">{{phones}}</div>
                            <div class="cont" v-if="realStatus"><i class="icon icon-tick-solid"></i>已实名认证</div>
                            <div class="cont" v-else>未实名认证</div>
                        </template>
                    </div>
                    <div class="user-portrait">
                        <img src="../../static/images/gray.png" alt="" v-if="!isLogin">
                        <img src="../../static/images/colorful.png" alt="" v-else>
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </div>
            </a>
            <div class="list-con">
                <ul class="ui-list-more">
                    <li>
                        <a href="javascript:;"  @click="$router.push({ name: 'help'})">
                            <div class="tit">安全保障</div>
                            <i class="list-icon icon icon-shield"></i>
                            <i class="more-icon icon icon-arrow-right"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" @click="$router.push({ name: 'proEnsure'})">
                            <div class="tit">帮助中心</div>
                            <i class="list-icon icon icon-query"></i>
                            <i class="more-icon icon icon-arrow-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="contact-con">
                <p class="tel"><i class="icon icon-tel"></i>400-0455-360</p>

                <p class="time">服务时间 9:00 -18:00</p>
            </div>
            <div class="warning">市场有风险 投资需谨慎</div>
        </section>
        <div class="fixed-bar">
            <tabNav></tabNav>
        </div>
    </div>
</template>

<script>
    import tabNav from '../tabNav';
    export default {
        name: 'userInfo',
        data () {
            return {
                loading:false,
                time:32,
                isLogin:false,
                username:'xxx',
                realStatus:false,
                phone:''
            }
        },
        computed:{
          phones(){
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
                    },
                    notCheckError:true,
                }).then( data => {
                    this.isLogin = true;
                    this.username = data.data.realName;
                    this.realStatus = data.data.realStatus;
                    this.phone = data.data.phone;
                }).catch( e => {
                    this.isLogin = false;
                })
            },
            submit(){
                if(!this.isLogin){
                    //未登录
                    this.$pageLogin();
                }else {
                    this.$router.push({ name: 'myCenter'})
                }
            },

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
    #userInfo{
        /*height: 10.37rem;*/
        /*overflow: hidden;*/
        /*position: absolute;*/
        /*top: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*overflow-y: scroll;*/
        &::-webkit-scrollbar {  display: none;  }
        a{
            display:block;
        }
        .business-card-con{
            margin-top: .2rem;
            position: relative;
            border: solid #ddd;
            border-width: 1px 0;
            height: 1.5rem;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: .43rem 0rem .43rem 1.76rem;
            background-color: #fff;
            .main{
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                .tit{
                    font-size: .34rem;
                    color: #333;
                }
                .cont{
                    margin-top: .14rem;
                    font-size: .24rem;
                    color: #999;
                    .icon{
                        font-size: .32rem;
                        color: #78be3a;
                        &:before{
                            content: "\e609";
                        }
                    }
                }
            }
            .user-portrait{
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                left: .3rem;
                width: 1.08rem;
                height: 1.08rem;
                overflow: hidden;
                img{
                    width:100%;
                }
            }
            .icon-arrow-right{
                position: absolute;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
                right: .3rem;
                color: #bbb;
                font-size: .32rem;
                &:before{
                    content: "\e634";
                }
            }
        }
        .list-con{
            .ui-list-more{
                margin-top: .2rem;
                border: solid #ddd;
                border-width: 1px 0;
                font-size: .28rem;
                color: #333;
                background-color: #fff;
                li{
                    position: relative;
                    margin-left: 1rem;
                    line-height:.97rem;
                    &:first-child{

                        border-bottom:1px solid #ddd;
                    }
                    .tit{
                        color: #333;
                    }
                    .list-icon{
                        position: absolute;
                        left: -.66rem;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        font-size: .32rem;
                        color: #f35c3e;
                    }
                    .more-icon{
                        position: absolute;
                        right: .3rem;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        font-size: .32rem;
                        color: #c2c2c2;
                    }
                    .icon-shield{
                        &:before{
                            content: "\e606";
                        }
                    }
                    .icon-arrow-right{
                        &:before{
                            content: "\e634";
                        }
                    }
                    .icon-query{
                        &:before{
                            content: "\e633";
                        }
                    }
                }
            }
        }
        .contact-con{
            margin-top: .6rem;
            width: 100%;
            text-align: center;
            color: #999;
            .tel{
                position: relative;
                display: inline-block;
                border: 1px solid #d2d2d2;
                font-size: .34rem;
                line-height: .52rem;
                border-radius: .25rem;
                padding: 0rem .2rem 0rem .6rem;
                .icon{
                    position: absolute;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                    left: .17rem;
                    color: #f35c3e;
                    font-size: .32rem;
                    margin-right: .2rem;
                    &:before{
                        content: "\e605";
                    }
                }
            }
            .time{
                margin-top: .17rem;
                font-size: .22rem;
            }
        }
        .warning{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            font-size: .22rem;
            text-align: center;
            color: #ccc;
            line-height: .4rem;
            padding: 1.874999997890625rem 0;
            background: #f7f7f7;
        }
    }
</style>
