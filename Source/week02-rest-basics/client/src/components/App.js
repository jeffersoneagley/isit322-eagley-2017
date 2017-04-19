import React, {Component} from 'react';
import './App.css';
import 'whatwg-fetch';
import SmallNumbers from "./SmallNumber/SmallNumbers";

//fetch = require('./mocks/fetch').fetch(this); //uncomment for test

class App extends Component {
    constructor() {
        super();
        this.state = {
            file: 'Get Nine Result will be placed here',
            foo : 'waiting for server'
        }
        this.nameDummies = [
            'foo',
            'file'
        ]
    };

    getFoo = () => {
        const that = this;
        fetch('/api/foo')
            .then(function (response) {
                return response.json();
            }).then(function (json) {
            console.log('parsed json', json);
            that.setState(foo => (json));
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
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
                <SmallNumbers/>
                {this.getParagraphs()}
                <button id="buttonFoo" onClick={this.getFoo}>Bar</button>
            </div>
        );
    }
}

export default App;
