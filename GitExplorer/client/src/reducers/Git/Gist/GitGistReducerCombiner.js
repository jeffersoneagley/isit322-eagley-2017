/**
 * Created by fish on 6/11/17.
 */

import {combineReducers} from 'redux';
import GitGistDeleteReducer from './GitGistDeleteReducer';
import GitGistViewerReducer from './GitGistViewerReducer';

export default combineReducers({Delete: GitGistDeleteReducer, Viewer: GitGistViewerReducer});
