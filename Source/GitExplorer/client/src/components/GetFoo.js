import React, {Component} from 'react';
import Paragraph from './paragraph';

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

        this.GetButton = this.GetButton.bind(this);
        this.debug = this.debug.bind(this);
        this.getFoo = this.getFoo.bind(this);
    };

    getFoo() {
        const that = this;
        fetch('/api/foo').then((response) => {
            console.log('GETONE-FETCH-ONE');
            return response.json();
        }).then((json) => {
            console.log('GETONE-FETCH-TWO');
            console.log('parsed json', json);
            that.setState(foo => (json));
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
    };

    debug(message) {
        if (!this.quiet) {
            console.log(message);
        }
    };

    GetButton() {
        return (<button id='buttonFoo' onClick={this.getFoo}>Bar</button>);
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
