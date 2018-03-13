<template>
	<div>
		<div class="step_con">
			<ol class="clearfix">
				<li class="step1"><figure>1</figure><span>填写账户名</span></li>
				<li class="step2 current"><figure>2</figure><span>设置新密码</span></li>
				<li class="step3"><figure>3</figure><span>完成</span></li>
			</ol>
			<figure class="line line1"></figure>
			<figure class="line line2"></figure>
		</div>
		<div class="find_conts">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="手机号码" prop="phone">
					{{ruleForm.phone}}
				</el-form-item>
				<el-form-item label="真实姓名" prop="realname">
					<el-input v-model="ruleForm.realname" class="ui-input" placeholder="请输入真实姓名"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="ID">
					<el-input v-model="ruleForm.ID" class="ui-input" placeholder="请输入身份证号"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPwd">
					<el-input v-model="ruleForm.newPwd" class="ui-input" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="confirmPwd">
					<el-input v-model="ruleForm.confirmPwd" class="ui-input" placeholder="请再输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="msgCode">
					<el-input v-model="ruleForm.msgCode" class="ui-input" placeholder="请输入验证码"></el-input>
					<input type="button" class="verify_btn" title="获取短信验证码" :disabled="disabled" :value="btnText" @click="getValid">
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
                disabled: false,
                timer: null,
                btnText: '获取短信验证码',
                countDownTime: 30,

                ruleForm: {
                    ID: '',
                    confirmPwd: '',
                    msgCode: '',
                    newPwd: '',
                    phone: '',
                    realname: '',
                    service: 'findPwdTwo',
				},
                rules: {
                    ID: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' }
                    ],
                    realname: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' }
                    ],
					newPwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { required: true, message: '请再输入新密码', trigger: 'blur' }
                    ],
                    msgCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                },
			}
		},
		mounted(){
		},
		created(){

            this.ruleForm.phone = this.$route.query.phone;
		},
		methods: {
            getValid(){
                if(!this.ruleForm.phone){
                    this.$alert('请输入手机号', '提示', {
                        confirmButtonText: '确定',
                        callback: action => { }
                    });
                    return;
                }
                if(this.disabled){
                    return;
                }
                this.disabled = true;
                this.countDownTime = 30;
                this.btnText = this.countDownTime + 's后重新获取';
                this.timer = setInterval(() => {
                    this.countDownTime--;
                    if(this.countDownTime <= 0){
                        clearInterval(this.timer);
                        this.disabled = false;
                        this.btnText = '获取短信验证码'
                    }else{
                        this.btnText = this.countDownTime + 's后重新获取';
                    }
                }, 1000);
                this.$http({
                    url: this.$urls.sendMsg,
                    method: 'get',
                    data: {
                        phone: this.ruleForm.phone,
                        service: 'sendMsg'
					}
                }).then( data => {
                    console.log(data)
                }).catch(e => {
                })
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
					url: this.$urls.accountBorrowForgotTwo,
					method: 'post',
					data: this.ruleForm
				}).then( data => {
                    this.$router.push({ name: 'abfResult'})
				}).catch(e => {
                    this.$alert(e.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
				})
			},
		},
		components: {
		}
	}
</script>