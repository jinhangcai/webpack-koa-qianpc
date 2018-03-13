<template>
    <div id="withdraw">
        <div class="navTab">
            <nav class="title" :class="navtoggle === 'recharge' ? 'on' : ''" @click="navTab('recharge')">存管账户提现</nav>
            <nav class="title" :class="navtoggle === 'record' ? 'on' : ''"  @click="navTab('record')">提现记录</nav>
            <div class="title warranty" v-if="warranty"><a href="javascript:;"  @click="$router.push({ name: 'Group'})">已授权自动提现</a></div>
            <div class="title warranty" v-else><a href="javascript:;"  @click="$router.push({ name: 'Group'})">未授权自动提现</a></div>
        </div>
        <div class="list" v-if="navtoggle === 'recharge'" >
            <el-form ref="form" :model="form" label-width="91px">
                <el-form-item label="提现至" v-if="form.bankName">
                    <span class="corfot">{{form.bankName}}   {{form.bankcardNo}}</span>
                </el-form-item>
                <el-form-item label="可提现金额">
                    <span class="corfot"><span class="money">{{form.availBalance}}元 &nbsp;&nbsp;&nbsp;</span> <a href="javascript:;" class="all" @click="all">全部提现</a></span>
                </el-form-item>
                <el-form-item label="提现金额"  prop="money" :rules="[{ min:0.01,type: 'number',  message: '金额大于0且金额不能为空且必须为数字', trigger: 'change,blur' }]">
                    <input v-model.number="form.money" placeholder="请输入提现金额" class="inputting" />
                </el-form-item>
                <el-form-item label="">
                    <el-button type="danger" round class="btn" @click="submitForm('form')" v-if="userWithdrawEnabled">提现</el-button>
                    <el-button type="danger" round class="btn nobtn" v-if="!userWithdrawEnabled">提现</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table" v-if="navtoggle === 'record'">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="时间"
                        width="185">
                    <template slot-scope="scope">
                        {{scope.row.applyTime | moment('YYYY-MM-DD&nbsp;HH:mm') }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="提现金额(元)"
                        width="185">
                </el-table-column>
                <el-table-column
                        label="提现银行"
                        width="185">
                    <template slot-scope="scope">
                        {{scope.row.bankName }}(尾号 {{scope.row.cardNo | state}})
                    </template>
                </el-table-column>
                <el-table-column
                        prop="statusDesc"
                        label="状态">
                </el-table-column>
            </el-table>
            <div class="block" v-if="total > 0">
                <el-pagination
                        :current-page.sync="currentPage1"
                        @current-change="handleCurrentChange"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        filters:{
            state: function(value) {
                console.log(value)
                return value.substr(value.length-4)
            }
        },
        data(){
            return {
                userWithdrawEnabled:true,
                total:0,
                currentPage:1,
                currentPage1:1,
                block:1,
                lock:false,
                navtoggle:'recharge',
                form:{
                    money:'',
                    bankName:'',
                    availBalance:'',
                    bankcardNo:''
                },
                tableData: [],
                warranty:true,
                code:'WITHDRAW'
            }
        },
        mounted(){
            this.loadajax();
            this.Initialize();
            this.withdraw();
        },
        methods:{
            navTab(nav){
                if(nav != this.navtoggle){
                    this.navtoggle = nav;
                    this.currentPage = 1;
                    this.currentPage1 = 1;
                    let currentPage = nav =='recharge' ? 0 : 1;
                    this.form.money = '';
                    if(nav == 'recharge'){
                        this.loadajax(currentPage)
                    }else{
                        this.tabajax()
                    }
                }
                this.navtoggle = nav;
            },
            all(){
                this.form.money = this.form.availBalance;
            },
            Initialize(){
                this.$http({
                    method: 'get',
                    url: this.$urls.withdrawinit,
                    data: {
                        service:'withdraw.init'
                    }
                }).then( data => {
                   this.userWithdrawEnabled = data.data.userWithdrawEnabled;
                }).catch( e => {
                    this.$alert(e.msg, '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                })
            },
            loadajax(){
                this.$http({
                    method: 'get',
                    url: this.$urls.accountoverview+'/'+this.currentPage+'/'+10,
                    data: {
                        service:'accountOverview'
                    }
                }).then( data => {
                   this.form.bankName = data.data.accountOverviewSumVO.bankName;
                   this.form.availBalance= data.data.accountOverviewSumVO.availBalance;
                   this.form.bankcardNo= data.data.accountOverviewSumVO.bankcardNo;
                }).catch( e => {
                    this.$alert(e.msg, '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                })
            },
            tabajax(){
                this.$http({
                    method: 'get',
                    url: this.$urls.withdrawsearch,
                    data: {
                        currentPage:this.currentPage1,
                        pageSize:10,
                        service:'withdraw.search'
                    }
                }).then( data => {
                    this.tableData = data.data.list;
                    this.total = data.data.total;
                }).catch( e => {
                    this.$alert(e.msg, '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                })
            },
            handleCurrentChange(val){
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.tabajax();
            },
            formSubmit: function(url, data){


                //data.reqData = JSON.stringify(data.reqData);
                data.userDevice = '';

//                var form = $('<form>');
                let form = document.createElement('form');
                let target = document.createAttribute('target');  target.value = '_blank';
                let method = document.createAttribute('method');  method.value = 'post';
                let action = document.createAttribute('action');  action.value = url;
                form.setAttributeNode(target);
                form.setAttributeNode(method);
                form.setAttributeNode(action);
//                form.attr({
//                    'target': '_blank',
//                    'method': 'post',
//                    'action': url
//                });
                for(let key in data){
//                    var ipt = $('<input type="hidden" name="'+key+'">');
                    let ipt =  document.createElement('input');
                    ipt.type='hidden';
                    ipt.name=key
                    ipt.value = data[key];
                    form.appendChild(ipt);
                }

                let body = document.getElementsByTagName("body")[0];
                body.appendChild(form);
                form.submit();
            },
            submitForm(formName){
                console.log(formName)
                if(this.form.money > this.form.availBalance){
                    this.$confirm('余额不足', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '关闭成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '关闭成功'
                        });
                    });
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //请求
                        if(!this.lock){
                            this.lock = true;
                            this.$http({
                                method: 'post',
                                url: this.$urls.withdrawpreproccess,
                                data: {
                                    amount:this.form.money,
                                    service:'withdraw.preproccess'
                                }
                            }).then( data => {
                                    let url = data.data.postUrl,
                                        formData = data.data.reqDataPackage;

                                    this.formPost(url, formData, ()=>{

                                        this.$confirm('提现已完成，刷新页面?' , '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            location.reload();
                                        }).catch(() => {
                                            this.lock = false;
                                        });
                                    }, '_blank');
//                                    this.formSubmit(url, formData);
//                                    setTimeout(function(){
//                                        location.reload();
//                                    },2000)
//                                    this.$message({
//                                        type: 'success',
//                                        message: '操作成功!'
//                                    });



                            }).catch( e => {
                                this.$confirm(e.msg, '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$message({
                                        type: 'success',
                                        message: '关闭成功!'
                                    });
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '关闭成功'
                                    });
                                });
                                this.lock = false;
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            withdraw(){
                this.$http({
                    method: 'get',
                    url: this.$urls.userAuthinfo,
                    data: {
                        service:'info'
                    }
                }).then( data => {
                   for(let i=0;i<data.data.length;i++){
                       if(this.code == data.data[i].authCode){
                           this.warranty = data.data[i].status ? true : false;
                       }
                   }
                }).catch( e => {
                    this.$alert(e.msg, '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                })
            }
        }
    }
</script>