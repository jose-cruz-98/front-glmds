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
export const getDocument = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let documents = await AXIOS.get(`${api.GET.GET_DOCUMETNS}${query ? query : ""}`);
      
            dispatch({
                type : 'SET_DOCUMENTS',
                payload : {
                    documents : documents.data.documents[0].aDocuments
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }

            dispatch({
                type : 'SET_DOCUMENTS',
                payload : {
                    documents : []
                }
            })
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addDocument = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let documents = await AXIOS.post(api.POST.ADD_DOCUMETNS,dataForm);

            dispatch({
                type : 'SET_DOCUMENTS',
                payload : {
                    documents : documents.data.documents[0].aDocuments
                }
            })
            updateToast(toastId, documents.data.msg, toast.TYPE.SUCCESS);
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

export const delDocument = (ids) => {
    return async (dispatch) => {
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let documents = await AXIOS.delete(api.DELETE.DEL_DOCUMENT+`?_idReference=${ids._idReference}&_idDocument=${ids._idDocument}`);
            dispatch({
                type : 'SET_DOCUMENTS',
                payload : {
                    documents : documents.data.documents[0].aDocuments
                }
            })
            updateToast(toastId, documents.data.msg, toast.TYPE.SUCCESS);
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }else{
                updateToast(toastId, err.response.data.msg, toast.TYPE.WARNING);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addNote = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let documents = await AXIOS.post(api.POST.ADD_NOTE_DOCUMENT,dataForm);
            dispatch({
                type : 'SET_DOCUMENTS',
                payload : {
                    documents : documents.data.documents[0].aDocuments
                }
            })
            updateToast(toastId, documents.data.msg, toast.TYPE.SUCCESS);
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

// export const getFile = (file) => {
//     return async (dispatch) => {
//         try{
//             let documents = await AXIOS.get(api.GET.GET_FILE + "/" + file);
//             console.log(documents)
//             // window.open("http://localhost:1010/api/v1/documents/5e8bbdd13f32953278b345af")
//         }catch(err){
//             if(err.response.status === 403){
//                 goToHome(err.response.data.msg);
//             }
//             console.log("Error in reference redux : ", err.response.status);
//         }
//     }
// }