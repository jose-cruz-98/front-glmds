import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
/// REDUX
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import rootReducers from './redux/reducers/index';

const mainCompose = compose(
    applyMiddleware(thunk),
    persistState('SessionReducer')
);

const store = createStore(rootReducers, {}, mainCompose);

ReactDOM.render(
    <Provider store={store}>  
        <BrowserRouter>
            <App />
        </BrowserRouter> 
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
