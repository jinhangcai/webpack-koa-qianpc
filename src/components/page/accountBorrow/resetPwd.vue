<template>
    <div id="pandect"  class="reset-pwd">
        <h3 class="account-title">修改登录密码</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="reset-form">
            <el-form-item label="当前登录密码" prop="oldPwd">
                <el-input v-model="ruleForm.oldPwd" type="password" class="ui-input" placeholder="请输入当前登录密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="ruleForm.newPwd" type="password" class="ui-input" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPwd">
                <el-input v-model="ruleForm.confirmPwd" type="password" class="ui-input" placeholder="请输入确认新密码"></el-input>
            </el-form-item>
            <el-form-item label="">
                <a class="btn primary" href="javascript:;" @click="verifyData">确认</a>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                ruleForm: {
                    oldPwd: '',
                    newPwd: '',
                    confirmPwd: '',
                },
                rules:{
                    oldPwd: [
                        { required: true, message: '请输入当前登录密码', trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { required: true, message: '请输入确认新密码', trigger: 'blur' }
                    ],
                },
            }
        },
        mounted(){
        },
        methods: {
            verifyData(){

                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.reset();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            reset(){
                this.$http({
                    method: 'post',
                    url: this.$urls.accountBorrowResetPwd,
                    data: {
                        service: 'modify',
                        oldPwd: this.ruleForm.oldPwd,
                        newPwd: this.ruleForm.newPwd,
                        confirmPwd: this.ruleForm.confirmPwd,
                    }
                }).then( data => {
//                    data = data.data;
                    this.$alert('修改成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push({name: 'pandect'})
                        }
                    });
                }).catch( e => {

                    this.$alert(e.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                })
            },
        }
    }
</script>