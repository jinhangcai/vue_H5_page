


<template>
    <div class="index viewport">
        <section id="proEnsure">
            <ul>
                <li>
                    <h3 class="tit">银行级专业团队把控</h3>
                    <p class="cont">来自各大国有银行、知名互联网金融公司专业的风控团队严格把关，确保投资人利益</p>
                    <i class="iconimg icon1"></i>
                </li>
                <li>
                    <h3 class="tit">资金账户专款专用</h3>
                    <p class="cont">投资资金流采用同卡进出模式，彻底杜绝安全漏洞，从而保证投资资金账户安全</p>
                    <i class="iconimg icon3"></i>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    //    import tabNav from '../tabNav';
    export default {
        name: 'product',
        data () {
            return {
                loading:false
            }
        },
        methods:{
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
    #proEnsure{
        &::-webkit-scrollbar {  display: none;  }
        background-color:#fff;
        ul{
            background-color: #f6f6f6;
            li{
                position: relative;
                height: 2.8rem;
                padding: .22rem .6rem;
                background-color: #fff;
                margin-bottom: .3rem;
                .tit{
                    padding-left:1.5rem;
                    font-size: .28rem;
                    color: #484848;
                    line-height: 1.5rem;
                }
                .cont{
                    margin-top: .15rem;
                    font-size:.24rem;
                    color: #999;
                    line-height: 1.5;
                }
                .iconimg{
                    position: absolute;
                    left: .4rem;
                    top: .2rem;
                    display: inline-block;
                    width: 1.44rem;
                    height: 1.44rem;
                    background: no-repeat center center;
                    background-size: contain;
                }
                .icon1{
                    background-image: url('../../static/images/proEnsure/icon1.png');
                }
                .icon3{
                    background-image: url('../../static/images/proEnsure/icon2.png');
                }
            }
        }

    }
</style>

