import React, {Component} from 'react';
import Debug from '../../Debug/Debug';
const logger = new Debug(false);
/**
 * A component for entering a new gist
 */
class GetGist extends Component {

    clickMe = (event) => {
        console.log('clicked');
        this.props.onGetUserButtonClicked(event);
    };

    render() {
        logger.log('render GetGist');
        return (
            <form className="Form">
                <h3>Create gist</h3>
                <button onClick={this.clickMe}>Create Gist</button>
            </form>
        );
    };
}

export default GetGist;
