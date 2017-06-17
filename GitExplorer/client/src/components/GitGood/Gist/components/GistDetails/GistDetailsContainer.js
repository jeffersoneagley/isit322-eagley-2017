/** *
 * Container object for a detailed view of a single gist
 */
import GistDetailsDisplay from './views/GistDetailsDisplay';
import {EDIT as TYPES, getTypeGistListNeedsRefresh} from '../actions/GitGistActionTypes';
import {connect} from 'react-redux';
let $ = require('jquery');

const mapStateToProps = (state) => {
    return {
        Viewer: state.Git.Gist.Viewer,
        Editor: state.Git.Gist.Editor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

const mergeProps = (state, dispatch, props) => {
    let currentGist = state.Viewer.selectedGist;

    const onConfirmPromptOk = () => {
        dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeGitGistConfirm());
    };

    const onCreateSuccess = (body) => {
        console.log(body);
        dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeServerResponseSave({ok: true}, body));
        dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeSetIsProcessing(false));
        dispatch.dispatch(getTypeGistListNeedsRefresh(true));
    };

    const onCreateFailure = (ex) => {
        console.log(ex);

        dispatch.dispatch(
            TYPES.ACTION_CREATORS.getTypeServerResponseSave({ok: false, message: ex.message}));

        dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeSetIsProcessing(false));
    };

    let dispatchHandlers = {
        editorMode: {
            view: () => {
                dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeSetEditorMode(TYPES.EDITOR_MODES.VIEW));
            },
            edit: () => {
                dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeSetEditorMode(TYPES.EDITOR_MODES.EDIT));
            },
            compare: () => {
                dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeSetEditorMode(TYPES.EDITOR_MODES.COMPARE));
            },
            final: () => {
                dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeSetEditorMode(TYPES.EDITOR_MODES.FINAL));
            },
        },
        revertChanges: () => {
            dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeRevertChanges(currentGist));
        },
    };

    let editorModeClickHandlers = {
        previous: () => {
            switch (state.Editor.editorEditMode) {
            case TYPES.EDITOR_MODES.COMPARE:
                dispatchHandlers.editorMode.edit();
                break;
            case TYPES.EDITOR_MODES.EDIT:
            case TYPES.EDITOR_MODES.FINAL:
                dispatchHandlers.editorMode.view();
                break;
            }
        },
        next: () => {
            console.log(state.Editor.editorEditMode);
            switch (state.Editor.editorEditMode) {
            case TYPES.EDITOR_MODES.VIEW:
                dispatchHandlers.editorMode.edit();
                break;
            case TYPES.EDITOR_MODES.EDIT:
                dispatchHandlers.editorMode.compare();
                break;
            case TYPES.EDITOR_MODES.COMPARE:
                editorModeClickHandlers.save(state.Editor.gistLists[currentGist.id].changes);
                dispatchHandlers.editorMode.final();
                break;
            case TYPES.EDITOR_MODES.FINAL:
                dispatchHandlers.editorMode.view();
                break;
            }
        },
        revert: () => {
            dispatchHandlers.revertChanges();
        },
        save: (gist) => {
            dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeSetIsProcessing(true));
            console.log('onUpdateGist called');
            let body = {
                gistId: currentGist.id,
                gist: gist,
            };
            fetch('/api/git/gist/edit/update', {
                method: 'POST',
                body: JSON.stringify(
                    body,
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
                return typeof (json) === 'string' ? JSON.parse(json) : json;
            }).then(onCreateSuccess,
            ).catch(onCreateFailure);
        },
    };

    let onChange = (updatedData) => {
        let updates;
        if (updatedData !== undefined) {
            updates = $.extend(true, {}, currentGist, updatedData);
        } else {
            console.log('User hit continue with no changes made');
            updates = currentGist;
        }
        dispatch.dispatch(TYPES.ACTION_CREATORS.getTypeStoreChanges(currentGist.id, updates));
    };

    return {...state, ...props, editorModeClickHandlers, dispatchHandlers, onChange, onConfirmPromptOk};
};

let GistDetailsContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(GistDetailsDisplay);
export default GistDetailsContainer;
