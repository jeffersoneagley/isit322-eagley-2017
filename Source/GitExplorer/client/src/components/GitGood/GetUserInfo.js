import React, {Component} from "react";

class GetUserInfo extends Component {
    constructor() {
        super();

        this.state = {
            gitUser: {}
        };

        this.quiet = false;
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
                // that.debug(response);
                return response.json
            }).then(function (json) {
            // DISPLAY WITH LOGGER AS NEEDED
            // this.debug(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            // var body = JSON.parse(json.body);
            var body = json.body;
            that.setState({gitUser: body});
            that.debug('setting state: ' + body)
        }).catch(function (ex) {
            // DISPLAY WITH LOGGER
            that.debug(ex);
        });
    };

    render() {
        this.debug('render getuserinfo');
        return (
            <div >
                <h3>GetUserInfo</h3>
                <p>{this.state.gitUser.login}</p>
                <p>{this.state.gitUser["display_name"]}</p>
            </div>
        );
    };
}

export default GetUserInfo;
