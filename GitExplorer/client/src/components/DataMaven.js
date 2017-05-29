import React, {Component} from 'react';
import Debug from './Debug/Debug';
// import fieldDefinitions from "./GitGood/field-definitions";
import FieldGenerator from './GitGood/GitFieldGenerator';
import GetFoo from './GetFoo';
import SmallNumbers from './SmallNumber/SmallNumbers';
import numbersInit from './SmallNumber/numbers-data';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ElfHeader from './Header/ElfHeader';
// import GetUserInfo from './GitGood/GetUserInfo';
import GistBrowser from './GitGood/Gist/GistBrowser';
import ShowUserInfo from './GitGood/ShowUserInfo';
import BsMenuBar from './Header/BsMenuBar';
import FishLogo from './Header/FishLogo';

let fieldGenerator = new FieldGenerator();

class DataMaven extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldDefinitions: [],
            gitUser: [],
            newGist: {},
            history: {},
            gistData: {
                gistList: {},
            },
            userReceived: false,
        };
        this.gistListUpdateTime = Date.now();
        this.isRefreshingGistData = true;

        this.onCreateGist = this.onCreateGist.bind(this);

        this.debug = new Debug();
        this.debug.speakUp();
    };

    componentWillMount() {

    }

    getUser = (event) => {
        if (event !== undefined) {
            event.preventDefault();
        }
        const that = this;
        fetch('/api/user').then(function(response) {
            // YOU WRITE IT
            that.debug.log(response);
            return response.json();
        }).then(function(data) {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            // that.debug.log(data);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let json = typeof (data) === 'string' ? JSON.parse(data) : data;
            let body = json.body;
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

    onCreateGist = (event, docs, desc) => {
        console.log('onCreateGist called');
        console.log(docs, desc);
        if (event !== undefined) {
            event.preventDefault();
        }
        let body = {
            desc: desc,
            docs: docs,
        };
        const that = this;
        fetch('/api/git/gist/new', {
            method: 'POST',
            body: JSON.stringify(
                body,
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

    getGistList = (event) => {
        if (event !== undefined) {
            //if we're called from an eventhandler
            event.preventDefault();
        }

        //activate refresh component for gistList
        this.isRefreshingGistData = true;

        // this.setState({gistData: {gistList: false}});
        const that = this;
        fetch('/api/git/gist/list').then(function(response) {
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
            that.isRefreshingGistData = false;
            that.setState({
                gistData: {
                    gistList: body.result,
                },
            });
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
            that.isRefreshingGistData = false;

        });
    };

    getGistHeaderById = (gistId, event) => {
        if (event !== undefined) {
            event.preventDefault();
        }
        console.log('requesting API send us gist with ID ' + gistId);
        const that = this;
        fetch('/api/git/gist/byId', {
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
            this.gistListUpdateTime = Date.now() + 6000;
            this.getGistList();
            console.log(this.gistListUpdateTime);
        }
    };

    render() {
        this.checkGistList();
        this.debug.log('render getuserinfo');
        return (
            <Router history={this.state.history}>
                <div className="App">
                    <div className="container-fluid App-header">
                        <BsMenuBar/>
                        <FishLogo/>
                        <ElfHeader/>
                    </div>
                    <div className="container-fluid">
                        <Route exact path="/" render={(props) => (
                            <ShowUserInfo {...props}
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
                               render={
                                   (props) => {
                                       this.checkGistList();
                                       return (
                                           <GistBrowser {...props}
                                                        onCreateGist={this.onCreateGist}
                                                        gistData={this.state.gistData}
                                                        newGist={this.state.newGist}
                                                        getGistList={this.getGistList}
                                                        getGistHeaderById={this.getGistHeaderById}
                                                        isRefreshingGistData={this.state.isRefreshingGistData}
                                           />
                                       );
                                   }
                               }/>
                    </div>
                </div>
            </Router>
        );
    };
}
export default DataMaven;
