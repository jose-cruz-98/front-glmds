const INITIAL_STATE = {
    requests : {
        complete : [],
        pending : [],
        returned : [],
        revision : []
    },
    users : null,
    paymentComplete : []
}

export const PaymentReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_REQUESTS':
            return {
                ...state,
                requests : action.payload.requests
            }
        case 'SET_USERS':
            return {
                ...state,
                users : action.payload.users
            }
        case 'SET_PAYMENTS':
            return {
                ...state,
                paymentComplete : action.payload.payments
            }
        default:
            return state;
    }
}