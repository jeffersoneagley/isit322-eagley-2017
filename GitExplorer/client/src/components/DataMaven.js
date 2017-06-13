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
            history: {},
        };

        this.debug = new Debug();
        this.debug.speakUp();
    };

    componentWillMount() {

    }

    render() {
        this.debug.log('render getuserinfo');
        return (
            <Router history={this.state.history}>
                <div className='App'>
                    <div className='container-fluid App-header'>
                        <BsMenuBar/>
                        <FishLogo/>
                        <ElfHeader/>
                    </div>
                    <div className='container-fluid'>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/get-user' component={GitUserInfoContainer}/>
                        <Route exact path='/get-foo' component={GetFoo}/>
                        <Route exact path='/get-numbers' component={SmallNumbers}/>
                        <Route exact path='/get-gist' component={GistBrowser}/>
                    </div>
                    <hr/>
                    <footer className='well'>
                        <p>Made in my ISIT 322 coursework at Bellevue College</p>
                        <p>GitExplorer &copy; {new Date().getFullYear()} Jefferson Eagley</p>
                    </footer>
                </div>
            </Router>
        );
    };
}
export default DataMaven;
