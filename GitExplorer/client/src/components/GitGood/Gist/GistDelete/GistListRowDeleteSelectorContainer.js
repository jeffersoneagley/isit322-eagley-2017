/**
 * Created by fish on 6/12/17.
 */
import GistListRowDeleteSelectorDisplay from './views/GistListRowDeleteSelectorDisplay';
import {getTypeGitGistDeleteListAdd, getTypeGitGistDeleteListRemove} from '../actions/GitGistActionTypes';
import {connect} from 'react-redux';

import GistDeleteController from './GistDeleteController';

let mapDispatchToProps = (dispatch) => {

    let onDeleteListItemAddClicked = (gistId) => {
        dispatch(getTypeGitGistDeleteListAdd(gistId));
    };
    let onDeleteListItemRemoveClickedList = (gistId) => {
        dispatch(getTypeGitGistDeleteListRemove(gistId));
    };
    return {
        ...GistDeleteController.mapDispatchToProps(dispatch),
        onDeleteListItemAddClicked: onDeleteListItemAddClicked,
        onDeleteListItemRemoveClickedList: onDeleteListItemRemoveClickedList,
    };
};

let GistListRowDeleteSelectorContainer = connect(
    GistDeleteController.mapStateToProps,
    mapDispatchToProps,
    GistDeleteController.mergeProps,
)(GistListRowDeleteSelectorDisplay);

export default GistListRowDeleteSelectorContainer;
