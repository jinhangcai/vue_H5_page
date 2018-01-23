<template>
    <div class="index viewport">
        <section id="proRepaymentExplain">
                <div class="tit">
                    <p>本项目默认还款日：{{lastRepayTime | filterMoment('YYYY-MM-DD')}}</p>
                    <p>本项目支持提前还款，当前展示为最长期限，您的本金及收益可能提前回款。项目理财期限大于20天且提前还款时间距原到期时间大于7天，奖励1天投资收益。
                    </p>
                </div>
                <!--<div class="cont">-->

                    <!--<i class="arrow"></i>-->
                    <!--<ol>-->
                        <!--<li>-->
                            <!--<div class="tits">本项目提前还款</div>-->
                            <!--<div class="conts">额外奖励1天的投资收益</div>-->
                        <!--</li>-->
                    <!--</ol>-->
                <!--</div>-->
                <!--<div class="info"><i class="iconfont"></i>奖励在还款日发送到投资人的账户余额</div>-->
        </section>
    </div>
</template>

<script>
    //    import tabNav from '../tabNav';
    export default {
        name: 'proRepaymentExplain',
        data () {
            return {
                loading:false,
                lastRepayTime:this.$route.query.lastRepayTime
            }
        },
        mounted(){
//            this.ajaxload();
        },
        methods:{
            ajaxload(){
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
                console.log(1)
            }
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #proRepaymentExplain{
        &::-webkit-scrollbar {  display: none;  }
        .tit{
            position: relative;
            padding: .3rem .4rem;
            font-size: .24rem;
            color: #333;
            letter-spacing: 0.02rem;
            p{
                margin-bottom:.2rem;
            }
        }
        .cont{
            padding:.61rem .34rem;
            background-color: #fff;
            position:relative;
            .arrow{
                position: absolute;
                top:0;
                left: .8rem;
                border: 0.15rem solid;
                border-color: #f6f6f6 transparent transparent transparent;
            }
            ol{
                padding-left: 1rem;
                background: #fff url('../../static/images/proRepaymentExplain/repaymentExplain.png') no-repeat left 0;
                background-size: .75rem auto;
                min-height: 1rem;
                li{
                    .tits{
                        font-size: .24rem;
                        color: #8c8c8c;
                    }
                    .conts{
                        margin-top: .18rem;
                        font-size: .32rem;
                        color: #fa6812;
                        font-weight: bold;
                    }
                }
            }
        }
        .info{
            margin: .5rem .2rem 0;
            font-size: .24rem;
            color: #999;
            .iconfont{
                margin-right: .05rem;
            }
        }

    }
</style>
