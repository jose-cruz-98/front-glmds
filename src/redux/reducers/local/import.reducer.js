const INITIAL_STATE = {
    patents : null,
}

export const ImportReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_PATENTS':
            return {
                ...state,
                patents : action.payload.patents
            }
        default:
            return state;
    }
}