<template>
    <div class="login viewport" :style="{minHeight: minHeight}">
        <div class="field-wrapper">
            <field class="field-item" placeholder="请输入当前登录密码"  type="password" v-model="oldPassword" max="20"></field>
            <field class="field-item" placeholder="密码由8-20位数字及字母组成，区分大小写"  type="password" v-model="newPassword" max="20"></field>
            <field class="field-item" placeholder="请再次输入新的登录密码"  type="password" v-model="confirmPassword" max="20"></field>
            <uiButton @click="submit" type="primary" size="large">确 定</uiButton>
        </div>
    </div>
</template>

<script>
    import uiButton from '../button/index';
    import field from '../field/index';
    import countDownBtn from '../countDownBtn/index';
    import {Toast, MessageBox } from 'mint-ui';
    import encryptedPwd from 'common/encryptPwd';
    import validate from 'common/validate';
    export default {
        name: 'login',
        data () {
            return {
                minHeight: 'auto',
                newPassword: '',
                oldPassword: '',
                confirmPassword: ''
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
        },
        methods:{
            submit(){
                if(!this.oldPassword){
                    MessageBox('提示','请输入当前密码！');
                    return;
                }
                if(!this.newPassword){
                    MessageBox('提示','请输入新密码！');
                    return;
                }

                let validatePassword = validate([
                    {
                        type: 'len',
                        val: this.newPassword,
                        min: 8,
                        max: 20,
                        msg: '密码只能8-20位！'
                    },
                    {
                        type: 'password',
                        val: this.newPassword,
                        msg: '密码只能为数字、英文！'
                    },
                ]);
                if(!validatePassword.status){
                    MessageBox('提示',validatePassword.msg);
                    return;
                }
                if(!this.confirmPassword){
                    MessageBox('提示','请再次输入新密码！');
                    return;
                }
                if(this.newPassword !== this.confirmPassword){
                    MessageBox('提示','两次输入的密码不一致，请重新输入！');
                    return;
                }
                this.modPasswd();
            },
            modPasswd(){
                this.$http({
                    url: this.$urls.modPasswd,
                    method: 'post',
                    data: {
                        newPassword: encryptedPwd(this.newPassword),
                        confirmPassword: encryptedPwd(this.confirmPassword),
                        oldPassword: encryptedPwd(this.oldPassword),
                        service: 'modifyLoginPwd'
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
