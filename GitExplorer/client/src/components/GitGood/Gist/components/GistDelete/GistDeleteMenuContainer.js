/**
 * Created by fish on 6/12/17.
 */
import GistDeleteMenuDisplay from './views/GistDeleteMenuDisplay';

import {connect} from 'react-redux';
import GistDeleteController from './GistDeleteController';

let GistDeleteMenuContainer = connect(
    GistDeleteController.mapStateToProps,
    GistDeleteController.mapDispatchToProps,
    GistDeleteController.mergeProps,
)(GistDeleteMenuDisplay);

export default GistDeleteMenuContainer;
