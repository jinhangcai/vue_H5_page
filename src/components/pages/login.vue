<template>
    <div class="login viewport" :style="{minHeight: minHeight}">
        <div v-if="loginType === 'checkPhone'" class="field-wrapper">
            <div class="field-title">请输入手机号码注册或登录</div>
            <field class="field-item" placeholder="请输入您的手机号码" type="tel" icon="phone" v-model="phone" pattern="[0-9]*" max="11"></field>
            <uiButton @click="checkPhone" type="primary" size="large" :disabled="!phone">下一步</uiButton>
            <div class="center">
                <uiButton @click="$router.back()" type="link" size="middle">取消返回</uiButton>
            </div>
        </div>
        <div v-if="loginType === 'login'" class="field-wrapper">
            <field class="field-item" placeholder="请输入您的登录密码" type="password" v-model="password" max="20"></field>
            <div class="field-item--spec">
                <uiButton @click="$router.push({name: 'findPasswd', query: {phone: phone}})" type="link" size="middle">忘记密码</uiButton>
            </div>
            <uiButton @click="login" type="primary" size="large" :disabled="!password">登 录</uiButton>
            <div class="center">
                <uiButton @click="loginType = 'checkPhone'" type="link" size="middle">返回上一步</uiButton>
            </div>
        </div>

        <div v-if="loginType === 'register'" class="field-wrapper">
            <div class="field-title">已向{{phone | secret}}发送短信，请注意查收</div>
            <div class="field-row field-item">
                <div class="row-item">
                    <field placeholder="输入验证码" v-model="phoneCode"></field>
                </div>
                <div class="row-item">
                    <countDownBtn :phone="phone" :handlerfn="getPhoneCode"></countDownBtn>
                </div>
            </div>
            <field class="field-item" placeholder="请设置8-20个字符密码，区分大小写" type="password" v-model="password" max="20"></field>
            <div class="protocol-bar">
                我同意 <a href="https://www.qian360.com/user/registerProtocol.html">《钱庄网注册协议》</a>
            </div>
            <uiButton @click="register" :disabled="!phoneCode || !password" type="primary" size="large">确 定</uiButton>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
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
                loginType: 'checkPhone',
                phone: '',
                phoneCode: '',
                password: ''
            }
        },
        mounted(){
            this.minHeight = document.documentElement.clientHeight + 'px';
        },
        filters: {
            secret(val){
                return val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
        },
        methods:{
            getPhoneCode(){
                return this.$http({
                    url: this.$urls.sendPhoneCode,
                    method: 'post',
                    data: {
                        phone: this.phone,
                        service: 'regPhoneCode'
                    }
                })
            },
            checkPhone(){
                let validatePhone = validate({
                    type: 'phone',
                    val: this.phone,
                    msg: '请输入正确的手机号！'
                });
                if(!validatePhone.status){
                    MessageBox('提示',validatePhone.msg);
                    return;
                }
                this.$http({
                    url: this.$urls.phoneCheck,
                    method: 'get',
                    data: {
                        phone: encryptedPwd(this.phone),
                        service: 'phoneCheck'
                    }
                }).then( response => {
                    let phoneExist = response.data.phoneExist;
                    if(phoneExist === 0){ //不存在 去注册
                        this.loginType = 'register';

                    }else if(phoneExist === 1){ //存在 去登录
                        this.loginType = 'login';
                    }

                }).catch( e => {
                    MessageBox('提示',e.msg);
                });
            },
            register(){

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

                let wxInterlayer = Cookies.get('wxInterlayer'),
                    openId = Cookies.get('openId'),
                    nickName = Cookies.get('nickName'),
                    activityCode = Cookies.get('activityCode');
                openId = wxInterlayer&&openId ? encryptedPwd(openId) : '';
                nickName = wxInterlayer&&nickName ? decodeURIComponent(nickName): '';

                this.$http({
                    url: this.$urls.register,
                    method: 'post',
                    data: {
                        phone: encryptedPwd(this.phone),
                        password: encryptedPwd(this.password),
                        phoneCode: this.phoneCode,
                        code: activityCode,
                        nickname: nickName,
                        openid: openId,
                        service: 'register'
                    }
                }).then( response => {
                    // 注册成功后 去除cookie中的渠道code
                    if(activityCode){
                        Cookies.remove('activityCode')
                    }
                    if(wxInterlayer){
                        this.removeWXcookies();
                        this.wxTips();
                    }else{
                        this.goPage()
                    }

                }).catch( e => {
                    MessageBox.alert(e.msg);
                });
            },
            login(){
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
                let wxInterlayer = Cookies.get('wxInterlayer'),
                    openId = Cookies.get('openId'),
                    nickName = Cookies.get('nickName');
                openId = wxInterlayer&&openId ? encryptedPwd(openId) : '';
                nickName = wxInterlayer&&nickName ? decodeURIComponent(nickName): '';
                this.$http({
                    url: this.$urls.login,
                    method: 'post',
                    data: {
                        userName: encryptedPwd(this.phone),
                        password: encryptedPwd(this.password),
                        nickname: nickName,
                        openid: openId,
                        service: 'login'
                    }
                }).then( response => {
                    let data = response.data;
                    if(wxInterlayer){
                        this.removeWXcookies();
                    }
                    if(data.needJsAlert && data.needJsAlert === 1){
                        this.wxTips();
                    }else{
                        this.goPage()
                    }

                }).catch( e => {
                    MessageBox.alert(e.msg);
                });
            },
            removeWXcookies(){
                Cookies.remove('wxInterlayer', {domain: '.qian360.com', path: '/'});
                Cookies.remove('openId', {domain: '.qian360.com', path: '/'});
                Cookies.remove('nickName', {domain: '.qian360.com', path: '/'});
            },
            wxTips(){
                MessageBox.alert('3元红包已入库 立即前往理财').then(action => {
                    this.goPage()
                })
            },
            goPage(){
                let redirectURL = '';
                if(sessionStorage && sessionStorage.getItem('redirectURL')){
                    redirectURL = sessionStorage.getItem('redirectURL');
                    sessionStorage.removeItem('redirectURL');
                }else{
                    redirectURL = Cookies.get('redirectURL');
                    Cookies.remove('redirectURL');
                }
                if (redirectURL) {
                    window.location.href = redirectURL;
                } else {
                    window.location.href = '/';
                }
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
    .center{
        text-align: center;
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
