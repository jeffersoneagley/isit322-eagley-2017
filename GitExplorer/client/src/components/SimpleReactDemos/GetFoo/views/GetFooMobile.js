import React, {Component} from 'react';
import {Button, View} from 'react-native';

class GetFoo extends Component {
    constructor() {
        super();
        this.quiet = false;
    };

    render() {
        return (
            <View>
                <View className='jumbotron col-sm-8'>
                    <h1>Foo </h1>
                    <text>
                        {this.props.fooData}
                    </text>
                    <Button onPress={this.props.fetchFoo}>
                        Fetch Foo
                    </Button>
                </View>
                <View className='panel panel-info col-sm-4'>
                    <h2 className='panel-heading'>Info</h2>
                    <p>
                        This page was created as an exercise in calling an API,
                        then saving the results in state.
                    </p>
                    <p>
                        This component calls the API on the server, and gets
                        some simple data back as a proof-of-concept.
                    </p>
                </View>
            </View>
        );
    }
}
export default GetFoo;
