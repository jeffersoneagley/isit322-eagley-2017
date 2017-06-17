/**
 * Created by fish on 6/11/17.
 */

export const TYPE_GIT_GET_GIST_META_LIST_RESPONSE = 'TYPE_GIT_GET_GIST_META_LIST_RESPONSE';
export const TYPE_GIT_GET_GIST_BY_ID_RESPONSE = 'TYPE_GIT_GET_GIST_BY_ID_RESPONSE';
export const TYPE_GIT_GIST_LIST_IS_REFRESHING = 'TYPE_GIT_GIST_LIST_IS_REFRESHING';
export const TYPE_GIT_GIST_LIST_NEEDS_REFRESH = 'TYPE_GIT_GIST_LIST_NEEDS_REFRESH';

export const CREATE = {
    ACTION_TYPES: {
        TYPE_GIT_GIST_CREATE_IS_PROCESSING: 'TYPE_GIT_GIST_CREATE_IS_PROCESSING',
        TYPE_GIT_GIST_CREATE_GIST_RESPONSE: 'TYPE_GIT_GIST_CREATE_GIST_RESPONSE',
        TYPE_GIT_GIST_CREATE_RESULT: 'TYPE_GIT_GIST_CREATE_RESULT',
    },
    RESPONSE_TYPES: {
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE',
        STARTUP: 'STARTUP',
    },
    ACTION_CREATORS: {
        getTypeGitGistCreateConfirm: () => {
            return (dispatch) =>
                dispatch({
                    type: CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_RESULT,
                    responseType: CREATE.RESPONSE_TYPES.STARTUP,
                    responseMessage: '',
                });
        },
        getTypeGitGistCreatorCreateGistResponse: (result, body) => {
            return (dispatch) => {
                if (result.ok) {
                    dispatch({
                        type: CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_GIST_RESPONSE,
                        selectedGist: body,
                    });
                    dispatch({
                        type: CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_RESULT,
                        responseType: CREATE.RESPONSE_TYPES.SUCCESS,
                        responseMessage: result.message || result.ok || 'Success',
                    });
                } else {
                    dispatch({
                        type: CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_RESULT,
                        responseType: CREATE.RESPONSE_TYPES.FAILURE,
                        responseMessage: result.message || result.ok || 'Failed!',
                    });
                }
                dispatch(CREATE.ACTION_CREATORS.getTypeGitGistCreatorIsProcessing(false));
            };
        },
        getTypeGitGistCreatorIsProcessing: (state) => {
            return (dispatch) => {
                dispatch({
                    type: CREATE.ACTION_TYPES.TYPE_GIT_GIST_CREATE_IS_PROCESSING,
                    isProcessing: state,
                });
            };
        },
    },
};

export const GIST_DELETE_ACTION_TYPES = {
    TYPE_SET_MODE_DELETE_MENU_DISABLED: 'TYPE_SET_MODE_DELETE_MENU_DISABLED',
    TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST: 'TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST',
    TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND: 'TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND',
    TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL: 'TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL',
    TYPE_SET_MODE_DELETE_MENU_FINAL_STATISTICS: 'TYPE_SET_MODE_DELETE_MENU_FINAL_STATISTICS',
    TYPE_SET_MODE_DELETE_MENU_CLEAR_SELECTION: 'TYPE_SET_MODE_DELETE_MENU_CLEAR_SELECTION',
    TYPE_GIST_DELETE_LIST_ADD_GIST_ID: 'TYPE_GIST_DELETE_LIST_ADD_GIST_ID',
    TYPE_GIST_DELETE_LIST_REMOVE_GIST_ID: 'TYPE_GIST_DELETE_LIST_REMOVE_GIST_ID',
};

export const EDIT = {
    ACTION_TYPES: {
        TYPE_REVERT_TO_ORIGINAL: 'TYPE_EDIT_REVERT_TO_ORIGINAL',
        TYPE_EDITOR_UPDATE_RESPONSE_RESULT_SAVE_TO_STORE: 'TYPE_EDITOR_UPDATE_RESPONSE_RESULT_SAVE_TO_STORE',
        TYPE_EDITOR_SAVE_CHANGES_TO_STORE: 'TYPE_EDITOR_SAVE_CHANGES_TO_STORE',
        TYPE_EDITOR_SET_MODE: 'TYPE_EDITOR_SET_MODE',
        TYPE_SET_IS_PROCESSING: 'TYPE_SET_IS_PROCESSING',
        TYPE_EDITOR_OPEN_GIST: 'TYPE_EDITOR_OPEN_GIST',
        TYPE_EDITOR_RESULT: 'TYPE_EDITOR_RESULT',
    },
    ACTION_CREATORS: {
        getTypeGitGistConfirm: () => {
            return (dispatch) =>
                dispatch({
                    type: EDIT.ACTION_TYPES.TYPE_EDITOR_RESULT,
                    responseType: EDIT.RESPONSE_TYPES.STARTUP,
                    responseMessage: '',
                });
        },
        getTypeSetEditorMode: (mode) => {
            return dispatch => {
                dispatch({
                    type: EDIT.ACTION_TYPES.TYPE_EDITOR_SET_MODE,
                    editorEditMode: mode,
                });
            };
        },
        getTypeStoreChanges: (gistId, changes) => {
            return dispatch => {
                dispatch({
                    type: EDIT.ACTION_TYPES.TYPE_EDITOR_SAVE_CHANGES_TO_STORE,
                    gistId: gistId,
                    changes: changes,
                });
            };
        },
        getTypeServerResponseSave: (result, body) => {
            return dispatch => {
                console.log('successfully updated remote gist');
                if (result.ok) {
                    // dispatch({
                    //     type: EDIT.ACTION_TYPES.TYPE_EDITOR_UPDATE_RESPONSE_RESULT_SAVE_TO_STORE,
                    //     selectedGist: body,
                    // });
                    dispatch({
                        type: EDIT.ACTION_TYPES.TYPE_EDITOR_UPDATE_RESPONSE_RESULT_SAVE_TO_STORE,
                        responseType: EDIT.RESPONSE_TYPES.SUCCESS,
                        responseMessage: result.message || result.ok || 'Success',
                    });
                } else {
                    dispatch({
                        type: EDIT.ACTION_TYPES.TYPE_EDITOR_UPDATE_RESPONSE_RESULT_SAVE_TO_STORE,
                        responseType: EDIT.RESPONSE_TYPES.FAILURE,
                        responseMessage: result.message || result.ok || 'Failed!',
                    });
                }
                dispatch(EDIT.ACTION_CREATORS.getTypeSetIsProcessing(false));
            };
        },

        getTypeRevertChanges: (gistId) => {
            return dispatch => {
                dispatch({
                    type: EDIT.ACTION_TYPES.TYPE_REVERT_TO_ORIGINAL,
                    gistId: gistId,
                });
            };
        },
        getTypeSetIsProcessing: (state) => {
            return (dispatch) => {
                dispatch({
                    type: EDIT.ACTION_TYPES.TYPE_SET_IS_PROCESSING,
                    isProcessing: state,
                });
            };
        },
    },
    RESPONSE_TYPES: {
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE',
        STARTUP: 'STARTUP',
    },
    EDITOR_MODES: {
        VIEW: 'VIEW',
        EDIT: 'EDIT',
        FINAL: 'FINAL',
        COMPARE: 'COMPARE',
    },

};

export function getTypeGitGistMetaListResponse(gistMetaList) {
    return (dispatch) => {
        dispatch({
            type: TYPE_GIT_GET_GIST_META_LIST_RESPONSE,
            gistMetaList,
        });
    };
}
export function getTypeGitGistByIdResponse(selectedGist) {
    return (dispatch) => {
        dispatch({
            type: TYPE_GIT_GET_GIST_BY_ID_RESPONSE,
            selectedGist,
        });
    };
}
export function getTypeGistListIsRefreshing(isRefreshing) {
    return (dispatch) => {
        dispatch({
            type: TYPE_GIT_GIST_LIST_IS_REFRESHING,
            isRefreshing,
            gistListNeedsRefresh: false,
        });
    };
}
export function getTypeGistListNeedsRefresh(needsRefresh) {
    return (dispatch) => {
        dispatch({
            type: TYPE_GIT_GIST_LIST_NEEDS_REFRESH,
            gistListNeedsRefresh: needsRefresh,
        });
    };
}
function getTypeGitGistDeleteMenuAction(type) {
    return {
        type: type,
        gistEditorDeleteMode: type,
    };
}
export function getTypeGitGistDeleteMenuDisabled() {
    console.trace();
    return (dispatch) => {
        dispatch(getTypeGitGistDeleteMenuAction(GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_DISABLED));
    };
}
export function getTypeGitGistDeleteMenuStageFirst() {
    return (dispatch) => {
        dispatch(getTypeGitGistDeleteMenuAction(GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST));
    };
}
export function getTypeGitGistDeleteMenuStageSecond() {
    return (dispatch) => {
        dispatch(getTypeGitGistDeleteMenuAction(GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND));
    };
}
export function getTypeGitGistDeleteMenuStageFinal() {
    return (dispatch) => {
        dispatch(getTypeGitGistDeleteMenuAction(GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL));
    };
}
export function getTypeGitGistDeleteMenuFinalStatistics(statistics) {
    return function(dispatch) {
        dispatch({
            type: GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_FINAL_STATISTICS,
            deleteResultStatistics: statistics,
        });
    };

}
export function getTypeGitGistDeleteClearSelection() {
    return (dispatch) => {
        dispatch({
            type: GIST_DELETE_ACTION_TYPES.TYPE_SET_MODE_DELETE_MENU_CLEAR_SELECTION,
        });
    };
}
/***
 * Makes a contract for git gist delete list add/remove
 * @param gistId ID of gist to add or remove to the delete list
 * @param isAddToList defaults to false, to encourage the program to fail in a non-deleting state
 * @return {{type: string, gistId: *}} contract data type for gist list actions
 */
function getTypeGitGistDeleteList(gistId, isAddToList = false) {
    return dispatch => {

        let type = (isAddToList ?
            GIST_DELETE_ACTION_TYPES.TYPE_GIST_DELETE_LIST_ADD_GIST_ID :
            GIST_DELETE_ACTION_TYPES.TYPE_GIST_DELETE_LIST_REMOVE_GIST_ID);
        dispatch({
            type: type,
            gistId,
        });
    };
}
/***
 * Makes a contract for git gist delete list add/remove
 * @param gistId
 * @return {{type: string, gistId: *}}
 */
export function getTypeGitGistDeleteListAdd(gistId) {
    return (dispatch) => {
        dispatch(getTypeGitGistDeleteList(gistId, true));
    };
}

/***
 * Makes a contract for git gist delete list add/remove
 * @param gistId
 * @return {{type: string, gistId: *}}
 */
export function getTypeGitGistDeleteListRemove(gistId) {
    return (dispatch) => {
        dispatch(getTypeGitGistDeleteList(gistId, false));
    };
}
