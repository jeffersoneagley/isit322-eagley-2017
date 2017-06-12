import React, {Component} from 'react';
import '../../../../../css/GistView.css';
import Debug from '../../../../Debug/Debug';
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

    renderFiles(selectedGist) {
        let result = [];
        for (let file in selectedGist.files) {
            if (selectedGist.files.hasOwnProperty(file)) {
                result.push(this.renderFileSingle(selectedGist.files[file]));
            }
        }
        return result;
    }

    getPanelBody = (selectedGist) => {
        return <div>
            <div className='panel-heading'>
                <h3>Viewing Gist id {selectedGist.id}</h3><br />
            </div>
            <div className='panel-body'>
                <div className='btn-group btn-group-vertical col-sm-4'>
                    <h4>Links</h4>
                    {
                        selectedGist.html_url ?
                            (<a href={selectedGist.html_url}
                                className='btn btn-info btn-block dont-break-out ellipses' role='button'
                                target='_new'>
                                Friendly: <br/>{selectedGist.html_url || 'no url given'}
                            </a>) : ''
                    }
                    {
                        selectedGist.url ?
                            <a href={selectedGist.url} className='btn  btn-info btn-block ellipses'
                               role='button'
                               target='_new'>
                                API: <br/>{selectedGist.url || 'no url given'}
                            </a> : ''
                    }
                </div>
                <div className='col-sm-8'>
                    <h4>Files</h4>
                    <ul>
                        {this.renderFiles(selectedGist)}
                    </ul>
                </div>
            </div>
            <div className='panel-footer'>description: {selectedGist.description || ''}</div>
        </div>;
    };

    getHasGistData = () => {
        if (this.props.selectedGistData !== undefined && this.props.selectedGistData.files !== undefined) {
            return this.getPanelBody(this.props.selectedGistData);
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
