<template>
    <div class="login viewport" :style="{minHeight: minHeight}">
        <div class="field-wrapper">
            <field class="field-item" placeholder="请输入手机号" type="tel" v-model="phone" pattern="[0-9]*" max="11"></field>
            <div class="field-row field-item">
                <div class="row-item">
                    <field placeholder="输入验证码" v-model="phoneCode"></field>
                </div>
                <div class="row-item">
                    <countDownBtn :phone="phone" :handlerfn="getPhoneCode"></countDownBtn>
                </div>
            </div>
            <field class="field-item" placeholder="请设置8-20个字符密码，区分大小写" type="password" v-model="password" max="20"></field>
            <uiButton @click="submit" type="primary" size="large">确 定</uiButton>
        </div>
    </div>
</template>

<script>
    import uiButton from '../button/index';
    import field from '../field/index';
    import countDownBtn from '../countDownBtn/index';
    import {Toast, MessageBox } from 'mint-ui'
    import encryptedPwd from 'common/encryptPwd';
    import validate from 'common/validate';

    export default {
        name: 'login',
        data () {
            return {
                minHeight: 'auto',
                loginType: 'register',
                phone: '',
                phoneCode: '',
                password: ''
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
            this.phone = this.$route.query.phone || '';
        },
        methods:{
            getPhoneCode(){
                return this.$http({
                    url: this.$urls.sendPhoneCode,
                    method: 'post',
                    data: {
                        phone: this.phone,
                        service: 'resetPwdPhoneCode'
                    }
                })
            },
            submit(){
                let validatePhone = validate({
                    type: 'phone',
                    val: this.phone,
                    msg: '请输入正确的手机号！'
                });
                if(!validatePhone.status){
                    MessageBox('提示',validatePhone.msg);
                    return;
                }
                let validatePassword = validate([
                    {
                        type: 'len',
                        val: this.password,
                        min: 8,
                        max: 20,
                        msg: '密码只能8-20位！'
                    },
                    {
                        type: 'password',
                        val: this.password,
                        min: 8,
                        max: 20,
                        msg: '密码只能为数字、英文！'
                    },
                ]);
                if(!validatePassword.status){
                    MessageBox('提示',validatePassword.msg);
                    return;
                }

                this.findPwd();
            },
            findPwd(){
                this.$http({
                    url: this.$urls.findLoginPwd,
                    method: 'post',
                    data: {
                        phone: encryptedPwd(this.phone),
                        password: encryptedPwd(this.password),
                        phoneCode: this.phoneCode,
                        service: 'findLoginPwd'
                    }
                }).then( response => {
                    MessageBox.alert('操作成功，请重新登录').then(action => {
                       this.$pageLogin();
                    });
                }).catch( e => {
                    MessageBox.alert( e.msg || '操作成功，请重新登录')
                });
            }
        },
        components: {
            uiButton,
            field,
            countDownBtn
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login{
        box-sizing: border-box;
        background-color: #f6f6f6;
        padding: 0 .3rem;
    }
    .field-wrapper{
        .field-title{
            font-size: .28rem;
            color: #666;
            line-height: .5rem;
            margin: .26rem 0 .3rem;
        }
        .field-item{
            margin: .3rem 0;
        }
        .field-item--spec{
            display: flex;
            flex-direction: row-reverse;
        }
        .field-row{
            display: flex;
            justify-content: space-between;
            .row-item{
                width: 2.74rem;
            }
        }
        .protocol-bar{
            font-size: .28rem;
            color: #999;
            line-height: .96rem;
            a{
                color: #007aff;
            }
        }
    }
</style>
