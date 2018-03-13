<template>
    <div id="pandect">
        <h3 class="account-title">资金信息</h3>
        <div class="account-box">
            <div class="capital-wrapper">
                <div class="capital-item">
                    <div class="label">账户余额</div>
                    <div class="content">{{balance}}<span class="unit">元</span></div>
                </div>
                <div class="capital-item">
                    <div class="label">可用余额</div>
                    <div class="content"><span class="highlight">{{availBalance}}</span><span class="unit">元</span></div>
                </div>
                <div class="capital-item">
                    <div class="label">冻结余额</div>
                    <div class="content">{{freeze}}<span class="unit">元</span></div>
                </div>
            </div>
            <div class="capital-nav">
                <a href="javascript:;" class="nav-item btn-primary" @click="$router.push({ name: 'recharge'})">充值</a>
                <a href="javascript:;" class="nav-item" @click="$router.push({ name: 'withdraw'})">提现</a>
            </div>
        </div>
        <h3 class="account-title">还款信息</h3>
        <div class="table-caption">
            待还款笔数：<span class="content">{{waitRepayNum}}</span>
            待还款总金额(元)：<span class="content">{{waitRepayMoney}}</span>
            最近还款日期：<span class="content">{{waitRepayTime | moment('YYYY-MM-DD')}}</span>
        </div>
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
        <div class="clearfix">
            <el-pagination
                    class="block"
                    v-if="pagination.total > 0"
                    @current-change="getTableDate"
                    :current-page.sync="pagination.currentPage"
                    :page-size="pagination.pageSize"
                    layout="total, prev, pager, next"
                    :total="pagination.total">
            </el-pagination>
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
                availBalance: 0,
                balance: 0,
                bankName: '',
                bankcardNo: '',
                freeze: 0,
                waitRepayTime: null,
                waitRepayMoney: 0,
                waitRepayNum: 0,

                tableData: [],

                pagination: {
                    currentPage: 1,
                    total: 0,
                    pageSize: 10,
                },
                roleType: ''
            }
        },
        mounted(){
            this.roleType = document.getElementById('roleType').value;
            this.getTableDate();
        },
        methods: {
            showOperate(status){
                return (status == 0 || (status == 2 && this.roleType !== '105'));
            },
            getTableDate(){
                let url = `${this.$urls.accountBorrowOverview}/${this.pagination.currentPage}/${this.pagination.pageSize}`;
                this.$http({
                    method: 'get',
                    url: url,
                    data: {
                        service: 'accountOverview'
                    }
                }).then( data => {
                    data = data.data;
                    this.availBalance = data.accountOverviewSumVO.availBalance || 0;
                    this.balance = data.accountOverviewSumVO.balance || 0;
                    this.bankName = data.accountOverviewSumVO.bankName || 0;
                    this.bankcardNo = data.accountOverviewSumVO.bankcardNo || 0;
                    this.freeze = data.accountOverviewSumVO.freeze || 0;
                    this.waitRepayTime = data.accountOverviewSumVO.waitRepayTime || null;
                    this.waitRepayMoney = data.accountOverviewSumVO.waitRepayMoney || 0;
                    this.waitRepayNum = data.accountOverviewSumVO.waitRepayNum || 0;

                    this.tableData = data.listVOPageData.list;

                    this.pagination.total = data.listVOPageData.total;

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
                    this.getTableDate();
                }).catch(e => {
                    console.log(e)
                });
            }
        }
    }
</script>