import {connect} from 'react-redux';
import References from '../../../containers/views/local/import/references.view';
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
const getPatent = (query) => {
    return async (dispatch) => {
        try{
            query = objetToQueryRequest(query);
            let patents = await AXIOS.get(`${api.GET.GET_PATENTS}${query ? query : ""}`);
            
            dispatch({
                type : 'SET_PATENTS',
                payload : {
                    patents : patents.data.patents
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


/// STATE
const mapStateToProps = state => {
    return {
        patents : state.ImportReducer.patents
    }
}

const mapDispatchToProps = {
    getPatent
}

const createConnection = connect(
    mapStateToProps,
    mapDispatchToProps
)

const ComponentWithConnectionToRedux = createConnection(References);

export default ComponentWithConnectionToRedux;