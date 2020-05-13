const INITIAL_STATE = {
    documents : null
}

export const DocumentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_DOCUMENTS':
            return {
                ...state,
                documents : action.payload.documents
            }
        default:
            return state;
    }
}