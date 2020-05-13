const INITIAL_STATE = {
    events : [],
    carriers : [],
    evidences : []
}

export const WarrantyRecovery = (state = INITIAL_STATE, action) => {
    const {type, payload} = action
    switch(type){
        case 'SET_EVENTS':
            return {
                ...state,
                events : payload.events
            }
        case 'SET_CARRIER':
            return {
                ...state,
                carriers : payload.carriers
            }
        case 'SET_EVIDENCES':
            return {
                ...state,
                evidences : payload.evidences
            }
        default:
            return state;
    }
}