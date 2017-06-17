/**
 * A component for display of a single gist
 */
import React, {Component} from 'react';
import './GistDetailsStylesheet.css';
import {Panel} from 'react-bootstrap';
import {EDIT} from '../../actions/GitGistActionTypes';

class GistDetailsDisplay extends Component {
    getGistMetaFieldInterface(selectedGist, mode, isEditMode) {
        if (isEditMode) {
            return <div>
                <textarea
                    className='form-control'
                    rows={3}
                    id={'input_' + selectedGist.id + '_content'}
                    defaultValue={selectedGist.description}
                    onInput={(evt) => {
                        let result = {
                            'description': evt.target.value,
                        };
                        this.props.onChange(result);
                    }
                    }
                />
            </div>;
        } else {
            return <p>description: {selectedGist.description || ''}</p>;
        }
    }

    renderFileSingleEdit = (fileMetaData) => {
        let identifier = 'gistFile_' + fileMetaData.filename;
        return <div key={'keyGistViewFile' + identifier} className='panel panel-info'>
            <div className='panel-heading'>
                <h3 >{fileMetaData.filename || ''}</h3>
                <input type='text'
                    defaultValue={fileMetaData.type}
                />
            </div>
            <textarea
                className='form-control'
                rows={5}
                id={'input_' + identifier + '_content'}
                defaultValue={fileMetaData.content}
                onInput={(evt) => {
                    let result = {
                        'files': {},
                    };
                    console.log(fileMetaData.filename);
                    result.files[fileMetaData.filename] = {
                        'content': evt.target.value,
                    };
                    this.props.onChange(result);
                }
                }
            >

            </textarea>
        </div>;
    };

    renderFileSingleView = (fileMetaData) => {
        return <li key={'keyGistViewFile' + fileMetaData.filename}>
            {fileMetaData.filename || ''} - {fileMetaData.type || ''}<br/>
            <pre>
                {fileMetaData.content || 'contents cannot be displayed'}
            </pre>
        </li>;
    };

    renderFileSingle = (fileMetaData, editorMode) => {
        if (editorMode) {
            return this.renderFileSingleEdit(fileMetaData);
        } else {
            return this.renderFileSingleView(fileMetaData);
        }
    };

    renderFiles(selectedGist, isEditMode) {
        let result = [];
        for (let file in selectedGist.files) {
            if (selectedGist.files.hasOwnProperty(file)) {
                result.push(this.renderFileSingle(selectedGist.files[file], isEditMode));
            }
        }
        return result;
    }

    getPanelButtonsPrevNext = (mode) => {
        switch (mode) {
        case EDIT.EDITOR_MODES.EDIT:
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
        case EDIT.EDITOR_MODES.COMPARE:
            return <div className='btn-group btn-group-lg btn-group-vertical'>
                <button
                    className='btn btn-info'
                    onClick={this.props.editorModeClickHandlers.previous}
                >
                    <span className='glyphicon glyphicon-chevron-left'/> Cancel, go back
                </button>
                <hr/>
                <button
                    className='btn btn-warning '
                    onClick={/**/this.props.editorModeClickHandlers.next}
                >
                        Ok, Save changes to this gist <span className='glyphicon glyphicon-cloud-upload'/>
                </button>
            </div>;
        case EDIT.EDITOR_MODES.FINAL:
            return <div>
                    processing...
            </div>;
        case EDIT.EDITOR_MODES.VIEW:
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

    getPanelViewDefaultWrapper = (selectedGist, mode, isEditMode) => {
        return <div >
            <div className='panel-heading'>
                <h3>Viewing Gist</h3>
                <subtitle> {selectedGist.id}</subtitle>
                {this.getGistMetaFieldInterface(selectedGist, mode, isEditMode)}
            </div>
            <div className='panel-body'>
                {this.getPanelViewGistBody(selectedGist, mode, isEditMode)}
            </div>
            <div className='panel-footer text-right'>
                {this.getPanelButtonsPrevNext(mode)}
            </div>
        </div>;
    };

    /**
     * core gist viewer panel body object
     * @param selectedGist
     * @param mode
     * @param isEditMode
     * @return {XML}
     */
    getPanelViewGistBody = (selectedGist, mode, isEditMode) => {
        return <div className=''>
            <h4>Files</h4>
            {this.renderFiles(selectedGist, isEditMode)}
        </div>;
    };

    getPanelFooterResponseConfirm = (panelType) => {
        return <div className='panel-footer'>
            <button
                className={'btn ' + (panelType !== undefined ? 'btn-' + panelType : '') + ' btn-block'}
                onClick={this.props.onConfirmPromptOk}
            >
                Ok!
            </button>
        </div>;
    };

    getPanelResponseSuccess = () => {
        let responseGist = this.props.Editor.responseGist;
        return <section className='panel panel-success'>
            <div className='panel-heading'>
                <h3>Your new gist was updated!!</h3>
                <subtitle>{responseGist.id}</subtitle>
            </div>
            <div className='panel-body'>
                <div className='col-xs-12 col-sm-6'>
                    Gist description:
                    {responseGist.description}
                </div>
                <div className='col-xs-12 col-sm-6'>
                    <a href={responseGist.html_url} target="_blank">Link to Github</a>
                </div>
                {this.renderFiles(responseGist, false)}
            </div>
            {this.getPanelFooterResponseConfirm('success')}
        </section>;
    };

    getPanelResponseFailure = () => {
        return <section className='panel panel-danger'>
            <div className='panel-heading'>
                <h3>Oh no!</h3>
                <subtitle>Something went wrong</subtitle>
            </div>
            <article>

                Response:
                {this.props.Editor.responseMessage}
            </article>
            {this.getPanelFooterResponseConfirm('danger')}
        </section >;
    };

    getPanelCompareChanges = (originalGist, changesGist, mode) => {
        return <div className='panel panel-default'>
            <div className='panel-heading'>
                <h3>Compare changes</h3>
            </div >
            <div className='col-xs-12 col-sm-6 panel panel-info'>

                <div className='panel-heading'>
                    <h3>Original</h3>
                    <subtitle> {originalGist.id}</subtitle>
                    <p>description: {originalGist.description || ''}</p>
                </div>
                <div className='panel-body'>
                    {this.getPanelViewGistBody(originalGist, mode, false)}
                </div>
            </div>
            <div className='col-xs-12 col-sm-6 panel panel-primary'>

                <div className='panel-heading'>
                    <h3>Your changes</h3>
                    <subtitle> {changesGist.id}</subtitle>
                    <p>description: {changesGist.description || ''}</p>
                </div>
                <div className='panel-body'>
                    {this.getPanelViewGistBody(changesGist, mode, false)}
                </div>
            </div>
            <div className='panel-footer text-right'>
                {this.getPanelButtonsPrevNext(mode)}
            </div>
        </div>;
    };

    getPanelCurrentMode = () => {
        let mode = this.props.Editor.editorEditMode;
        let original = this.props.Viewer.selectedGist;
        let updated;
        try {
            updated = this.props.Editor.gistLists[original.id].changes;
        } catch (ex) {
            updated = this.props.Viewer.selectedGist;
        }
        switch (mode) {
        case EDIT.EDITOR_MODES.COMPARE:
            return this.getPanelCompareChanges(this.props.Viewer.selectedGist, updated, mode);
        case EDIT.EDITOR_MODES.EDIT:
            return this.getPanelViewDefaultWrapper(updated, mode, true);
        case EDIT.EDITOR_MODES.VIEW:
        default:
            return this.getPanelViewDefaultWrapper(this.props.Viewer.selectedGist, mode, false);
        }
    };

    getPanelType = () => {
        switch (this.props.Editor.responseType) {
        case EDIT.RESPONSE_TYPES.SUCCESS:
            return this.getPanelResponseSuccess();
        case EDIT.RESPONSE_TYPES.FAILURE:
            return this.getPanelResponseFailure();
        case EDIT.RESPONSE_TYPES.STARTUP:
        default:
            return this.getPanelCurrentMode();
        }
    };

    getHasGistData = () => {
        if (this.props.Viewer.selectedGist !== undefined &&
            this.props.Viewer.selectedGist.files !== undefined) {
            return this.getPanelType();
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
