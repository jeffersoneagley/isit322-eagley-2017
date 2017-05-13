import React, {Component} from "react";
import logo from "../../img/Fish_icon_grey.svg";
import "../../css/Header/Header.css";
import "../../css/App.css";
import ElfHeaderMenu from "./ElfHeaderMenu";


class ElfHeader extends Component {

    render() {
        return (
            <div className="App-header">
                <ElfHeaderMenu/>
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to Jefferson's React site</h2>
            </div>
        );
    }
}

export default ElfHeader;
