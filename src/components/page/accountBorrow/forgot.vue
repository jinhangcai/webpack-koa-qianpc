<template>
	<div class="mid">
		<div class="account_step_tit">找回密码</div>
		<router-view></router-view>
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
                let timestamp = '?t=' + Date.now();
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
                    this.verifyCode = '验证码不能为空';
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

				}).catch(e => {

				})
			},
		},
		components: {
		}
	}
</script>