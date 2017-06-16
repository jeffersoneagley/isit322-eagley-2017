import {
    CREATE,
    GIST_DELETE_ACTION_TYPES,
    TYPE_GIT_GET_GIST_BY_ID_RESPONSE,
    TYPE_GIT_GET_GIST_META_LIST_RESPONSE,
    TYPE_GIT_GIST_LIST_IS_REFRESHING,
    TYPE_GIT_GIST_LIST_NEEDS_REFRESH,
} from '../../../components/GitGood/Gist/components/actions/GitGistActionTypes';
import BrowserActions from '../../../components/GitGood/Gist/actions/GistBrowserActions';

const initialState = {
    isGistListRefreshing: false,
    create: {
        responseType: CREATE.RESPONSE_TYPES.STARTUP,
        isProcessing: false,
        result:{},
    },
    gistListNeedsRefresh: true,
    browserMode: BrowserActions.BROWSER_MODES.BASE,
};
const Gist = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case BrowserActions.ACTION_TYPES.SET_BROWSER_MODE:
            newState = {
                ...state,
                browserMode: action.browserMode,
            };
            return newState;
        case TYPE_GIT_GET_GIST_META_LIST_RESPONSE:
            newState = {
                ...state,
                gistListMetaData: action.gistMetaList,
                isGistListRefreshing: false,
                gistListNeedsRefresh: false,
            };
            return newState;
        case TYPE_GIT_GET_GIST_BY_ID_RESPONSE:
            newState = {...state, selectedGist: action.selectedGist};
            return newState;
        //create stuff
        case CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_RESULT:
            newState = {
                ...state,
                create: {
                    ...state.create,
                    responseType: action.responseType,
                    responseMessage: action.message,
                },
            };
            return newState;
        case CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_GIST_RESPONSE:
            newState = {
                ...state,
                gistListNeedsRefresh: true,
                selectedGist: action.selectedGist,
            };
            return newState;
        case CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_IS_PROCESSING:
            newState = {
                ...state,
                create: {
                    ...state.create,
                    isProcessing: action.isProcessing,
                },
            };
            return newState;
        //lister stuff
        case TYPE_GIT_GIST_LIST_IS_REFRESHING:
            let gistListUpdateTime = state.gistListUpdateTime;
            if (!action.isRefreshing) {
                gistListUpdateTime = Date.now();
            }
            newState = {
                ...state,
                isGistListRefreshing: action.isRefreshing,
                gistListNeedsRefresh: false,
                gistListUpdateTime,
            };
            return newState;
        case TYPE_GIT_GIST_LIST_NEEDS_REFRESH:
        case GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL:
            newState = {...state, gistListNeedsRefresh: action.gistListNeedsRefresh};
            return newState;
        default:
            return state;
    }
};

export default Gist;
