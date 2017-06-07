import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/index.css';
import DataMaven from './components/DataMaven';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import gistReducer from './assets/gist-reducer';

let store = createStore(gistReducer);

ReactDOM.render(
    <Provider store={store}>
        <DataMaven/>
    </Provider>,
    document.getElementById('root'),
);
