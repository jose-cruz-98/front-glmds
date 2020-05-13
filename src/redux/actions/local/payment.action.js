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
export const getUsersByRole = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let users = await AXIOS.get(`${api.GET.GET_USERS_ROLE}${query ? query : ""}`);
        
            users = users.data.users.map(user => {
                return {
                        id : user._id,
                        tName : user.tName + " " + user.tSurname
                }
            })
      
            dispatch({
                type : 'SET_USERS',
                payload : {
                    users : users
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }

            dispatch({
                type : 'SET_USERS',
                payload : {
                    documents : []
                }
            })
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addRequest = (dataForm, functions,dataUser) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let requests = await AXIOS.post(api.POST.ADD_REQUEST,dataForm);

            dispatch({
                type : 'SET_REQUESTS',
                payload : {
                    requests : getObjectRequest(requests.data.requests,dataUser)
                }
            })
            updateToast(toastId, requests.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.showModal(false);
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err);
        }
    }
}

export const getRequest = (query, dataUser) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let requests = await AXIOS.get(`${api.GET.GET_REQUEST}${query ? query : ""}`);

            dispatch({
                type : 'SET_REQUESTS',
                payload : {
                    requests : getObjectRequest(requests.data, dataUser)
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }

            dispatch({
                type : 'SET_REQUESTS',
                payload : {
                    requests : {
                        pending : [],
                        returned : [],
                        revision : []
                    }
                }
            })
            console.log("Error in reference redux : ", err);
        }
    }
}

export const delRequest = (id, dataUser) => {
    return async (dispatch) => {
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let requests = await AXIOS.delete(api.DELETE.DEL_REQUEST+`?_id=${id}`);

            dispatch({
                type : 'SET_REQUESTS',
                payload : {
                    requests : getObjectRequest(requests.data.requests, dataUser)
                }
            })
            updateToast(toastId, requests.data.msg, toast.TYPE.SUCCESS);
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

export const  updReturnedDocument = (dataForm, functions, dataUser) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let requests = await AXIOS.put(api.PUT.UPD_RETURNED_DOCUMENT_REQUEST,dataForm);

            dispatch({
                type : 'SET_REQUESTS',
                payload : {
                    requests : getObjectRequest(requests.data.requests, dataUser)
                }
            })
            updateToast(toastId, requests.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.showModal(false);
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err);
        }
    }
}

export const addPaymentFile = (dataForm, functions, dataUser) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let requests = await AXIOS.post(api.POST.ADD_REQUEST_FILE,dataForm);
            console.log(requests);

            dispatch({
                type : 'SET_REQUESTS',
                payload : {
                    requests : getObjectRequest(requests.data.requests, dataUser)
                }
            })
            updateToast(toastId, requests.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.showModal(false);
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err);
        }
    }
}

export const updDocumentToComplete = (id, dataUser) => {
    return async (dispatch) => {
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let requests = await AXIOS.put(api.PUT.UPD_REQUEST_AND_DELETE,{_id : id});

            dispatch({
                type : 'SET_REQUESTS',
                payload : {
                    requests : getObjectRequest(requests.data.requests, dataUser)
                }
            })
            updateToast(toastId, requests.data.msg, toast.TYPE.SUCCESS);
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

export const getPayments = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let payments = await AXIOS.get(`${api.GET.GET_PAYMENTS}${query ? query : ""}`);

            dispatch({
                type : 'SET_PAYMENTS',
                payload : {
                    payments : payments.data
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }

            dispatch({
                type : 'SET_PAYMENTS',
                payload : {
                    payments : []
                }
            })
            console.log("Error in reference redux : ", err);
        }
    }
}

export const delDocument = (ids) => {
    return async (dispatch) => {
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let payments = await AXIOS.delete(api.DELETE.DEL_PAYMENT+`?_idReference=${ids._idReference}&_idDocument=${ids._idDocument}`);
            dispatch({
                type : 'SET_PAYMENTS',
                payload : {
                    payments : payments.data.payments
                }
            })
            updateToast(toastId, payments.data.msg, toast.TYPE.SUCCESS);
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
                type : 'SET_PAYMENTS',
                payload : {
                    payments : documents.data.documents[0].aDocuments
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

export const addPaymentComplete = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let documents = await AXIOS.post(api.POST.ADD_DOCUMETNS,dataForm);

            dispatch({
                type : 'SET_PAYMENTS',
                payload : {
                    payments : documents.data.documents[0].aDocuments
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

const getObjectRequest = (requests, dataUser) => {
    let pending = requests.filter(request => {
        if(request._tUserTo === dataUser._id){
            return(
                    request.tStatus === "PENDIENTE" &&
                    request._tUserTo === dataUser._id
                )
        }else if(request._tUserFrom === dataUser._id){
            return(
                request.tStatus === "PENDIENTE" &&
                request._tUserFrom === dataUser._id
            )
        }else{ return null; }
    });
    let returned = requests.filter(request => {
        if(request._tUserTo === dataUser._id){
            return(
                    request.tStatus === "DEVUELTO" &&
                    request._tUserTo === dataUser._id
                )
        }else if(request._tUserFrom === dataUser._id){
            return(
                request.tStatus === "DEVUELTO" &&
                request._tUserFrom === dataUser._id
            )
        }else{ return null; }
    });
    let revision = requests.filter(request => {
        if(request._tUserTo === dataUser._id){
            return(
                    request.tStatus === "REVISION" &&
                    request._tUserTo === dataUser._id
                )
        }else if(request._tUserFrom === dataUser._id){
            return(
                request.tStatus === "REVISION" &&
                request._tUserFrom === dataUser._id
            )
        }else{ return null; }
    });

    return {
        pending,
        returned,
        revision
    }
}
