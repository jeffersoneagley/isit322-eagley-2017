import React, {Component} from 'react';
import Debug from '../../Debug/Debug';
const logger = new Debug(false);
/**
 * A component for display of a single gist
 */
class GistView extends Component {

    render() {
        logger.log('render GetGist');
        return (
            <form className='Form'>
                <h3>Git gist</h3>
                <p>
                    url: {this.props.newGist.url || ''}
                </p>
                <p>
                    desc: {this.props.newGist.description || ''}
                </p>
                <p>
                    {this.props.newGist.files || ''}
                </p>
            </form>
        );
    };
}

export default GistView;
