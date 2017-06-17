/**
 * A component for display of a git user's info
 */
import {
    getTypeGistListIsRefreshing,
    getTypeGitGistByIdResponse,
    getTypeGitGistMetaListResponse,
} from '../actions/GitGistActionTypes';
import BrowserActions from '../../actions/GistBrowserActions';
import {connect} from 'react-redux';
import GitGistListerDisplay from './views/GistListerDisplay';
// import GetFooMobile from './views/GetFooMobile';
import 'whatwg-fetch';

// let GetFoo = (process.env.BUILD_FOR_MOBILE === true) ?
//     GetFooMobile :
//     GetFooStandard;

const mapStateToProps = (state) => {
    return state.Git.Gist.Viewer;
};

const mapDispatchToProps = (dispatch) => {
    let getGistById = (gistId, event) => {
        if (event !== undefined) {
            event.preventDefault();
        }
        console.log('requesting API send us gist with ID ' + gistId);
        fetch('/api/git/gist/byId', {
            method: 'POST',
            body: JSON.stringify(
                {gistId: gistId},
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
            // var body = json.body;
            dispatch(BrowserActions.getActionTypeSetBrowserMode(BrowserActions.BROWSER_MODES.VIEW));
            dispatch(getTypeGitGistByIdResponse(body));
            // getGistList();
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            console.log(ex);
        });
    };

    let dispatchActions = {
        getTypeGitGistMetaListResponse: (result) => {
            dispatch(getTypeGitGistMetaListResponse(result));
        },
        getTypeGistListIsRefreshing: (state) => {
            dispatch(getTypeGistListIsRefreshing(state));
        },
    };

    return {
        getGistById,
        dispatchActions,
    };
};

let mergeProps = (propsFromState, propsFromDispatch, myProps) => {
    let getGistList = (event) => {
        if (event !== undefined) {
            // if we're called from an eventhandler
            event.preventDefault();
        }
        if (!propsFromState.isRefreshing) {
            // activate refresh component for gistList
            propsFromDispatch.dispatchActions.getTypeGistListIsRefreshing(true);
            fetch('/api/git/gist/list').then(function(response) {
                return response.json();
            }).then(function(json) {
                // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
                let body = typeof (json) === 'string' ? JSON.parse(json) : json;
                propsFromDispatch.dispatchActions.getTypeGitGistMetaListResponse(body.result);
            }).catch(function(ex) {
                // DISPLAY WITH LOGGER
                console.log(ex);
                propsFromDispatch.dispatchActions.getTypeGistListIsRefreshing(false);
            });
        }
    };

    let checkGistList = () => {
        // || (Date.now() + 10000) > propsFromState.gistListUpdateTime
        if (propsFromState.gistListNeedsRefresh) {
            getGistList();
        }
    };

    checkGistList();

    return {
        ...propsFromState, ...propsFromDispatch, ...myProps,
    };
};

let GitGistListerInfoContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(GitGistListerDisplay);

export default GitGistListerInfoContainer;
