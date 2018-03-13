<template>
    <div id="recharge">
        <div class="navTab">
            <nav class="title" :class="navtoggle === 'recharge' ? 'on' : ''" @click="navTab('recharge')">存管账户充值</nav>
            <nav class="title" :class="navtoggle === 'record' ? 'on' : ''"  @click="navTab('record')">充值记录</nav>
        </div>
        <div class="list" v-if="navtoggle === 'recharge'" >
            <el-form ref="form" :model="form" label-width="78px">
                <el-form-item label="账户余额">
                    <span class="corfot">{{balance}}元</span>
                </el-form-item>
                <el-form-item label="充值方式">
                    <span class="corfot">网银支付（部分网银只支持IE浏览器）</span>
                </el-form-item>
                <el-form-item label="充值渠道">
                   <a class="banks corfot" @click="channel(1,'LIANLIAN')"  :class="banks === 'LIANLIAN'? 'ons' : '' "><img src="/accountBorrow/image/account/ll.png" class="ll pos"/>连连支付</a>
                   <a class="banks corfot fotleft" @click="channel(2,'REAPAL')" :class="banks === 'REAPAL'? 'ons' : '' "><img src="/accountBorrow/image/account/rb.png" class="rb pos" />融宝支付</a>
                   <a class="banks corfot" @click="channel(3,'YEEPAY')" :class="banks === 'YEEPAY' ? 'ons' : '' "><img src="/accountBorrow/image/account/yb.png" class="yb pos"/>易宝支付</a>
                </el-form-item>
                <el-form-item label="充值金额"  prop="money" :rules="[{ min:0.01,type: 'number', message: '金额大于0且金额不能为空且必须为数字', trigger: 'change,blur' }]">
                    <input v-model.number="form.money" placeholder="请输入充值金额" class="inputting" />
                </el-form-item>
                <el-form-item label="">
                    <el-button type="danger" round class="btn" @click="submitForm('form')">充值</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table" v-if="navtoggle === 'record'">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="时间"
                        width="248">
                    <template slot-scope="scope">
                        {{scope.row.applyTime | moment('YYYY-MM-DD&nbsp;HH:mm') }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="充值金额(元)"
                        width="240">
                </el-table-column>
                <el-table-column
                        prop="statusDesc"
                        label="状态">
                </el-table-column>
            </el-table>
            <div class="block" v-if="total > 0">
                <el-pagination
                        :current-page.sync="currentPage"
                        @current-change="handleCurrentChange"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="el-message-box__wrapper" v-if="isshow">
            <div class="wrapper-box">
                <div class="box-cen">
                    <p class="title">登录网上银行充值</p>
                    <p class="title1">请再新开网银页面完成充值后选择：</p>
                    <div class="res success" @click="subclick"><img src="/accountBorrow/image/account/correctness.png"><span>充值成功</span><a href="javascript:;" @click="$router.push({ name: 'pandect'})">确定</a></div>
                    <div class="res error"><img src="/accountBorrow/image/account/clone.png"><span>充值失败</span><a href="javascript:;" @click="recharge">重新充值</a></div>
                </div>
            </div>
        </div>
        <div class="v-modal" v-if="isshow"></div>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                isshow:false,
                banks:'',
                balance:'',
                currentPage:1,
                currentPage1:1,
                total:1,
                navtoggle:'recharge',
                tableData: [],
                form:{
                    money:''
                },
                lock:false
            }
        },
        mounted(){
            this.navTab('recharge');
            this.ajaxload();
        },
        methods:{
            subclick(){
            },
            ajaxload(){
                this.$http({
                    method: 'get',
                    url: this.$urls.accountoverview+'/'+this.currentPage+'/'+10,
                    data: {
                        service:'accountOverview'
                    }
                }).then( data => {
                    this.balance = data.data.accountOverviewSumVO.balance;
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
            navTab(nav){
                if(nav != this.navtoggle){
                    this.navtoggle = nav;
                    this.currentPage = 1;
                    this.currentPage1 = 1;
                    let currentPage = nav =='recharge' ? 0 : 1;
                    this.form.money = '';
                    if(nav == 'recharge'){
                        this.ajaxload(currentPage)
                    }else{
                        this.tabajax()
                    }
                }
            },
            tabajax(){
                this.$http({
                    method: 'get',
                    url: this.$urls.rechargesearch,
                    data: {
                        currentPage:this.currentPage1,
                        pageSize:10,
                        service:'recharge.search'
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
                this.currentPage1 = val;
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
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(!this.banks){
                            this.$confirm('请选择充值银行', '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            }).then(() => {
                                this.$message({
                                    type: 'success',
                                    message: '关闭成功!'
                                });
                            })
                            return;
                        }
                        //请求
                        console.log(111,this.lock)
                        if(!this.lock){
                            this.lock = true;
                            this.$http({
                                method: 'post',
                                url: this.$urls.rechargepreproccess,
                                data: {
                                    amount:this.form.money,
                                    payCompanyName:this.banks,
                                    service:'recharge.preproccess'
                                }
                            }).then( data => {

                                let url = data.data.postUrl,
                                    formData = data.data.reqDataPackage;

                                this.formPost(url, formData, ()=>{

                                    this.isshow = true;
                                    this.lock = false;
                                }, '_blank');
//                                this.$confirm('是否充值', '提示', {
//                                    confirmButtonText: '确定',
//                                    cancelButtonText: '取消',
//                                    type: 'warning'
//                                }).then(() => {
//                                    let url = data.data.postUrl,
//                                        formData = data.data.reqDataPackage;
//                                    console.log('123')
//                                    this.formSubmit(url, formData);
////                                setTimeout(function(){
////                                    location.reload();
////                                },2000)
//                                    this.isshow = true;
//                                    this.lock = false;
//                                    this.$message({
//                                        type: 'success',
//                                        message: '操作成功!'
//                                    });
//                                }).catch(() => {
//                                    this.lock = false;
//                                    this.$message({
//                                        type: 'info',
//                                        message: '已取消'
//                                    });
//                                });


                            }).catch( e => {
                                this.$alert(e.msg, '标题名称', {
                                    confirmButtonText: '确定',
                                    callback: action => {

                                        this.lock = false;
                                        this.$message({
                                            type: 'info',
                                            message: `action: ${ action }`
                                        });
                                    }
                                });
                            })
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            channel(index,value){
                this.banks = value;
            },
            recharge(){
                this.isshow = false;
            }
        }
    }
</script>