import axios from 'axios';
import qs from 'qs';

const ajax = function(config){
    let method = config.method ? config.method.toLowerCase() : 'get';
    let option = {};
    option.method = method;
    option.url = config.url;
    option.timeout = config.timeout || 3000;
    if(method === 'get'){
        option.params = Object.assign({_: Date.now()}, config.data);
    }
    if(method === 'put' || method === 'delete'){
        option.headers = {
            'Content-type': 'application/json'
        };
        option.data = config.data;
    }
    if(method === 'post'){
        option.data = config.data ? qs.stringify(config.data) : '';
    }

    return axios(option).then(function (response) {
        return response.data;
    }).catch(e=>{
        return Promise.reject({msg: '系统错误！'})
    })
};
export default ajax;
