/**
 * Created by fish on 6/10/17.
 */

import GistReducer from './gist-reducer';
import SmallNumbersReducer from './SmallNumbersReducer';
import {combineReducers} from 'redux';

export default combineReducers({GistReducer, SmallNumbersReducer});
