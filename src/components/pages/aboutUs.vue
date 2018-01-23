<template>
    <div class="aboutUs viewport" :style="{minHeight: minHeight}">
        <header class="tab-header">
            <nav class="nav-wrapper">
                <a class="nav-btn" :class="{on: index === 0}" href="javascript:;" @click="toggle(0)">关于平台</a>
                <a class="nav-btn" :class="{on: index === 1}" href="javascript:;" @click="toggle(1)">媒体报道</a>
                <a class="nav-btn" :class="{on: index === 2}" href="javascript:;" @click="toggle(2)">平台统计</a>
            </nav>
        </header>
        <div id="aboutUsWrap" v-show="index === 0" class="cont">
            <div class="banner">
                <img src="../../static/image/aboutUs/banner.jpg" alt="了解钱庄网"/>
            </div>
            <div class="item">
                <div class="title">平台介绍</div>
                <p class="info">钱庄网于2014年6月正式上线运营，是杭州乾庄互联网金融服务有限公司倾力打造的覆盖汽车、房产、供应链金融、融资租赁等范围的综合性互联网金融服务平台，旨在为有资金需求的个人、小微企业以及有闲散资金的投资人提供安全、规范、高效、诚信的互联网金融服务。</p>
            </div>
            <div class="item">
                <div class="title">核心价值观</div>
                <ul class="pointer-list">
                    <li>
                        <div class="pointer-item">客户<br>第一</div>
                    </li>
                    <li>
                        <div class="pointer-item">高效<br>协作</div>
                    </li>
                    <li>
                        <div class="pointer-item">平等<br>共享</div>
                    </li>
                    <li>
                        <div class="pointer-item">拥抱<br>变化</div>
                    </li>
                </ul>
                <div class="pointer-strong">用心，做得更好<br>携手，一路钱行</div>
            </div>
            <div class="item">
                <div class="title">发展历程</div>
                <img src="../../static/image/aboutUs/time-line.png" alt="发展历程" class="img-block">
            </div>
            <div class="item">
                <div class="title">荣誉资质</div>
                <img src="../../static/image/aboutUs/certificates.jpg" alt="荣誉资质" class="img-block">
            </div>
            <div class="item">
                <div class="title">合作媒体</div>
                <img src="../../static/image/aboutUs/partner.png" alt="合作伙伴" class="img-block2">
            </div>
            <div class="item">
                <div class="title">联系我们</div>
                <div class="contact-us">
                    公司总部<br>
                    地址：杭州市西湖区华星路96号互联网金融大厦9楼<br>
                    客服热线：400-0455-360<br>
                    官方邮箱：service@qian360.com<br>
                    投诉电话：0571-28180815<br>
                    投诉邮箱：tousu@qian360.com<br>
                    媒体合作：pr@qian360.com<br>
                    市场合作：mkt@qian360.com
                </div>
            </div>
        </div>
        <div v-show="index === 1" class="cont" id="mediaListRecord">
            <div class="media-wrapper"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <div class="row" v-for="item in list" @click="$pageMediaDetail(item.id)">
                    <div class="row-left">
                        <div class="title">{{item.name | maxContent}}</div>
                        <div class="time">{{item.addTime | filterMoment('YYYY-MM-DD')}}</div>
                    </div>
                    <div class="row-right">
                        <i class="icon icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div v-if="loading" class="load-row">
                加载中...
            </div>
            <div v-else-if="list.length === 0" class="load-row">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast, MessageBox, Indicator} from 'mint-ui';
    import hosts from 'common/hosts';
    export default {
        name: 'aboutUs',
        data () {
            return {
                minHeight: 'auto',
                index: 0,
                loading: true,
                list: [],
                currentPage: 1,
                pageSize: 20,
                pages: 1,
                total: 0,
                done: false
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
        },
        filters: {
            maxContent(val){
                return val.length > 33 ? (val.slice(0, 33)+'...') : val;
            }
        },
        methods: {
            loadMore() {
                if(this.currentPage > this.pages){
                    this.done = true;
                    return;
                }

                this.loading = true;
                this.$http({
                    url: this.$urls.mediaList,
                    method: 'post',
                    data: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                }).then( response => {
                    let data = response.resultData;
                    this.pages = data.pages;
                    this.total = data.total;
                    this.currentPage++;
                    this.list = this.list.concat(data.list);
                    this.loading = false;
                }).catch( e => {
                    MessageBox.alert(e.resultMsg);
                });
            },
            toggle(index){
                if(index === 2){
                    this.$pageTo(hosts.pc + '/api/trade/statistics.html')
                }else{
                    if(index === 1){
                        this.loading = false;
                    }
                    this.index = index;
                }
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .load-row{
        font-size: .24rem;
        line-height: .4rem;
        color: #b3b3b3;
        text-align: center;
    }
    .aboutUs{
        box-sizing: border-box;
        padding-top: .8rem;
        #aboutUsWrap{
            background-color: #fff;
            overflow: hidden;
        }
        .tab-header {
            position: fixed;
            top: 0;
            z-index: 10;
            width: 100%;
            height: .8rem;
            border-bottom: 1px solid #e6e6e6;
            background-color: #fff;
            .nav-wrapper{
                display: flex;
                height: .8rem;
            }
            .nav-btn{
                flex: 1;
                position: relative;
                font-size: .28rem;
                color: #666;
                line-height: .8rem;
                text-align: center;
            }
            .on{
                color: #f35c3e;
                &:after{
                    content:'';
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 0;
                    width: 1.22rem;
                    height: .04rem;
                    background-color: #f35c3e;
                }
            }
        }
        .cont {
            background: #f6f6f6;
            a {
                height: 100%;
            }
        }

        #mediaListRecord{
            padding-top: .3rem;
            .media-wrapper{
                background-color: #fff;
                border-top: 1px solid #eee;
                padding-left: .3rem;
                .row{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: .3rem;
                    height: 1.4rem;
                    border-bottom: 1px solid #e6e6e6;
                    &:nth-child(1),
                    &:nth-child(2),
                    &:nth-child(3){
                        .row-left{
                            .title:after{
                                content: 'new';
                                display: inline-block;
                                margin-left: .1rem;
                                width: .5rem;
                                height: .28rem;
                                font-size: .24rem;
                                border-radius: .04rem;
                                background-color: #4ec298;
                                text-align: center;
                                color: #fff;
                                line-height: .28rem;
                                vertical-align: text-bottom;
                            }
                        }
                    }
                    .icon-arrow-right{
                        font-size: .24rem;
                        color: #b6b6b6;
                    }

                    .row-left{
                        max-width: 5.2rem;
                        .title{
                            font-size: .28rem;
                            line-height: .34rem;
                            max-height: .68rem;
                            overflow: hidden;
                        }
                        .time{
                            margin-top: .2rem;
                            font-size: .24rem;
                            color: #999;
                        }
                    }
                }
            }
        }
        .banner{margin-bottom: .2rem;}
        .banner img{display:block;width:100%;}
        .item{
            margin-bottom: .62rem;
        }
        .item .title{
            font-size: .36rem;
            line-height: .68rem;
            text-align: center;
            background: url("../../static/image/aboutUs/title-line.png") no-repeat center bottom;
            background-size: auto .03rem;
            margin-bottom: .42rem;
        }
        .item .info{
            padding: 0 .3rem;
            font-size: .24rem;
            color: #666;
            line-height: .42rem;
        }
        .pointer-list{
            width: 5.8rem;
            height: 1.22rem;
            margin: 0 auto;
        }
        .pointer-list li{
            float: left;
            width: 25%;
        }
        .pointer-list li:nth-child(1){
            color: #76adf3
        }
        .pointer-list li:nth-child(2){
            color: #3cbdd0
        }
        .pointer-list li:nth-child(3){
            color: #eb86be
        }
        .pointer-list li:nth-child(4){
            color: #4ec298
        }
        .pointer-item{
            box-sizing: border-box;
            width: 1.22rem;
            height: 1.22rem;
            margin: 0 auto;
            padding-top:.22rem;
            border: .03rem solid #e2e2e2;
            border-radius: 50%;
            font-size: .28rem;
            line-height: .36rem;
            text-align: center;
        }
        .pointer-strong{
            margin-top: .55rem;
            font-size: .4rem;
            font-weight: bold;
            line-height: .68rem;
            text-align: center;
        }
        .img-block{
            display: block;
            width: 5.8rem;
            margin: 0 auto;
        }
        .img-block2{
            display: block;
            width: 5.95rem;
            margin: 0 auto;
        }
        .contact-us{
            padding: 0 .3rem;
            font-size: .24rem;
            color: #666;
            line-height: .32rem;
        }
    }
</style>
