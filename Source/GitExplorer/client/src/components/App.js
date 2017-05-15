import React, {Component} from 'react';
import '../css/App.css';
import GetFoo from './GetFoo';
import SmallNumbers from './SmallNumber/SmallNumbers';
import GetUserInfo from './GitGood/GetUserInfo';

//fetch = require('./mocks/fetch').fetch(this); //uncomment for test

class App extends Component {
    constructor() {
        super();

    };

    render() {
        return (
            <div className='App'>
                <GetUserInfo/>
                <GetFoo/>
                <SmallNumbers/>
            </div>
        );
    };
}

export default App;
