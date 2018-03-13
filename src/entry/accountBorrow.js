import "babel-polyfill";

import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import http from 'common/http'
import urls from 'common/urls'
import filters from 'common/filters'
import routes from 'common/routes'
import formPostPlugin from 'common/formPost'

import App from 'components/page/accountBorrow/index.vue'

const router = new VueRouter({
    routes
});

filters(Vue);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(formPostPlugin);
Vue.prototype.$http = http;
Vue.prototype.$urls = urls;
console.log(1111)
window.App = new Vue({
    el: '#appRoot',
    render: h => h(App),
    router
});
