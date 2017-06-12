import React, {Component} from 'react';
import Debug from './Debug/Debug';
// import FieldGenerator from './GitGood/GitFieldGenerator';
import GetFoo from './SimpleReactDemos/GetFoo/GetFoo';
import SmallNumbers from './SimpleReactDemos/SmallNumber/SmallNumbersConnector';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ElfHeader from './Header/ElfHeader';
import GistBrowser from './GitGood/Gist/GistBrowser';
import GitUserInfoContainer from './GitGood/User/GitUserInfoContainer';
import BsMenuBar from './Header/BsMenuBar';
import FishLogo from './Header/FishLogo';
import Home from './Home';

// let fieldGenerator = new FieldGenerator();

class DataMaven extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fieldDefinitions: [],
            newGist: {},
            history: {},
            gistData: {
                gistList: {},
            },
            userReceived: false,
        };

        this.onCreateGist = this.onCreateGist.bind(this);

        this.debug = new Debug();
        this.debug.speakUp();
    };

    componentWillMount() {

    }

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
            // that.getGistList();
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
            // that.getGistList();
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
        });
    };

    render() {
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
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/get-user" component={GitUserInfoContainer}/>
                        <Route exact path="/get-foo" component={GetFoo}/>
                        <Route exact path="/get-numbers" component={SmallNumbers}/>
                        <Route exact path="/get-gist"
                               render={
                                   (props) => {
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
                    <hr/>
                    <footer className="well">
                        <p>Made in my ISIT 322 coursework at Bellevue College</p>
                        <p>GitExplorer &copy; {new Date().getFullYear()} Jefferson Eagley</p>
                    </footer>
                </div>
            </Router>
        );
    };
}
export default DataMaven;
