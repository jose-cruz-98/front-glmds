const INITIAL_STATE = {
    personals : []
}

export const PersonalReducer = (state = INITIAL_STATE, action) => {
    console.log()
    switch(action.type){
        case 'SET_PERSONAL':
            return {
                ...state,
                personals : action.payload.personal
            }
        default:
            return state;
    }
}