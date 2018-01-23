<template>
    <div class="mediaDetail viewport" :style="{minHeight: minHeight}">
        <div v-if="detail" class="detail">
            <h1 class="title">{{detail.title}}</h1>
            <p class="add-time">{{detail.addtime | filterMoment('YYYY-MM-DD HH:mm:ss')}}</p>
            <div class="content" v-html="detail.content"></div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: 'aboutUs',
        data () {
            return {
                minHeight: 'auto',
                id: null,
                detail: null
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            this.minHeight = document.documentElement.clientHeight + 'px';
            this.getDetail();
        },
        methods: {
            getDetail() {
                this.$http({
                    url: this.$urls.mediaDetail,
                    method: 'post',
                    data: {
                        id: this.id
                    }
                }).then( response => {
                    this.detail = response.resultData;
                }).catch( e => {
                    MessageBox.alert(e.resultMsg);
                });
            }
        },
        components: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .mediaDetail{
        box-sizing: border-box;
        .detail{
            padding: .2rem .3rem;
        }
        .title{
            margin: .05rem 0;
            font-size: .28rem;
            line-height: .35rem;
            color: #333;
        }
        .add-time{
            font-size: .2rem;
            color: #999;
            line-height: .37rem;
        }
        .content{
            font-size: .2rem;
            line-height: .35rem;
            img{
                max-width: 100%;
            }
        }
    }
</style>
