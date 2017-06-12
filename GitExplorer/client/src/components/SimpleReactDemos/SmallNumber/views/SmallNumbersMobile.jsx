/**
 * Created by fish on 6/11/17.
 */
import React, {Component} from 'react';
import {AppRegistry, Button, StyleSheet, Text, View} from 'react-native';

class SmallNumbers extends Component {
    getButtons = () => {
        let buttonlist = [];
        for (let i = 1; i < 10; i++) {
            buttonlist.push(
                <Button
                    accessibilityLabel="Learn more about this purple button"
                    title={'Get ' + i}
                    color="#841584"
                    onPress={
                        () => {
                            this.props.getSmallNumber(i);
                        }
                    }/>);
        }
        return buttonlist;
    };

    render() {
        console.log(this.props.numbers);

        return (
            <View className="SmallNumbers">
                <View className="jumbotron col-sm-8">
                    <h1>Small Numbers</h1>
                    <Text style={styles.instructions}>
                        {this.state.numbers}
                    </Text>
                    {this.getButtons()}
                </View>
                <View className="panel panel-info col-sm-4">
                    <h2 className="panel-heading">Info</h2>
                    <Text>
                        This page was created as a simple exercise in using
                        state in a React component.
                    </Text>
                    <Text>
                        Since this component stores state locally, you may notice that the entry is reset
                        every time the user navigates away and the "SmallNumbers" object is
                        destroyed, then recreated.
                    </Text>
                    <Text>
                        Each button calls a function that belongs
                        to this component, and calls setState
                        on this component's React state.
                    </Text>
                    <h3>June update:</h3>
                    <Text>
                        This module was updated to use Redux for state! It also
                        saw the introduction of this separate mobile interface.
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('SmallNumbers', () => SmallNumbers);

export default SmallNumbers;