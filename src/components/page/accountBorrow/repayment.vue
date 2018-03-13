<template>
    <div id="repayment">
        <div class="navTab">
            <nav class="title" :class="navtoggle === 'recharge' ? 'on' : ''" @click="navTab('recharge')">待还款</nav>
            <nav class="title" :class="navtoggle === 'record' ? 'on' : ''"  @click="navTab('record')">已还款</nav>
            <div class="title warranty" v-if="code1 && warranty"><a href="javascript:;"  @click="$router.push({ name: 'Group'})">已授权自动还款</a></div>
            <div class="title warranty" v-if="code1 && !warranty"><a href="javascript:;"  @click="$router.push({ name: 'Group'})">未授权自动还款</a></div>
        </div>
        <div class="table" v-show="navtoggle === 'recharge'">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="borrowName"
                        label="标的名称"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="contractNumber"
                        label="合同编号"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="borrowType"
                        label="标的类型"
                        width="95">
                    <template slot-scope="scope">
                        {{scope.row.borrowType | borrowType}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="期数"
                        width="65">
                    <template slot-scope="scope">
                        {{scope.row.period}}/{{scope.row.allPeriod}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="本金金额"
                        width="104">
                    <template slot-scope="scope">
                        {{scope.row.capital}}元
                    </template>
                </el-table-column>
                <el-table-column
                        label="利息金额"
                        width="104">
                    <template slot-scope="scope">
                        {{scope.row.interest}}元
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status | state}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="还款日期"
                        width="104">
                    <template slot-scope="scope">
                        {{scope.row.repayTime | moment('YYYY-MM-DD&nbsp;HH:mm')}}
                    </template>
                </el-table-column>
                <el-table-column
                        class="what"
                        label="操作">
                    <template slot-scope="scope" class="what1">
                        <template v-if="showOperate(scope.row.status)">
                            <a href="javascript:;" class="btnColor" @click="submit(scope.row.id,scope.row.status,scope.row.period)">{{scope.row.status | state1}}</a>
                        </template>
                    </template>
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
        <div class="table table1" v-show="navtoggle === 'record'">
            <el-table
                    :data="tableData1"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="borrowName"
                        label="标的名称">
                </el-table-column>
                <el-table-column
                        prop="contractNumber"
                        label="合同编号">
                </el-table-column>
                <el-table-column
                        prop="borrowType"
                        label="标的类型"
                        width="95">
                    <template slot-scope="scope">
                        {{scope.row.borrowType | borrowType}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="期数">
                    <template slot-scope="scope">
                        {{scope.row.period}}/{{scope.row.allPeriod}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="本金金额">
                    <template slot-scope="scope">
                        {{scope.row.capital}}元
                    </template>
                </el-table-column>
                <el-table-column
                        label="利息金额">
                    <template slot-scope="scope">
                        {{scope.row.interest}}元

                    </template>
                </el-table-column>
                <el-table-column
                        label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status | state}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="还款日期"
                        >
                    <template slot-scope="scope">
                        {{scope.row.repayTime | moment('YYYY-MM-DD&nbsp;HH:mm')}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" v-if="total1 > 0">
                <el-pagination
                        :current-page.sync="currentPage1"
                        @current-change="handleCurrentChange1"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total1">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        filters:{
            state: function(value){
                switch(value) {
                    case 0:
                        return '待还款';
                        break;
                    case 1:
                        return '已还款';
                        break;
                    case 2:
                        return '已代偿';
                        break;
                    case 3:
                        return '已还代偿款';
                        break;
                }},
            state1: function(value){
                switch(value) {
                    case 0:
                        return '还款';
                        break;
                    case 1:
                        return '已还款';
                        break;
                    case 2:
                        return '还代偿款';
                        break;
                    case 3:
                        return '已还代偿款';
                        break;
                }},
        },
        data(){
            return {
                loading:false,
                navtoggle:"recharge",
                total:0,
                total1:0,
                currentPage:1,
                currentPage1:1,
                tableData: [],
                tableData1: [],
                roleType: '',
                warranty:true,
                code:'COMPENSATORY',
                code1:false
            }
        },
        mounted(){
            this.roleType = document.getElementById('roleType').value;
            this.loadajax('0');
            this.withdraw();
        },
        methods:{
            showOperate(status){
                return (status == 0 || (status == 2 && this.roleType !== '105'));
            },
            navTab(nav){
                if(nav != this.navtoggle){
                    this.navtoggle = nav;
                    this.currentPage = 1;
                    this.currentPage1 = 1;
                    let currentPage = nav =='recharge' ? 0 : 1;
                    this.loadajax(currentPage)
                }
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.loadajax('0')
            },
            handleCurrentChange1(val){
                this.currentPage1 = val;
                this.loadajax('1')
            },
            loadajax(type){
                let currentPage = type == 0 ? this.currentPage : this.currentPage1;
                let url = this.roleType === 105 ? this.$urls.repayListAssignee : this.$urls.repaylist
                this.$http({
                        method: 'get',
                        url: url +'/'+currentPage+'/'+10,
                        data: {
                            service:'list',
                            type:type,
                        }
                    }).then( data => {
                        if(type == 0){
                            this.tableData = data.data.list;
                            this.total = data.data.total;
                        }else if(type == 1){
                            this.tableData1 = data.data.list;
                            this.total1 = data.data.total;
                        }
                    }).catch( e => {

                })
            },
            submit(id,value,period){
                const h = this.$createElement;
                let title =  value === 0 ? '确定要还款吗？' : '确定要还代偿款吗？';
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('span', null, title)
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            let obj = {};
                            if(value === 0){
                                obj.service = 'repay';
                                obj.period = period-1;

                            }else{
                                obj.service = 'repayComp';
                            }
                            let url = value === 0 ?
                                (this.roleType === 105 ? 'v3repayAssignee' : 'v3repay') :
                                'repaycomp';
                            this.$http({
                                method: 'POST',
                                url: this.$urls[url]+'/'+id,
                                data: obj
                            }).then( data => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.$message(data.msg);
                            }).catch( e => {
                                this.$message(e.msg);
                                done();
                                instance.confirmButtonLoading = false;
                            })
                        } else {
                            done();
                        }
                    }

                }).then(action => {
                    this.loadajax('0');
                }).catch(e => {
                    console.log(e)
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
                            this.code1 = true;
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