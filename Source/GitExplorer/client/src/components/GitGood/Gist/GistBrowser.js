import React, {Component} from "react";
import Debug from "../../Debug/Debug";
import GetGist from "./GetGist";
import GistList from "./GistList";
const logger = new Debug(false);
/**
 * A component for display of a git user's info
 */
class GistBrowser extends Component {
    constructor(props) {
        super(props);

        logger.log('GistBrowser props.' + JSON.stringify(this.props, null, 4));
    };

    render() {
        logger.log('render GetGist');
        return (
            <div>

                <GetGist {...this.props}
                         onGetUserButtonClicked={function (e) {
                             this.props.getGist(e);
                         }}
                />
                <GistList {...this.props}
                />
            </div>
        );
    };
}

export default GistBrowser;
