import React, {Component} from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import 'whatwg-fetch';


class Header extends Component {
    constructor() {
        super();
    };

    render() {
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to React</h2>
            </div>
        );
    }
}

export default Header;
