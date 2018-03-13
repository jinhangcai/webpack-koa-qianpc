<template>
	<div class="mid">
		<div class="main main_cont clearfix" id="main">
			<div class="img_con f_l">
				<a href="javascript:;" target="_blank"><img src="/accountBorrow/image/login_banner2.png"></a>
			</div>
			<div class="content login_con f_r">
				<div class="login_tit clearfix">
					<h2>登录</h2>
				</div>
				<div class="row">
					<input v-model="username" class="text ico_user" autocomplete="off" type="text" placeholder="输入手机号码">
				</div>
				<div class="row">
					<input v-model="password" class="text ico_pass" autocomplete="off" type="password" placeholder="请输入登录密码">
				</div>
				<div class="row">
					<input v-model="verifyCode" type="text" class="authcode" id="userVerify" placeholder="请输入验证码">
					<span class="verify_wrap"><img v-if="verifyImg" :src="verifyImg" alt="点击刷新" class="verify_img" @click="refresh"></span>
				</div>
				<div class="row btn login clearfix" id="loginBtn">
					<a @click="verifyData" class="submit_btn" href="javascript:;" title="立即登录">登  录</a>
					<a class="find_pass_btn" href="/accountBorrow/forgot" title="点击找回密码">忘记密码？</a>
				</div>
				<div v-if="isError" class="login_error"><figure></figure>{{errorMsg}}</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default{
		data(){
		    return {
		        isError: false,
                errorMsg: '',
                username: '',
                password: '',
                verifyCode: '',
                service: 'login',
                verifyImg: ''
			}
		},
		mounted(){
            this.getVerifyImg();
		},
		methods: {
            refresh(){
                this.getVerifyImg();
			},
			getVerifyImg(){
                let timestamp = '?service=verifyImg&t=' + Date.now();
                this.verifyImg = `${this.$urls.verifyImg}${timestamp}`
			},
            verifyData(){
                if(!this.username){
                    this.errorMsg = '请输入手机号码';
                    this.isError = true;
                    return;
                }
                if(!this.password){
                    this.errorMsg = '请输入密码';
                    this.isError = true;
                    return;
                }
                if(!this.verifyCode){
                    this.errorMsg  = '验证码不能为空';
                    this.isError = true;
                    return;
                }
                this.login();

			},
			login(){
			    this.$http({
					url: this.$urls.accountBorrowLogin,
					method: 'post',
					data: {
                        username: this.username,
                        password: this.password,
                        verifyCode: this.verifyCode,
                        service: this.service,
					}
				}).then( data => {
					location.replace('/accountBorrow/');
				}).catch(e => {
                    this.$alert(e.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                    this.refresh();
				})
			},
		},
		components: {
		}
	}
</script>