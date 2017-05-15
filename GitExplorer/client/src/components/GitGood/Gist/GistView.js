import React, {Component} from 'react';
import Debug from '../../Debug/Debug';
const logger = new Debug(false);
/**
 * A component for display of a single gist
 */
class GistView extends Component {

    // renderFileInfo = () =>{
    //
    // };

    renderFileSingle(fileMetaData) {
        return <li key={'keyGistViewFile' + fileMetaData.filename}>
            {fileMetaData.filename || ''} - {fileMetaData.type || ''}
        </li>;
    }

    renderFiles() {
        let result = [];
        for (let file in this.props.newGist.files) {
            if (this.props.newGist.files.hasOwnProperty(file)) {
                result.push(this.renderFileSingle(this.props.newGist.files[file]));
            }
        }
        return result;
    }

    render() {
        logger.log('render GistViewer');
        return (
            <form className='Form'>
                <h3>Git gist {this.props.newGist.id}</h3>
                <p>
                    desc: {this.props.newGist.description || ''}
                </p>
                <div>
                    <h4>Links</h4>
                    <ul>
                        <li>
                            link:
                            <a href={this.props.newGist.html_url} target='new'>
                                {this.props.newGist.html_url || 'no url given'}
                            </a>
                        </li>
                        <li>
                            API
                            <a href={this.props.newGist.url} target='new'>
                                {this.props.newGist.url || 'no url given'}
                            </a>
                        </li>
                    </ul>
                </div>
                <h4>Files</h4>
                <ul>
                    {this.renderFiles()}
                </ul>
            </form>
        );
    };
}

export default GistView;
