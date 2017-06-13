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
    let SendDeleteCommand = () => {
        console.log('command called to signal server to delete all gists in list');
    };
    return {
        onClickCancelStage: (stage) => {
            switch (stage) {
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
                    dispatch(getTypeGitGistDeleteMenuDisabled());
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
                default:
                    dispatch(getTypeGitGistDeleteMenuStageFirst());
                    break;
            }
        },

        onClickDeleteStage: (stage) => {
            switch (stage) {
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_SECOND:
                    SendDeleteCommand();
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_STAGE_FIRST:
                    dispatch(getTypeGitGistDeleteMenuStageSecond());
                    break;
                case STAGES.TYPE_SET_MODE_DELETE_MENU_DISABLED:
                default:
                    dispatch(getTypeGitGistDeleteMenuStageFirst());
                    break;
            }
        },
    };
};

let mapStateToProps = (state) => {
    return state.Git.Gist.Delete;
};

let GistDeleteMenuContainer = connect(mapStateToProps, mapDispatchToProps)(GistDeleteMenuDisplay);

export default GistDeleteMenuContainer;
