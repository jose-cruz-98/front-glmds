import {connect} from 'react-redux';
import Login from '../../../containers/views/home/login.view';
import {api} from '../../../utils/keys/api.routes';
import {toast} from 'react-toastify';
import AXIOS from 'axios';

/// CONFIGS
const updateToast = (toastId, label, type) => {
    toast.update(toastId,{
        render : label,
        type : type, 
        autoClose : 3500
    });
}
/// ACTIONS
const singin = (data, functions) => {
    return async (dispatch) => {
        functions.toggleLoader();
        let toastId = toast("Cargando..", { autoClose: false });

        try{
            let user = await AXIOS.post(api.POST.SINGIN, data);
            if(user.status === 200){
                dispatch({
                    type : 'SET_SESSION_DATA',
                    payload : {
                        token : user.data.token,
                        dataUser : user.data.dataUser
                    }
                })
                updateToast(toastId, user.data.msg, toast.TYPE.SUCCESS);
                window.location.href=`${api.HOST}/ls/import/references`;
            }
        }catch(err){
            updateToast(toastId, err.response.data.msg, toast.TYPE.WARNING);
        }

        functions.toggleLoader();
    }
}


/// STATE
const mapStateToProps = state => {
    return {
        token : state.SessionReducer.token
    }
}

const mapDispatchToProps = {
    singin
}

const createConnection = connect(
    mapStateToProps,
    mapDispatchToProps
)

const ComponentWithConnectionToRedux = createConnection(Login)

export default ComponentWithConnectionToRedux;