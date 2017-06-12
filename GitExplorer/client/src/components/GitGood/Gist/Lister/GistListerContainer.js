/**
 * A component for display of a git user's info
 */
import {getTypeGistListIsRefreshing, getTypeGitGistMetaListResponse} from '../actions/GitGistActionTypes';
import {connect} from 'react-redux';
import GitGistListerDisplay from './views/GistListerDisplay';
// import GetFooMobile from './views/GetFooMobile';
import 'whatwg-fetch';

// let GetFoo = (process.env.BUILD_FOR_MOBILE === true) ?
//     GetFooMobile :
//     GetFooStandard;

const mapStateToProps = (state) => {
    return state.GitReducerCombiner.GitGistReducer;

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

        // this.setState({gistData: {gistList: false}});
        const that = this;
        fetch('/api/git/gist/list').then(function(response) {
            // YOU WRITE IT
            // that.debug.log(response);
            return response.json();
        }).then(function(json) {
            // PARSE THE JSON BODY INTO JS SINCE IT IS PROPABLY A STRING:
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // var body = json.body;
            dispatch(getTypeGitGistMetaListResponse(body.result));
            dispatch(getTypeGistListIsRefreshing(false));
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            that.debug.log(ex);
            dispatch(getTypeGistListIsRefreshing(false));

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
    };
};

let GitGistListerInfoContainer = connect(mapStateToProps, mapDispatchToProps)(GitGistListerDisplay);

export default GitGistListerInfoContainer;
