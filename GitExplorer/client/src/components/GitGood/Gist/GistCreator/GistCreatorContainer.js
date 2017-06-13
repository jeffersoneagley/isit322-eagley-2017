/**
 * Created by fish on 6/12/17.
 */
/***
 * Container object for a detailed view of a single gist
 */
import {connect} from 'react-redux';
import GistCreatorDisplay from './views/GistCreatorDisplay';
import {getTypeGitGistCreatorCreateGistResponse} from '../actions/GitGistActionTypes';
import 'whatwg-fetch';

const mapStateToProps = (state) => {
    return state.Git.Gist.Viewer;
};

const mapDispatchToProps = (dispatch) => {
    const onCreateGist = (event, docs, desc) => {
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
            let body = typeof (json) === 'string' ? JSON.parse(json) : json;
            // that.setState({newGist: body});
            dispatch(getTypeGitGistCreatorCreateGistResponse(body));
        }).catch(function(ex) {
            // DISPLAY WITH LOGGER
            console.log(ex);
        });
    };
    return {
        onCreateGist,
    };
};

let GistCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(GistCreatorDisplay);
export default GistCreatorContainer;
