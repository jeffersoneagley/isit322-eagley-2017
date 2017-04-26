import React, {Component} from "react";
import Paragraph from "../paragraph";

class GetUserInfo extends Component {
    constructor() {
        super();

        this.state = {
            gitUser     : {},
            userReceived: false
        };

        this.nameList = [
            'username',
            'display_name'
        ];

        this.quiet = true;
        // this.debug('GetUserInfo constructor called');
        this.getUser();
    };

    debug = (message) => {
        if (!this.quiet) {
            console.log(message);
        }
    };

    getUser = () => {

        const that = this;
        fetch('/api/user')
            .then(function (response) {
                // YOU WRITE IT
                that.debug(response);
                return response.json();
            }).then(function (json) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug('JSON recieved, saving state')
            that.debug(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            var body = JSON.parse(json.body);
            // var body = json.body;
            that.debug('setting state');
            that.debug(body)
            that.setState({gitUser: body, userReceived: true});
            // that.debug('setting state: ' + JSON.stringify(json));
        }).catch(function (ex) {
            // DISPLAY WITH LOGGER
            that.debug(ex);
        });
    };

    userRetrieved = () => {
        if (this.state.userReceived) {
            return <Paragraph stator={this.state.gitUser} nameList={this.nameList}/>;
        } else {
            return <p>No user data received yet</p>;
        }
    }

    render() {
        this.debug('render getuserinfo');
        return (
            <div >
                <h3>GetUserInfo</h3>
                {this.userRetrieved()}
            </div>
        );
    };
}

export default GetUserInfo;
