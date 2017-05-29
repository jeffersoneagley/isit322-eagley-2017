import React, {Component} from 'react';
import Paragraph from './Paragraph/Paragraph';
import {Button} from 'react-bootstrap';

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
        return (<Button bsStyle="primary" id="buttonFoo" onClick={this.getFoo}>Bar</Button>);
    };

    render() {
        return (
            <div>
                <div className="jumbotron col-sm-8">
                    <h1>Foo </h1>
                    <Paragraph stator={this.state} nameList={this.nameDummies}/>
                    {this.GetButton()}
                </div>
                <div className="panel panel-info col-sm-4">
                    <h2 className="panel-heading">Info</h2>
                    <p>
                        This page was created as an exercise in calling an API,
                        then saving the results in state.
                    </p>
                    <p>
                        This component calls the API on the server, and gets
                        some simple data back as a proof-of-concept.
                    </p>
                </div>
            </div>
        );
    }
}
export default GetFoo;
