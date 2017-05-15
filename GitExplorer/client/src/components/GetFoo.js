import React, {Component} from 'react';
import Paragraph from './Paragraph/Paragraph';

class GetFoo extends Component {
    constructor() {
        super();
        this.state = {
            file: 'Get Nine Result will be placed here',
            foo: 'waiting for server',
        };
        this.nameDummies = [
            'foo',
            'file',
        ];
        this.quiet = false;

    };

    getFoo = () => {
        const that = this;
        fetch('/api/foo').then(function(response) {
            console.log('GETONE-FETCH-ONE');
            return response.json();
        }).then(function(json) {
            console.log('GETONE-FETCH-TWO');
            console.log('parsed json', json);
            that.setState(foo => (json));
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
    };

    debug = (message) => {
        if (!this.quiet) {
            console.log(message);
        }
    };

    GetButton = () => {
        return (<button id="buttonFoo" onClick={this.getFoo}>Bar</button>);
    };

    render() {
        return (
            <div>
                <Paragraph stator={this.state} nameList={this.nameDummies}/>
                {this.GetButton()}
            </div>
        );
    }
}
export default GetFoo;
