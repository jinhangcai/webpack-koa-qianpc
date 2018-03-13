import moment from 'moment';

let filters = function(VUE){
    VUE.filter('moment', function(val, format){
        if(val === null){
            return '--'
        }

        return moment(val).format(format);
    });

    VUE.filter('k2d', function(val, format){
        val = Number(val);

        return val.toFixed(2);
    });

    VUE.filter('roleType', function (value) {
        if(!value) return '';
        switch (String(value)) {
            case '101':
                return '投资人';
            case '102':
                return '借款人';
            case '100':
                return '担保机构';
            default:
                return '其它'
        }
    });

    VUE.filter('cardType', function (value) {
        if(!value) return '';
        switch (String(value)) {
            case '1':
                return '身份证';
            case '2':
                return '护照';
            case '3':
                return '港澳台通行证';
            case '4':
                return '外国人永久居留证';
            default:
                return '其它'
        }
    });

    VUE.filter('terminal', function (value) {
        if(!value) return '';
        switch (String(value)) {
            case '1':
                return 'pc';
            case '2':
                return 'Android';
            case '3':
                return 'ios';
            default:
                return '其它'
        }
    });

    VUE.filter('borrowerStatus', function(val){
        let text = '';
        switch(val){
            case 0:
                text = '不可用';
                break;
            case 1:
                text = '可用';
                break;
            default:
                text = '';
        }

        return text;

    });


    VUE.filter('borrowType', function (val) {
        if(!val) return '';
        var text = '';
        switch (Number(val)){
            case 1:
                text='散标';
                break;
            case 2:
                text='委托支付标';
                break;
        }
        return text;
    });
};

export default filters;