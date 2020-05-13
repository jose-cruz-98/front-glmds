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

export const addEvent = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let events = await AXIOS.post(api.POST.ADD_EVENT,dataForm);
            dispatch({
                type : 'SET_EVENTS',
                payload : {
                    events : events.data.events
                }
            })
            updateToast(toastId, events.data.msg, toast.TYPE.SUCCESS);
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

export const getEvents = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let events = await AXIOS.get(`${api.GET.GET_EVENTS}${query ? query : ""}`);
                
            dispatch({
                type : 'SET_EVENTS',
                payload : {
                    events : events.data.events
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }else if(err.response.status === 404){
                toast(err.response.data.msg, { autoClose: 3500, type : toast.TYPE.WARNING});
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addCarrier = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let carrier = await AXIOS.post(api.POST.ADD_CARRIER,dataForm);

            dispatch({
                type : 'SET_CARRIER',
                payload : {
                    carriers : carrier.data.carriers
                }
            })
            updateToast(toastId, carrier.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.showModal(false)
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const getCarriers = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let carriers = await AXIOS.get(`${api.GET.GET_CARRIER}${query ? query : ""}`);
                
            dispatch({
                type : 'SET_CARRIER',
                payload : {
                    carriers : carriers.data.carriers
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }else if(err.response.status === 404){
                toast(err.response.data.msg, { autoClose: 3500, type : toast.TYPE.WARNING});
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addImagenMonitoring = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let carriers = await AXIOS.post(api.POST.ADD_IMAGEN_MONITORING,dataForm);

            dispatch({
                type : 'SET_CARRIER',
                payload : {
                    carriers : carriers.data.carriers
                }
            })
            updateToast(toastId, carriers.data.msg, toast.TYPE.SUCCESS);
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

export const getEvidence = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let evidences = await AXIOS.get(`${api.GET.GET_EVIDENCES}${query ? query : ""}`);
                
            dispatch({
                type : 'SET_EVIDENCES',
                payload : {
                    evidences : evidences.data.evidences
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }else if(err.response.status === 404){
                toast(err.response.data.msg, { autoClose: 3500, type : toast.TYPE.WARNING});
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addEvidence = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let evidences = await AXIOS.post(api.POST.ADD_EVIDENCES,dataForm);

            dispatch({
                type : 'SET_EVIDENCES',
                payload : {
                    evidences : evidences.data.evidences
                }
            })
            updateToast(toastId, evidences.data.msg, toast.TYPE.SUCCESS);
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


