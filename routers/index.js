const rp = require('../common/rp.js');
const hosts = require('../common/hosts.js');
const urls = require('../common/urls.js');
let routers = (router) => {
    router
        .get('/', async (ctx, next) => {
            await ctx.render('index', {
                title: '钱庄网'
            });
        })
        .get('/accountBorrow/', async (ctx, next) => {
            let isLoginData = await rp(ctx, {
                uri: `${hosts.mgr}${urls.isLogin}`,
                method: 'GET',
                qs: {
                    service: 'isLogin'
                },
                timeout: 10000,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'cookie': ctx.headers && ctx.headers.cookie
                }
            }).catch(e => {
                return {
                    code: 502,
                    msg: e.message
                }
            });
            let userData = JSON.parse(isLoginData).data;
            if(!userData.login){
                ctx.set('Referrer', ctx.request.href);
                ctx.redirect('back','/accountBorrow/login');
            }else{
                await ctx.render('accountBorrow/index', {
                    userData,
                    title: '钱庄网-借款人账户'
                });
            }
        })
        .get('/accountBorrow/login', async (ctx, next) => {

            await ctx.render('accountBorrow/login', {
                userData: {},
                title: '钱庄网-借款人登录'
            });
        })
        .get('/accountBorrow/logout', async (ctx, next) => {
            ctx.cookies.set('borrower_cookie_phone', '');
            await ctx.render('accountBorrow/login', {
                userData: {},
                title: '钱庄网-借款人登录'
            });
        })
        .get('/accountBorrow/forgot', async (ctx, next) => {
            await ctx.render('accountBorrow/forgot', {
                userData: {},
                title: '钱庄网-借款人忘记密码'
            });
        })

};
module.exports = routers;