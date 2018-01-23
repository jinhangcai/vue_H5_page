/**
 * onceStorage
 * 零时存储，取出后立即销毁
 */
import Cookies from 'js-cookie';

const onceStorage = {
    get(name){
        let val = '';
        if(sessionStorage){
            val = sessionStorage.getItem(name);
            sessionStorage.removeItem(name);
        }else{
            val = Cookies.get(name);
            Cookies.remove(name, {domain: '.qian360.com', path: '/'})
        }
    },
    set(name, value){

    }
};
export default onceStorage;