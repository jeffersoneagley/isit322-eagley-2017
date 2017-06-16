/***
 * Container object for a detailed view of a single gist
 */
import GistDetailsDisplay from './views/GistDetailsDisplay';
import {GIST_EDIT_ACTION_TYPES as TYPES} from '../actions/GitGistActionTypes';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        Viewer: state.Git.Gist.Viewer,
        Editor: state.Git.Gist.Editor,
    };
};

const mapDispatchToProps = (dispatch) => {

    let dispatchHandlers = {
        editorMode: {
            view: () => {
                dispatch(TYPES.setEditorMode(TYPES.EDITOR_MODES.VIEW));
            },
            edit: () => {
                dispatch(TYPES.setEditorMode(TYPES.EDITOR_MODES.EDIT));
            },
            final: () => {
                dispatch(TYPES.setEditorMode(TYPES.EDITOR_MODES.FINAL));
            },
        },
    };

    return dispatchHandlers;
};

const mergeProps = (state, dispatch, props) => {

    let editorModeClickHandlers = {
        previous: () => {
            switch (state.Editor.editorEditMode) {
                case TYPES.EDITOR_MODES.EDIT:
                case TYPES.EDITOR_MODES.FINAL:
                    dispatch.editorMode.view();
                    break;
            }
        },
        next: () => {
            console.log(state.Editor.editorEditMode);
            switch (state.Editor.editorEditMode) {
                case TYPES.EDITOR_MODES.VIEW:
                    dispatch.editorMode.edit();
                    break;
                case TYPES.EDITOR_MODES.EDIT:
                    dispatch.editorMode.final();
                    break;
                case TYPES.EDITOR_MODES.FINAL:
                    dispatch.editorMode.view();
                    break;
            }
        },
    };

    return {...state, ...props, editorModeClickHandlers};
};

let GistDetailsContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(GistDetailsDisplay);
export default GistDetailsContainer;
