import GistBrowserView from './views/GistBrowserView';
import {connect} from 'react-redux';
import BrowserActions from './actions/GistBrowserActions';

let mapStateToProps = (state) => {
    return state.Git.Gist;
};

let mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

let mergeProps = (fromState, fromDispatch, fromProps) => {
    let onClickModeExitToBase = () => {
        fromDispatch.dispatch(BrowserActions.getActionTypeExitBrowserMode());
    };

    let onClickModeCreateOpen = () => {
        fromDispatch.dispatch(
            BrowserActions.getActionTypeSetBrowserMode(BrowserActions.BROWSER_MODES.CREATE),
        );
    };

    return {
        clickHandlers: {onClickModeExitToBase, onClickModeCreateOpen}, ...fromProps, state: fromState,
    };
};

let GistBrowserContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(GistBrowserView);

export default GistBrowserContainer;
