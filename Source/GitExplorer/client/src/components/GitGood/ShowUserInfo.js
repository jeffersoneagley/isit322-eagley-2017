import React, {Component} from "react";
import Paragraph from "../paragraph";
import Debug from "../Debug/Debug";

class ShowUserInfo extends Component {
    constructor(props) {
        super(props);

        this.debug = new Debug();
    };

    processUserData = () => {
        if (this.props && this.props.userReceived) {
            return <Paragraph stator={this.props.gitUser} nameList={this.props.nameList}/>;
        } else {
            return <p>No user data received yet</p>;
        }
    }

    render() {
        this.debug.log('render getuserinfo');
        return (
            <div >
                <h3>GetUserInfo</h3>
                {this.processUserData()}
                <button onClick={this.props.onGetUserButtonClicked}>Get User</button>
            </div>
        );
    };
}

export default ShowUserInfo;
