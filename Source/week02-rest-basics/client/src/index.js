import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Header from './components/Header/Header';

ReactDOM.render(
    <div>
        <Header/>
        <App />
    </div>,
    document.getElementById('root')
);
