import React, {Component} from "react";
import logo from "../../img/Fish_icon_grey.svg";
import GetUserInfo from "../GitGood/GetUserInfo";
import GetFoo from "../GetFoo";
import SmallNumbers from "../SmallNumber/SmallNumbers";
import numbersInit from "../SmallNumber/numbers-data";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import "../../css/Header/Header.css";
import "../../css/App.css";


class ElfHeader extends Component {

    render() {
        return (
            <Router>
                <div className="App">

                    <div className="App-header">


                        <ul className="elf-header-menu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/get-foo">BarFoo</Link></li>
                            <li><Link to="/get-numbers">Numbers</Link></li>
                        </ul>

                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to Jefferson's React site</h2>
                    </div>
                    <Route exact path="/" component={GetUserInfo}/>
                    <Route exact path="/get-foo" component={GetFoo}/>
                    <Route path="/get-numbers"
                           render={(props) => (
                               <SmallNumbers {...props}
                                             numbers={numbersInit}/>
                           )}
                    />
                </div>
            </Router>
        );
    }
}

export default ElfHeader;
