import React, {Component} from "react";
import "./App.css";
import "whatwg-fetch";
import GetFoo from "GetFoo";

//fetch = require('./mocks/fetch').fetch(this); //uncomment for test

class App extends Component {
    constructor() {
        super();

        this.quiet = false;
        this.debug('GetFoo constructor called');
    };

    debug = (message) => {
        if (!this.quiet) {
            console.log(message);
        }
    };

    getParagraph = (index) => {
        return (<p id={"para" + index} key={"para" + index}>
            {index}: {this.state[index]}
        </p>);
    };

    getParagraphs = () => {
        var res = [];
        for (var val in this.nameDummies) {
            res.push(this.getParagraph(this.nameDummies[val]));
        }
        return res;
    };

    render() {
        return (
            <div className="App">
                {this.getParagraphs()}
                {GetFoo.getFooButton()}
            </div>
        );
    }
}

export default App;
