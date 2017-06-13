/**
 * Created by fish on 6/12/17.
 */
import GistListRowDeleteSelectorDisplay from './views/GistListRowDeleteSelectorDisplay';
import {getTypeGitGistDeleteListAdd, getTypeGitGistDeleteListRemove} from '../actions/GitGistActionTypes';
import {connect} from 'react-redux';

let mapStateToProps = (state) => {
    return state.Git.Gist.Delete;
};
let mapDispatchToProps = (dispatch) => {
    let onDeleteListItemAddClicked = (gistId) => {
        dispatch(getTypeGitGistDeleteListAdd(gistId));
    };
    let onDeleteListItemRemoveClickedList = (gistId) => {
        dispatch(getTypeGitGistDeleteListRemove(gistId));
    };
    return {
        onDeleteListItemAddClicked: onDeleteListItemAddClicked,
        onDeleteListItemRemoveClickedList: onDeleteListItemRemoveClickedList,
    };
};

let GistListRowDeleteSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(GistListRowDeleteSelectorDisplay);

export default GistListRowDeleteSelectorContainer;
