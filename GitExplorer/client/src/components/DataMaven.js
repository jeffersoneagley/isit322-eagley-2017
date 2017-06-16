import React, {Component} from 'react';
import Debug from './Debug/Debug';
import GetFoo from './SimpleReactDemos/GetFoo/GetFoo';
import SmallNumbers from './SimpleReactDemos/SmallNumber/SmallNumbersConnector';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ElfHeader from './Header/ElfHeader';
import GistBrowser from './GitGood/Gist/GistBrowserContainer';
import GitUserInfoContainer from './GitGood/User/GitUserInfoContainer';
import BsMenuBar from './Header/BsMenuBar';
import FishLogo from './Header/FishLogo';
import Home from './Home';

/***
 * This component used to be our state manager, hence the datamaven name
 * Now it ought to be renamed to something involving SPA routing and layout
 */
class DataMaven extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: {},
        };

        this.debug = new Debug();
        this.debug.setQuiet(true);
    };

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
