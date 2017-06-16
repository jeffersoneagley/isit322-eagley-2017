import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/index.css';
import DataMaven from './components/DataMaven';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

let store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
    <div>
        <Provider store={store}>
            <DataMaven/>
        </Provider>
    </div>,
    document.getElementById('root'),
);

