const INITIAL_STATE = {
    events : [],
    carriers : []
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
        default:
            return state;
    }
}