import React, {Component} from "react";
import "../../css/App.css";
import numbersInit from "./numbers-data";
import Paragraph from "../paragraph";


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
            <button id="buttonOne" onClick={this.getOne}>GetOne</button>,
            <button id="buttonTwo" onClick={this.getTwo}>GetTwo</button>,
            <button id="buttonThree" onClick={this.getThree}>GetThree</button>,
            <button id="buttonFour" onClick={this.getFour}>GetFour</button>,
            <button id="buttonFive" onClick={this.getFive}>GetFive</button>,
            <button id="buttonSix" onClick={this.getSix}>GetSix</button>,
            <button id="buttonSeven" onClick={this.getSeven}>GetSeven</button>,
            <button id="buttonEight" onClick={this.getEight}>GetEight</button>,
            <button id="buttonNine" onClick={this.getNine}>GetNine</button>
        ];
    };

    render() {
        return (
            <div className="SmallNumbers">
                <Paragraph stator={this.state} nameList={this.nameList}/>
                <button id="buttonOne" onClick={this.getOne}>GetOne</button>
                <button id="buttonTwo" onClick={this.getTwo}>GetTwo</button>
                <button id="buttonThree" onClick={this.getThree}>GetThree</button>
                <button id="buttonFour" onClick={this.getFour}>GetFour</button>
                <button id="buttonFive" onClick={this.getFive}>GetFive</button>
                <button id="buttonSix" onClick={this.getSix}>GetSix</button>
                <button id="buttonSeven" onClick={this.getSeven}>GetSeven</button>
                <button id="buttonEight" onClick={this.getEight}>GetEight</button>
                <button id="buttonNine" onClick={this.getNine}>GetNine</button>
            </div>
        );
    }

}

export default SmallNumbers;
