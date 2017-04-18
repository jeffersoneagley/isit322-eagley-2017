import React, {Component} from 'react';
import './App.css';
import 'whatwg-fetch';
import SmallNumbers from "./components/SmallNumbers";

//fetch = require('./mocks/fetch').fetch(this); //uncomment for test

class App extends Component {
    constructor() {
        super();
        this.state = {
            file: 'Get Nine Result will be placed here',
            foo : 'waiting for server'
        }
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

    // getParagraph = (index) => {
    //     return (<p id={"para" + index} key={"para" + index}>
    //         {index}: {this.state[index]}
    //     </p>);
    // };

    // getParagraphs = () => {
    //     var res = [];
    //     for (var val in nameDummies) {
    //         res.push(this.getParagraph(nameDummies[val]));
    //     }
    //     return res;
    // };

    render() {
        return (
            <div className="App">
                <SmallNumbers/>
                <button id="buttonFoo" onClick={this.getFoo}>Bar</button>
            </div>
        );
    }
}

export default App;
