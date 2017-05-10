import React, {Component} from "react";
import logo from "../../img/Fish_icon_grey.svg";
import {Link} from "react-router-dom";
import "../../css/Header/Header.css";
import "../../css/App.css";


class ElfHeader extends Component {

    render() {
        return (
            <div className="App-header">
                <ul className="elf-header-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/get-foo">BarFoo</Link></li>
                    <li><Link to="/get-numbers">Numbers</Link></li>
                </ul>

                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to Jefferson's React site</h2>
            </div>
        );
    }
}

export default ElfHeader;
