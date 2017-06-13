import React, {Component} from 'react';
import Debug from '../../Debug/Debug';
import GistCreator from './GistCreator/GistCreatorContainer';
import GistList from './Lister/GistListerContainer';
import GistDetails from './GistDetails/GistDetailsContainer';
import GistDeleteMenu from './GistDelete/GistDeleteMenuContainer';
const logger = new Debug(false);
/**
 * A component for display of a git user's info
 */
class GistBrowser extends Component {
    constructor(props) {
        super(props);

        logger.log('GistBrowser props.' + JSON.stringify(this.props, null, 4));
    };

    render() {
        logger.log('render GetGist');
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <h1>Gist Browser</h1>
                    <div className='col-sm-8 jumbotron'>
                        <GistDetails />
                    </div>
                    <div className='col-sm-4'>
                        <GistCreator/>
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <GistDeleteMenu/>
                    <GistList {...this.props} />
                </div>
            </div>
        );
    };
}

export default GistBrowser;
