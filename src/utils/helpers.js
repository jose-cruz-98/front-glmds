import AXIOS from 'axios';

export const setHeadersAXIOS = () => {
    let redux = JSON.parse(localStorage.getItem("redux"));
    if(redux !== null){
        AXIOS.defaults.headers = {'Authorization': `Bearer ${redux.SessionReducer.token}`}
    }

}

export const objetToQueryRequest = (query) => {
    if(Object.keys(query).length === 0){
        return false;
    }else{
        let key = Object.keys(query);

        let res = key.map(k => {
            return k+"="+query[k];
            
        });
        
        res = res.toString();
        res = res.replace(',', '&');

        return "?"+res;
    }
}