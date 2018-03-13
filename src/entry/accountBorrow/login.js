import "babel-polyfill";

import Vue from 'vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import http from 'common/http'
import urls from 'common/urls'
import filters from 'common/filters'

import App from 'components/page/accountBorrow/login.vue'


filters(Vue);
Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.$urls = urls;

new Vue({
    el: '#appRoot',
    render: h => h(App),
});
