/**
 * Created by fish on 6/12/17.
 */
import GistDeleteMenuDisplay from './views/GistDeleteMenuDisplay';
import {
    getTypeGitGistDeleteMenuDisabled,
    getTypeGitGistDeleteMenuStageFirst,
    getTypeGitGistDeleteMenuStageSecond,
    GIST_DELETE_ACTION_TYPES as STAGES,
} from '../actions/GitGistActionTypes';
import {connect} from 'react-redux';

/**
 * A component for prompting user to delete gists
 */

let mapDispatchToProps = (dispatch) => {

    return {

        onCompletedDelete: (result) => {
            dispatch(getTypeGitGistDeleteMenuStageFirst());
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
};

let mapStateToProps = (state) => {
    return state.Git.Gist.Delete;
};

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    let SendDeleteCommand = () => {
        let body = {};
        for (let gistId in propsFromState.gistList) {
            if (propsFromState.gistList.hasOwnProperty(gistId)) {
                if (propsFromState.gistList[gistId].isMarkedForDelete) {
                    body[gistId] = gistId;
                }
            }
        }
        console.log(body);
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
    return {
        gistEditorDeleteMode: propsFromState.gistEditorDeleteMode,
        gistList: propsFromState.gistList,
        onClickDeleteStage: () => {
            switch (propsFromState.gistEditorDeleteMode) {
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
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
        },
        onClickCancelStage: () => {
            switch (propsFromState.gistEditorDeleteMode) {
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
                    propsFromDispatch.dispatchStageDisabled();
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
                default:
                    propsFromDispatch.dispatchStageFirst();
                    break;
            }
        },
    };
};

let GistDeleteMenuContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(GistDeleteMenuDisplay);

export default GistDeleteMenuContainer;
