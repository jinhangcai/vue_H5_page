<template>
    <div class="index viewport">
        <section id="proInvestRecord">
            <div class="tit">
                <div class="column-left">投资人/时间</div>
                <div class="column-right">金额(元)</div>
            </div>
            <div id="investRecordList">
                <ul
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="10">
                    <template v-for="i in arr">
                        <li>
                            <div class="column-left">
                                <div class="tits">{{i.userPhone}}</div>
                                <div class="conts">{{i.tenderTime | filterMoment('YYYY-MM-DD&nbsp;HH:mm:ss')}}</div>
                            </div>
                            <div class="column-right">
                                <div class="tits">{{i.tenderAmount}}</div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    //    import tabNav from '../tabNav';
    export default {
        name: 'product',
        data () {
            return {
                loading:true,
                arr:[],
                obj:{
                    currentPage:1,
                    pageSize:10,
                    service:'financial.tender.list',
                    borrowId:this.$route.query.id
                },

            }
        },
        mounted(){
            this.loadajax();
        },
        methods:{
            loadajax(){
                let _this = this;
                this.$http({
                    method: 'get',
                    url: this.$urls.financialtenderList,
                    data:this.obj
                }).then( data => {
                    data.data.list.forEach((item,index,input)=>{
                        _this.arr.push(item);
                    });
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
    .viewport{
        position:static;
    }
    #proInvestRecord{

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow-y: scroll;
        height: auto;
        &::-webkit-scrollbar {  display: none;  }
        background-color:#fff;
        .tit{
            background-color: #f6f6f6;
            line-height: .6rem;
            color: #666;
            overflow: hidden;
            padding: 0rem .3rem;
            font-size: .24rem;
            .column-left{
                float:left
            }
            .column-right{
                float:right;
            }
        }
        #investRecordList{
            ul{
                margin-left:.3rem;
                li{
                    border-bottom: 1px solid #e6e6e6;
                    height: 1.5rem;
                    position: relative;
                    .column-left{
                        left: 0;
                        text-align: left;
                        position: absolute;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        .tits{
                            font-size: .28rem;
                            color: #333;
                        }
                        .conts{
                            margin-top: .23rem;
                            font-size: .24rem;
                            color: #999;
                        }
                    }
                    .column-right{
                        right: .36rem;
                        text-align: right;
                        position: absolute;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                        .tits{
                            font-size: .28rem;
                            color: #333;
                        }
                    }
                }
            }

        }
    }
</style>
