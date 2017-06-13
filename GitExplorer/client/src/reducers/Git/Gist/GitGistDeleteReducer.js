import {GIST_DELETE_ACTION_TYPES as TYPES} from '../../../components/GitGood/Gist/actions/GitGistActionTypes';

const initialState = {
    gistEditorDeleteMode: TYPES.TYPE_SET_MODE_DELETE_MENU_DISABLED,
    gistList: {},
};
const GitGistDeleteReducer = (state = initialState, action) => {
    let newState = state;
    console.log('GitGistDeleteReducer');
    switch (action.type) {
        case TYPES.TYPE_SET_MODE_DELETE_MENU_DISABLED:
            return {...state, gistEditorDeleteMode: TYPES.TYPE_SET_MODE_DELETE_MENU_DISABLED};
        case TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
            return {...state, gistEditorDeleteMode: TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST};
        case TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
            return {...state, gistEditorDeleteMode: TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND};
        case TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL:
            return {...state, gistEditorDeleteMode: TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL};
        case TYPES.TYPE_SET_MODE_DELETE_MENU_FINAL_STATISTICS:
            return {
                ...state,
                deleteResultStatistics: action.deleteResultStatistics,
                gistEditorDeleteMode: TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL,
            };
        case TYPES.TYPE_SET_MODE_DELETE_MENU_CLEAR_SELECTION:
            return {...state, gistList: {}};
        case TYPES.TYPE_GIST_DELETE_LIST_ADD_GIST_ID:
            newState = {...state, gistList: {...state.gistList}};
            newState.gistList[action.gistId] = {...newState.gistList[action.gistId], isMarkedForDelete: true};
            console.log(newState);
            return newState;
        case TYPES.TYPE_GIST_DELETE_LIST_REMOVE_GIST_ID:
            newState = {...state, gistList: {...state.gistList}};
            newState.gistList[action.gistId] = {...newState.gistList[action.gistId], isMarkedForDelete: false};
            return newState;
        default:
            return state;
    }
};

export default GitGistDeleteReducer;
