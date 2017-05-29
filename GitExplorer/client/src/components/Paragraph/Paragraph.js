import React, {Component} from 'react';
/**
 * Created by fish on 4/24/17.
 * This is a polyfill for my rest-basics assignment paragraphing functions
 */

class Paragraph extends Component {
    constructor() {
        super();
        this.isQuiet = true;
    }

    getParagraph = (index) => {
        return (<p id={'para' + index} key={'para' + index}>
            {index}: {this.props.stator[index]}
        </p>);
    };

    getParagraphs = () => {
        var res = [];
        for (var val in this.props.nameList) {
            res.push(this.getParagraph(this.props.nameList[val]));
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