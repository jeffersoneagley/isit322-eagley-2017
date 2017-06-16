import {GIST_EDIT_ACTION_TYPES as TYPES} from '../../../components/GitGood/Gist/components/actions/GitGistActionTypes';

const initialState = {
    updateResult: TYPES.RESPONSE_TYPES.STARTUP,
    editorEditMode: TYPES.EDITOR_MODES.VIEW,
};
const GitGistEditorReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case TYPES.TYPE_EDITOR_OPEN_GIST:
            newState.gists[action.gist.id] = {
                ...newState.gists[action.gist.id],
                original: action.gist,
            };
            return newState;
        case TYPES.TYPE_EDITOR_UPDATE_RESPONSE_RESULT_SAVE_TO_STORE:
            newState.updateResult = action.updateResult;
            newState.status = action.status;
            newState.message = action.message;
            return newState;
        case TYPES.TYPE_EDITOR_SAVE_CHANGES_TO_STORE:
            newState.gists[action.gist.id] = {
                ...newState.gists[action.gist.id],
                update: action.content,
            };
            return newState;
        case TYPES.TYPE_EDITOR_SET_MODE:
            console.log('hit set editor mode in reducer');
            newState.editorEditMode = action.editorEditMode;
            return newState;
        default:
            return state;
    }
};

export default GitGistEditorReducer;
