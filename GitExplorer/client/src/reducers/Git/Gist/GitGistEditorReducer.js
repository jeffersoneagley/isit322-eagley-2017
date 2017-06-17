import {EDIT as TYPES} from '../../../components/GitGood/Gist/components/actions/GitGistActionTypes';

const initialState = {
    editorEditMode: TYPES.EDITOR_MODES.VIEW,
    gistLists: {
        original: {},
        changes: {},
    },
    responseType: TYPES.RESPONSE_TYPES.STARTUP,
    responseMessage: '',
};
const GitGistEditorReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        //loading gist data for editing
        case TYPES.ACTION_TYPES.TYPE_EDITOR_OPEN_GIST:
            newState = {
                ...state,
                gistLists: {
                    ...state.gistLists,
                    [action.gist.id]: {
                        ...state.gistLists[action.gist.id],
                        original: action.gist,
                    },
                },
            };
            return newState;
        case TYPES.ACTION_TYPES.TYPE_EDITOR_UPDATE_RESPONSE_RESULT_SAVE_TO_STORE:
            newState = {
                ...state,
                responseType: action.responseType,
                responseMessage: action.responseMessage,
            };
            return newState;
        case TYPES.ACTION_TYPES.TYPE_EDITOR_SAVE_CHANGES_TO_STORE:
            newState = {
                ...state,
                gistLists: {
                    ...state.gistLists,
                    [action.gistId]: {
                        ...state.gistLists[action.gistId],
                        changes: action.changes,
                    },
                },
            };
            return newState;
        case TYPES.ACTION_TYPES.TYPE_EDITOR_RESULT:
            newState = {
                ...state,
                updateResult: TYPES.RESPONSE_TYPES.STARTUP,
            };
            return newState;
        case TYPES.ACTION_TYPES.TYPE_EDITOR_SET_MODE:
            console.log('hit set editor mode in reducer');
            newState = {
                ...state,
                editorEditMode: action.editorEditMode,
            };
            return newState;
        case TYPES.ACTION_TYPES.TYPE_REVERT_TO_ORIGINAL:
            newState = {
                ...state,
                gistLists: {
                    ...state.gistLists,
                    [action.gistId]: {
                        ...state.gistLists[action.gistId],
                        changes: {},
                    },
                },
            };
            return newState;
        case TYPES.ACTION_TYPES.TYPE_SET_IS_PROCESSING:
            newState = {
                ...state,
                isProcessing: action.isProcessing,
            };
            return newState;
        default:
            return state;
    }
};

export default GitGistEditorReducer;
