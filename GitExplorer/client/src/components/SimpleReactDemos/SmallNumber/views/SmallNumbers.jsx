/**
 * Created by fish on 6/11/17.
 */
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Paragraph from '../../../Paragraph/Paragraph';

class SmallNumbers extends Component {
    getButtons = () => {
        let buttonlist = [];
        for (let i = 1; i < 10; i++) {
            buttonlist.push(
                <Button bsStyle="primary"
                        id={'button' + i}
                        value={i}
                        key={'button' + i}
                        onClick={
                            () => {
                                this.props.getSmallNumber(i);
                            }
                        }>
                    Get {i}
                </Button>);
        }
        return buttonlist;
    };

    render() {
        console.log(this.props.numbers);

        return (
            <div className="SmallNumbers">
                <div className="jumbotron col-sm-8">
                    <h1>Small Numbers</h1>
                    <Paragraph stator={this.props.numbers}
                               nameList={Object.keys(this.props.numbers)}/>
                    {this.getButtons()}
                </div>
                <div className="panel panel-info col-sm-4">
                    <h2 className="panel-heading">Info</h2>
                    <p>
                        This page was created as a simple exercise in using
                        state in a React component.
                    </p>
                    <p>
                        Since this component stores state locally, you may notice that the entry is reset
                        every time the user navigates away and the "SmallNumbers" object is
                        destroyed, then recreated.
                    </p>
                    <p>
                        Each button calls a function that belongs
                        to this component, and calls setState
                        on this component's React state.
                    </p>
                    <hr/>
                    <h3>June update:</h3>
                    <p>
                        This module was updated to use Redux for state!
                    </p>
                </div>
            </div>
        );
    }
}

export default SmallNumbers;