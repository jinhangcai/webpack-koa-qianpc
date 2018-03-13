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
                <th>姓名</th>
                <td>{{detail.name}}</td>
            </tr>
            <tr>
                <th>证件号</th>
                <td>
                    {{detail.cardType | cardType}}&nbsp;&nbsp;&nbsp;{{detail.cardId}}
                </td>
            </tr>
            <tr>
                <th>银行卡号</th>
                <td v-if="detail.bankCardNo">
                    {{detail.bankName}}
                    {{detail.bankCardNo}}&nbsp;&nbsp;&nbsp;<unBindBank :user-id="detail.userId"></unBindBank>
                </td>
                <td v-else>
                    <bindBank :user-id="detail.userId" :user-type="0"></bindBank>
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
        computed: {
        },
        created: function(){
        },
        mounted: function () {
        },
        methods: {
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
