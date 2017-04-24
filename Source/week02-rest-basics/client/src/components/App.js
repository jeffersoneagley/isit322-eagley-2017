import React, {Component} from "react";
import "./App.css";
import "whatwg-fetch";
import GetFoo from "./GetFoo";

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
                {this.getParagraphs()}
                <GetFoo />
            </div>
        );
    };
}

export default App;
