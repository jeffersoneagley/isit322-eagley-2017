import React, {Component} from 'react';
import './GistDetailsStylesheet.css';
import {Panel} from 'react-bootstrap';
import {GIST_EDIT_ACTION_TYPES as TYPES} from '../../actions/GitGistActionTypes';

/**
 * A component for display of a single gist
 */
class GistDetailsDisplay extends Component {

    renderFileSingleEdit = (fileMetaData) => {
        let identifier = 'gistFile_' + fileMetaData.filename;
        return <div key={'keyGistViewFile' + identifier} className='panel panel-info'>
            <div className='panel-heading'>
                <h3 >{fileMetaData.filename || ''}</h3>
                <subtitle>{fileMetaData.type || ''}</subtitle>
            </div>
            <textarea
                className='form-control'
                rows={5}
                id={'input_' + identifier + '_content'}
                defaultValue={fileMetaData.content}
            >

                </textarea>
        </div>;

    };

    renderFileSingleView = (fileMetaData) => {
        return <li key={'keyGistViewFile' + fileMetaData.filename}>
            {fileMetaData.filename || ''} - {fileMetaData.type || ''}<br/>
            <p>
                {fileMetaData.content || 'contents cannot be displayed'}
            </p>
        </li>;
    };

    renderFileSingle = (fileMetaData, editorMode) => {
        switch (editorMode) {
            case TYPES.EDITOR_MODES.EDIT:
                return this.renderFileSingleEdit(fileMetaData);
            case TYPES.EDITOR_MODES.VIEW:
            default:
                return this.renderFileSingleView(fileMetaData);
        }
    };

    renderFiles(selectedGist, mode) {
        let result = [];
        for (let file in selectedGist.files) {
            if (selectedGist.files.hasOwnProperty(file)) {
                result.push(this.renderFileSingle(selectedGist.files[file], mode));
            }
        }
        return result;
    }

    getPanelButtonsPrevNext = (mode) => {
        switch (mode) {
            case TYPES.EDITOR_MODES.FINAL:
                return <div>
                    <button
                        className='btn btn-success'
                        onClick={this.props.editorModeClickHandlers.next}
                    >
                        OK
                    </button>
                </div>;
            case TYPES.EDITOR_MODES.EDIT:
                return <div>
                    <button
                        className='btn btn-secondary'
                        onClick={this.props.editorModeClickHandlers.previous}
                    >
                        Previous
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={this.props.editorModeClickHandlers.next}
                    >
                        Save
                    </button>
                </div>;
            case TYPES.EDITOR_MODES.VIEW:
            default:
                return <div>
                    <button
                        className='btn btn-primary'
                        onClick={this.props.editorModeClickHandlers.next}
                    >
                        Edit
                    </button>
                </div>;

        }
    };

    getLinksPanel = (selectedGist) => {
        return <div className='btn-group btn-group-justified'>
            <h5>Links</h5>
            {
                selectedGist.html_url ?
                    (<span className='label label-info'>
                                Friendly: {selectedGist.html_url || 'no url given'}
                            </span>) : ''
            }<br/>
            {
                selectedGist.url ?
                    <span className='label label-info'>
                                API: {selectedGist.url || 'no url given'}
                            </span> : ''
            }
        </div>;
    };

    getPanelBody = (selectedGist, mode) => {
        console.log(mode);
        return <div className='panel panel-info'>
            <div className='panel-heading'>
                <h3>Viewing Gist</h3>
                <subtitle> {selectedGist.id}</subtitle>
                <p>description: {selectedGist.description || ''}</p>
            </div>
            <div className='panel-body'>

                <div className=''>
                    <h4>Files</h4>
                    <ul>
                        {this.renderFiles(selectedGist, mode)}
                    </ul>
                </div>
            </div>
            <div className='panel-footer text-right'>
                {this.getPanelButtonsPrevNext(mode)}
            </div>
        </div>;
    };

    getHasGistData = () => {
        if (this.props.Viewer.selectedGistData !== undefined &&
            this.props.Viewer.selectedGistData.files !== undefined) {
            return this.getPanelBody(this.props.Viewer.selectedGistData, this.props.Editor.editorEditMode);
        } else {
            return <Panel>
                <h3>No gist selected</h3>
                <p>
                    Select one below or press create new gist.
                </p>
            </Panel>;
        }
    };

    render() {
        console.log(this.props.Editor.editorEditMode);
        return this.getHasGistData();
    };
}

export default GistDetailsDisplay;
