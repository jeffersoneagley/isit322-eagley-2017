import {
    TYPE_GIT_GET_GIST_BY_ID_RESPONSE,
    TYPE_GIT_GET_GIST_META_LIST_RESPONSE,
    TYPE_GIT_GIST_CREATE_GIST_RESPONSE,
    TYPE_GIT_GIST_LIST_IS_REFRESHING,
} from '../../../components/GitGood/Gist/actions/GitGistActionTypes';

const initialState = {
    isGistListRefreshing: false,
};
const Gist = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case TYPE_GIT_GET_GIST_META_LIST_RESPONSE:
            newState = {...state, gistListMetaData: action.gistMetaList};
            return newState;
        case TYPE_GIT_GET_GIST_BY_ID_RESPONSE:
            newState = {...state, selectedGistData: action.selectedGist};
            return newState;
        case TYPE_GIT_GIST_CREATE_GIST_RESPONSE:
            newState = {...state, selectedGistData: action.selectedGist};
            return newState;
        case TYPE_GIT_GIST_LIST_IS_REFRESHING:
            newState = {...state, isGistListRefreshing: action.isRefreshing};
            return newState;
        default:
            return state;
    }
};

export default Gist;
