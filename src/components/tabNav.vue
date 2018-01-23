<template>
    <div class="tab-nav">
        <div @click="$router.push({ name: 'index'})" :class="{on: $route.name === 'index'}" class="tn-item">
            <i class="iconfont icon-nav-home"></i>
            <div class="name">钱庄</div>
        </div>
        <div @click="$router.push({ name: 'products'})" :class="{on: $route.name === 'products'}" class="tn-item">
            <i class="iconfont icon-nav-list"></i>
            <div class="name">理财</div>
        </div>
        <div @click="$router.push({ name: 'userAccount'})" :class="{on: $route.name === 'userAccount'}" class="tn-item">
            <i class="iconfont icon-nav-user"></i>
            <div class="name">资产</div>
        </div>
        <div @click="$router.push({ name: 'userInfo'})" :class="{on: $route.name === 'userInfo'}" class="tn-item">
            <i class="iconfont icon-nav-me"></i>
            <div class="name">我</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabNav',
        data () {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .tab-nav{
        display: flex;
        justify-content: center;
        align-content: center;
        height: .98rem;
        text-align: center;
        background-color: #fff;
        border-top: 1px solid #e0e0e0;
        .tn-item{
            display: flex;
            justify-content: center;
            flex-direction: column;
            flex: 1;
            color: #999;
            .iconfont{
                display: inline-block;
                font-size: .45rem;
            }
            .text{
                font-size: .22rem;
            }
            &.on{
                color: #f75555;
            }
        }
    }
</style>
