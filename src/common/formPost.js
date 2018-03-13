/**
 * Created by Administrator on 2017/6/6.
 */
const formPost = {};
formPost.install = function(Vue, options){
    Vue.prototype.formPost = function(url, data, cb, target){
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        target && form.setAttribute('target', target);
        form.setAttribute('action', url);

        for(var key in data){
            var ipt = document.createElement('input');
            ipt.setAttribute('type', 'hidden');
            ipt.setAttribute('name', key);
            ipt.value = data[key];
            form.appendChild(ipt);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        if(cb){
            setTimeout(cb, 200)
        }
    }
};
export default formPost;