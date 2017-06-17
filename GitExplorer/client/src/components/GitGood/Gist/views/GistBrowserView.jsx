import React, {Component} from 'react';
import GistList from '../components/Lister/GistListerContainer';
import GistDetails from '../components/GistDetails/GistDetailsContainer';
import GistDeleteMenu from '../components/GistDelete/GistDeleteMenuContainer';
import GistCreator from '../components/GistCreator/GistCreatorContainer';
import Actions from '../actions/GistBrowserActions';
/**
 * A component for display of a git user's info
 */
class GistBrowser extends Component {

    getMenuStripModeStandard = () => {
        return <div>
            <button className='btn btn-default' onClick={this.props.clickHandlers.onClickModeExitToBase}>
                <span className='glyphicon glyphicon-triangle-left'></span>
                Close
            </button>
        </div>;
    };

    getGistHomeScreen = () => {
        return <div className='container-fluid'>
            <div className='row'>
                <h1>Gist Browser</h1>
            </div>
            <hr/>
            <div className='row'>

                <button className="btn btn-info col-sm-3" onClick={this.props.clickHandlers.onClickModeCreateOpen}>
                    <span className="glyphicon glyphicon-plus"></span>
                    Create new Gist
                </button>
                <GistDeleteMenu />
                <GistList {...this.props} />
            </div>
        </div>;
    };

    getBodyFromMode = (mode) => {
        switch (mode) {
        case Actions.BROWSER_MODES.BASE:
            return this.getGistHomeScreen();
        case Actions.BROWSER_MODES.VIEW:
            return <div >
                {this.getMenuStripModeStandard()}
                <GistDetails/>
            </div>;
        case Actions.BROWSER_MODES.CREATE:
            return <div >
                {this.getMenuStripModeStandard()}
                <GistCreator/>
            </div>;
        default :
            return this.getGistHomeScreen();
        }
    };

    render() {
        console.log(this.props);
        return <div>
            {this.getBodyFromMode(this.props.state.Viewer.browserMode)}
        </div>;
    };
}

export default GistBrowser;
