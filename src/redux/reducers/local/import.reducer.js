const INITIAL_STATE = {
    patents : null,
    shippingCompanies : null,
    references : null
}

export const ImportReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_PATENTS':
            return {
                ...state,
                patents : action.payload.patents
            }
        case 'SET_SHIPPING_COMPANIES':
            return {
                ...state,
                shippingCompanies : action.payload.shippingCompanies
            }
        case 'SET_IMPORT_REFERENCES':
            return {
                ...state,
                references : action.payload.references
            }
        default:
            return state;
    }
}