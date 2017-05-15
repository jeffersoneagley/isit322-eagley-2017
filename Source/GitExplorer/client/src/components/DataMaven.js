import React, {Component} from 'react';
import Debug from './Debug/Debug';
import FieldGenerator from './GitGood/GitFieldGenerator';
import GetFoo from './GetFoo';
import SmallNumbers from './SmallNumber/SmallNumbers';
import numbersInit from './SmallNumber/numbers-data';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ElfHeader from './Header/ElfHeader';
import GistBrowser from './GitGood/Gist/GistBrowser';
import ShowUserInfo from './GitGood/ShowUserInfo';

let fieldGenerator = new FieldGenerator();
let self;

class DataMaven extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldDefinitions: [],
            history: {},
            gitUser: {},
            newGist: {},
            gistData: {
                gistList: {},
            },
        };

        this.fetchRoute = this.fetchRoute.bind(this);
        this.getUser = this.getUser.bind(this);
        this.gistCreate = this.gistCreate.bind(this);
        this.getGistList = this.getGistList.bind(this);
        this.getGistHeaderById = this.getGistHeaderById.bind(this);
        this.debug = new Debug();
        this.debug.speakUp();
        this.getGistList();
        self = this;
    };

    getUserReceived(json) {
        let fields = fieldGenerator.getFields(json.body);
        console.log(json.body);
        self.setState({gitUser: json.body, fieldDefinitions: fields});
    }

    getUser(event) {
        event.preventDefault();
        this.fetchRoute('/api/user', self.getUserReceived);
        // const that = this;
        // fetch('/api/user').then((response) => {
        //     // YOU WRITE IT
        //     that.debug.log(response);
        //     return response.json();
        // }).then((json) => {
        //     // DISPLAY WITH LOGGER AS NEEDED
        //     that.debug.log('JSON recieved, saving state');
        //     that.debug.log(json);
        //     // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
        //     let body = JSON.parse(json.body);
        //     // var body = json.body;
        //     that.debug.log('setting state');
        //     that.debug.log(body);
        //
        //     // that.debug.log('setting state: ' + JSON.stringify(json));
        // }).catch((ex) => {
        //     // DISPLAY WITH LOGGER
        //     that.debug.log(ex);
        // });
    };

    gistCreate(event) {
        if (event !== undefined) {
            event.preventDefault();
        }
        this.fetchRoute('/api/git/createGist', (body) => {
            this.setState({newGist: body});
            this.getGistList();
        });
    };

    fetchRoute(route, callback) {
        const that = this;
        fetch(route).then((response) => {
            // YOU WRITE IT
            that.debug.log(response);
            return response.json();
        }).then((data) => {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            that.debug.log(data);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let json = typeof (data) === 'string' ? JSON.parse(data) : data;
            callback(json);
        }).catch((ex) => {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    }

    getGistList(event) {
        if (event !== undefined) {
            //if we're called from an eventhandler
            event.preventDefault();
        }
        // this.setState({gistData: {gistList: false}});
        const that = this;
        fetch('/api/git/gistList').then((response) => {
            // YOU WRITE IT
            // that.debug.log(response);
            return response.json();
        }).then((json) => {
            // DISPLAY WITH LOGGER AS NEEDED
            // that.debug.log('JSON recieved, saving state');
            // that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            that.setState({gistData: {gistList: body}});
            // that.debug.log('setting state: ' + JSON.stringify(json));
        }).catch((ex) => {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    getGistHeaderById(gistId, event) {
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
        }).then((response) => {
            // YOU WRITE IT
            that.debug.log(response);
            return response.json();
        }).then((json) => {
            // DISPLAY WITH LOGGER AS NEEDED
            that.debug.log('JSON recieved, saving state');
            that.debug.log(json);
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            that.setState({newGist: body});
            that.getGistList();
        }).catch((ex) => {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    render() {
        this.debug.log('render getuserinfo');
        return (
            <div className='App'>
                <Router history={this.state.history}>
                    <div>
                        <ElfHeader/>
                        <Route exact path='/' render={(props) => (
                            <ShowUserInfo
                                fields={this.state.fieldDefinitions}
                                gitUser={this.state.gitUser}
                                onGetUserButtonClicked={this.getUser}
                            />
                        )}/>
                        <Route exact path='/get-foo' component={GetFoo}/>
                        <Route path='/get-numbers' render={(props) => (
                            <SmallNumbers {...props} numbers={numbersInit}/>
                        )}/>
                        <Route exact path='/get-gist' render={(props) => (
                            <GistBrowser {...props}
                                         gistCreate={this.gistCreate}
                                         gistData={this.state.gistData}
                                         newGist={this.state.newGist}
                                         getGistList={this.getGistList}
                                         getGistHeaderById={this.getGistHeaderById}
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
