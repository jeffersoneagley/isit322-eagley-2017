import React, {Component} from 'react';
import numbersInit from './numbers-data';
import Paragraph from '../Paragraph/Paragraph';

class SmallNumbers extends Component {
    constructor() {
        super();
        this.nameList = numbersInit.nameList;
        this.state = numbersInit.state;
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

    getButtons = () => {
        return [
            <button id="buttonOne" key="buttonOne" onClick={this.getOne}>GetOne</button>,
            <button id="buttonTwo" key="buttonTwo" onClick={this.getTwo}>GetTwo</button>,
            <button id="buttonThree" key="buttonThree" onClick={this.getThree}>GetThree</button>,
            <button id="buttonFour" key="buttonFour" onClick={this.getFour}>GetFour</button>,
            <button id="buttonFive" key="buttonFive" onClick={this.getFive}>GetFive</button>,
            <button id="buttonSix" key="buttonSix" onClick={this.getSix}>GetSix</button>,
            <button id="buttonSeven" key="buttonSeven" onClick={this.getSeven}>GetSeven</button>,
            <button id="buttonEight" key="buttonEight" onClick={this.getEight}>GetEight</button>,
            <button id="buttonNine" key="buttonNine" onClick={this.getNine}>GetNine</button>,
        ];
    };

    render() {
        return (
            <div className="SmallNumbers">
                <div className="jumbotron col-sm-8">
                    <h1>Small Numbers</h1>
                    <Paragraph stator={this.state} nameList={this.nameList}/>
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
                </div>
            </div>
        );
    }

}

export default SmallNumbers;
