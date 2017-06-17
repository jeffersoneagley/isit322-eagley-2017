import React, {Component} from 'react';
import Paragraph from '../../../Paragraph/Paragraph';
import {Button} from 'react-bootstrap';

class GetFoo extends Component {
    render() {
        return (
            <div>
                <div className='jumbotron col-sm-8'>
                    <h1>Foo </h1>
                    <Paragraph stator={this.props.fooData} nameList={Object.keys(this.props.fooData)}/>
                    <Button bsStyle='primary' id='buttonFoo' onClick={this.props.fetchFoo}>
                        Fetch Foo
                    </Button>
                </div>
                <div className='panel panel-info col-sm-4'>
                    <h2 className='panel-heading'>Info</h2>
                    <p>
                        This page was created as an exercise in calling an API,
                        then saving the results in state.
                    </p>
                    <p>
                        This component calls the API on the server, and gets
                        some simple data back as a proof-of-concept.
                    </p>
                    <hr/>
                    <h3 >June update</h3>
                    <p>
                        Updated to use Redux for state!
                    </p>
                </div>
            </div>
        );
    }
}
export default GetFoo;
