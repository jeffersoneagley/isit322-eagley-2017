import React, {Component} from "react";
/**
 * Created by fish on 4/24/17.
 * This is a polyfill for my rest-basics assignment paragraphing functions
 * currently broken 3/24/17
 */


class ParagraphButtonPanel extends Component {
    constructor() {
        super();
        this.quiet = false;
        //this.debug('GetFoo constructor called');
    };

    debug = (message) => {
        if (!this.quiet) {
            console.log(message);
        }
    };

    makeButtonPanel = () => {
        var buttons = document.querySelectorAll('button[name="paragraphButton"]');
        const myRoot = <div>
            { this.quiet ? "" : <h3>ParagraphButtonPanel output</h3> }
            {buttons}
        </div>;
        console.log(buttons);
        return myRoot;
    };

    render() {
        return this.makeButtonPanel();
    };
}

export default ParagraphButtonPanel;