/**
 * Created by fish on 6/11/17.
 */

import {combineReducers} from 'redux';
import GitGistDeleteReducer from './GitGistDeleteReducer';
import GitGistViewerReducer from './GitGistBrowserReducer';
import GitGistEditorReducer from './GitGistEditorReducer';

export default combineReducers(
    {
        Delete: GitGistDeleteReducer,
        Viewer: GitGistViewerReducer,
        Editor: GitGistEditorReducer,
    });
