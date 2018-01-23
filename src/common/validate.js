function checkoutPhone(val){
    return /^1\d{10}$/g.test(val)
}

function checkoutPassword(val){
    return /^[\d\w]+$/.test(val)
}

function checkoutMin(val, min){
    return val.length >= min
}

function checkoutMax(val, max){
    return val.length <= max
}

function checkType(arg, type){
    return Object.prototype.toString.call(arg) === '[object '+type+']';
}

function validate(opts){
    let status = {status: true};
    if(checkType(opts, 'Array')){
        opts.some( opt => {
            status = checkout(opt);
            return !status.status;
        })
    }else{
        status = checkout(opts);
    }
    return status;
}
function checkout(opt){
    let status = true;
    switch (opt.type){
        case 'phone':
            status = checkoutPhone(opt.val);
            break;
        case 'password':
            status = checkoutPassword(opt.val);
            break;
        case 'len':
            let statusMin = {status: true},
                statusMax = {status: true};
            if(opt.min !== undefined){
                statusMin = checkoutMin(opt.val, opt.min);
            }
            if(opt.max !== undefined){
                statusMax = checkoutMax(opt.val, opt.max);
            }
            if(!statusMin.status){
                status = statusMin
            }else if(!statusMax.status){
                status = statusMax
            }
            break;
    }
    return {
        status: status,
        msg: opt.msg
    }
}
export default validate;