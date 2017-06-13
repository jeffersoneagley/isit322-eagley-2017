/***
 * Container object for a detailed view of a single gist
 */
import GistDetailsDisplay from './views/GistDetailsDisplay';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return state.Git.Gist.Viewer;
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

let GistDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(GistDetailsDisplay);
export default GistDetailsContainer;
