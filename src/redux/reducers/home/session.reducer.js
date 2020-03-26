const INITIAL_STATE = {
    token : null,
    dataUser : null,
}

export const SessionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_SESSION_DATA':
            return {
                ...state,
                token : action.payload.token,
                dataUser : action.payload.dataUser
            }
        default:
            return state;
    }
}