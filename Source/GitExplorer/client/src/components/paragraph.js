/**
 * Created by fish on 4/24/17.
 * This is a polyfill for my rest-basics assignment paragraphing functions
 */
import React, {Component} from 'react';

class Paragraph extends Component {
    constructor() {
        super();
        this.isQuiet = false;
        this.getParagraphs = this.getParagraphs.bind(this);
        this.getParagraph = this.getParagraph.bind(this);
    }

    getParagraph(index) {
        return (<p id={'para' + index} key={'para' + index}>
            {index}: {this.props.stator[index]}
        </p>);
    };

    getParagraphs() {
        let res = [];
        for (let val in this.props.nameList) {
            if (this.props.nameList.hasOwnProperty(val)) {
                res.push(this.getParagraph(this.props.nameList[val]));
            }
        }
        return res;
    };

    render() {
        return (<div>
            {this.isQuiet ? '' : <h3>Paragraph output</h3>}
            {this.getParagraphs()}

        </div>);
    };
}

export default Paragraph;
