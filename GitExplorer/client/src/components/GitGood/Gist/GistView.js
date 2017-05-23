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
        return <li key={'keyGistViewFile' + fileMetaData.filename}>
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
                <div >
                    <h3>Viewing Gist id {this.props.newGist.id}</h3><br />
                    description: {this.props.newGist.description || ''}
                </div>
                <div className=' btn-group btn-group-vertical'>
                    <h4>Links</h4>
                    {
                        this.props.newGist.html_url ?
                            (<a href={this.props.newGist.html_url} className='btn btn-secondary btn-block' role='button'
                                target='new'>
                                Friendly: <br/>{this.props.newGist.html_url || 'no url given'}
                            </a>) : ''
                    }
                    {
                        this.props.newGist.url ?
                            <a href={this.props.newGist.url} className='btn  btn-secondary btn-block' role='button'
                               target='new'>
                                API: <br/>{this.props.newGist.url || 'no url given'}
                            </a> : ''
                    }
                </div>
                <div>
                    <h4>Files</h4>
                    <ul>
                        {this.renderFiles()}
                    </ul>
                </div>
            </section>
        );
    };
}

export default GistView;
