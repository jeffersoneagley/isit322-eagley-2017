/**
 * Created by fish on 6/11/17.
 */

import {combineReducers} from 'redux';
import UserInfo from './GitUserInfoReducer';
import Gist from './Gist/GitGistReducerCombiner';

export default combineReducers({UserInfo, Gist});
