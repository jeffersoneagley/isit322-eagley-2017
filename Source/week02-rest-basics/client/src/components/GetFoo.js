import React, {Component} from "react";

class GetFoo extends Component {
    constructor() {
        super();
        this.state = {
            file: 'Get Nine Result will be placed here',
            foo : 'waiting for server'
        };
        this.nameDummies = [
            'foo',
            'file'
        ];
        this.quiet = false;
        this.debug('GetFoo constructor called');
    };

    getFoo = () => {
        const that = this;
        fetch('/api/foo')
            .then(function (response) {
                that.debug('GETONE-FETCH-ONE');
                return response.json();
            }).then(function (json) {
            that.debug('GETONE-FETCH-TWO');
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

    getFooButton = () => {
        return (<button id="buttonFoo" onClick={this.getFoo}>Bar</button>);
    };

    render() {
        return (
            <div className="App-header">
                {this.getParagraphs()}<br/>
                {this.getFooButton()}
            </div>
        );
    }
}
export default GetFoo;
