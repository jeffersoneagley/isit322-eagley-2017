import React, {Component} from 'react';
import '../../../css/GistView.css';
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
        return <li key={'keyGistViewFile' + fileMetaData.filename} className='gistViewFileItem'>
            {fileMetaData.filename || ''} - {fileMetaData.type || ''}<br/>
            <p>
                {fileMetaData.content || 'contents cannot be displayed'}
            </p>
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
            <section>
                <div className='gistViewItem'>
                    <h3>Git gist {this.props.newGist.id}</h3><br />
                    description: {this.props.newGist.description || ''}
                </div>
                <div className='gistViewPanel'>
                    <div className='gistViewPanelItem'>
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
                    <div className='gistViewPanelItem gistViewItem'>
                        <h4>Files</h4>
                        <ul>
                            {this.renderFiles()}
                        </ul>
                    </div>
                </div>
            </section>
        );
    };
}

export default GistView;
