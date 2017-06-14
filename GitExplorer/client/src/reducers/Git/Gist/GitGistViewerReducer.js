import {
    TYPE_GIT_GET_GIST_BY_ID_RESPONSE,
    TYPE_GIT_GET_GIST_META_LIST_RESPONSE,
    TYPE_GIT_GIST_CREATE_GIST_RESPONSE,
    TYPE_GIT_GIST_CREATE_IS_PROCESSING,
    TYPE_GIT_GIST_LIST_IS_REFRESHING,
    TYPE_GIT_GIST_LIST_NEEDS_REFRESH,
} from '../../../components/GitGood/Gist/actions/GitGistActionTypes';

const initialState = {
    isGistListRefreshing: false,
    createIsProcessing: false,
    gistListNeedsRefresh: true,
};
const Gist = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case TYPE_GIT_GET_GIST_META_LIST_RESPONSE:
            newState = {
                ...state,
                gistListMetaData: action.gistMetaList,
                isGistListRefreshing: false,
                gistListNeedsRefresh: false,
            };
            return newState;
        case TYPE_GIT_GET_GIST_BY_ID_RESPONSE:
            newState = {...state, selectedGistData: action.selectedGist};
            return newState;
        case TYPE_GIT_GIST_CREATE_GIST_RESPONSE:
            newState = {
                ...state,
                selectedGistData: action.selectedGist,
                createIsProcessing: false,
                gistListNeedsRefresh: true,
            };
            return newState;
        case TYPE_GIT_GIST_CREATE_IS_PROCESSING:
            newState = {...state, createIsProcessing: action.createIsProcessing};
            return newState;
        case TYPE_GIT_GIST_LIST_IS_REFRESHING:
            newState = {...state, isGistListRefreshing: action.isRefreshing, gistListNeedsRefresh: false};
            if (!action.isRefreshing) {
                newState.gistListUpdateTime = Date.now();
            }
            return newState;
        case TYPE_GIT_GIST_LIST_NEEDS_REFRESH:
            newState = {...state, gistListNeedsRefresh: action.gistListNeedsRefresh};
            return newState;
        default:
            return state;
    }
};

export default Gist;
