import React, {Component} from "react";
import Debug from "./Debug/Debug";
// import fieldDefinitions from "./GitGood/field-definitions";
import fieldGenerator from "./GitGood/GitFieldGenerator";
import GetFoo from "./GetFoo";
import GetGist from "./GitGood/Gist/GetGist";
import SmallNumbers from "./SmallNumber/SmallNumbers";
import numbersInit from "./SmallNumber/numbers-data";
import {BrowserRouter as Router, Route} from "react-router-dom";
import ElfHeader from "./Header/ElfHeader";
import GetUserInfo from "./GitGood/GetUserInfo";

class DataMaven extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldDefinitions: [],
            gitUser         : [],
            gitGist         : {},
            userReceived    : false
        };
        this.debug = new Debug();
        this.debug.speakUp();
    };

    // gitUserInit = () => {
    //     const tempGitUser = {};
    //     for (let value of fieldDefinitions) {
    //         tempGitUser[value.id] = value.sample;
    //     }
    //     return tempGitUser;
    // };

    getUser = (event) => {
        event.preventDefault();
        const that = this;
        fetch('/api/user')
            .then(function (response) {
                // YOU WRITE IT
                that.debug.log(response);
                return response.json();
            }).then(function (json) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = JSON.parse(json.body);
            // var body = json.body;
            that.debug.log('setting state');
            that.debug.log(body);

            let fields = fieldGenerator.GetFields(body);
            that.setState({gitUser: body, userReceived: true, fieldDefinitions: fields});
            // that.debug.log('setting state: ' + JSON.stringify(json));
        }).catch(function (ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    getGist = (event) => {
        event.preventDefault();
        const that = this;
        fetch('/api/git/createGist')
            .then(function (response) {
                // YOU WRITE IT
                that.debug.log(response);
                return response.json();
            }).then(function (json) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            that.setState({gitGist: body});
            // that.debug.log('setting state: ' + JSON.stringify(json));
        }).catch(function (ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    render() {
        this.debug.log('render getuserinfo');
        return (
            <div className="App">
                <Router>
                    <div>
                        <ElfHeader/>
                        <Route exact path="/" render={(props) => (
                            <GetUserInfo {...props}
                                         gitUser={this.state.gitUser}
                                         fieldDefinitions={this.state.fieldDefinitions}
                                         onGetUserButtonClicked={this.getUser}
                            />
                        )}/>
                        <Route exact path="/get-foo" component={GetFoo}/>
                        <Route path="/get-numbers" render={(props) => (
                            <SmallNumbers {...props} numbers={numbersInit}/>
                        )}/>
                        <Route exact path="/get-gist" render={(props) => (
                            <GetGist {...props}
                                     onGetUserButtonClicked={this.getGist}
                                     gitGist={this.state.gitGist || 'no gists'}
                            />
                        )}/>
                    </div>
                </Router>
            </div>
        );
    };
}
//<Route exact path="/" component={GetUserInfo}/>

export default DataMaven;
