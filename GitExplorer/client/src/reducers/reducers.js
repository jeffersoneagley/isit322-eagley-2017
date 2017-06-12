/**
 * Created by fish on 6/10/17.
 */
//reducers
import {combineReducers} from 'redux';
import GetFooReducer from './GetFooReducer';
import GistReducer from './gist-reducer';
import SmallNumbersReducer from './SmallNumbersReducer';
//subordinate combiner(s)
import GitReducerCombiner from './Git/GitReducerCombiner';

export default combineReducers({GistReducer, SmallNumbersReducer, GetFooReducer, GitReducerCombiner});
