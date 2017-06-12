import React, {Component} from 'react';
import './GistDetails/views/GistDetailsStylesheet.css';
import Debug from '../../Debug/Debug';
import {Panel} from 'react-bootstrap';
const logger = new Debug(false);

/**
 * A component for display of a single gist
 */
class GistView extends Component {

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

    getPanelBody = () => {
        return <div>
            <div className='panel-heading'>
                <h3>Viewing Gist id {this.props.newGist.id}</h3><br />
            </div>
            <div className='panel-body'>
                <div className='btn-group btn-group-vertical col-sm-4'>
                    <h4>Links</h4>
                    {
                        this.props.newGist.html_url ?
                            (<a href={this.props.newGist.html_url}
                                className='btn btn-info btn-block dont-break-out ellipses' role='button'
                                target='_new'>
                                Friendly: <br/>{this.props.newGist.html_url || 'no url given'}
                            </a>) : ''
                    }
                    {
                        this.props.newGist.url ?
                            <a href={this.props.newGist.url} className='btn  btn-info btn-block ellipses'
                               role='button'
                               target='_new'>
                                API: <br/>{this.props.newGist.url || 'no url given'}
                            </a> : ''
                    }
                </div>
                <div className='col-sm-8'>
                    <h4>Files</h4>
                    <ul>
                        {this.renderFiles()}
                    </ul>
                </div>
            </div>
            <div className='panel-footer'>description: {this.props.newGist.description || ''}</div>
        </div>;
    };

    getHasGistData = () => {
        if (this.props.newGist !== undefined && this.props.newGist.files !== undefined) {
            return this.getPanelBody();
        } else {
            return <Panel>
                <h3>No gist selected</h3>
            </Panel>;
        }
    };

    render() {
        logger.log('render GistViewer');
        return this.getHasGistData();
    };
}

export default GistView;
