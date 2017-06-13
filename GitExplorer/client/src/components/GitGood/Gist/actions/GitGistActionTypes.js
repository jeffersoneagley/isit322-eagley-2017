/**
 * Created by fish on 6/11/17.
 */

export const TYPE_GIT_GET_GIST_META_LIST_RESPONSE = 'TYPE_GIT_GET_GIST_META_LIST_RESPONSE';
export const TYPE_GIT_GET_GIST_BY_ID_RESPONSE = 'TYPE_GIT_GET_GIST_BY_ID_RESPONSE';
export const TYPE_GIT_GIST_CREATE_GIST_RESPONSE = 'TYPE_GIT_GIST_CREATE_GIST_RESPONSE';
export const TYPE_GIT_GIST_LIST_IS_REFRESHING = 'TYPE_GIT_GIST_LIST_IS_REFRESHING';

export const GIST_DELETE_ACTION_TYPES = {
    TYPE_SET_MODE_DELETE_MENU_DISABLED: 'TYPE_SET_MODE_DELETE_MENU_DISABLED',
    TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST: 'TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST',
    TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND: 'TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND',
    TYPE_GIST_DELETE_LIST_ADD_GIST_ID: 'TYPE_GIST_DELETE_LIST_ADD_GIST_ID',
    TYPE_GIST_DELETE_LIST_REMOVE_GIST_ID: 'TYPE_GIST_DELETE_LIST_REMOVE_GIST_ID',
};

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
function getTypeGitGistDeleteMenuAction(type) {
    return {
        type: type,
        gistEditorDeleteMode: type,
    };
}
export function getTypeGitGistDeleteMenuDisabled() {
    return getTypeGitGistDeleteMenuAction(GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_DISABLED);
}
export function getTypeGitGistDeleteMenuStageFirst() {
    return getTypeGitGistDeleteMenuAction(GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST);
}
export function getTypeGitGistDeleteMenuStageSecond() {
    return getTypeGitGistDeleteMenuAction(GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND);
}
/***
 * Makes a contract for git gist delete list add/remove
 * @param gistId ID of gist to add or remove to the delete list
 * @param isAddToList defaults to false, to encourage the program to fail in a non-deleting state
 * @return {{type: string, gistId: *}} contract data type for gist list actions
 */
function getTypeGitGistDeleteList(gistId, isAddToList = false) {
    return {
        type: (isAddToList ?
            GIST_DELETE_ACTION_TYPES.TYPE_GIST_DELETE_LIST_ADD_GIST_ID :
            GIST_DELETE_ACTION_TYPES.TYPE_GIST_DELETE_LIST_REMOVE_GIST_ID),
        gistId,
    };
}
/***
 * Makes a contract for git gist delete list add/remove
 * @param gistId
 * @return {{type: string, gistId: *}}
 */
export function getTypeGitGistDeleteListAdd(gistId) {
    return getTypeGitGistDeleteList(gistId, true);
}

/***
 * Makes a contract for git gist delete list add/remove
 * @param gistId
 * @return {{type: string, gistId: *}}
 */
export function getTypeGitGistDeleteListRemove(gistId) {
    return getTypeGitGistDeleteList(gistId, false);
}
