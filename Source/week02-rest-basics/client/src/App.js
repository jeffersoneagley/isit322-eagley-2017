import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

//fetch = require('./mocks/fetch').fetch(this); //uncomment for test

var nameDummies = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'foo',
    'file'
];

class App extends Component {
    constructor() {
        super();
        this.state = {
            file : 'Get Nine Result will be placed here',
            foo  : 'waiting for server',
            one  : '0',
            two  : '0',
            three: '0',
            four : '0',
            five : '0',
            six  : '0',
            seven: '0',
            eight: '0',
            nine : '0'
        }
    };

    getOne = () => {
        this.setState({one: '1'});
    };

    getTwo = () => {
        this.setState({two: '2'});
    };

    getThree = () => {
        this.setState({three: '3'});
    };

    getFour = () => {
        this.setState({four: '4'});
    };

    getFive = () => {
        this.setState({five: '5'});
    };

    getSix = () => {
        this.setState({six: '6'});
    };

    getSeven = () => {
        this.setState({seven: '7'});
    };

    getEight = () => {
        this.setState({eight: '8'});
    };

    getNine = () => {
        this.setState({nine: '9'});
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
        for (var val in nameDummies) {
            res.push(this.getParagraph(nameDummies[val]));
        }
        return res;
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                {this.getParagraphs()}
                <button id="buttonFoo" onClick={this.getFoo}>Bar</button>
                <button id="buttonOne" onClick={this.getOne}>GetOne</button>
                <button id="buttonTwo" onClick={this.getTwo}>GetTwo</button>
                <button id="buttonThree" onClick={this.getThree}>GetThree</button>
                <button id="buttonFour" onClick={this.getFour}>GetFour</button>
                <button id="buttonFive" onClick={this.getFive}>GetFive</button>
                <button id="buttonSix" onClick={this.getSix}>GetSix</button>
                <button id="buttonSeven" onClick={this.getSeven}>GetSeven</button>
                <button id="buttonEight" onClick={this.getEight}>GetEight</button>
                <button id="buttonNine" onClick={this.getNine}>GetNine</button>
            </div>
        );
    }
}

export default App;
