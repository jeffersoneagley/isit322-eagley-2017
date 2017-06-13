/**
 * A component for display of a git user's info
 */
import {
    getTypeGistListIsRefreshing,
    getTypeGitGistByIdResponse,
    getTypeGitGistMetaListResponse,
} from '../actions/GitGistActionTypes';
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
    let gistListUpdateTime = Date.now();

    let getGistList = (event) => {
        if (event !== undefined) {
            //if we're called from an eventhandler
            event.preventDefault();
        }

        //activate refresh component for gistList
        dispatch(getTypeGistListIsRefreshing(true));
        fetch('/api/git/gist/list').then(function(response) {
            return response.json();
        }).then(function(json) {
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            dispatch(getTypeGitGistMetaListResponse(body.result));
            dispatch(getTypeGistListIsRefreshing(false));
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            console.log(ex);
            dispatch(getTypeGistListIsRefreshing(false));

        });
    };

    let getGistHeaderById = (gistId, event) => {
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
            dispatch(getTypeGitGistByIdResponse(body));
            getGistList();
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            console.log(ex);
        });
    };

    let checkGistList = () => {
        if (Date.now() > gistListUpdateTime) {
            gistListUpdateTime = Date.now() + 6600;
            getGistList();
        }
    };

    return {
        getGistList,
        checkGistList,
        getGistHeaderById,
    };
};

let GitGistListerInfoContainer = connect(mapStateToProps, mapDispatchToProps)(GitGistListerDisplay);

export default GitGistListerInfoContainer;
