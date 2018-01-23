import moment from 'moment';

function filterMoment(val, format){
    if(!val){
        return '--'
    }
    return moment(val).format(format);
}
function k2d(val){
    val = Number(val);

    return val.toFixed(2);
}
function milliFormat(s){//添加千位符
    if(!s){
        return 0;
    }
    s = s+'';
    let sign = s.slice(0, 1);
    if(/^[\+\-]$/.test(sign)){
        s = s.slice(1);
    }else{
        sign = '';
    }
    if(/[^0-9\.]/.test(s)) return "invalid value";
    s=s+',';
    let re=/(\d)(\d{3},)/;
    while(re.test(s)){
        s=s.replace(re,"$1,$2");
    }
    s=s.replace(/,$/,"");
    return sign + s;
}

export {filterMoment, milliFormat, k2d}