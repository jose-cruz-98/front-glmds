import {combineReducers} from 'redux';

import {SessionReducer} from './home/session.reducer';
import {ImportReducer} from './local/import.reducer';

const rootReducers = combineReducers({
    SessionReducer,
    ImportReducer
})

export default rootReducers;