import React, {Component} from "react";
import "../css/App.css";
import "whatwg-fetch";
import GetFoo from "./GetFoo";
import SmallNumbers from "./SmallNumber/SmallNumbers";

//fetch = require('./mocks/fetch').fetch(this); //uncomment for test

class App extends Component {
    constructor() {
        super();

        this.quiet = false;
        this.debug('App constructor called');

    };

    debug = (message) => {
        if (!this.quiet) {
            console.log(message);
        }
    };

    render() {
        return (
            <div className="App">
                <GetFoo/>
                <SmallNumbers/>
            </div>
        );
    };
}

export default App;
