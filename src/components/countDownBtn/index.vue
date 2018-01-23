<template>
    <uiButton class="count-down" type="primary" size="large"
              :disabled="!phone || disabled"
            @click="handleClick">{{btnText}}</uiButton>
</template>
<script>
    import uiButton from '../button/index';
    import {MessageBox } from 'mint-ui'
    export default {
        name: 'ui-button',
        data(){
            return{
                disabled: false,
                timer: null,
                btnText: '获取验证码',
                countDownTime: 60,

            }
        },
        methods: {
            handleClick(evt) {
                if(this.disabled){
                    return;
                }
                if(!this.phone){
                    MessageBox.alert('请输入手机号');
                    return
                }
                this.disabled = true;
                this.countDownTime = 60;
                this.btnText = this.countDownTime + 's后重新获取';
                this.timer = setInterval(() => {
                    this.countDownTime--;
                    if(this.countDownTime <= 0){
                        clearInterval(this.timer);
                        this.disabled = false;
                        this.btnText = '获取验证码'
                    }else{
                        this.btnText = this.countDownTime + 's后重新获取';
                    }
                }, 1000);
                this.handlerfn && this.handlerfn();
            },
        },
        props: {
            phone: {},
            handlerfn: Function
        },
        components: {
            uiButton
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .count-down{
        .ui-button-text{
            font-size: .28rem;
        }
    }
</style>