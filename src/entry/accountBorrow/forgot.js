import "babel-polyfill";

import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import http from 'common/http'
import urls from 'common/urls'
import filters from 'common/filters'
import {accountBorrowForgot} from 'common/routes'

import App from 'components/page/accountBorrow/forgot.vue'

const router = new VueRouter({
    routes: accountBorrowForgot
});

filters(Vue);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.$urls = urls;

new Vue({
    el: '#appRoot',
    render: h => h(App),
    router
});
