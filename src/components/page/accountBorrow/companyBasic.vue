<template>
    <div class="info-table-wrapper">
        <table v-if="detail" class="info-table" >
            <tbody>
            <tr>
                <th>用户ID</th>
                <td>{{detail.userId}}</td>
            </tr>
            <tr>
                <th>平台用户编号</th>
                <td>{{detail.userNo}}</td>
            </tr>
            <tr>
                <th>用户账号</th>
                <td>{{detail.accountNum}}</td>
            </tr>
            <tr>
                <th>企业名称</th>
                <td>{{detail.name}}</td>
            </tr>
            <tr v-if="detail.isThreeCardsInOne == 1">
                <th>社会信用代码</th>
                <td>
                    {{detail.socialCreditCode}}
                    <img v-if="detail.socialCreditCodeAttachment" :src="'https://file.qian360.com/'+detail.socialCreditCodeAttachment">
                </td>
            </tr>
            <template v-else>
                <tr>
                    <th>营业执照编号</th>
                    <td>
                        {{detail.businessLicence}}
                        <img v-if="detail.businessLicenceAttachment" :src="'https://file.qian360.com/'+detail.businessLicenceAttachment">
                    </td>
                </tr>
                <tr>
                    <th>组织机构代码</th>
                    <td>
                        {{detail.organizationCode}}
                        <img v-if="detail.organizationCodeAttachment" :src="'https://file.qian360.com/'+detail.organizationCodeAttachment">
                    </td>
                </tr>
                <tr>
                    <th>税务登记号</th>
                    <td>
                        {{detail.socialCreditCode}}
                        <img v-if="detail.socialCreditCodeAttachment" :src="'https://file.qian360.com/'+detail.socialCreditCodeAttachment">
                    </td>
                </tr>
            </template>

            <tr>
                <th>机构信用代码</th>
                <td>
                    {{detail.institutionalCreditCode}}
                    <img v-if="detail.institutionalCreditCodeAttachment" :src="'https://file.qian360.com/'+detail.institutionalCreditCodeAttachment">
                </td>
            </tr>
            <tr>
                <th>银行开户许可证</th>
                <td>
                    {{detail.accountOpeningLicense}}
                    <img v-if="detail.accountOpeningLicenseAttachment" :src="'https://file.qian360.com/'+detail.accountOpeningLicenseAttachment">
                </td>
            </tr>
            <tr>
                <th>法人姓名</th>
                <td>{{detail.corporateName}}</td>
            </tr>
            <tr>
                <th>法人证件号</th>
                <td>{{detail.corporateCardType | cardType}}&nbsp;&nbsp;&nbsp;{{detail.corporateCardId}}</td>
            </tr>
            <tr>
                <th>企业联系人</th>
                <td>{{detail.attnName}}</td>
            </tr>
            <tr>
                <th>联系人手机号</th>
                <td>{{detail.attnPhone}}</td>
            </tr>
            <tr>
                <th>银行卡号</th>
                <td v-if="detail.publicAccountBankCardNo">
                    {{detail.publicAccountBankName}}
                    {{detail.publicAccountBankCardNo}}&nbsp;&nbsp;&nbsp;<unBindBank v-if="detail.xwAuditStatus == 1" :user-id="detail.userId"></unBindBank>
                </td>
                <td v-else>
                    <bindBank v-if="detail.xwAuditStatus == 1" :user-id="detail.userId" :user-type="1"></bindBank>
                </td>
            </tr>
            <tr>
                <th>电子邮箱</th>
                <td>{{detail.email}}</td>
            </tr>
            <tr>
                <th>用户角色</th>
                <td>{{detail.roleType | roleType}}</td>
            </tr>
            <tr>
                <th>注册终端</th>
                <td>{{detail.registeTerminal | terminal}}</td>
            </tr>
            <tr>
                <th>开通存管时间</th>
                <td>{{detail.cgOpenTime | moment('YYYY-MM-DD&nbsp;&nbsp;&nbsp;HH:mm:ss')}}</td>
            </tr>
            <tr>
                <th>注册时间</th>
                <td>{{detail.registeTime | moment('YYYY-MM-DD&nbsp;&nbsp;&nbsp;HH:mm:ss')}}</td>
            </tr>
            <tr>
                <th>注册ip</th>
                <td>{{detail.registeIp}}</td>
            </tr>
            <tr>
                <th>最后登录时间</th>
                <td>{{detail.lastLoginTime | moment('YYYY-MM-DD&nbsp;&nbsp;&nbsp;HH:mm:ss')}}</td>
            </tr>
            <tr>
                <th>用户状态</th>
                <td>{{detail.status | borrowerStatus}}</td>
            </tr>
            <tr>
                <th>审核状态</th>
                <td v-html="xwAuditStatus(detail.xwAuditStatus)"></td>
            </tr>
            <tr v-if="detail.reviewStatus || detail.reviewStatus == 0">
                <th>变更审核状态</th>
                <td v-html="reviewStatus(detail.reviewStatus, detail.reviewDesc)"></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import bindBank from './bindBank.vue'
    import unBindBank from './unBindBank.vue'
    export default {
        props: ['detail'],
        data: function () {
            return {
            }
        },
        filters: {
            sourceType: function(type){
                type = parseInt(type);
                let text = '';
                switch(type){
                    case 0:
                        text = 'pc端';
                        break;
                    case 1:
                        text = '手机钱庄';
                        break;
                }
                return text;
            }
        },
        created: function(){

        },
        mounted: function () {
        },
        methods: {
            infoModify: function(){
                let id = base.hrefParameter.get('id');
                let self = this;
                base.ajax({
                    url: base.urlMap.mgrBorrowerCompanyModify + '?sendType=post',
                    data: {
                        userId: id
                    },
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        data = data.data.gatewayReq;
                        let url = data.postUrl,
                            formData = data.reqDataPackage;

                        self.formPost(url, formData);
                        //base.layer.msg('操作成功', {icon: 1}, function () {
                        //    //window.history.go(-1);
                        //});
                    },
                    error(){
                        base.layer.msg('操作失败', {icon: 2}, function () {
                            //window.history.go(-1);
                        });
                    },
                    complete(xhr) {
                        if(xhr.responseJSON.code !== 'success'){
                            self.lock = false;
                        }
                    },
                    timeout: 10000
                });
            },
            xwAuditStatus: function(value){
                let text = '';
                let className = 'text-red';
                let textMore = '';
                //0 审核中；1 审核通过；2 审核回退； 3 审核拒绝
                switch(value){
                    case 0:
                        text = '审核中';
                        break;
                    case 1:
                        text = '审核通过';
                        className = 'text-green';
                        break;
                    case 2:
                        text = '审核回退';
                        textMore = '<br> 请去邮件查看回退原因';
                        break;
                    case 3:
                        text = '审核拒绝';
                        textMore = '<br> 请求被关闭，已不能再申请';
                        break;
                }
                return `<span class="${className}">${text}</span>${textMore}`;
            },
            reviewStatus: function(value, result){
                let text = '';
                let className = 'text-red';
                let textMore = '';
                //0  审核中 1  审核通过  2  审核拒绝    10   本地已提交
                switch(value){
                    case 0:
                        text = '审核中';
                        break;
                    case 1:
                        text = '审核通过';
                        className = 'text-green';
                        break;
                    case 2:
                        text = '审核拒绝';
                        textMore = result ? '<br>'+result : '';
                        break;
                    case 10:
                        text = '本地已提交';
                        textMore = result ? '<br>'+result : '';
                        break;
                }
                return `<span class="${className}">${text}</span>${textMore}`;
            },
            cancel: function(){
                window.history.go(-1);
            }
        },
        components: {
            bindBank,
            unBindBank,
        }
    }
</script>
