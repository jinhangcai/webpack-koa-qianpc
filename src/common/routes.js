import Pandect from 'components/page/accountBorrow/pandect.vue'
import Recharge from 'components/page/accountBorrow/recharge.vue'
import Withdraw from 'components/page/accountBorrow/withdraw.vue'
import Repayment from 'components/page/accountBorrow/repayment.vue'
import ResetPwd from 'components/page/accountBorrow/ResetPwd.vue'
import Group from 'components/page/accountBorrow/Group.vue'
import Info from 'components/page/accountBorrow/info.vue'

const routes = [
    {path: '/', name: 'pandect', component: Pandect},        //账户总览
    {path: '/pandect', name: 'pandect', component: Pandect},        //账户总览
    {path: '/recharge', name: 'recharge', component: Recharge},     //账户充值
    {path: '/withdraw', name: 'withdraw', component: Withdraw},     //账户提现
    {path: '/repayment', name: 'repayment', component: Repayment},  //账户还款
    {path: '/resetPwd', name: 'resetPwd', component: ResetPwd},     //账户重置密码
    {path: '/Group', name: 'Group', component: Group},           //帐号授权
    {path: '/info', name: 'info', component: Info},                 //账户资料
];


export default routes;


import AbfAccount from 'components/page/accountBorrow/abfAccount.vue'
import AbfSetNewPwd from 'components/page/accountBorrow/abfSetNewPwd.vue'
import AbfResult from 'components/page/accountBorrow/abfResult.vue'


const accountBorrowForgot = [
    {path: '/', name: 'abfAccount', component: AbfAccount},        //忘记密码填写账户
    {path: '/abfSetNewPwd', name: 'abfSetNewPwd', component: AbfSetNewPwd},        //忘记密码设置新密码
    {path: '/abfResult', name: 'abfResult', component: AbfResult},     //忘记密码完成
];

export {accountBorrowForgot};