/**
 * Created by fish on 6/11/17.
 */

export const TYPE_GIT_GET_GIST_META_LIST_RESPONSE = 'TYPE_GIT_GET_GIST_META_LIST_RESPONSE';
export const TYPE_GIT_GET_GIST_BY_ID_RESPONSE = 'TYPE_GIT_GET_GIST_BY_ID_RESPONSE';
export const TYPE_GIT_GIST_CREATE_GIST_RESPONSE = 'TYPE_GIT_GIST_CREATE_GIST_RESPONSE';
export const TYPE_GIT_GIST_LIST_IS_REFRESHING = 'TYPE_GIT_GIST_LIST_IS_REFRESHING';

export function getTypeGitGistMetaListResponse(gistMetaList) {
    return {
        type: TYPE_GIT_GET_GIST_META_LIST_RESPONSE,
        gistMetaList,
    };
}
export function getTypeGitGistByIdResponse(selectedGist) {
    return {
        type: TYPE_GIT_GET_GIST_BY_ID_RESPONSE,
        selectedGist,
    };
}
export function getTypeGistListIsRefreshing(isRefreshing) {
    return {
        type: TYPE_GIT_GIST_LIST_IS_REFRESHING,
        isRefreshing,
    };
}
export function getTypeGitGistCreatorCreateGistResponse(newGist) {
    return {
        type: TYPE_GIT_GIST_CREATE_GIST_RESPONSE,
        selectedGist: newGist,
    };
}
