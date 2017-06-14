/**
 * Created by fish on 6/13/17.
 */
import {
    getTypeGitGistDeleteClearSelection,
    getTypeGitGistDeleteMenuDisabled,
    getTypeGitGistDeleteMenuFinalStatistics,
    getTypeGitGistDeleteMenuStageFinal,
    getTypeGitGistDeleteMenuStageFirst,
    getTypeGitGistDeleteMenuStageSecond,
    GIST_DELETE_ACTION_TYPES as STAGES,
} from '../actions/GitGistActionTypes';
//I created this because I started having needs for these functions in multiple containers

let GistDeleteController = {
    mapStateToProps: (state) => {
        return state.Git.Gist.Delete;
    },
    mapDispatchToProps: (dispatch) => {

        return {

            onCompletedDelete: (result) => {
                dispatch(getTypeGitGistDeleteMenuFinalStatistics(result));
            },
            dispatchClearDelete: () => {
                dispatch(getTypeGitGistDeleteClearSelection());
            },
            dispatchStageFinal: () => {
                dispatch(getTypeGitGistDeleteMenuStageFinal());
            },
            dispatchStageSecond: () => {
                dispatch(getTypeGitGistDeleteMenuStageSecond());
            },
            dispatchStageFirst: () => {
                dispatch(getTypeGitGistDeleteMenuStageFirst());
            },
            dispatchStageDisabled: () => {
                dispatch(getTypeGitGistDeleteMenuDisabled());
            },
        };
    },
    mergeProps: (propsFromState, propsFromDispatch, myProps) => {
        let SendDeleteCommand = () => {
            let body = {};
            for (let gistId in propsFromState.gistList) {
                if (propsFromState.gistList.hasOwnProperty(gistId)) {
                    if (propsFromState.gistList[gistId].isMarkedForDelete) {
                        body[gistId] = gistId;
                    }
                }
            }
            console.log('command called to signal server to delete all gists in list');
            fetch('/api/git/gist/delete', {
                method: 'POST',
                body: JSON.stringify(
                    body,
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
                let body = typeof (json) === 'string' ? JSON.parse(json) : json;
                // that.setState({newGist: body});
                console.log(body);
                propsFromDispatch.onCompletedDelete(body);
            }).catch(function(ex) {
                // DISPLAY WITH LOGGER
                console.log(ex);
            });
        };

        let onClickDeleteStage = () => {
            switch (propsFromState.gistEditorDeleteMode) {
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_FINAL:
                    propsFromDispatch.dispatchStageDisabled();
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
                    propsFromDispatch.dispatchStageFinal();
                    SendDeleteCommand();
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
                    propsFromDispatch.dispatchStageSecond();
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_DISABLED:
                default:
                    propsFromDispatch.dispatchStageFirst();
                    break;
            }
        };
        let onClickCancelStage = () => {
            switch (propsFromState.gistEditorDeleteMode) {
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
                    propsFromDispatch.dispatchStageDisabled();
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
                default:
                    propsFromDispatch.dispatchStageFirst();
                    break;
            }
        };

        return {
            gistEditorDeleteMode: propsFromState.gistEditorDeleteMode,
            gistList: propsFromState.gistList,
            deleteResultStatistics: propsFromState.deleteResultStatistics,
            SendDeleteCommand,
            onClickDeleteStage,
            onClickCancelStage,
            ...myProps,
            ...propsFromState,
            ...propsFromDispatch
        };
    },
};
export default GistDeleteController;
