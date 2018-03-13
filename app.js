const path = require('path');
const Koa = require('koa');
const views = require('koa-views');             //模板渲染中间件
const bodyParser = require('koa-bodyparser');   //返回体数据解析中间件
const Router = require('koa-router');           //路由中间件
const serve = require('koa-static');            //静态文件中间件
const proxy = require('koa-proxies');           //转发中间件
const Webpack = require('webpack');
const koaWebpack = require('koa-webpack');

const hosts = require('./common/hosts.js');

const routers = require(path.join(__dirname + '/routers/index.js'));

const app = new Koa();
const router = new Router();

if(process.env.NODE_ENV === 'dev'){
    const webpackConfig = require('./webpack.config.js');
    const middleware = koaWebpack({
        compiler: Webpack(webpackConfig),
        dev: {
            publicPath: '/accountBorrow/build/',
            noInfo: true,
            stats: {
                colors: true
            }
        }
    });
    app.use(middleware);
}

// 设置模板引擎 ejs
app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
}));
// 设置静态文件目录
app.use(serve(path.join(__dirname, '/views/static')));

app.use(proxy('/api/pc/v3', {
    target: hosts.mgr,
    changeOrigin: true,
    logs: true
}));



app.use(bodyParser());
routers(router);
app.use(router.routes())
    .use(router.allowedMethods());



app.use(async ctx => {
    ctx.body = 'Hello World';
});
app.listen(3001, () => {
    console.log('项目启动成功, 端口号: ' + 3001);
});
