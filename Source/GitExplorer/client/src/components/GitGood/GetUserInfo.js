import React, {Component} from "react";
import ShowUserInfo from "./ShowUserInfo";
import Debug from "../Debug/Debug";

class GetUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gitUser     : {},
            userReceived: false
        };

        this.nameList = [
            'username',
            'display_name'
        ];

        this.debug = new Debug();
        this.debug.speakUp();
    };


    getUser = () => {

        const that = this;
        fetch('/api/user')
            .then(function (response) {
                // YOU WRITE IT
                that.debug.log(response);
                return response.json();
            }).then(function (json) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state')
            that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = JSON.parse(json.body);
            // var body = json.body;
            that.debug.log('setting state');
            that.debug.log(body);
            that.setState({gitUser: body, userReceived: true});
            // that.debug.log('setting state: ' + JSON.stringify(json));
        }).catch(function (ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    render() {
        this.debug.log('render getuserinfo');
        return (
            <ShowUserInfo
                userReceived={this.state.userReceived}
                nameList={this.nameList}
                gitUser={this.state.gitUser}
                onGetUserButtonClicked={this.getUser}
            />
        );
    };
}

export default GetUserInfo;
