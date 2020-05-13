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
export const getPatent = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let patents = await AXIOS.get(`${api.GET.GET_PATENTS}${query ? query : ""}`);

            patents = patents.data.patents.map(patent => {
                return {
                        id : patent._id,
                        tName : patent.iPatent+"-"+patent.tAgent
                }
            })
            
            dispatch({
                type : 'SET_PATENTS',
                payload : {
                    patents : patents
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const getShippingCompany = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let shippingCompanies = await AXIOS.get(`${api.GET.GET_SHIPPING_COMPANIES}${query ? query : ""}`);


            shippingCompanies = shippingCompanies.data.shippingCompanies.map(shippingCompany => {
                return {
                        id : shippingCompany._id,
                        tName : shippingCompany.tName
                }
            })
                
            dispatch({
                type : 'SET_SHIPPING_COMPANIES',
                payload : {
                    shippingCompanies : shippingCompanies
                }
            })
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const addReference = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let references = await AXIOS.post(api.POST.ADD_IMPORT_REFERENCE,dataForm);

            dispatch({
                type : 'SET_IMPORT_REFERENCES',
                payload : {
                    references : references.data.references
                }
            })
            updateToast(toastId, references.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.goBack();
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const getReference = (query, tRole=null, id=null) => {
    
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let references = await AXIOS.get(`${api.GET.GET_IMPORT_REFERENCE}${query ? query : ""}`);

            references = references.data.references.filter(reference => {  
                if(tRole === null){
                    return reference;
                }else{
                    let role = tRole.join();
                    if(role.includes("OPERACIONES EXTERIOR")){
                        return reference._idUser === id
                    }else{
                        if(role.includes("PRIVADO")){
                            return true;
                        }else{
                            return reference.tPrivate === "TRUE" ? false : true
                        }
                    }
                }
            });
                
            dispatch({
                type : 'SET_IMPORT_REFERENCES',
                payload : {
                    references : references
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

export const updReference = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let references = await AXIOS.put(api.PUT.UPD_IMPORT_REFERENCE,dataForm);

            dispatch({
                type : 'SET_IMPORT_REFERENCES',
                payload : {
                    references : references.data.references
                }
            })
            updateToast(toastId, references.data.msg, toast.TYPE.SUCCESS);
            functions.toggleLoader();
            functions.goBack();
        }catch(err){
            if(err.response.status === 403){
                goToHome(err.response.data.msg);
            }
            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const changeStatusToRevalidate = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let references = await AXIOS.put(api.PUT.UPD_IMPORT_REFERENCE_STATE, dataForm);

            dispatch({
                type : 'SET_IMPORT_REFERENCES',
                payload : {
                    references : references.data.references
                }
            })
            updateToast(toastId, references.data.msg, toast.TYPE.SUCCESS);
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

export const addEta = (dataForm, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });
        try{
            let references = await AXIOS.put(api.PUT.UPD_ETA,dataForm);

            dispatch({
                type : 'SET_IMPORT_REFERENCES',
                payload : {
                    references : references.data.references
                }
            })
            updateToast(toastId, references.data.msg, toast.TYPE.SUCCESS);
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


