import qs from 'qs';

const urlQuery  = {
    get(key){
        if(!key) return '';
        let urlSearch = location.search.substring(1);
        return qs.parse(urlSearch)[key];
    }
};

export default urlQuery;