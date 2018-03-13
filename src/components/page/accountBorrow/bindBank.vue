<template>
    <div>
        <a v-if="userType == 0" href="javascript:;" @click="bindBank">重新绑定银行卡</a>
        <el-form :inline="true" v-if="userType == 1" class="bindBank-wrap">
            <el-form-item label="选择银行">
                <el-select v-model="bankId" placeholder="请选择银行">
                    <el-option label="请选择" value=""></el-option>
                    <el-option  v-for="item in bankList" :label="item.bankName" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="银行账户">
                <el-input v-model="bankCardNum" placeholder="输入企业对公银行账户"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="bindBank" size="small">绑定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: ['userId', 'userType'],
        data: function () {
            return {
                bankList: [],
                bankCardNum: '',
                bankId: ''
            }
        },
        created: function(){
            this.getBankList();
        },
        mounted: function () {
        },
        methods: {
            getBankList: function(){
                this.$http({
                    url: this.$urls.bankList,
                    data: {
                        service: 'list'
                    },
                    method: 'get'
                }).then( data => {
                    this.bankList = data.data;

                }).catch( e => {
                    this.$alert(e.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                });
            },
            bindBank: function(){
                let _data = {
                        userId: this.userId
                    };
                this.userType && (_data.userType = this.userType);

                if(this.userType === 1){
                    if(!this.bankId){

                        this.$alert('请选择银行', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                        return;
                    }else if(!this.bankCardNum){

                        this.$alert('请输入企业对公银行账户', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                        return;
                    }
                    _data.bankCardNum = this.bankCardNum;
                    _data.bankId = this.bankId;
                }


                this.$http({
                    url: this.$urls.bindBankCard,
                    method: 'POST',
                    data: Object.assign({service: 'bindBankCard'}, _data),
                }).then( data => {
                    data = data.data;
                    let url = data.postUrl,
                        formData = data.reqDataPackage;

                    this.$confirm('确定要绑卡吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                        this.xwPost(url, formData);
                    }).catch(() => {
                    });

                }).catch( e => {
                    this.$alert(e.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                });

            },
            xwPost(url, formData){
                this.formPost(url, formData, ()=>{

                    this.$confirm('绑卡完成，刷新页面?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        location.reload();
                    }).catch(() => {
                    });
                }, '_blank');
            }
        },
        components: {
        }
    }
</script>
