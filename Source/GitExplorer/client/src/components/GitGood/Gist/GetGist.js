import React, {Component} from "react";
import Debug from "../../Debug/Debug";
const logger = new Debug(false);
/**
 * A component for display of a git user's info
 */
class GetGist extends Component {
    /**
     * Make a new ShowUserInfo object
     * @param props: expects onGetUserButtonClicked, fieldDefinitions, & gitUser state
     */
    constructor(props) {
        super(props);

        logger.log('GetGist props.' + JSON.stringify(this.props, null, 4));
    };

    clickMe = (event) => {
        console.log('clicked');
        this.props.onGetUserButtonClicked(event);
    };

    render() {
        logger.log('render GetGist');
        return (
            <form className="Form">
                <h3>Git gist</h3>
                <p>
                    url: {this.props.gitGist.url}
                </p>
                <p>
                    desc: {this.props.gitGist.description}
                </p>
                <button onClick={this.clickMe}>Create Gist</button>
            </form>
        );
    };
}

export default GetGist;
