import AXIOS from 'axios';
import {toast} from 'react-toastify'

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

export const copyReferenceInLocalStorage = (_id, tReference) => {
    let data = {tReference,_id}
    
    localStorage.setItem("dataReference", JSON.stringify(data));

    toast(`Ahora vas a trabajar con la referencia: ${tReference}`, {
        autoClose : 2500,
        type : toast.TYPE.SUCCESS
    });
}

export const getReferenceOfLocalstorage = () => {
    return JSON.parse(localStorage.getItem("dataReference"));
}