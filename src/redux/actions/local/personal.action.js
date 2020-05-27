import {api} from '../../../utils/keys/api.routes';
import {toast} from 'react-toastify';
import AXIOS from 'axios';
import {objetToQueryRequest} from '../../../utils/helpers';

/// CONFIGS
const updateToast = (toastId, label, type) => {
    toast.update(toastId,{
        render : label,
        type : type, 
        autoClose : 3500
    });
}

const goToHome = (msg) => {
    toast(msg, { autoClose: false, type: toast.TYPE.ERROR });
    localStorage.clear();
    window.location.href=`${api.HOST}/iniciar-sesion`;
}

/// ACTIONS
export const getCategories = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let category = await AXIOS.get(`${api.GET.GET_CATEGORY}${query ? query : ""}`);
 
            dispatch({
                type : 'SET_PERSONAL',
                payload : {
                    personal : category.data.categories
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }

            dispatch({
                type : 'SET_PERSONAL',
                payload : {
                    personal : []
                }
            })
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addCategory = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let category = await AXIOS.post(api.POST.ADD_CATEGORY,dataForm);
            
            dispatch({
                type : 'SET_PERSONAL',
                payload : {
                    personal : category.data.categories
                }
            })
            updateToast(toastId, category.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.showModal(false);
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addFileToCategory = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let category = await AXIOS.post(api.POST.ADD_FILE_TO_CATEGORY,dataForm);

            dispatch({
                type : 'SET_PERSONAL',
                payload : {
                    personal : category.data.categories
                }
            })
            updateToast(toastId, category.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.showModal(false);
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}