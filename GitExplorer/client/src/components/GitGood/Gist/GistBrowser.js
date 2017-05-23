import React, {Component} from 'react';
import Debug from '../../Debug/Debug';
import GistNew from './GistNew';
import GistList from './Lister/GistLister';
import GistView from './GistView';
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
            <div >
                <h1>Gist Browser</h1>
                <div className='col-sm-8 jumbotron'>
                    <GistView {...this.props} />
                </div>
                <div className='col-sm-4'>
                    <GistNew {...this.props}/>
                </div>
                <hr/>
                <GistList {...this.props}
                />
            </div>
        );
    };
}

export default GistBrowser;
