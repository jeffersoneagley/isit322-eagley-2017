/**
 * Created by fish on 6/12/17.
 */
/***
 * Container object for a detailed view of a single gist
 */
import {connect} from 'react-redux';
import GistCreatorDisplay from './views/GistCreatorDisplay';
import {CREATE, getTypeGistListNeedsRefresh} from '../actions/GitGistActionTypes';
import 'whatwg-fetch';

const mapStateToProps = (state) => {

    return state.Git.Gist.Viewer;

};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

let mergeProps = (fromState, fromDispatch, fromProps) => {
    const onConfirmPromptOk = () => {
        fromDispatch.dispatch(CREATE.ACTION_CREATORS.getTypeGitGistCreateConfirm());
    };

    const onCreateSuccess = (body) => {
        fromDispatch.dispatch(CREATE.ACTION_CREATORS.getTypeGitGistCreatorCreateGistResponse({ok: true}, body));
        fromDispatch.dispatch(getTypeGistListNeedsRefresh(true));
    };

    const onCreateFailure = (ex) => {
        console.log(ex);

        fromDispatch.dispatch(CREATE.ACTION_CREATORS.getTypeGitGistCreatorCreateGistResponse({ok: false}, ex.message));

    };

    const onCreateGist = (event, docs, desc) => {
        fromDispatch.dispatch(CREATE.ACTION_CREATORS.getTypeGitGistCreatorIsProcessing(true));
        console.log('onCreateGist called');
        console.log(docs, desc);
        if (event !== undefined) {
            event.preventDefault();
        }
        let body = {
            desc: desc,
            docs: docs,
        };
        fetch('/api/git/gist/new', {
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
            return typeof (json) === 'string' ? JSON.parse(json) : json;
        }).then(onCreateSuccess,
        ).catch(onCreateFailure);
    };
    return {...fromState, ...fromProps, onCreateGist, onConfirmPromptOk};
};

let GistCreatorContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(GistCreatorDisplay);
export default GistCreatorContainer;
