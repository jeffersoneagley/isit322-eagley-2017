import React, {Component} from 'react';
import Debug from './Debug/Debug';
// import fieldDefinitions from "./GitGood/field-definitions";
import FieldGenerator from './GitGood/GitFieldGenerator';
import GetFoo from './GetFoo';
import SmallNumbers from './SmallNumber/SmallNumbers';
import numbersInit from './SmallNumber/numbers-data';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ElfHeader from './Header/ElfHeader';
import GetUserInfo from './GitGood/GetUserInfo';
import GistBrowser from './GitGood/Gist/GistBrowser';

let fieldGenerator = new FieldGenerator();

class DataMaven extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldDefinitions: [],
            gitUser: [],
            newGist: {},
            gistData: {
                gistList: {},
            },
            userReceived: false,
        };
        this.gistListUpdateTime = Date.now();

        this.debug = new Debug();
        this.debug.speakUp();
    };

    getUser = (event) => {
        event.preventDefault();
        const that = this;
        fetch('/api/user').then(function(response) {
            // YOU WRITE IT
            that.debug.log(response);
            return response.json();
        }).then(function(json) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = JSON.parse(json.body);
            // var body = json.body;
            that.debug.log('setting state');
            that.debug.log(body);

            let fields = fieldGenerator.getFields(body);
            that.setState({gitUser: body, fieldDefinitions: fields});
            // that.debug.log('setting state: ' + JSON.stringify(json));
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    getGist = (event) => {
        if (event !== undefined) {
            event.preventDefault();
        }
        const that = this;
        fetch('/api/git/createGist').then(function(response) {
            // YOU WRITE IT
            that.debug.log(response);
            return response.json();
        }).then(function(json) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            that.setState({newGist: body});
            this.getGistList();
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    getGistList = (event) => {
        if (event !== undefined) {
            //if we're called from an eventhandler
            event.preventDefault();
        }
        // this.setState({gistData: {gistList: false}});
        const that = this;
        fetch('/api/git/gistList').then(function(response) {
            // YOU WRITE IT
            // that.debug.log(response);
            return response.json();
        }).then(function(json) {
            // DISPLAY WITH LOGGER AS NEEDED
            // that.debug.log('JSON recieved, saving state');
            // that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            that.setState({gistData: {gistList: body}});
            // that.debug.log('setting state: ' + JSON.stringify(json));
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    getGistHeaderById = (gistId, event) => {
        if (event !== undefined) {
            event.preventDefault();
        }
        console.log('requesting API send us gist with ID ' + gistId);
        const that = this;
        fetch('/api/git/getGistHeaderById', {
            method: 'POST',
            body: JSON.stringify(
                {'id': gistId},
            ),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        }).then(function(response) {
            // YOU WRITE IT
            that.debug.log(response);
            return response.json();
        }).then(function(json) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            that.setState({newGist: body});
            that.getGistList();
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    checkGistList = () => {
        if (Date.now() > this.gistListUpdateTime) {
            this.gistListUpdateTime = Date.now() + 60000;
            this.getGistList();
        }
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
                        <Route exact path="/get-gist"
                               render=
                                   {
                                       (props) => {
                                           this.checkGistList();
                                           return (
                                               <GistBrowser {...props}
                                                            onGetUserButtonClicked={this.getGist}
                                                            gistData={this.state.gistData}
                                                            newGist={this.state.newGist}
                                                            getGistList={this.getGistList}
                                                            getGistHeaderById={this.getGistHeaderById}
                                               />
                                           );
                                       }
                                   }/>
                    </div>
                </Router>
            </div>
        );
    };
}
//<Route exact path="/" component={GetUserInfo}/>

export default DataMaven;
