import {combineReducers} from 'redux';

import {SessionReducer} from './home/session.reducer';
import {ImportReducer} from './local/import.reducer';
import {DocumentReducer} from './local/documet.reducer';
import {PaymentReducer} from './local/payment.reducer';
import {WarrantyRecovery} from './local/warrantyRecovery.reducer';
import {PersonalReducer} from './local/personal.reducer'

const rootReducers = combineReducers({
    SessionReducer,
    ImportReducer,
    DocumentReducer,
    PaymentReducer,
    WarrantyRecovery,
    PersonalReducer
})

export default rootReducers;