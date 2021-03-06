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
        onDeleteListItemAddClicked: onDeleteListItemAddClicked,
        onDeleteListItemRemoveClickedList: onDeleteListItemRemoveClickedList,
        ...GistDeleteController.mapDispatchToProps(dispatch),
    };
};

let GistListRowDeleteSelectorContainer = connect(
    GistDeleteController.mapStateToProps,
    mapDispatchToProps,
    GistDeleteController.mergeProps,
)(GistListRowDeleteSelectorDisplay);

export default GistListRowDeleteSelectorContainer;
