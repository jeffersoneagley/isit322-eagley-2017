import React, {Component} from "react";
import logo from "../../img/Fish_icon_grey.svg";
import "../../css/Header/Header.css";
import "whatwg-fetch";


class Header extends Component {

    render() {
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to Jefferson's React site</h2>
            </div>
        );
    }
}

export default Header;
