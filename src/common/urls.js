let ajaxUrls = {
    verifyImg: '/api/pc/v3/common/verifyImg',
    accountBorrowLogin: '/api/pc/v3/b/login',
    accountBorrowForgotOne: '/api/pc/v3/b/find/one',
    accountBorrowForgotTwo: '/api/pc/v3/b/find/two',
    accountBorrowResetPwd: '/api/pc/v3/b/modify',
    accountBorrowOverview: '/api/pc/v3/account/overview',
    accountBorrowInfo: '/api/pc/v3/b/info',
    bankList: '/api/pc/v3/bank/list',
    bindBankCard: '/api/pc/v3/bankCard/bindBankCard',
    unbindBankCard: '/api/pc/v3/bankCard/unbindBankCard',
    sendMsg: '/api/pc/v3/common/sendMsg',
    //待还款/已还款列表
    repaylist:'/api/pc/v3/repay/list',
    //还代偿款
    repaycomp:'/api/pc/v3/repay/comp',
    //还款
    v3repay:'/api/pc/v3/repay',
    //待还款/已还款列表-供应商
    repayListAssignee:'/api/pc/v3/repay/assignee/list',
    //还款-供应商
    v3repayAssignee:'/api/pc/v3/repay/assignee',
    //账户总览接口
    accountoverview:'/api/pc/v3/account/overview',
    //提现初始化
    withdrawinit:'/api/pc/v3/withdraw/init',
    //提现记录
    withdrawsearch:'/api/pc/v3/withdraw/search',
    //新网充值前预处理
    rechargepreproccess:'/api/pc/v3/recharge/preproccess',
    //新网提现前预处理
    withdrawpreproccess:'/api/pc/v3/withdraw/preproccess',
    //充值查询
    rechargesearch:'/api/pc/v3/recharge/search',
    //用户授权列表
    userAuthinfo:'/api/pc/v3/userAuth/info',
    //授权
    userAuthgrantAuth:'/api/pc/v3/userAuth/grantAuth',
    //取消授权
    userAuthcancelAuth:'/api/pc/v3/userAuth/cancelAuth'
};
// const prefix = '/api';
// function urlPrefix(obj){
//     let keys = Object.keys(obj);
//     keys.forEach((item) => {
//         if(typeof obj[item] === 'string'){
//             obj[item] =  prefix + obj[item];
//         }else{
//             urlPrefix(obj[item])
//         }
//     })
// }
// urlPrefix(ajaxUrls);
export default ajaxUrls;