<template>
	<div>
		<div class="step_con">
			<ol class="clearfix">
				<li class="step1 current"><figure>1</figure><span>填写账户名</span></li>
				<li class="step2"><figure>2</figure><span>设置新密码</span></li>
				<li class="step3"><figure>3</figure><span>完成</span></li>
			</ol>
			<figure class="line line1"></figure>
			<figure class="line line2"></figure>
		</div>
		<div class="find_conts">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="手机号码" prop="phone">
					<el-input v-model="ruleForm.phone" class="ui-input" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="verifyCode">
					<el-input v-model="ruleForm.verifyCode" class="ui-input" placeholder="请输入验证码"></el-input>
					<img v-if="verifyImg" :src="verifyImg" alt="点击刷新" class="verify_img" @click="refresh" style="vertical-align: bottom;">
				</el-form-item>
				<el-form-item label="" class="row">
					<a class="sub_btn" href="javascript:;" title="下一步" @click="verifyData">下一步</a>
				</el-form-item>
			</el-form>
		</div>
	</div>

</template>

<script>
	export default{
		data(){
		    return {
                service: 'findPwdOne',
                verifyImg: '',
                ruleForm: {
                    phone: '',
                    verifyCode: '',
				},
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    verifyCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
				},
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
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.next();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

			},
			next(){
			    this.$http({
					url: this.$urls.accountBorrowForgotOne,
					method: 'post',
					data: {
                        phone: this.ruleForm.phone,
                        verifyCode: this.ruleForm.verifyCode,
                        service: this.service,
					}
				}).then( data => {
					this.$router.push({ name: 'abfSetNewPwd', query: { phone: this.ruleForm.phone }})
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